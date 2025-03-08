type ImportFormatViewModel = {
    id?: number;
    importFormatName?: string;
    dateKey?: string;
    memoKeys?: string;
    amountKey?: string;
    invertAmounts?: boolean | string;
    headerLines?: number | string;
    delimiter?: string;
    image?: string;
};

export default ImportFormatViewModel;
