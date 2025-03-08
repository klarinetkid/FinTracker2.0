import { useNavigate } from "react-router-dom";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import Pages from "../../types/Pages";
import * as Icons from "../../utils/Icons";
import { MenuState } from "./MenuPopdown";
import MenuTile from "./MenuTile";

interface MainMenuProps {
    setSubMenu: (submenu: MenuState) => void;
    openCustomReport: () => void;
}

function MainMenu(props: MainMenuProps) {
    const { setSubMenu, openCustomReport } = props;
    const globalDataCache = useGlobalDataCache();
    const navigate = useNavigate();

    const yearsExist =
        globalDataCache.availableYears.value &&
        globalDataCache.availableYears.value.length > 0;

    const formatsExist =
        globalDataCache.importFormats.value &&
        globalDataCache.importFormats.value.length > 0;

    return (
        <>
            <MenuTile
                title="Dashboard"
                icon={Icons.ChartFillIcon}
                onClick={() => setSubMenu("dashboard")}
                disabled={!yearsExist}
            />
            <MenuTile
                title="View Year"
                icon={Icons.DateRangeFillIcon}
                onClick={() => setSubMenu("view year")}
                disabled={!yearsExist}
            />
            <MenuTile
                title="Custom Report"
                icon={Icons.SettingsAltFillIcon}
                onClick={() => openCustomReport()}
                disabled={!yearsExist}
            />
            <MenuTile
                title="Import"
                icon={Icons.ImportFillIcon}
                onClick={() => setSubMenu("import")}
                disabled={!formatsExist}
            />
            <MenuTile
                title="Budget"
                icon={Icons.WalletFillIcon}
                onClick={() => navigate(Pages.Budget)}
            />
            <MenuTile
                title="Transactions"
                icon={Icons.PaperFillIcon}
                onClick={() => navigate(Pages.Transactions)}
                disabled={!yearsExist}
            />
            <MenuTile
                title="Trends"
                icon={Icons.ChartAltIcon}
                onClick={() => navigate(Pages.Trends)}
                disabled={!yearsExist}
            />
            <MenuTile
                title="System"
                icon={Icons.SettingsFillIcon}
                onClick={() => setSubMenu("system")}
            />
        </>
    );
}

export default MainMenu;
