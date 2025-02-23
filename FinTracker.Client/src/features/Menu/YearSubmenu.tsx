import { Link } from "react-router-dom";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { DateRangeFillIcon } from "../../utils/Icons";
import MenuTile from "./MenuTile";

function YearSubmenu() {
    const globalDataCache = useGlobalDataCache();

    return globalDataCache.availableYears.value.map((year) => (
        <Link key={year} to={`/breakdown?start=${year}&end=${year + 1}`}>
            <MenuTile title={year.toString()} icon={DateRangeFillIcon} />
        </Link>
    ));
}

export default YearSubmenu;
