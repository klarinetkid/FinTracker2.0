import styles from "../styles/IconButton.module.css";
import { classList } from "../utils/htmlHelper";

interface IconButtonProps {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    title: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

function IconButton(props: IconButtonProps) {
    return (
        <button
            title={props.title}
            type="button"
            className={classList(styles.button, props.className)}
            onClick={props.onClick}
            onContextMenu={(e) => e.preventDefault()}
        >
            <props.icon width={32} height={32} />
        </button>
    );
}

export default IconButton;
