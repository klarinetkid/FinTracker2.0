import styles from "../styles/Row.module.css";
import { classList } from "../utils/HtmlHelper";

interface RowProps {
    children?: React.ReactNode;
    justifyContent?: string;
    gap?: number;
    style?: React.CSSProperties;
    className?: string;
}

function Row(props: RowProps) {
    const { children, justifyContent, gap, style, className } = props;

    return (
        <div
            className={classList(styles.row, className)}
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
