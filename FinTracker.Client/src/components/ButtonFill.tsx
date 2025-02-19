import styles from "../styles/Button.module.css";

function ButtonFill(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={styles.buttonFill} {...props} />;
}

export default ButtonFill;
