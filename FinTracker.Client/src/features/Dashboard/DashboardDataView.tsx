import InOutPills from "../../components/InOutPills";
import Row from "../../components/Row";
import Spacer from "../../components/Spacer";
import BreakdownCollection from "../../types/BreakdownCollection";
import BreakdownTable from "./BreakdownTable";
import styles from "../../styles/DashboardDataView.module.css";

interface DashboardDataViewProps {
    breakdowns: BreakdownCollection;
}

function DashboardDataView({ breakdowns }: DashboardDataViewProps) {
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
                    breakdowns.type === "Weekly"
                        ? "percentOfYearlySpend"
                        : "percentOfIncome"
                }
            />
        </>
    );

    function getBreakdownTitleFormat() {
        switch (breakdowns.type) {
            case "Monthly":
                return "MMMM";
            case "Yearly":
                return "yyyy";
            case "Weekly":
                return "[Week] W";
        }
        return "";
    }
}

export default DashboardDataView;
