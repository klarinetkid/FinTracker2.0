import useGlobalDataCache from "../hooks/useGlobalDataCache";
import MenuTile from "./MenuTile";

function MenuImportSubmenu() {
    const globalDataCache = useGlobalDataCache()

    return (
        <div className="menu-tile-container">
            {globalDataCache.importFileFormats.value.map(f =>
                <MenuTile title={f.importFileFormatName} iconPath={f.image ? "/format-icons/" + f.image : undefined} />
            )}
        </div>
    )
}

export default MenuImportSubmenu;