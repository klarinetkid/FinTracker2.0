import Category from "./Category";
import Memo from "./Memo";

type TransactionViewModel = {
    id?: number;
    date?: string;
    amount?: number;
    memo?: string;
    categoryId?: number;
    category?: Category;
    isCashTransaction?: boolean;

    // for import, from server
    isAlreadyImported?: boolean;
    savedMemo?: Memo;

    // for client
    isToSaveMemo?: boolean;
    isSelectedForImport?: boolean;

    //isToSaveMemoCategory?: boolean;
    //isToSaveMemoNotImported?: boolean;
};

export default TransactionViewModel;
