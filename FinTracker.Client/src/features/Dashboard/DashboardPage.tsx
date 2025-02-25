import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import Page from "../../components/Page";
import Select from "../../components/Select";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BreakdownService from "../../services/BreakdownService";
import Breakdown from "../../types/Breakdown";
import DashboardDataView from "./DashboardDataView";
import DashboardPageHeader from "./DashboardPageHeader";
import { breakdownsContainAnyData } from "../../utils/BreakdownHelper";

export type DashboardPageState =
    | "loading"
    | "show data"
    | "no data"
    | "show help";

function DashboardPage() {
    const [pageState, setPageState] = useState<DashboardPageState>("loading");
    const [searchParams, setSearchParams] = useSearchParams();
    const globalDataCache = useGlobalDataCache();
    const [breakdowns, setBreakdowns] = useState<Breakdown[]>();

    const year = useMemo(
        () =>
            parseInt(searchParams.get("year") ?? "") ||
            globalDataCache.availableYears.value?.[0] ||
            undefined,
        [searchParams.get("year"), globalDataCache.availableYears.value]
    );

    const viewType = useMemo(
        () => searchParams.get("view") ?? "monthly",
        [searchParams.get("view")]
    );

    // load breakdowns
    useEffect(() => {
        setBreakdowns(undefined);
        getData().then((results) => {
            if (results && globalDataCache.userHasTransactions()) {
                if (!breakdownsContainAnyData(results)) {
                    setPageState("no data");
                } else {
                    setBreakdowns(results);
                    setPageState("show data");
                }
            }
        });
    }, [year, viewType]);

    // show help message if no data
    useEffect(() => {
        if (!globalDataCache.userHasTransactions()) {
            setPageState("show help");
        }
    }, [globalDataCache.availableYears.value]);

    return (
        <>
            <div style={{ float: "left" }}>
                {pageState === "show data" ? (
                    <Select
                        value={viewType}
                        onChange={(e) => setViewType(e.target.value)}
                    >
                        <option value="monthly">Months</option>
                        <option value="weekly">Weeks</option>
                        <option value="yearly">Years</option>
                    </Select>
                ) : (
                    ""
                )}
            </div>
            <Page>
                <DashboardPageHeader year={year} viewType={viewType} />

                {getPageBody()}
            </Page>
        </>
    );

    function getPageBody(): JSX.Element {
        switch (pageState) {
            case "loading":
                return <LoadingIndicator />;
            case "no data":
                return <h4 className="centre">No data to show</h4>;
            case "show help":
                return <p>you have no data show more helpful message</p>;
            case "show data":
                return (
                    <DashboardDataView
                        breakdowns={breakdowns ?? []}
                        viewType={viewType}
                    />
                );
        }
    }

    async function getData(): Promise<Breakdown[] | undefined> {
        switch (viewType) {
            case "monthly":
                if (!year) return undefined;
                return BreakdownService.getMonthlyBreakdownsForYear(year);
            case "yearly":
                return BreakdownService.getYearBreakdowns();
            case "weekly":
                if (!year) return undefined;
                return BreakdownService.getWeeklyBreakdownsForYear(year);
        }
    }

    function setViewType(viewType: string) {
        searchParams.set("view", viewType);
        setSearchParams(searchParams);
    }
}

export default DashboardPage;
