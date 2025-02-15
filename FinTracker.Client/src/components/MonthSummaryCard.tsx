
import moment from 'moment'
import { createSearchParams, useNavigate } from 'react-router-dom'
import '../styles/MonthSummaryCard.css'
import Breakdown from '../types/Breakdown.js'
import Pages from '../types/Pages.js'
import { addToColour } from '../utils/ColourHelper.js'
import { dateOnly } from '../utils/DateHelper.js'
import { formatCurrency, toFixed } from '../utils/NumberHelper.js'
import InOutPills from './InOutPills.js'

interface DashboardMonthSummaryProps {
    breakdown: Breakdown
}

function MonthSummaryCard(props: DashboardMonthSummaryProps) {

    const navigate = useNavigate()

    // filtered and sorted
    const categoryBands = props.breakdown.categoryTotals
        .filter(c => c.category != null && c.total < 0)
        .sort((a, b) => a.total - b.total)


    return (
        <div className="row dashboard-month-row" onClick={openBreakdown}>
            <div className="dashboard-month-row-header">
                <h4>{moment(props.breakdown.start).format("MMMM")}</h4>

                <InOutPills totalIn={props.breakdown.totalIn} totalOut={props.breakdown.totalOut} />
            </div>

            <div className="band-holder">
                {categoryBands.map(categoryTotal => 
                    !categoryTotal.category ? "" : <div key={categoryTotal.category.id}
                        className="band"
                        style={{
                            width: Math.abs(categoryTotal.percentOfIncome) + "%",
                            background: `linear-gradient(#${categoryTotal.category.colour}, #${addToColour(categoryTotal.category.colour, 0x60)})`
                        }}>
                        
                        <div className="band-tooltip">
                            {categoryTotal.category.categoryName}: {formatCurrency(categoryTotal.total, true)} ({toFixed(Math.abs(categoryTotal.percentOfIncome), 1)}%)
                        </div>
                    </div>
                )}
            </div>
        </div>
    )

    function openBreakdown() {
        navigate({
            pathname: Pages.Breakdown,
            search: createSearchParams({
                start: dateOnly(props.breakdown.start),
                end: dateOnly(props.breakdown.end)
            }).toString()
        })
    }
}

export default MonthSummaryCard;