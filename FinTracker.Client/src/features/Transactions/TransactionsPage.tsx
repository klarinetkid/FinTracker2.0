import { useState } from "react";
import ButtonFill from "../../components/ButtonFill";
import Page from "../../components/Page";
import Row from "../../components/Row";
import TransactionTable from "../../components/TransactionTable";
import TransactionQuery from "../../types/TransactionQuery";
import TransactionFilters from "./TransactionFilters";
import Drawer from "../../components/Drawer";
import TransactionForm from "./TransactionForm";
import { useFormValues } from "../../hooks/useFormValues";
import TransactionViewModel from "../../types/TransactionViewModel";
import { useSearchParams } from "react-router-dom";

function TransactionsPage() {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
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
                shrink={true}
            />

            <Drawer isOpen={drawerIsOpen} setIsOpen={setDrawerIsOpen}>
                <TransactionForm
                    formValues={formValues}
                    onSubmit={submitTransaction}
                    onCancel={() => setDrawerIsOpen(false)}
                    onDelete={deleteTransaction}
                />
            </Drawer>
        </Page>
    );

    function newCashTransaction() {
        formValues.setValues({});
        setDrawerIsOpen(true);
    }

    function editTransaction(transaction: TransactionViewModel) {
        formValues.setValues(transaction);
        setDrawerIsOpen(true);
    }

    function submitTransaction() {
        return;
    }

    function deleteTransaction() {
        return;
    }
}

export default TransactionsPage;
