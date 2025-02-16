import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import Pages from "../../types/Pages";
import ThreeDBoxIcon from "../../assets/3d_box_fill.svg?react";
import Back from "../../assets/Back.svg?react";
import DashboardIcon from "../../assets/Chart_fill.svg?react";
import ViewYearIcon from "../../assets/Date_range_fill.svg?react";
import FileIcon from "../../assets/File_dock_fill.svg?react";
import ImportIcon from "../../assets/Import_fill.svg?react";
import TransactionsIcon from "../../assets/Paper_fill.svg?react";
import SaveIcon from "../../assets/Save_fill.svg?react";
import CustomReportIcon from "../../assets/Setting_alt_fill.svg?react";
import SystemIcon from "../../assets/Setting_fill.svg?react";
import BudetIcon from "../../assets/Wallet_fill.svg?react";
import "../../styles/Menu.css";
import MenuTile from "./MenuTile";
import Drawer from "../../components/Drawer";
import CustomReportForm from "./CustomReportForm";

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
                className={`menu-popdown ${props.isOpen ? "active" : ""}`}
                onClick={handlePopdownClick}
            >
                <div className="menu-container">
                    <div
                        className="back-button"
                        style={{ visibility: submenu ? "visible" : "hidden" }}
                    >
                        <Back
                            onClick={() =>
                                submenu
                                    ? setSubmenu(undefined)
                                    : props.setIsOpen(false)
                            }
                            width={32}
                            height={32}
                        />
                    </div>

                    {!submenu ? (
                        <div className="menu-tile-container">
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
                            <MenuTile title="Budget" icon={BudetIcon} />
                            <MenuTile
                                title="Transactions"
                                icon={TransactionsIcon}
                            />
                            <MenuTile
                                title="System"
                                icon={SystemIcon}
                                onClick={() => setSubmenu("system")}
                            />
                        </div>
                    ) : submenu === "dashboard" ? (
                        <div className="menu-tile-container">
                            {globalDataCache.availableYears.value.map(
                                (year) => (
                                    <Link key={year} to={`/?year=${year}`}>
                                        <MenuTile
                                            title={year.toString()}
                                            icon={DashboardIcon}
                                        />
                                    </Link>
                                )
                            )}
                        </div>
                    ) : submenu === "view year" ? (
                        <div className="menu-tile-container">
                            {globalDataCache.availableYears.value.map(
                                (year) => (
                                    <Link
                                        key={year}
                                        to={`/breakdown?start=${year}&end=${year + 1}`}
                                    >
                                        <MenuTile
                                            title={year.toString()}
                                            icon={ViewYearIcon}
                                        />
                                    </Link>
                                )
                            )}
                        </div>
                    ) : submenu === "import" ? (
                        <div className="menu-tile-container">
                            {globalDataCache.importFileFormats.value.map(
                                (f, i) => (
                                    <MenuTile
                                        key={i}
                                        title={f.importFileFormatName}
                                        iconPath={
                                            f.image
                                                ? "/format-icons/" + f.image
                                                : undefined
                                        }
                                    />
                                )
                            )}
                        </div>
                    ) : submenu === "system" ? (
                        <div className="menu-tile-container">
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
                        </div>
                    ) : (
                        ""
                    )}
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
        if (
            event.target instanceof HTMLElement &&
            event.target.classList.contains("menu-popdown")
        ) {
            props.setIsOpen(false);
        }
    }
}

export default MenuPopdown;
