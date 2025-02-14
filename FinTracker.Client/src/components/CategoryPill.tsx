import '../styles/CategoryPills.css';
import Category, { Uncategorized } from '../types/Category';
import { colourAvgValue } from '../utils/ColourHelper';

interface CategoryPillProps {
    category: Category | undefined | null
}

function CategoryPill(props: CategoryPillProps) {

    const cat: Category = props.category ?? Uncategorized
    const className = (cat.id || cat.id === 0) ? "category-pill" : "category-pill uncategorized"
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