import { useSearchParams } from "react-router-dom";
import IconButton from "../../components/IconButton";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import styles from "../../styles/DashboardIncrementButton.module.css";
interface DashboardIncrementButtonProps {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    increment: number;
    title: string;
    currentYear: number | undefined;
}
function DashboardIncrementButton(props: DashboardIncrementButtonProps) {
    const { icon, increment, title, currentYear } = props;

    const globalDataCache = useGlobalDataCache();
    const years = [...globalDataCache.availableYears.value].reverse();
    const [searchParams, setSearchParams] = useSearchParams();

    const targetYear = getTargetYear();

    return (
        <IconButton
            title={title}
            icon={icon}
            onClick={navigateToYear}
            className={!targetYear ? styles.hidden : undefined}
        />
    );

    function navigateToYear() {
        if (targetYear) {
            searchParams.set("year", targetYear.toString());
            setSearchParams(searchParams);
        }
    }

    function getTargetYear(): number | undefined {
        if (!currentYear) return;

        // if current year is in the list of years, return the next one in the list
        const currentYearExists = years.indexOf(currentYear) > -1;
        if (currentYearExists)
            return years[years.indexOf(currentYear) + increment];

        // otherwise, find find the next year in the direction we want to increment
        return (increment > 0 ? years : [...years].reverse()).filter((y) =>
            increment > 0 ? y > currentYear : y < currentYear
        )[0];
    }
}

export default DashboardIncrementButton;
