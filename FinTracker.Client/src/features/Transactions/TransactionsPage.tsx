import { useEffect, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import appsettings from "../../appsettings.json";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import TransactionTable from "../../components/TransactionTable";
import useDebounce from "../../hooks/useDebounce";
import useRefresh from "../../hooks/useRefresh";
import TransactionService from "../../services/TransactionService";
import Transaction from "../../types/Transaction";
import TransactionQuery from "../../types/TransactionQuery";
import TransactionViewModel from "../../types/TransactionViewModel";
import { blurActiveElement } from "../../utils/HtmlHelper";
import { AddTransactionIcon, FilterRemoveIcon } from "../../utils/Icons";
import ToastManager from "../../utils/ToastManager";
import TransactionFilters from "./TransactionFilters";
import TransactionForm from "./TransactionForm";

function TransactionsPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingValues, setEditingValues] = useState<TransactionViewModel>();
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const { refreshed, refresh } = useRefresh();
    const [searchParams] = useSearchParams();
    const searchCategory = useMemo(
        () => Number(searchParams.get("category")) || undefined,
        [searchParams]
    );

    const [filterQuery, setFilterQuery] = useState<TransactionQuery>({});
    const [debouncedQuery, setDebouncedQuery] = useState({});
    const debouncedResult = useDebounce(
        debouncedQuery,
        appsettings.transactionSearchDebounceMs
    );

    useEffect(() => {
        setFilterQuery({
            ...filterQuery,
            ...debouncedResult,
        });
    }, [debouncedResult]);

    useEffect(() => {
        if (searchCategory) {
            setFilterQuery({
                ...filterQuery,
                categoryId: searchCategory,
            });
        }
    }, [searchCategory]);

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>Transactions</h1>
                <div className="flex">
                    {anyFiltersSelected() && (
                        <IconButton
                            icon={FilterRemoveIcon}
                            title="Reset filters"
                            onClick={() => {
                                setFilterQuery({});
                                setDebouncedQuery({});
                            }}
                        />
                    )}
                    <IconButton
                        icon={AddTransactionIcon}
                        title="Add a cash transaction"
                        onClick={newCashTransaction}
                    />
                </div>
            </Row>

            <TransactionFilters
                filterQuery={filterQuery}
                setFilterQuery={setFilterQuery}
                debouncedQuery={debouncedQuery}
                setDebouncedQuery={setDebouncedQuery}
            />

            <TransactionTable
                query={filterQuery}
                onRowSelect={editTransaction}
                refreshed={refreshed}
                onChange={refresh}
                showLoading={true}
            />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <TransactionForm
                    onSubmit={submitTransaction}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={() => setIsConfirmingDelete(true)}
                    values={editingValues}
                />
            </Drawer>

            {isConfirmingDelete && (
                <ConfirmationPopup
                    onCancel={() => setIsConfirmingDelete(false)}
                    title={"Are you sure?"}
                    body={"Deleting a transaction cannot be undone."}
                    onConfirm={deleteTransaction}
                />
            )}
        </Page>
    );

    function newCashTransaction() {
        setEditingValues({
            isCashTransaction: true,
            amount: "",
            memo: "",
            date: "",
        });
        setIsDrawerOpen(true);
    }

    function editTransaction(transaction: Transaction) {
        setEditingValues({
            ...transaction,
            amount: (transaction.amount / 100).toFixed(2),
        });
        setIsDrawerOpen(true);
    }

    function submitTransaction(values: FieldValues) {
        // cast values
        const model: TransactionViewModel = {
            ...values,
            amount:
                Math.floor(Number(values?.amount?.toString() ?? NaN) * 100) ??
                undefined,
        };

        (values.id
            ? TransactionService.patchTransaction(model)
            : TransactionService.createTransaction(model)
        ).then(() => {
            blurActiveElement();
            refresh();
            setIsDrawerOpen(false);
            ToastManager.addToast({
                type: "success",
                title: "Success",
                body: "The transaction was successfully saved.",
            });
        });
    }

    async function deleteTransaction() {
        if (!editingValues?.id) return;
        await TransactionService.deleteTransaction(editingValues.id);
        blurActiveElement();
        refresh();
        setIsConfirmingDelete(false);
        setIsDrawerOpen(false);
        ToastManager.addToast({
            type: "success",
            title: "Success",
            body: "The transaction was successfully deleted.",
        });
    }

    function anyFiltersSelected() {
        return (
            Object.values({ ...filterQuery, ...debouncedQuery }).filter(
                (v) => v !== undefined
            ).length > 0
        );
    }
}

export default TransactionsPage;
