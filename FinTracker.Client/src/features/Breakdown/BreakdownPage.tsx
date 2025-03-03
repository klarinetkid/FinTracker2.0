import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import IconButton from "../../components/IconButton";
import Page from "../../components/Page";
import StatusIndicator from "../../components/StatusIndicator";
import useRefresh from "../../hooks/useRefresh";
import BreakdownService from "../../services/BreakdownService";
import styles from "../../styles/BreakdownPage.module.css";
import Breakdown from "../../types/Breakdown";
import { breakdownParamsAreValid } from "../../utils/BreakdownHelper";
import { BackIcon } from "../../utils/Icons";
import BreakdownDataView from "./BreakdownDataView";

// states: loading, view, no data, invalid
type BreakdownPageState =
    | "loading"
    | "show data"
    | "no data"
    | "invalid"
    | "error";

function BreakdownPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [pageState, setPageState] = useState<BreakdownPageState>("loading");
    const [breakdown, setBreakdown] = useState<Breakdown>();
    const { refreshed, refresh } = useRefresh();

    const start = useMemo(
        () => searchParams.get("start") ?? "",
        [searchParams]
    );
    const end = useMemo(() => searchParams.get("end") ?? "", [searchParams]);

    useEffect(() => {
        if (!breakdownParamsAreValid(start, end)) {
            setPageState("invalid");
        } else {
            setPageState("loading");
            getData();
        }
    }, [start, end, refreshed]);

    return (
        <Page>
            <div className={styles.header}>
                <IconButton
                    title="Back to dashboard"
                    icon={BackIcon}
                    onClick={backClick}
                />
                <div>
                    <h1>{breakdown ? breakdown.title : ""}</h1>

                    <div className={styles.subtitle}>
                        {breakdown ? breakdown.subtitle : ""}
                    </div>
                </div>
            </div>

            {getPageBody()}
        </Page>
    );

    function getData() {
        BreakdownService.getBreakdown(start, end)
            .then((result) => {
                setBreakdown(result);
                setPageState(result.isEmpty ? "no data" : "show data");
            })
            .catch(() => {
                setPageState("error");
            });
    }

    function getPageBody(): JSX.Element {
        switch (pageState) {
            case "no data":
                return <StatusIndicator status="info" message="No data" />;

            case "error":
                return <StatusIndicator status="error" />;

            case "invalid":
                return (
                    <StatusIndicator status="error" message="Invalid query" />
                );

            case "loading":
            case "show data":
                return (
                    <>
                        {breakdown && (
                            <BreakdownDataView
                                breakdown={breakdown}
                                refresh={refresh}
                            />
                        )}

                        {pageState === "loading" && (
                            <StatusIndicator status="loading" />
                        )}
                    </>
                );
        }
    }

    function backClick() {
        const year = moment(breakdown?.start).get("year");
        switch (breakdown?.type) {
            case "Week":
                navigate(`/?year=${year}&view=weekly`);
                return;
            case "Month":
                navigate(`/?year=${year}`);
                return;
        }

        navigate("/");
    }
}

export default BreakdownPage;
