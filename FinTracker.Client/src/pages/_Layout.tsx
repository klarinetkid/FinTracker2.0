import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from '../assets/Home.svg?react';
import MenuIcon from '../assets/darhboard.svg?react';
import "../styles/layout.css";
import Menu from "../components/Menu";

function Layout() {

    const iconSize = 28

    const [menuIsOpen, setMenuIsOpen] = useState(false)

    return (
        <>
            <div className="nav-buttons-holder">
                <Link to={{ pathname: "/", search: "" }}>
                    <HomeIcon width={iconSize} height={iconSize} />
                </Link>
                <MenuIcon width={iconSize} height={iconSize} onClick={menuIconClick} />
            </div>
            <Menu isOpen={menuIsOpen} setIsOpen={setMenuIsOpen} />

            <Outlet />
        </>
    )

    function menuIconClick() {
        if (!menuIsOpen) 
        setMenuIsOpen(!menuIsOpen)
    }
}

export default Layout;