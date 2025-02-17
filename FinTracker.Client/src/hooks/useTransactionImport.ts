import { useContext } from "react";
import { TransactionImportContext } from "../contexts/TransactionImportContext";

export default function useTransactionImport() {
    return useContext(TransactionImportContext);
}
