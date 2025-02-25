import { AxiosError } from "axios";
import { SyntheticEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ButtonFill from "../../components/ButtonFill";
import Drawer from "../../components/Drawer";
import Page from "../../components/Page";
import Row from "../../components/Row";
import TransactionTable from "../../components/TransactionTable";
import { useFormValues } from "../../hooks/useFormValues";
import { ErrorResponse } from "../../services/BaseService";
import TransactionService from "../../services/TransactionService";
import TransactionQuery from "../../types/TransactionQuery";
import TransactionViewModel from "../../types/TransactionViewModel";
import TransactionFilters from "./TransactionFilters";
import TransactionForm from "./TransactionForm";

function TransactionsPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRefreshed, setIsRefreshed] = useState(false);
    const [searchParams] = useSearchParams();

    const filterValues = useFormValues<TransactionQuery>({
        categoryId: Number(searchParams.get("category")) || undefined,
        orderBy: "date",
        order: "desc",
    });
    const formValues = useFormValues<TransactionViewModel>({});

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>Transactions</h1>
                <ButtonFill onClick={newCashTransaction}>
                    Add a Cash Transaction
                </ButtonFill>
            </Row>

            <TransactionFilters formValues={filterValues} />

            <TransactionTable
                query={filterValues.values}
                onRowSelect={editTransaction}
                refresh={isRefreshed}
                onChange={onTransactionChange}
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

    function onTransactionChange() {
        setIsRefreshed(!isRefreshed);
    }

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
                setIsRefreshed(!isRefreshed);
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
        setIsRefreshed(!isRefreshed);
        setIsDrawerOpen(false);
    }
}

export default TransactionsPage;
