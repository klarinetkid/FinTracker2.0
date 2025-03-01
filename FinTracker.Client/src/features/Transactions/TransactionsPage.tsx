import { AxiosError } from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import TransactionTable from "../../components/TransactionTable";
import { useFormValues } from "../../hooks/useFormValues";
import useRefresh from "../../hooks/useRefresh";
import { ErrorResponse } from "../../services/BaseService";
import TransactionService from "../../services/TransactionService";
import TransactionQuery from "../../types/TransactionQuery";
import TransactionViewModel from "../../types/TransactionViewModel";
import { AddTransactionIcon, FilterRemoveIcon } from "../../utils/Icons";
import TransactionFilters from "./TransactionFilters";
import TransactionForm from "./TransactionForm";

const defaultFilters = {
    orderBy: "date",
    order: "desc",
};

function TransactionsPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { refreshed, refresh } = useRefresh();
    const [searchParams] = useSearchParams();
    const filterValues = useFormValues<TransactionQuery>(defaultFilters);

    useEffect(() => {
        const searchCategory = Number(searchParams.get("category")) || undefined;
        if (searchCategory) {
            filterValues.setValues({
                ...filterValues.values,
                categoryId: searchCategory,
            });
        }
    }, []);

    const formValues = useFormValues<TransactionViewModel>({});

    console.log(filterValues.values, defaultFilters)

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>Transactions</h1>
                <div className="flex">
                    {filterValues.values !== defaultFilters && (
                        <IconButton
                            icon={FilterRemoveIcon}
                            title="Reset filters"
                            onClick={() =>
                                filterValues.setValues(defaultFilters)
                            }
                        />
                    )}
                    <IconButton
                        icon={AddTransactionIcon}
                        title="Add a cash transaction"
                        onClick={newCashTransaction}
                    />
                </div>
            </Row>

            <TransactionFilters formValues={filterValues} />

            <TransactionTable
                query={filterValues.values}
                onRowSelect={editTransaction}
                refreshed={refreshed}
                onChange={refresh}
                showLoading={true}
            />

            <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                <TransactionForm
                    formValues={formValues}
                    onSubmit={submitTransaction}
                    onCancel={() => setIsDrawerOpen(false)}
                    onDelete={deleteTransaction}
                />
            </Drawer>
        </Page>
    );

    function newCashTransaction() {
        formValues.setValues({
            isCashTransaction: true,
        });
        setIsDrawerOpen(true);
    }

    function editTransaction(transaction: TransactionViewModel) {
        formValues.setValues(transaction);
        setIsDrawerOpen(true);
    }

    function submitTransaction(event: SyntheticEvent) {
        event.preventDefault();

        // cast values
        const model: TransactionViewModel = {
            ...formValues.values,
            amount:
                Math.floor(
                    Number(formValues.values?.amount?.toString() ?? NaN) * 100
                ) ?? undefined,
        };

        (formValues.values.id
            ? TransactionService.patchTransaction(model)
            : TransactionService.createTransaction(model)
        )
            .then(() => {
                if (event.target instanceof HTMLButtonElement)
                    event.target.blur();
                refresh();
                setIsDrawerOpen(false);
                formValues.setErrors(undefined);
            })
            .catch((error: AxiosError<ErrorResponse>) => {
                formValues.setErrors(error.response?.data);
            });
    }

    async function deleteTransaction() {
        if (!formValues.values.id) return;
        await TransactionService.deleteTransaction(formValues.values.id);
        refresh();
        setIsDrawerOpen(false);
    }
}

export default TransactionsPage;
