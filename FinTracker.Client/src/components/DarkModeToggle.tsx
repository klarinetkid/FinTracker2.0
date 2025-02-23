import { useState } from "react";
import styles from "../styles/DarkModeToggle.module.css";
import { classList } from "../utils/htmlHelper";
import { MoonIcon, SunIcon } from "../utils/Icons";

const darkModeClass = "darkmode";
function DarkModeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(isDarkModeEnabled());

    return (
        <div
            className={classList(
                styles.toggle,
                isDarkMode ? styles.darkMode : ""
            )}
            onClick={toggleDarkMode}
        >
            <SunIcon />
            <div className={styles.ballHolder}>
                <div className={styles.ball}></div>
            </div>
            <MoonIcon />
        </div>
    );

    function isDarkModeEnabled() {
        return document.documentElement.classList.contains(darkModeClass);
    }

    function toggleDarkMode() {
        if (isDarkMode) {
            document.documentElement.classList.remove(darkModeClass);
            document.cookie = `${darkModeClass}=1;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        } else {
            document.documentElement.classList.add(darkModeClass);
            document.cookie = `${darkModeClass}=1`;
        }

        setIsDarkMode(isDarkModeEnabled());
    }
}

export default DarkModeToggle;
