import { useNavigate } from "react-router-dom";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { ChartFillIcon } from "../../utils/Icons";
import MenuTile from "./MenuTile";

function DashboardSubmenu() {
    const globalDataCache = useGlobalDataCache();
    const navigate = useNavigate();

    return (globalDataCache.availableYears.value ?? []).map((year) => (
        <MenuTile
            key={year}
            title={year.toString()}
            icon={ChartFillIcon}
            onClick={() => navigate(`/?year=${year}`)}
        />
    ));
}

export default DashboardSubmenu;
