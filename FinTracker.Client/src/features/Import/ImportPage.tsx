import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import Page from "../../components/Page";
import Row from "../../components/Row";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import useTransactionImport from "../../hooks/useTransactionImport";
import Pages from "../../types/Pages";
import ImportTable from "./ImportTable";

function ImportPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const transactionImport = useTransactionImport();
    const globalDataCache = useGlobalDataCache();

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
        (t) => t.isSelectedForImport
    ).length;

    return (
        <Page width={900}>
            <Row justifyContent="space-between">
                <h1>Import Transactions</h1>
                <div>
                    {pageState === "editing" ? (
                        <>
                            <Button type="button" onClick={cancelImport}>
                                Cancel
                            </Button>
                            <ButtonFill
                                type="button"
                                onClick={submitImport}
                                disabled={numSelected === 0}
                            >
                                Submit
                            </ButtonFill>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </Row>

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
        </Page>
    );

    function cancelImport() {
        navigate(Pages.Dashboard);
    }

    function submitImport() {
        setIsLoading(true);

        transactionImport.Submit().then((result: number) => {
            globalDataCache.availableYears.refresh();
            navigate(Pages.Import, { state: { insertedRows: result } });
        });
    }
}

export default ImportPage;
