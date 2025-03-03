import styles from "../styles/Tooltip.module.css";

function Tooltip({ children }: { children: React.ReactNode }) {
    return <div className={styles.tooltip}>{children}</div>;
}

export default Tooltip;
