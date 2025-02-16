
interface MenuTileProps {
    title: string,
    icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    iconPath?: string,
    onClick?: (event: React.MouseEvent) => void
}

function MenuTile(props: MenuTileProps) {

    const iconSize = 48

    return (
        <div className="menu-tile" onClick={(event) => props.onClick && props.onClick(event)}>
            <div>
                {!props.icon ? "" :
                    <props.icon width={iconSize} height={iconSize} />
                }
                {!props.iconPath ? "" :
                    <img src={props.iconPath} width={iconSize} height={iconSize} />
                }
                <h2>{props.title}</h2>
            </div>
        </div>
    )
}

export default MenuTile;