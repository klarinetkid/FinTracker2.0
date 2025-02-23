import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MenuPopdown from "../features/Menu/MenuPopdown";
import { HomeIcon, MenuIcon } from "../utils/Icons";
import IconButton from "./IconButton";
import DarkModeToggle from "./DarkModeToggle";
import styles from "../styles/Layout.module.css";

function Layout() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
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

            <Outlet />
        </>
    );
    function menuIconClick() {
        if (!menuIsOpen) setMenuIsOpen(!menuIsOpen);
    }
}

export default Layout;
