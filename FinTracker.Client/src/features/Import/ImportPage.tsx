import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/import.css";
import ImportTable from "./ImportTable";
import useTransactionImport from "../../hooks/useTransactionImport";

function ImportPage() {
    const location = useLocation();

    const transactionImport = useTransactionImport();

    useEffect(() => {
        transactionImport.PrepareImport(
            location.state?.selectedFormat,
            location.state?.filesContent
        );
    }, [location.state]);

    return (
        <div className="page" style={{ width: 900 }}>
            <div className="page-header">
                <h1>Import Transactions</h1>
                <div>
                    <button className="button">Cancel</button>
                    <button className="button-fill">Submit</button>
                    {/*<IconButton*/}
                    {/*    icon={ThreeDBoxIcon}*/}
                    {/*    onClick={() => window.open(Pages.Categories)}*/}
                    {/*/>*/}
                </div>
            </div>

            {!location.state.selectedFormat || !location.state.filesContent ? (
                <h4 className="centre">
                    Access the menu screen to import transactions.
                </h4>
            ) : (
                <ImportTable transactions={transactionImport.Transcations} />
            )}
        </div>
    );
}

export default ImportPage;
