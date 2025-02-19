import React from "react";
import style from "../styles/Drawer.module.css";
import { classList } from "../utils/htmlHelper";

interface DrawerProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

function Drawer(props: DrawerProps) {
    return (
        <div
            className={classList(
                style.container,
                props.isOpen ? style.active : ""
            )}
        >
            <div
                className={style.overlay}
                onClick={() => props.setIsOpen(false)}
            ></div>
            <div className={style.content}>{props.children}</div>
        </div>
    );
}

export default Drawer;
