import IconButton from "../../components/IconButton";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";

interface DashboardIncrementButtonProps {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    increment: number;
    title: string;

    // parent props
    currentYear: number | undefined;
    setCurrentYear: React.Dispatch<React.SetStateAction<number | undefined>>;
}
function DashboardIncrementButton(props: DashboardIncrementButtonProps) {
    const targetYear = (props.currentYear ?? 0) + props.increment;
    const globalDataCache = useGlobalDataCache();

    return (
        <div
            style={{ visibility: yearIsAvailable() ? "visible" : "hidden" }}
            onClick={() =>
                yearIsAvailable() && props.setCurrentYear(targetYear)
            }
        >
            <IconButton title={props.title} icon={props.icon} />
        </div>
    );

    function yearIsAvailable() {
        return (
            props.currentYear &&
            globalDataCache.availableYears.value.indexOf(targetYear) > -1
        );
    }
}

export default DashboardIncrementButton;
