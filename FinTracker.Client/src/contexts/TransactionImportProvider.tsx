import { useState } from "react";
import TransactionViewModel from "../types/models/TransactionViewModel";
import {
    TransactionImportContext,
    TransactionImportManager,
} from "./TransactionImportContext";

export default function TransactionImportProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [transactions, setTransactions] = useState<TransactionViewModel[]>(
        []
    );

    return (
        <TransactionImportContext.Provider
            value={new TransactionImportManager(transactions, setTransactions)}
        >
            {children}
        </TransactionImportContext.Provider>
    );
}
