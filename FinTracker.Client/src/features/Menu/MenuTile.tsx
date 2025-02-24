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
    const iconSize = 48;

    return (
        <div
            className={classList(
                styles.tile,
                props.disabled ? styles.disabled : ""
            )}
            onClick={onTileClick}
            title={props.disabled ? "No data" : undefined}
        >
            <div className={styles.tileIconHolder}>
                {!props.icon ? (
                    ""
                ) : (
                    <props.icon width={iconSize} height={iconSize} />
                )}
                {!props.iconPath ? (
                    ""
                ) : (
                    <img
                        src={props.iconPath}
                        width={iconSize}
                        height={iconSize}
                    />
                )}
            </div>
            <h2>{props.title}</h2>
        </div>
    );

    function onTileClick() {
        if (!props.disabled && props.onClick) props.onClick();
    }
}

export default MenuTile;
