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
import BreakdownTable from "./BreakdownTable";

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

    // width 800
    return (
        <Page width={1100}>
            <Row justifyContent="center">
                <Row justifyContent="space-around" style={{ width: 700, userSelect: "none" }}>
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
            </Row>

            {breakdowns ? (
                <>
                    <Row justifyContent="center">
                        <InOutPills
                            totalIn={getTotalIn(breakdowns)}
                            totalOut={getTotalOut(breakdowns)}
                        />
                    </Row>

                    <Spacer height={34} />

                    <BreakdownTable breakowns={breakdowns} />
                </>
            ) : (
                ""
            )}
        </Page>
    );

    //<div
    //    style={{ backgroundColor: "#eeeeee", borderRadius: 12 }}
    //>
    //    {breakdowns
    //        .filter((b) => b.categoryTotals.length > 0)
    //        .map((b, i) => (
    //            <MonthSummaryCard key={i} breakdown={b} />
    //        ))}
    //</div>
}

export default DashboardPage;
