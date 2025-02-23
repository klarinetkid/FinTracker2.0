import { Link } from "react-router-dom";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { DateRangeFillIcon } from "../../utils/Icons";
import MenuTile from "./MenuTile";
import moment from "moment";

function YearSubmenu() {
    const globalDataCache = useGlobalDataCache();
    const years = globalDataCache.availableYears.value;
    const curYear = new Date().getFullYear();
    const ytdEnd = moment().add(1, "days").format("yyyy-MM-DD");

    return (
        <>
            {years.indexOf(curYear) > -1 ? (
                <Link to={`/breakdown?start=${curYear}&end=${ytdEnd}`}>
                    <MenuTile title="YTD" icon={DateRangeFillIcon} />
                </Link>
            ) : (
                ""
            )}

            {years.map((year) => (
                <Link
                    key={year}
                    to={`/breakdown?start=${year}&end=${year + 1}`}
                >
                    <MenuTile
                        title={year.toString()}
                        icon={DateRangeFillIcon}
                    />
                </Link>
            ))}
        </>
    );
}

export default YearSubmenu;
