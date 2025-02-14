import { useState } from 'react';
import MenuIcon from '../assets/Menu.svg';
import '../styles/Menu.css';

function MenuPage() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <div style={{float: "right"}}>
            <img src={MenuIcon} onClick={() => setIsOpen(!isOpen)} />
            <div className={`menu-container ${isOpen ? "active" : ""}`}>
                <div className="dropdown-group">
                    <a className="dropdown-item" href="/">Dashboard »</a>
                    <div className="dropdown-menu dropdown-submenu">
                        <a className="dropdown-item" href="/?year=2025">2025</a>
                        <a className="dropdown-item" href="/?year=2024">2024</a>
                        <a className="dropdown-item" href="/?year=2023">2023</a>
                        <a className="dropdown-item" href="/?year=2022">2022</a>
                        <a className="dropdown-item" href="/?year=2021">2021</a>
                        <a className="dropdown-item" href="/?year=2020">2020</a>
                    </div>
                </div>
                <div className="dropdown-group">
                    <a className="dropdown-item" href="/breakdown/2025">View Year »</a>
                    <div className="dropdown-menu dropdown-submenu">
                        <a className="dropdown-item" href="/breakdown/2024">2024</a>
                        <a className="dropdown-item" href="/breakdown/2023">2023</a>
                        <a className="dropdown-item" href="/breakdown/2022">2022</a>
                        <a className="dropdown-item" href="/breakdown/2021">2021</a>
                        <a className="dropdown-item" href="/breakdown/2020">2020</a>
                        <a className="dropdown-item" href="/breakdown/2025">2025</a>
                    </div>
                </div>
                <a className="dropdown-item" href="#">Custom Report</a>
                <a className="dropdown-item" href="#">Transactions</a>
                <div className="dropdown-group">
                    <a className="dropdown-item" href="#">System »</a>
                    <div className="dropdown-menu dropdown-submenu">
                        <a className="dropdown-item" href="/breakdown/2024">Categories</a>
                        <a className="dropdown-item" href="/breakdown/2024">Defaults</a>
                        <a className="dropdown-item" href="/breakdown/2024">Import Formats</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuPage;