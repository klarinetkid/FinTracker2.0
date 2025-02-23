import { Link } from "react-router-dom";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { ChartFillIcon } from "../../utils/Icons";
import MenuTile from "./MenuTile";

function DashboardSubmenu() {
    const globalDataCache = useGlobalDataCache();

    return globalDataCache.availableYears.value.map((year) => (
        <Link key={year} to={`/?year=${year}`}>
            <MenuTile title={year.toString()} icon={ChartFillIcon} />
        </Link>
    ));
}

export default DashboardSubmenu;
