import React from "react";
import "../styles/Drawer.css"

interface DrawerProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode
}

function Drawer(props: DrawerProps) {
    return (
        <div className={`drawer-container ${props.isOpen ? "active" : ""}`}>
            <div className="drawer-overlay" onClick={() => props.setIsOpen(false) }></div>
            <div className="drawer-content">
                {props.children}
            </div>
        </div>
    );
}

export default Drawer;