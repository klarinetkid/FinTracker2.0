import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MenuPopdown from "../features/Menu/MenuPopdown";
import { HomeIcon, MenuIcon } from "../utils/Icons";
import IconButton from "./IconButton";
import DarkModeToggle from "./DarkModeToggle";
import styles from "../styles/Layout.module.css";
import useGlobalDataCache from "../hooks/useGlobalDataCache";
import LoadingIndicator from "./LoadingIndicator";
import Page from "./Page";

function Layout() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const globalDataCache = useGlobalDataCache();
    return (
        <>
            <DarkModeToggle />
            <div className={styles.btnHolder}>
                <Link to={{ pathname: "/", search: "" }}>
                    <IconButton title="Dashboard" icon={HomeIcon} />
                </Link>
                <IconButton
                    title="Menu"
                    icon={MenuIcon}
                    onClick={menuIconClick}
                />
            </div>
            <MenuPopdown isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />

            {globalDataCache.availableYears.value.length > 0 ? (
                <Outlet />
            ) : (
                <LoadingIndicator />
            )}
        </>
    );
    function menuIconClick() {
        if (!menuIsOpen) setMenuIsOpen(!menuIsOpen);
    }
}

export default Layout;
