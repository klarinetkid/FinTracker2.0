import tinycolor from "tinycolor2";
import styles from "../styles/CategoryPill.module.css";
import Category, {
    CategoryTransactionCount,
    Uncategorized,
} from "../types/Category";
import { classList } from "../utils/htmlHelper";

interface CategoryPillProps {
    category: Category | CategoryTransactionCount | undefined | null;
    style?: React.CSSProperties;
    onClick?: () => void;
}

function CategoryPill(props: CategoryPillProps) {
    const cat: Category = props.category ?? Uncategorized;
    const colour = tinycolor(cat.colour);

    const style = {
        ...props.style,
        backgroundColor: colour.isValid() ? colour.toRgbString() : "black",
        color: colour.getLuminance() > 0.5 ? "black" : "white",
    };

    return (
        <span
            className={classList(
                styles.pill,
                cat.id || cat.id === 0 ? "" : styles.uncategorized,
                props.onClick ? styles.clickable : ""
            )}
            style={style}
            onClick={props.onClick}
        >
            {cat.categoryName}
        </span>
    );
}

export default CategoryPill;
