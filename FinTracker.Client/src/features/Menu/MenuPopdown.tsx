import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ThreeDBoxIcon from "../../assets/3d_box_fill.svg?react";
import BackIcon from "../../assets/Back.svg?react";
import DashboardIcon from "../../assets/Chart_fill.svg?react";
import ViewYearIcon from "../../assets/Date_range_fill.svg?react";
import FileIcon from "../../assets/File_dock_fill.svg?react";
import ImportIcon from "../../assets/Import_fill.svg?react";
import TransactionsIcon from "../../assets/Paper_fill.svg?react";
import SaveIcon from "../../assets/Save_fill.svg?react";
import CustomReportIcon from "../../assets/Setting_alt_fill.svg?react";
import SystemIcon from "../../assets/Setting_fill.svg?react";
import BudgetIcon from "../../assets/Wallet_fill.svg?react";
import Drawer from "../../components/Drawer";
import IconButton from "../../components/IconButton";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import style from "../../styles/Menu.module.css";
import Pages from "../../types/Pages";
import CustomReportForm from "./CustomReportForm";
import ImportSubmenu from "./ImportSubmenu";
import MenuTile from "./MenuTile";
import { classList } from "../../utils/htmlHelper";

type menuState = undefined | "dashboard" | "view year" | "import" | "system";

interface MenuProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuPopdown(props: MenuProps) {
    const [submenu, setSubmenu] = useState<menuState>();

    const globalDataCache = useGlobalDataCache();

    const location = useLocation();

    const [isCustomReportOpen, setIsCustomReportOpen] = useState(false);

    useEffect(() => {
        props.setIsOpen(false);
    }, [location]);

    useEffect(() => {
        setTimeout(() => {
            if (!props.isOpen) setSubmenu(undefined);
        }, 400); // transition is 0.4s
    }, [props.isOpen]);

    return (
        <>
            <div
                className={classList(
                    style.popdown,
                    props.isOpen ? style.active : ""
                )}
                onClick={handlePopdownClick}
            >
                <div className={style.container}>
                    <div
                        className={style.backButton}
                        style={{ visibility: submenu ? "visible" : "hidden" }}
                    >
                        <IconButton
                            title="Main menu"
                            icon={BackIcon}
                            onClick={() =>
                                submenu
                                    ? setSubmenu(undefined)
                                    : props.setIsOpen(false)
                            }
                        />
                    </div>
                    <div className={style.tileContainer}>
                        {!submenu ? (
                            <>
                                <MenuTile
                                    title="Dashboard"
                                    icon={DashboardIcon}
                                    onClick={() => setSubmenu("dashboard")}
                                />
                                <MenuTile
                                    title="View Year"
                                    icon={ViewYearIcon}
                                    onClick={() => setSubmenu("view year")}
                                />
                                <MenuTile
                                    title="Custom Report"
                                    icon={CustomReportIcon}
                                    onClick={() => setIsCustomReportOpen(true)}
                                />
                                <MenuTile
                                    title="Import"
                                    icon={ImportIcon}
                                    onClick={() => setSubmenu("import")}
                                />
                                <Link to={Pages.Budget}>
                                    <MenuTile
                                        title="Budget"
                                        icon={BudgetIcon}
                                    />
                                </Link>
                                <MenuTile
                                    title="Transactions"
                                    icon={TransactionsIcon}
                                />
                                <MenuTile
                                    title="System"
                                    icon={SystemIcon}
                                    onClick={() => setSubmenu("system")}
                                />
                            </>
                        ) : submenu === "dashboard" ? (
                            globalDataCache.availableYears.value.map((year) => (
                                <Link key={year} to={`/?year=${year}`}>
                                    <MenuTile
                                        title={year.toString()}
                                        icon={DashboardIcon}
                                    />
                                </Link>
                            ))
                        ) : submenu === "view year" ? (
                            globalDataCache.availableYears.value.map((year) => (
                                <Link
                                    key={year}
                                    to={`/breakdown?start=${year}&end=${year + 1}`}
                                >
                                    <MenuTile
                                        title={year.toString()}
                                        icon={ViewYearIcon}
                                    />
                                </Link>
                            ))
                        ) : submenu === "import" ? (
                            <ImportSubmenu />
                        ) : submenu === "system" ? (
                            <>
                                <Link to={Pages.Categories}>
                                    <MenuTile
                                        title="Categories"
                                        icon={ThreeDBoxIcon}
                                    />
                                </Link>
                                <MenuTile title="Defaults" icon={SaveIcon} />
                                <Link to={Pages.Formats}>
                                    <MenuTile title="Formats" icon={FileIcon} />
                                </Link>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <Drawer
                isOpen={isCustomReportOpen}
                setIsOpen={setIsCustomReportOpen}
            >
                <CustomReportForm
                    onCancel={() => setIsCustomReportOpen(false)}
                />
            </Drawer>
        </>
    );

    function handlePopdownClick(event: React.MouseEvent) {
        if (event.target === event.currentTarget) {
            props.setIsOpen(false);
        }
    }
}

export default MenuPopdown;
