import { useCallback, useEffect, useState } from "react";
import { useBlocker, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import Page from "../../components/Page";
import Row from "../../components/Row";
import StatusIndicator from "../../components/StatusIndicator";
import {
    ImportParams,
    ImportResult,
} from "../../contexts/TransactionImportContext";
import useConfirmLeave from "../../hooks/useConfirmLeave";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import useTransactionImport from "../../hooks/useTransactionImport";
import Pages from "../../types/Pages";
import { minimumTime } from "../../utils/PromiseHelper";
import { pluralize } from "../../utils/StringHelper";
import ImportTable from "./ImportTable";

type ImportFlowStep =
    | "loading" // initial processing and loading of data into form
    | "editing" // user is editing the data
    | "submitting" // data is being submitted & saved to the server
    | "complete" // data has been successfully saved
    | "error" // an unexpected error has occurred
    | "invalid" // the initial parameters were invalid, can't proceed
    | "no rows"; // the files uploaded produced no results for the selected format

function ImportPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const transactionImport = useTransactionImport();
    const globalDataCache = useGlobalDataCache();

    const { importParams, importResult } = location.state ?? {};
    const [flowStep, setFlowStep] = useState<ImportFlowStep>(
        importResult ? "complete" : "loading"
    );

    const shouldBlockNav = useCallback(
        () =>
            transactionImport.IsDirty &&
            (flowStep === "editing" || flowStep === "submitting"),
        [flowStep, transactionImport.IsDirty]
    );
    useConfirmLeave(shouldBlockNav);
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            shouldBlockNav() &&
            currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        if (importParams) {
            setFlowStep("loading");

            const params = importParams as ImportParams;
            minimumTime(1200, () => transactionImport.PrepareImport(params))
                .then((numRows: number) => {
                    if (numRows > 0) {
                        setFlowStep("editing");
                    } else {
                        setFlowStep("no rows");
                    }
                })
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
                    {flowStep === "editing" && (
                        <>
                            <Button
                                type="button"
                                onClick={() => navigate(Pages.Dashboard)}
                            >
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
                    )}
                </div>
            </Row>

            {getPageBody()}

            {blocker.state === "blocked" && (
                <ConfirmationPopup
                    title="Are you sure you want to leave?"
                    body="Unsaved changes will be discarded."
                    onCancel={() => blocker.reset()}
                    onConfirm={() => {
                        blocker.proceed();
                        blocker.reset();
                    }}
                />
            )}
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

            case "no rows":
                return (
                    <StatusIndicator
                        status="info"
                        message="No valid rows were produced from the selected file(s) and import format."
                    />
                );
        }
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
