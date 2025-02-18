import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowLeft from "../../assets/arrow-left-square.svg?react";
import ArrowRight from "../../assets/arrow-right-square.svg?react";
import InOutPills from "../../components/InOutPills";
import Spacer from "../../components/Spacer";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import BreakdownService from "../../services/BreakdownService";
import "../../styles/Dashboard.css";
import Breakdown from "../../types/Breakdown";
import { getTotalIn, getTotalOut } from "../../utils/BreakdownHelper";
import DashboardIncrementButton from "./DashboardIncrementButton";
import MonthSummaryCard from "./MonthSummaryCard";

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
        <div className="page" style={{ width: 800 }}>
            <div className="dashboard-header">
                <DashboardIncrementButton
                    button={ArrowLeft}
                    increment={-1}
                    currentYear={year}
                    setCurrentYear={setYear}
                />

                <h1>Dashboard {year}</h1>

                <DashboardIncrementButton
                    button={ArrowRight}
                    increment={1}
                    currentYear={year}
                    setCurrentYear={setYear}
                />
            </div>

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
        </div>
    );
}

export default DashboardPage;
