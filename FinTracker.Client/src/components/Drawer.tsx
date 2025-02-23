import React from "react";
import styles from "../styles/Drawer.module.css";
import { classList } from "../utils/HtmlHelper";

interface DrawerProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
}

function Drawer(props: DrawerProps) {
    return (
        <div
            className={classList(
                styles.container,
                props.isOpen ? styles.active : ""
            )}
        >
            <div
                className={styles.overlay}
                onClick={() => props.setIsOpen(false)}
            ></div>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
}

export default Drawer;
