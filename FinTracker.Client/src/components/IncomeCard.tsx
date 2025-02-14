import useCategorySelection from '../hooks/useCategorySelection';
import '../styles/IncomeCard.css';
import CategoryTotal from "../types/CategoryTotal";
import { Uncategorized } from '../types/Category';
import { formatCurrency } from '../utils/NumberHelper';
import CategoryPill from "./CategoryPill";

interface IncomeCardProps {
    categoryTotal: CategoryTotal
}

function IncomeCard(props: IncomeCardProps) {

    const categorySelection = useCategorySelection()

    return (
        <div className={`income-card ${categorySelection.isSelected(props.categoryTotal.category ?? Uncategorized) ? "selected" : ""}`} onClick={() => categorySelection.toggleCategory(props.categoryTotal.category ?? Uncategorized) }>
            <CategoryPill category={props.categoryTotal.category} />
            <h2>+{formatCurrency(props.categoryTotal.total)}</h2>
        </div>
    )
}

export default IncomeCard;