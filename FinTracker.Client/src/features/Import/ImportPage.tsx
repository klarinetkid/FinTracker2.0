import { useLocation } from "react-router-dom";
import { prepareImport } from "../../utils/ImportHelper";
import { useEffect, useMemo, useState } from "react";
import ImportFileFormat from "../../types/ImportFileFormat";
import { FileContent } from "use-file-picker/types";
import TransactionViewModel from "../../types/models/TransactionViewModel";
import ImportTable from "./ImportTable";
import TransactionService from "../../services/TransactionService";
import Pages from "../../types/Pages";
import ThreeDBoxIcon from "../../assets/3d_box_fill.svg?react";
import IconButton from "../../components/IconButton";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { GlobalDataCacheContext } from "../../contexts/GlobalDataCacheContext";

interface ImportStateProps {
    selectedFormat: ImportFileFormat;
    filesContent: FileContent<ArrayBuffer>[];
}

function ImportPage() {
    const location = useLocation();

    const [preparedTransactions, setPreparedTransactions] = useState<
        TransactionViewModel[]
    >([]);

    const locationStateIsValid = useMemo(
        () => location.state?.selectedFormat && location.state?.filesContent,
        [location]
    );

    useEffect(() => {
        if (locationStateIsValid) {
            setPreparedTransactions([]);

            const { selectedFormat, filesContent } =
                location.state as ImportStateProps;
            const transactions = prepareImport(selectedFormat, filesContent);

            TransactionService.prepareImport(transactions).then(
                setPreparedTransactions
            );
        }
    }, [locationStateIsValid]);

    return (
        <div className="page" style={{ width: 900 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Import Transactions</h1>
                <div>
                    <IconButton
                        icon={ThreeDBoxIcon}
                        onClick={() => window.open(Pages.Categories)}
                    />
                </div>
            </div>

            {!locationStateIsValid ? (
                <h4 className="centre">
                    Access the menu screen to import transactions.
                </h4>
            ) : (
                <ImportTable transactions={preparedTransactions} />
            )}
        </div>
    );
}

export default ImportPage;
