import styles from "../styles/Row.module.css";

interface RowProps {
    children?: React.ReactNode;
    justifyContent?: string;
    gap?: number;
    style?: React.CSSProperties;
}

function Row(props: RowProps) {
    return (
        <div
            className={styles.row}
            style={{
                ...props.style,
                justifyContent: props.justifyContent,
                gap: props.gap,
            }}
        >
            {props.children}
        </div>
    );
}

export default Row;
