import moment from "moment";
import { useNavigate } from "react-router-dom";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { formatDateOnly } from "../../utils/DateHelper";
import { DateRangeFillIcon } from "../../utils/Icons";
import MenuTile from "./MenuTile";

function YearSubmenu() {
    const globalDataCache = useGlobalDataCache();
    const navigate = useNavigate();
    const years = globalDataCache.availableYears.value ?? [];
    const curYear = new Date().getFullYear();
    const ytdEnd = formatDateOnly(moment().add(1, "days"));

    return (
        <>
            {years.indexOf(curYear) > -1 ? (
                <MenuTile
                    title="YTD"
                    icon={DateRangeFillIcon}
                    onClick={() =>
                        navigate(`/breakdown?start=${curYear}&end=${ytdEnd}`)
                    }
                />
            ) : (
                ""
            )}

            {years.map((year) => (
                <MenuTile
                    key={year}
                    title={year.toString()}
                    icon={DateRangeFillIcon}
                    onClick={() =>
                        navigate(`/breakdown?start=${year}&end=${year + 1}`)
                    }
                />
            ))}
        </>
    );
}

export default YearSubmenu;
