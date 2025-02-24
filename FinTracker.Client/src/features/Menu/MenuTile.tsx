import styles from "../../styles/MenuTile.module.css";
import { classList } from "../../utils/HtmlHelper";

interface MenuTileProps {
    title: string;
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    iconPath?: string;
    onClick?: () => void;
    disabled?: boolean;
}

function MenuTile(props: MenuTileProps) {
    const { title, icon: Icon, iconPath, onClick, disabled } = props;

    const iconSize = 48;

    return (
        <div
            className={classList(styles.tile, disabled ? styles.disabled : "")}
            onClick={onTileClick}
            title={disabled ? "No data" : undefined}
        >
            <div className={styles.tileIconHolder}>{getIconOrImage()}</div>
            <h2>{title}</h2>
        </div>
    );

    function getIconOrImage() {
        if (Icon) return <Icon width={iconSize} height={iconSize} />;
        if (iconPath)
            return <img src={iconPath} width={iconSize} height={iconSize} />;
    }

    function onTileClick() {
        if (!disabled && onClick) onClick();
    }
}

export default MenuTile;
