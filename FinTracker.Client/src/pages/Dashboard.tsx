import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ArrowLeft from '../assets/arrow-left-square.svg?react'
import ArrowRight from '../assets/arrow-right-square.svg?react'
import DashboardIncrementButton from '../components/DashboardIncrementButton'
import InOutPills from '../components/InOutPills'
import MonthSummaryCard from '../components/MonthSummaryCard'
import Spacer from '../components/Spacer'
import useGlobalDataCache from '../hooks/useGlobalDataCache'
import BreakdownService from '../services/BreakdownService'
import '../styles/Dashboard.css'
import Breakdown from '../types/Breakdown'
import { getTotalIn, getTotalOut } from '../utils/BreakdownHelper'

function Dashboard() {

    const [searchParams] = useSearchParams()

    const defaultYear = parseInt(searchParams.get("year") ?? "") || undefined

    const [breakdowns, setBreakdowns] = useState<Breakdown[]>()
    const [year, setYear] = useState(defaultYear)

    const globalDataCache = useGlobalDataCache()

    const navigate = useNavigate()

    // set year from cache if none provided
    useEffect(() => {
        if (!year && globalDataCache.availableYears.value.length > 0)
            setYear(globalDataCache.availableYears.value[0])
    }, [globalDataCache.availableYears.value, year])

    // load breakdowns
    useEffect(() => {
        if (!year) return
        navigate("?year=" + year);
        BreakdownService.getYearSummaries(year).then(setBreakdowns)
    }, [year, navigate])


    return (
        <div className="dashboard-container">

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

            {!breakdowns ? "" : <>
                <InOutPills totalIn={getTotalIn(breakdowns)} totalOut={getTotalOut(breakdowns)} />

                <Spacer height={26} />

                {breakdowns.filter(b => b.categoryTotals.length > 0).map((b, i) =>
                    <MonthSummaryCard key={i} breakdown={b} />
                )}
            </>}
        </div>
    )
}

export default Dashboard
