import styles from "../styles/CategoryPill.module.css";
import Category, {
    CategoryTransactionCount,
    Uncategorized,
} from "../types/Category";
import { colourAvgValue } from "../utils/ColourHelper";
import { classList } from "../utils/htmlHelper";

interface CategoryPillProps {
    category: Category | CategoryTransactionCount | undefined | null;
    style?: React.CSSProperties
}

function CategoryPill(props: CategoryPillProps) {
    const cat: Category = props.category ?? Uncategorized;
    const style = {
        ...props.style,
        backgroundColor: "#" + cat.colour,
        color: colourAvgValue(cat.colour) > 0xff / 2 ? "black" : "white",
    };

    return (
        <span
            className={classList(
                styles.pill,
                cat.id || cat.id === 0 ? "" : styles.uncategorized
            )}
            style={style}
        >
            {cat.categoryName}
        </span>
    );
}

export default CategoryPill;
