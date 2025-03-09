import tinycolor from "tinycolor2";
import styles from "../styles/CategoryPill.module.css";
import { CategoryOrUncategorized, Uncategorized } from "../types/Category";
import { classList } from "../utils/HtmlHelper";

interface CategoryPillProps {
    category: CategoryOrUncategorized | undefined;
    onClick?: () => void;
    openTop?: boolean;
}

function CategoryPill(props: CategoryPillProps) {
    const { category, onClick, openTop } = props;

    const cat: CategoryOrUncategorized = category ?? Uncategorized;
    const colour = tinycolor(cat.colour);

    const style = {
        backgroundColor: colour.isValid() ? colour.toRgbString() : "black",
        color: colour.getLuminance() > 0.5 ? "black" : "white",
    };

    return (
        <span
            className={classList(
                styles.pill,
                cat.id || cat.id === 0 ? "" : styles.uncategorized,
                onClick ? styles.clickable : "",
                openTop ? styles.openTop : ""
            )}
            style={style}
            onClick={onClick}
        >
            {cat.categoryName}
        </span>
    );
}

export default CategoryPill;
