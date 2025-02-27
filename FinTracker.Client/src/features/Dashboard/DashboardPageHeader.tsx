import Row from "../../components/Row";
import { ArrowLeftSquareIcon, ArrowRightSquareIcon } from "../../utils/Icons";
import DashboardIncrementButton from "./DashboardIncrementButton";
import { DashboardPageState } from "./DashboardPage";

interface DashboardPageHeaderProps {
    year: number | undefined;
    viewType: string;
    pageState: DashboardPageState;
}

function DashboardPageHeader({
    year,
    viewType,
    pageState,
}: DashboardPageHeaderProps) {
    const title =
        viewType === "yearly" ? "All Years" : `Dashboard ${year ?? ""}`;

    const btnsVisible =
        viewType !== "yearly" &&
        (pageState === "show data" || pageState === "refresh");

    const btnCommonProps = {
        currentYear: year,
        visible: btnsVisible,
        viewType
    };

    return (
        <Row justifyContent="center" gap={32} className="noselect">
            <DashboardIncrementButton
                {...btnCommonProps}
                title="Previous year"
                icon={ArrowLeftSquareIcon}
                increment={-1}
            />

            <h1 className="centre">{title}</h1>

            <DashboardIncrementButton
                {...btnCommonProps}
                title="Next year"
                icon={ArrowRightSquareIcon}
                increment={1}
            />
        </Row>
    );
}

export default DashboardPageHeader;
