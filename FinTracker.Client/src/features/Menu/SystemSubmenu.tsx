import { useNavigate } from "react-router-dom";
import Pages from "../../types/Pages";
import * as Icons from "../../utils/Icons";
import MenuTile from "./MenuTile";

function SystemSubmenu() {
    const navigate = useNavigate();

    return (
        <>
            <MenuTile
                title="Categories"
                icon={Icons.CategoryIcon}
                onClick={() => navigate(Pages.Categories)}
            />
            <MenuTile
                title="Memos"
                icon={Icons.SaveFillIcon}
                onClick={() => navigate(Pages.Memos)}
            />
            <MenuTile
                title="Formats"
                icon={Icons.FileDockFillIcon}
                onClick={() => navigate(Pages.Formats)}
            />
            <MenuTile
                title="About"
                icon={Icons.InfoIcon}
                onClick={() => navigate(Pages.About)}
            />
        </>
    );
}

export default SystemSubmenu;
