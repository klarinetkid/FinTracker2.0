import InOutPills from "../../components/InOutPills";
import Row from "../../components/Row";
import Spacer from "../../components/Spacer";
import Breakdown from "../../types/Breakdown";
import { getTotalIn, getTotalOut } from "../../utils/BreakdownHelper";
import BreakdownTable from "./BreakdownTable";

interface DashboardDataViewProps {
    breakdowns: Breakdown[];
    viewType: string;
}

function DashboardDataView({ breakdowns, viewType }: DashboardDataViewProps) {
    return (
        <>
            <Row
                justifyContent="space-between"
                style={{
                    width: "40%",
                    margin: "0 auto",
                }}
            >
                <InOutPills
                    totalIn={getTotalIn(breakdowns)}
                    totalOut={getTotalOut(breakdowns)}
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
