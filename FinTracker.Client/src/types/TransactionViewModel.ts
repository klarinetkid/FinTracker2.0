import { CategoryOrUncategorized } from "./Category";
import Memo from "./Memo";

type TransactionViewModel = {
    id?: number;
    date?: string;
    amount?: number | string;
    memo?: string;
    categoryId?: number;
    category?: CategoryOrUncategorized;
    isCashTransaction?: boolean;

    // for import, from server
    isAlreadyImported?: boolean;
    savedMemo?: Memo;

    // for client
    isToSaveMemo?: boolean;
    isSelectedForImport?: boolean;
};

export default TransactionViewModel;
