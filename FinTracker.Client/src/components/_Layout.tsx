import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MenuPopdown from "../features/Menu/MenuPopdown";
import { HomeIcon, MenuIcon } from "../utils/Icons";
import IconButton from "./IconButton";
import DarkModeToggle from "./DarkModeToggle";

function Layout() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    return (
        <>
            <DarkModeToggle />
            <div
                style={{
                    float: "right",
                    display: "flex",
                    gap: 5,
                }}
            >
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
