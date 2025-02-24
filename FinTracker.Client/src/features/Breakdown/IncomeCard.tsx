import CategoryPill from "../../components/CategoryPill";
import useCategorySelection from "../../hooks/useCategorySelection";
import styles from "../../styles/IncomeCard.module.css";
import { Uncategorized } from "../../types/Category";
import CategoryTotal from "../../types/CategoryTotal";
import { classList } from "../../utils/HtmlHelper";
import { formatCurrency } from "../../utils/NumberHelper";

interface IncomeCardProps {
    categoryTotal: CategoryTotal;
}

function IncomeCard(props: IncomeCardProps) {
    const { categoryTotal } = props;
    const categorySelection = useCategorySelection();
    const category = categoryTotal.category ?? Uncategorized;

    return (
        <div
            className={classList(
                styles.card,
                categorySelection.isSelected(category) ? styles.selected : ""
            )}
            onClick={() => categorySelection.toggleCategory(category)}
        >
            <CategoryPill category={categoryTotal.category} />
            <h2>+{formatCurrency(categoryTotal.total)}</h2>
        </div>
    );
}

export default IncomeCard;
