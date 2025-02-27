import { useEffect, useState } from "react";
import { useBlocker, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import Page from "../../components/Page";
import Row from "../../components/Row";
import StatusIndicator from "../../components/StatusIndicator";
import {
    ImportParams,
    ImportResult,
} from "../../contexts/TransactionImportContext";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import useTransactionImport from "../../hooks/useTransactionImport";
import Pages from "../../types/Pages";
import { pluralize } from "../../utils/StringHelper";
import ImportTable from "./ImportTable";
import { minimumTime } from "../../utils/PromiseHelper";

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

    //useBlocker(flowStep === "editing" || flowStep === "submitting");

    // TODO more readable way to validate location state
    const { importParams, importResult } = location.state ?? {};

    useEffect(() => {
        if (importParams) {
            setFlowStep("loading");

            const params = importParams as ImportParams;
            minimumTime(1200, () => transactionImport.PrepareImport(params))
                .then(() => setFlowStep("editing"))
                .catch(() => setFlowStep("error"));

        } else if (importResult) {
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
                return <StatusIndicator status="loading" message="Preparing" />;

            case "submitting":
                return (
                    <StatusIndicator status="loading" message="Submitting" />
                );

            case "error":
                return <StatusIndicator status="error" />;

            case "editing":
                return <ImportTable />;

            case "complete":
                return (
                    <StatusIndicator
                        status="success"
                        message={getSuccessMessage()}
                    />
                );

            case "invalid":
                return (
                    <StatusIndicator
                        status="info"
                        message="Access the menu to select a file to import."
                    />
                );
        }
    }

    function cancelImport() {
        navigate(Pages.Dashboard);
    }

    function submitImport() {
        setFlowStep("submitting");

        minimumTime(2200, () => transactionImport.Submit())
            .then((result: ImportResult | undefined) => {
                globalDataCache.availableYears.refresh();
                navigate(Pages.Import, {
                    state: { importResult: result },
                    replace: true,
                });
            })
            .catch(() => {
                setFlowStep("error");
            });
    }

    function getSuccessMessage(): string | undefined {
        if (!importResult) return;
        const result = importResult as ImportResult;
        const numTrxs = result.transactionsInserted.toLocaleString();
        const numMemos = result.memosInserted.toLocaleString();
        return (
            `Successfully added ${numTrxs} transaction` +
            pluralize(result.transactionsInserted) +
            (result.memosInserted > 0
                ? ` and saved ${numMemos} memo` +
                  pluralize(result.memosInserted)
                : "") +
            "."
        );
    }
}

export default ImportPage;
