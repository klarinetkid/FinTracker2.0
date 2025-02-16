type ImportFileFormat = {
    id: number;
    importFileFormatName: string;
    dateKey: string;
    memoFormat: string;
    amountKey: string;
    invertAmounts: boolean;
    headerLines: number;
    delimiter: string;
    image?: string;
};

export default ImportFileFormat;
