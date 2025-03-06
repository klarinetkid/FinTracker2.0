import { useState } from "react";
import TransactionViewModel from "../types/TransactionViewModel";
import {
    TransactionImportContext,
    TransactionImportManager,
} from "./TransactionImportContext";

export default function TransactionImportProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [trxs, setTrxs] = useState<TransactionViewModel[]>([]);
    const [isDirty, setIsDirty] = useState(false);

    return (
        <TransactionImportContext.Provider
            value={
                new TransactionImportManager(trxs, setTrxs, isDirty, setIsDirty)
            }
        >
            {children}
        </TransactionImportContext.Provider>
    );
}
