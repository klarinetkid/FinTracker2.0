import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import Row from "../../components/Row";
import TransactionTable from "../../components/TransactionTable";
import useRefresh from "../../hooks/useRefresh";
import TransactionService from "../../services/TransactionService";
import Transaction from "../../types/Transaction";
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
    const [filterQuery, setFilterQuery] =
        useState<TransactionQuery>(defaultFilters);
    const [editingValues, setEditingValues] = useState<TransactionViewModel>();

    useEffect(() => {
        const searchCategory =
            Number(searchParams.get("category")) || undefined;
        if (searchCategory) {
            setFilterQuery({
                ...filterQuery,
                categoryId: searchCategory,
            });
        }
    }, []);

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>Transactions</h1>
                <div className="flex">
                    {filterQuery !== defaultFilters && (
                        <IconButton
                            icon={FilterRemoveIcon}
                            title="Reset filters"
                            onClick={() => setFilterQuery(defaultFilters)}
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
                    onDelete={deleteTransaction}
                    values={editingValues}
                />
            </Drawer>
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
            refresh();
            setIsDrawerOpen(false);
        });
    }

    async function deleteTransaction() {
        if (!editingValues?.id) return;
        await TransactionService.deleteTransaction(editingValues.id);
        refresh();
        setIsDrawerOpen(false);
    }
}

export default TransactionsPage;
