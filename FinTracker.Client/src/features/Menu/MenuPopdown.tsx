import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import styles from "../../styles/Menu.module.css";
import { classList } from "../../utils/htmlHelper";
import { BackIcon } from "../../utils/Icons";
import CustomReportForm from "./CustomReportForm";
import DashboardSubmenu from "./DashboardSubmenu";
import ImportSubmenu from "./ImportSubmenu";
import MainMenu from "./MainMenu";
import SystemSubmenu from "./SystemSubmenu";
import YearSubmenu from "./YearSubmenu";

export type MenuState =
    | undefined
    | "dashboard"
    | "view year"
    | "import"
    | "system";

interface MenuProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuPopdown(props: MenuProps) {
    const [submenu, setSubmenu] = useState<MenuState>();
    const location = useLocation();
    const [isCustomReportOpen, setIsCustomReportOpen] = useState(false);

    useEffect(() => {
        props.setIsOpen(false);
    }, [location]);

    useEffect(() => {
        // transition is 0.4s, don't clear submenu until popdown hidden
        setTimeout(() => {
            if (!props.isOpen) setSubmenu(undefined);
        }, 400);
    }, [props.isOpen]);

    const popdownClass = classList(
        styles.popdown,
        props.isOpen ? styles.active : "",
        submenu ? styles.submenu : ""
    );

    return (
        <>
            <div className={popdownClass} onClick={handlePopdownClick}>
                <div className={styles.menu}>
                    <IconButton
                        title="Main menu"
                        icon={BackIcon}
                        onClick={() => setSubmenu(undefined)}
                        className={styles.backButton}
                    />
                    <div className={styles.tileContainer}>{getMenuTiles()}</div>
                </div>
            </div>
            <CustomReportForm
                isDrawerOpen={isCustomReportOpen}
                setIsDrawerOpen={setIsCustomReportOpen}
            />
        </>
    );

    function getMenuTiles(): JSX.Element {
        switch (submenu) {
            case undefined:
                return (
                    <MainMenu
                        setSubMenu={setSubmenu}
                        openCustomReport={openCustomReport}
                    />
                );
            case "dashboard":
                return <DashboardSubmenu />;
            case "view year":
                return <YearSubmenu />;
            case "import":
                return <ImportSubmenu />;
            case "system":
                return <SystemSubmenu />;
        }
    }

    function openCustomReport() {
        setIsCustomReportOpen(true);
    }

    function handlePopdownClick(event: React.MouseEvent) {
        if (event.target === event.currentTarget) {
            props.setIsOpen(false);
        }
    }
}

export default MenuPopdown;
