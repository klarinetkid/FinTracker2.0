import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import appsettings from "../../appsettings.json";
import EntityManagementPage from "../../components/EntityManagementPage";
import IconButton from "../../components/IconButton";
import TransactionTable from "../../components/TransactionTable";
import useDebounce from "../../hooks/useDebounce";
import useRefresh from "../../hooks/useRefresh";
import TransactionService from "../../services/TransactionService";
import TransactionQuery from "../../types/TransactionQuery";
import TransactionViewModel from "../../types/TransactionViewModel";
import { AddTransactionIcon, FilterRemoveIcon } from "../../utils/Icons";
import { dollarsToCents } from "../../utils/NumberHelper";
import TransactionFilters from "./TransactionFilters";
import TransactionForm from "./TransactionForm";

function TransactionsPage() {
    const { refreshed, refresh } = useRefresh();
    const [searchParams] = useSearchParams();

    const [filterQuery, setFilterQuery] = useState<TransactionQuery>({
        categoryId: Number(searchParams.get("category")) || undefined,
    });
    const [debouncedQuery, setDebouncedQuery] = useState<TransactionQuery>({
        after: searchParams.get("after") || undefined,
        before: searchParams.get("before") || undefined,
    });
    const [debouncedResult, setDebouncedResult] = useDebounce(
        debouncedQuery,
        appsettings.transactionSearchDebounceMs
    );

    const combinedQuery = useMemo(
        () => ({
            ...filterQuery,
            ...debouncedResult,
            // default order
            orderBy: "date",
            order: "desc",
        }),
        [filterQuery, debouncedResult]
    );

    const newTrxDefautls = {
        isCashTransaction: true,
        amount: "",
        memo: "",
        date: "",
    };

    return (
        <EntityManagementPage
            entityPluralName="Transactions"
            entitySingularName="Transaction"
            drawerTitle={(t) =>
                (t.isCashTransaction ? "Cash " : "") + "Transaction"
            }
            newEntityDefaults={newTrxDefautls as TransactionViewModel}
            newEntityIcon={AddTransactionIcon}
            refresh={refresh}
            addEntity={TransactionService.createTransaction.bind(
                TransactionService
            )}
            putEntity={TransactionService.patchTransaction.bind(
                TransactionService
            )}
            deleteEntity={TransactionService.deleteTransaction.bind(
                TransactionService
            )}
            renderTable={renderBody}
            renderForm={(form) => <TransactionForm form={form} />}
            transformBeforeSubmit={(values) => ({
                ...values,
                amount: dollarsToCents(values.amount),
            })}
            additionalHeaderButtons={
                anyFiltersSelected() && (
                    <IconButton
                        icon={FilterRemoveIcon}
                        title="Reset filters"
                        onClick={() => {
                            setFilterQuery({});
                            setDebouncedQuery({});
                            setDebouncedResult({});
                        }}
                    />
                )
            }
        />
    );

    function renderBody(_: unknown, edit: (t: TransactionViewModel) => void) {
        return (
            <>
                <TransactionFilters
                    filterQuery={filterQuery}
                    setFilterQuery={setFilterQuery}
                    debouncedQuery={debouncedQuery}
                    setDebouncedQuery={setDebouncedQuery}
                />

                <TransactionTable
                    query={combinedQuery}
                    onRowSelect={(t) =>
                        edit({
                            ...t,
                            amount: (t.amount / 100).toFixed(2),
                        })
                    }
                    refreshed={refreshed}
                    onChange={refresh}
                    showLoading={true}
                />
            </>
        );
    }

    function anyFiltersSelected() {
        return (
            Object.values({ ...filterQuery, ...debouncedQuery }).filter(
                (v) => v !== undefined && v !== ""
            ).length > 0
        );
    }
}

export default TransactionsPage;
