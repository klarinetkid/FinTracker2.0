import useGlobalDataCache from "../hooks/useGlobalDataCache"

interface DashboardIncrementButtonProps {
    button: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    increment: number,

    // parent props
    currentYear: number | undefined,
    setCurrentYear: React.Dispatch<React.SetStateAction<number | undefined>>,
    //availableYears: number[] | undefined
}
function DashboardIncrementButton(props: DashboardIncrementButtonProps) {

    const targetYear = (props.currentYear ?? 0) + props.increment

    const globalDataCache = useGlobalDataCache()

    return (
        <div className="dashboard-increment-btn"
            style={{ visibility: yearIsAvailable() ? "visible" : "hidden" }}
            onClick={() => yearIsAvailable() && props.setCurrentYear(targetYear)}
        >
            <props.button width="36px" height="36px" />
        </div>
    )

    function yearIsAvailable() {
        return props.currentYear &&
            globalDataCache.availableYears.value.indexOf(targetYear) > -1
    }
}

export default DashboardIncrementButton;