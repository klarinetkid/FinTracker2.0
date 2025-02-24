import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import LoadingIndicator from "../../components/LoadingIndicator";
import Page from "../../components/Page";
import Row from "../../components/Row";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import useTransactionImport from "../../hooks/useTransactionImport";
import styles from "../../styles/ImportPage.module.css";
import Pages from "../../types/Pages";
import ImportTable from "./ImportTable";

// import process is linear:
// loading -> editing -> submitting -> complete

type ImportFlowStep =
    | "loading" // initial processing and loading of data into form
    | "editing" // user is editing the data
    | "submitting" // data is being submitted & saved to the server
    | "complete" // data has been successfully saved
    | "error" // an unexpected error has occurred
    | "invalid"; // the initial parameters were invalid, can't proceed

function ImportPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const transactionImport = useTransactionImport();
    const globalDataCache = useGlobalDataCache();

    const [flowStep, setFlowStep] = useState<ImportFlowStep>("loading");

    useEffect(() => {
        // TODO more readable way to validate location state
        if (location.state?.selectedFormat && location.state?.filesContent) {
            setFlowStep("loading");
            transactionImport
                .PrepareImport(
                    location.state?.selectedFormat,
                    location.state?.filesContent
                )
                .then(() => setFlowStep("editing"))
                .catch(() => setFlowStep("error"));
        } else if (location.state?.insertedRows) {
            setFlowStep("complete");
        } else {
            setFlowStep("invalid");
        }
    }, [location.state]);

    const numSelected = transactionImport.Transcations.filter(
        (t) => t.isSelectedForImport
    ).length;

    return (
        <Page>
            <Row justifyContent="space-between">
                <h1>Import Transactions</h1>
                <div>
                    {flowStep === "editing" ? (
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

            {getPageBody()}
        </Page>
    );

    function getPageBody(): JSX.Element {
        switch (flowStep) {
            case "loading":
                return <LoadingIndicator message="Preparing" />;

            case "submitting":
                return <LoadingIndicator message="Submitting" />;

            case "error":
                return <div>An unexpected error has occurred.</div>;

            case "complete":
                return (
                    <h2 className={styles.complete}>
                        Successfully added{" "}
                        {location.state.insertedRows.toLocaleString()}{" "}
                        transactions.
                    </h2>
                );

            case "invalid":
                return (
                    <h4 className="centre">
                        Access the menu screen to import transactions.
                    </h4>
                );

            case "editing":
                return (
                    <ImportTable
                        transactions={transactionImport.Transcations}
                    />
                );
        }
    }

    function cancelImport() {
        navigate(Pages.Dashboard);
    }

    function submitImport() {
        setFlowStep("submitting");

        transactionImport
            .Submit()
            .then((result: number) => {
                setTimeout(() => {
                    globalDataCache.availableYears.refresh();
                    navigate(Pages.Import, {
                        state: { insertedRows: result },
                        replace: true,
                    });
                }, 1800);
            })
            .catch(() => {
                setFlowStep("error");
            });
    }
}

export default ImportPage;
