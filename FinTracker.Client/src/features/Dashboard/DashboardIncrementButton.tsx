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
    const years = [...globalDataCache.availableYears.value].reverse();
    const [searchParams, setSearchParams] = useSearchParams();
    const { icon, increment, title, currentYear } = props;

    const currentYearExists = currentYear && years.indexOf(currentYear) > -1;

    const targetYear = currentYearExists
        ? // if current year exists, find the next year from year list
          years[years.indexOf(currentYear) + increment] ?? 0
        : // otherwise, depending which direction is increment find the next available year to show right buttons
          !currentYear
          ? 0
          : (increment > 0 ? years : [...years].reverse()).filter((y) =>
                increment > 0 ? y > currentYear : y < currentYear
            )[0] ?? 0;

    const isYearAvailable = years.indexOf(targetYear) > -1;

    const visibility = isYearAvailable ? "visible" : "hidden";

    return (
        <div style={{ visibility }} onClick={navigateToYear}>
            <IconButton title={title} icon={icon} />
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
