import Row from "../../components/Row";
import { ArrowLeftSquareIcon, ArrowRightSquareIcon } from "../../utils/Icons";
import DashboardIncrementButton from "./DashboardIncrementButton";

interface DashboardPageHeaderProps {
    year: number | undefined;
    viewType: string;
}

function DashboardPageHeader({ year, viewType }: DashboardPageHeaderProps) {
    const title =
        viewType === "yearly" ? "All Years" : `Dashboard ${year ?? ""}`;
    return (
        <Row justifyContent="center" gap={32} style={{ userSelect: "none" }}>
            <DashboardIncrementButton
                title="Previous year"
                icon={ArrowLeftSquareIcon}
                increment={-1}
                currentYear={year}
                visible={viewType !== "yearly"}
            />

            <h1 className="centre">{title}</h1>

            <DashboardIncrementButton
                title="Next year"
                icon={ArrowRightSquareIcon}
                increment={1}
                currentYear={year}
                visible={viewType !== "yearly"}
            />
        </Row>
    );
}

export default DashboardPageHeader;
