import styles from "../styles/IconButton.module.css";
import { classList } from "../utils/HtmlHelper";

interface IconButtonProps {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    title: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

function IconButton(props: IconButtonProps) {
    const { icon: Icon, title, onClick, className } = props;

    return (
        <button
            title={title}
            type="button"
            className={classList(styles.button, className)}
            onClick={onClick}
            onContextMenu={(e) => e.preventDefault()}
        >
            <Icon width={32} height={32} />
        </button>
    );
}

export default IconButton;
