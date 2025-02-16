import '../styles/CategoryPills.css';
import Category, { Uncategorized } from '../types/Category';
import CategoryTransactionCount from '../types/CategoryTransactionCount';
import { colourAvgValue } from '../utils/ColourHelper';

interface CategoryPillProps {
    category: Category | CategoryTransactionCount | undefined | null
}

function CategoryPill(props: CategoryPillProps) {

    const cat: Category = props.category ?? Uncategorized
    const className = (cat.id || cat.categoryName || cat.colour)? "category-pill" : "category-pill uncategorized"
    const style = {
        backgroundColor: "#" + cat.colour,
        color: colourAvgValue(cat.colour) > (0xff / 2) ? "black" : "white"
    }

    return (
        <span className={className} style={style}>
            {cat.categoryName}
        </span>
    )
}

export default CategoryPill;