import IconButton from "../../components/IconButton";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";

interface DashboardIncrementButtonProps {
    button: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    increment: number;

    // parent props
    currentYear: number | undefined;
    setCurrentYear: React.Dispatch<React.SetStateAction<number | undefined>>;
    //availableYears: number[] | undefined
}
function DashboardIncrementButton(props: DashboardIncrementButtonProps) {
    const targetYear = (props.currentYear ?? 0) + props.increment;

    const globalDataCache = useGlobalDataCache();

    return (
        <div
            className="dashboard-increment-btn"
            style={{ visibility: yearIsAvailable() ? "visible" : "hidden" }}
            onClick={() =>
                yearIsAvailable() && props.setCurrentYear(targetYear)
            }
        >
            <IconButton icon={props.button} />
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
