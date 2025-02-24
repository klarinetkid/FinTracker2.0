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

    return (
        <>
            <MenuTile
                title="Dashboard"
                icon={Icons.ChartFillIcon}
                onClick={() => setSubMenu("dashboard")}
                disabled={globalDataCache.availableYears.value.length === 0}
            />
            <MenuTile
                title="View Year"
                icon={Icons.DateRangeFillIcon}
                onClick={() => setSubMenu("view year")}
                disabled={globalDataCache.availableYears.value.length === 0}
            />
            <MenuTile
                title="Custom Report"
                icon={Icons.SettingsAltFillIcon}
                onClick={() => openCustomReport()}
                disabled={globalDataCache.availableYears.value.length === 0}
            />
            <MenuTile
                title="Import"
                icon={Icons.ImportFillIcon}
                onClick={() => setSubMenu("import")}
                disabled={globalDataCache.importFormats.value.length === 0}
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
                disabled={globalDataCache.availableYears.value.length === 0}
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
