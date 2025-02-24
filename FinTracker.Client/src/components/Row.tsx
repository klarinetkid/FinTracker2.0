import styles from "../styles/Row.module.css";

interface RowProps {
    children?: React.ReactNode;
    justifyContent?: string;
    gap?: number;
    style?: React.CSSProperties;
}

function Row(props: RowProps) {
    const { children, justifyContent, gap, style } = props;

    return (
        <div
            className={styles.row}
            style={{
                ...style,
                justifyContent: justifyContent,
                gap: gap,
            }}
        >
            {children}
        </div>
    );
}

export default Row;
