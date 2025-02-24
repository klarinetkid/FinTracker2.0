import tinycolor from "tinycolor2";
import styles from "../styles/CategoryPill.module.css";
import {
    CategoryOrUncategorized,
    CategoryTransactionCount,
    Uncategorized,
} from "../types/Category";
import { classList } from "../utils/HtmlHelper";

interface CategoryPillProps {
    category: CategoryOrUncategorized | CategoryTransactionCount | undefined;
    onClick?: () => void;
    openTop?: boolean;
}

function CategoryPill(props: CategoryPillProps) {
    const cat: CategoryOrUncategorized = props.category ?? Uncategorized;
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
                props.onClick ? styles.clickable : "",
                props.openTop ? styles.openTop : ""
            )}
            style={style}
            onClick={props.onClick}
        >
            {cat.categoryName}
        </span>
    );
}

export default CategoryPill;
