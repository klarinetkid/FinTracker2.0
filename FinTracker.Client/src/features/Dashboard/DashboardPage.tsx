import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Page from "../../components/Page";
import Select from "../../components/Select";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BreakdownService from "../../services/BreakdownService";
import BreakdownCollection from "../../types/BreakdownCollection";
import DashboardDataView from "./DashboardDataView";
import DashboardPageHeader from "./DashboardPageHeader";
import StatusIndicator from "../../components/StatusIndicator";
import styles from "../../styles/DashboardPage.module.css";

export type DashboardPageState =
    | "loading"
    | "show data"
    | "no data"
    | "error"
    | "invalid view";

const defaultViewType = "monthly";

function DashboardPage() {
    const [pageState, setPageState] = useState<DashboardPageState>("loading");
    const [searchParams, setSearchParams] = useSearchParams();
    const globalDataCache = useGlobalDataCache();
    const [breakdowns, setBreakdowns] = useState<BreakdownCollection>();
    const [loadedView, setLoadedView] = useState(defaultViewType);

    // use ref to get this value in callback
    const [lastReqTime, setLastReqTime] = useState<number>();
    const reqStateRef = useRef<number>();
    reqStateRef.current = lastReqTime;

    const year = useMemo(
        () =>
            Number(searchParams.get("year")) ||
            globalDataCache.availableYears.value?.[0],
        [searchParams.get("year"), globalDataCache.availableYears.value]
    );

    const viewType = useMemo(
        () => searchParams.get("view") ?? defaultViewType,
        [searchParams.get("view")]
    );

    // load breakdowns
    useEffect(() => {
        setPageState("loading");

        if (
            globalDataCache.availableYears.value !== undefined &&
            globalDataCache.availableYears.value.length === 0
        ) {
            setPageState("no data");
            return;
        }

        const reqTime = new Date().getTime();
        setLastReqTime(reqTime);
        getData()
            .then((result) => {
                if (!result || !isLastRequest(reqTime)) return;

                if (result.isEmpty) {
                    setPageState("no data");
                } else {
                    setLoadedView(viewType);
                    setBreakdowns(result);
                    setPageState("show data");
                }
            })
            .catch(() => {
                if (isLastRequest(reqTime)) {
                    setPageState("error");
                }
            });
    }, [year, viewType, globalDataCache.availableYears.value]);

    return (
        <>
            <div className={styles.viewSelectHolder}>
                <Select
                    value={viewType}
                    onChange={(e) => setViewType(e.target.value)}
                >
                    <option value="monthly">Months</option>
                    <option value="weekly">Weeks</option>
                    <option value="yearly">Years</option>
                </Select>
            </div>
            <Page>
                <DashboardPageHeader
                    year={year}
                    viewType={breakdowns ? loadedView : viewType}
                    pageState={pageState}
                />

                {getPageBody()}
            </Page>
        </>
    );

    function getPageBody(): JSX.Element {
        switch (pageState) {
            case "no data":
                return <StatusIndicator status="info" message="No data" />;

            case "error":
                return <StatusIndicator status="error" />;

            case "invalid view":
                return (
                    <StatusIndicator status="error" message="Invalid view" />
                );

            case "loading":
            case "show data":
                return (
                    <>
                        {breakdowns ? (
                            <DashboardDataView
                                breakdowns={breakdowns}
                                viewType={loadedView}
                            />
                        ) : (
                            ""
                        )}

                        {pageState === "loading" ? (
                            <StatusIndicator status="loading" />
                        ) : (
                            ""
                        )}
                    </>
                );
        }
    }

    async function getData(): Promise<BreakdownCollection | undefined> {
        switch (viewType) {
            case "monthly":
                if (!year) return undefined;
                return BreakdownService.getMonthlyBreakdownsForYear(year);
            case "yearly":
                return BreakdownService.getYearBreakdowns();
            case "weekly":
                if (!year) return undefined;
                return BreakdownService.getWeeklyBreakdownsForYear(year);
            default:
                setPageState("invalid view");
        }
    }

    function setViewType(viewType: string) {
        searchParams.set("view", viewType);
        setSearchParams(searchParams);
    }

    function isLastRequest(reqTime: number) {
        return reqStateRef.current === reqTime;
    }
}

export default DashboardPage;
