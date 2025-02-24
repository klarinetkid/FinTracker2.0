import React from "react";
import styles from "../styles/Drawer.module.css";
import { classList } from "../utils/HtmlHelper";

interface DrawerProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
}

function Drawer(props: DrawerProps) {
    const { isOpen, setIsOpen, children } = props;
    const activeClass = isOpen ? styles.active : "";

    return (
        <div className={classList(styles.container, activeClass)}>
            <div className={styles.overlay} onClick={overlayClick} />
            <div className={styles.content}>{children}</div>
        </div>
    );

    function overlayClick() {
        setIsOpen(false);
    }
}

export default Drawer;
