import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InOutPills from "../../components/InOutPills";
import Row from "../../components/Row";
import Select from "../../components/Select";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BreakdownService from "../../services/BreakdownService";
import Breakdown from "../../types/Breakdown";
import { getTotalIn, getTotalOut } from "../../utils/BreakdownHelper";
import { ArrowLeftSquareIcon, ArrowRightSquareIcon } from "../../utils/Icons";
import BreakdownTable from "./BreakdownTable";
import DashboardIncrementButton from "./DashboardIncrementButton";
import Page from "../../components/Page";

function DashboardPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const globalDataCache = useGlobalDataCache();
    const [isLoading, setIsLoading] = useState(true);
    const [breakdowns, setBreakdowns] = useState<Breakdown[]>();

    const year = useMemo(
        () =>
            parseInt(searchParams.get("year") ?? "") ||
            globalDataCache.availableYears.value[0] ||
            undefined,
        [searchParams.get("year"), globalDataCache.availableYears.value]
    );

    const viewType = useMemo(
        () => searchParams.get("view") ?? "monthly",
        [searchParams.get("view")]
    );

    // load breakdowns
    useEffect(() => {
        setIsLoading(true);
        getData().then((results) => {
            setBreakdowns(results);
            setIsLoading(false);
        });
    }, [year, viewType]);

    const breakdownsAreEmpty =
        !breakdowns ||
        breakdowns.filter((b) => b.totalIn !== 0 || b.totalOut !== 0).length ===
            0;

    return (
        <>
            <div style={{ float: "left" }}>
                {!breakdownsAreEmpty ? (
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
                <Row
                    justifyContent="center"
                    gap={32}
                    style={{ userSelect: "none" }}
                >
                    {viewType !== "yearly" ? (
                        <DashboardIncrementButton
                            title="Previous year"
                            icon={ArrowLeftSquareIcon}
                            increment={-1}
                            currentYear={year}
                        />
                    ) : (
                        ""
                    )}

                    <h1 style={{ color: isLoading ? "grey" : undefined }}>
                        {viewType === "yearly"
                            ? "All Years"
                            : `Dashboard ${year ?? ""}`}
                    </h1>

                    {viewType !== "yearly" ? (
                        <DashboardIncrementButton
                            title="Next year"
                            icon={ArrowRightSquareIcon}
                            increment={1}
                            currentYear={year}
                        />
                    ) : (
                        ""
                    )}
                </Row>

                {!breakdownsAreEmpty ? (
                    <>
                        <Row justifyContent="center">
                            <InOutPills
                                totalIn={getTotalIn(breakdowns)}
                                totalOut={getTotalOut(breakdowns)}
                            />
                        </Row>

                        <Spacer height={34} />

                        <BreakdownTable
                            breakowns={breakdowns}
                            dateFormat={getBreakdownTitleFormat()}
                            bandValueProperty={
                                viewType === "weekly"
                                    ? "percentOfYearlySpend"
                                    : "percentOfIncome"
                            }
                        />
                    </>
                ) : (
                    <h4 className="centre">No data to show</h4>
                )}
            </Page>
        </>
    );

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

    function getBreakdownTitleFormat() {
        switch (viewType) {
            case "monthly":
                return "MMMM";
            case "yearly":
                return "yyyy";
            case "weekly":
                return "[Week] W";
        }
        return "";
    }

    function setViewType(viewType: string) {
        searchParams.set("view", viewType);
        setSearchParams(searchParams);
    }
}

export default DashboardPage;
