import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/import.css";
import ImportTable from "./ImportTable";
import useTransactionImport from "../../hooks/useTransactionImport";
import Pages from "../../types/Pages";

function ImportPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const transactionImport = useTransactionImport();

    const locationStateIsValidForImport =
        location.state?.selectedFormat && location.state?.filesContent;

    const [isLoading, setIsLoading] = useState(false);
    //const [pageState, setPageState] = useState<
    //    "loading" | "editing" | "complete" | "invalid"
    //>(locationStateIsValidForImport ? "loading" : "invalid");

    const pageState =
        location.state?.insertedRows !== undefined
            ? "complete"
            : !locationStateIsValidForImport
              ? "invalid"
              : isLoading
                ? "loading"
                : "editing";

    useEffect(() => {
        if (locationStateIsValidForImport) {
            setIsLoading(true);
            transactionImport
                .PrepareImport(
                    location.state?.selectedFormat,
                    location.state?.filesContent
                )
                .then(() => setIsLoading(false));
        }
    }, [location.state]);

    const numSelected = transactionImport.Transcations.filter(
        (t) => t.selectedForImport
    ).length;

    return (
        <div className="page" style={{ width: 900 }}>
            <div className="page-header">
                <h1>Import Transactions</h1>
                <div>
                    {pageState === "editing" ? (
                        <>
                            <button className="button" onClick={cancelImport}>
                                Cancel
                            </button>
                            <button
                                className="button-fill"
                                onClick={submitImport}
                                disabled={numSelected === 0}
                            >
                                Submit
                            </button>
                        </>
                    ) : (
                        ""
                    )}
                    {/*<IconButton*/}
                    {/*    icon={ThreeDBoxIcon}*/}
                    {/*    onClick={() => window.open(Pages.Categories)}*/}
                    {/*/>*/}
                </div>
            </div>

            {pageState === "complete" ? (
                <div className="centre">
                    Successfully added {location.state.insertedRows}{" "}
                    transactions.
                </div>
            ) : pageState === "invalid" ? (
                <h4 className="centre">
                    Access the menu screen to import transactions.
                </h4>
            ) : pageState === "loading" ? (
                <div>loading...</div>
            ) : (
                <ImportTable transactions={transactionImport.Transcations} />
            )}
        </div>
    );

    function cancelImport() {
        navigate(Pages.Dashboard);
    }

    function submitImport() {
        setIsLoading(true);

        transactionImport.Submit().then((result: number) => {
            //setInsertedRows(result);
            //setPageState("complete");
            navigate(Pages.Import, { state: { insertedRows: result } });
        });
    }
}

export default ImportPage;
