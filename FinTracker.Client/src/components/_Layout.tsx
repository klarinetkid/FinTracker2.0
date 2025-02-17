import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from "../assets/Home.svg?react";
import MenuIcon from "../assets/darhboard.svg?react";
import MenuPopdown from "../features/Menu/MenuPopdown";
import "../styles/layout.css";
import IconButton from "./IconButton";

function Layout() {
    const iconSize = 28;

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    return (
        <>
            <div className="nav-buttons-holder">
                <Link to={{ pathname: "/", search: "" }}>
                    <IconButton icon={HomeIcon} />
                </Link>
                <IconButton icon={MenuIcon} onClick={menuIconClick} />
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
