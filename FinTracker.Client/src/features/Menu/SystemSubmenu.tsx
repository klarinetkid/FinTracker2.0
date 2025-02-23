import { Link } from "react-router-dom";
import Pages from "../../types/Pages";
import * as Icons from "../../utils/Icons";
import MenuTile from "./MenuTile";

function SystemSubmenu() {
    return (
        <>
            <Link to={Pages.Categories}>
                <MenuTile title="Categories" icon={Icons.CategoryIcon} />
            </Link>
            <Link to={Pages.Memos}>
                <MenuTile title="Memos" icon={Icons.SaveFillIcon} />
            </Link>
            <Link to={Pages.Formats}>
                <MenuTile title="Formats" icon={Icons.FileDockFillIcon} />
            </Link>
        </>
    );
}

export default SystemSubmenu;
