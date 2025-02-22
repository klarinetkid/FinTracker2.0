import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import HomeIcon from "../assets/Home.svg?react";
import MenuIcon from "../assets/darhboard.svg?react";
import MenuPopdown from "../features/Menu/MenuPopdown";
import IconButton from "./IconButton";

function Layout() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    return (
        <>
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
