import style from "../styles/Row.module.css";

interface RowProps {
    children: React.ReactNode;
    justifyContent?: string;
    style?: React.CSSProperties;
}

function Row(props: RowProps) {
    return (
        <div
            className={style.row}
            style={{ ...props.style, justifyContent: props.justifyContent }}
        >
            {props.children}
        </div>
    );
}

export default Row;
