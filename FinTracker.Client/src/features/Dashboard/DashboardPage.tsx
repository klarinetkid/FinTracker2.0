import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowLeft from "../../assets/arrow-left-square.svg?react";
import ArrowRight from "../../assets/arrow-right-square.svg?react";
import InOutPills from "../../components/InOutPills";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BreakdownService from "../../services/BreakdownService";
import Breakdown from "../../types/Breakdown";
import { getTotalIn, getTotalOut } from "../../utils/BreakdownHelper";
import DashboardIncrementButton from "./DashboardIncrementButton";
import MonthSummaryCard from "./MonthSummaryCard";
import Page from "../../components/Page";
import Row from "../../components/Row";

function DashboardPage() {
    const [searchParams] = useSearchParams();
    const globalDataCache = useGlobalDataCache();

    const defaultYear = useMemo(
        () =>
            parseInt(searchParams.get("year") ?? "") ||
            globalDataCache.availableYears.value[0] ||
            undefined,
        [searchParams, globalDataCache.availableYears.value]
    );

    const [breakdowns, setBreakdowns] = useState<Breakdown[]>();
    const [year, setYear] = useState(defaultYear);

    const navigate = useNavigate();

    // set year from cache if none provided
    useEffect(() => {
        if (defaultYear && defaultYear !== year) setYear(defaultYear);
    }, [defaultYear]);

    // load breakdowns
    useEffect(() => {
        if (!year) return;
        navigate("?year=" + year);
        BreakdownService.getYearSummaries(year).then(setBreakdowns);
    }, [year]);

    return (
        <Page width={800}>
            <Row justifyContent="space-around">
                <DashboardIncrementButton
                    title="Previous year"
                    icon={ArrowLeft}
                    increment={-1}
                    currentYear={year}
                    setCurrentYear={setYear}
                />

                <h1>Dashboard {year}</h1>

                <DashboardIncrementButton
                    title="Next year"
                    icon={ArrowRight}
                    increment={1}
                    currentYear={year}
                    setCurrentYear={setYear}
                />
            </Row>

            {!breakdowns ? (
                ""
            ) : (
                <>
                    <InOutPills
                        totalIn={getTotalIn(breakdowns)}
                        totalOut={getTotalOut(breakdowns)}
                    />

                    <Spacer height={26} />

                    {breakdowns
                        .filter((b) => b.categoryTotals.length > 0)
                        .map((b, i) => (
                            <MonthSummaryCard key={i} breakdown={b} />
                        ))}
                </>
            )}
        </Page>
    );
}

export default DashboardPage;
