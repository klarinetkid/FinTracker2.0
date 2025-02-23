import { Link } from "react-router-dom";
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

    return (
        <>
            <MenuTile
                title="Dashboard"
                icon={Icons.ChartFillIcon}
                onClick={() => setSubMenu("dashboard")}
            />
            <MenuTile
                title="View Year"
                icon={Icons.DateRangeFillIcon}
                onClick={() => setSubMenu("view year")}
            />
            <MenuTile
                title="Custom Report"
                icon={Icons.SettingsAltFillIcon}
                onClick={() => openCustomReport()}
            />
            <MenuTile
                title="Import"
                icon={Icons.ImportFillIcon}
                onClick={() => setSubMenu("import")}
            />
            <Link to={Pages.Budget}>
                <MenuTile title="Budget" icon={Icons.WalletFillIcon} />
            </Link>
            <Link to={Pages.Transactions}>
                <MenuTile title="Transactions" icon={Icons.PaperFillIcon} />
            </Link>
            <MenuTile
                title="System"
                icon={Icons.SettingsFillIcon}
                onClick={() => setSubMenu("system")}
            />
        </>
    );
}

export default MainMenu;
