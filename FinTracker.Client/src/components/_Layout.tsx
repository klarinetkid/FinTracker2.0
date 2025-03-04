import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MenuPopdown from "../features/Menu/MenuPopdown";
import styles from "../styles/Layout.module.css";
import { HomeIcon, MenuIcon } from "../utils/Icons";
import DarkModeToggle from "./DarkModeToggle";
import IconButton from "./IconButton";
import ToastNotificationProvider from "../contexts/ToastNotificationProvider";

function Layout() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    return (
        <ToastNotificationProvider>
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

            <Outlet />
        </ToastNotificationProvider>
    );
    function menuIconClick() {
        if (!menuIsOpen) setMenuIsOpen(!menuIsOpen);
    }
}

export default Layout;
