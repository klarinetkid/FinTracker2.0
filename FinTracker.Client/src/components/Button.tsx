import styles from "../styles/Button.module.css";

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button className={styles.button} {...props} />;
}

export default Button;
