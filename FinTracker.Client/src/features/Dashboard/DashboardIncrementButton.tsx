import { useSearchParams } from "react-router-dom";
import IconButton from "../../components/IconButton";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";

interface DashboardIncrementButtonProps {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    increment: number;
    title: string;
    currentYear: number | undefined;
}
function DashboardIncrementButton(props: DashboardIncrementButtonProps) {
    const globalDataCache = useGlobalDataCache();
    const [searchParams, setSearchParams] = useSearchParams();

    const targetYear =
        globalDataCache.availableYears.value[
            globalDataCache.availableYears.value.indexOf(
                props.currentYear ?? 0
            ) - props.increment
        ] ?? 0;

    const isYearAvailable =
        props.currentYear &&
        globalDataCache.availableYears.value.indexOf(targetYear) > -1;

    const visibility = isYearAvailable ? "visible" : "hidden";

    return (
        <div style={{ visibility }} onClick={navigateToYear}>
            <IconButton title={props.title} icon={props.icon} />
        </div>
    );

    function navigateToYear() {
        if (isYearAvailable) {
            searchParams.set("year", targetYear.toString());
            setSearchParams(searchParams);
        }
    }
}

export default DashboardIncrementButton;
