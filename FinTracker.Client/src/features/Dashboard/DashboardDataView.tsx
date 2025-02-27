import InOutPills from "../../components/InOutPills";
import Row from "../../components/Row";
import Spacer from "../../components/Spacer";
import BreakdownCollection from "../../types/BreakdownCollection";
import BreakdownTable from "./BreakdownTable";
import styles from "../../styles/DashboardDataView.module.css";

interface DashboardDataViewProps {
    breakdowns: BreakdownCollection;
    viewType: string;
}

function DashboardDataView({ breakdowns, viewType }: DashboardDataViewProps) {
    return (
        <>
            <Row justifyContent="space-between" className={styles.pillsRow}>
                <InOutPills
                    totalIn={breakdowns.totalIn}
                    totalOut={breakdowns.totalOut}
                />
            </Row>

            <Spacer height={34} />

            <BreakdownTable
                breakdowns={breakdowns}
                titleFormat={getBreakdownTitleFormat()}
                bandValueProperty={
                    viewType === "weekly"
                        ? "percentOfYearlySpend"
                        : "percentOfIncome"
                }
            />
        </>
    );

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
}

export default DashboardDataView;
