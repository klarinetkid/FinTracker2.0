import CategoryPill from "../../components/CategoryPill";
import useCategorySelection from "../../hooks/useCategorySelection";
import style from "../../styles/IncomeCard.module.css";
import { Uncategorized } from "../../types/Category";
import CategoryTotal from "../../types/CategoryTotal";
import { classList } from "../../utils/htmlHelper";
import { formatCurrency } from "../../utils/NumberHelper";

interface IncomeCardProps {
    categoryTotal: CategoryTotal;
}

function IncomeCard(props: IncomeCardProps) {
    const categorySelection = useCategorySelection();

    return (
        <div
            className={classList(
                style.card,
                categorySelection.isSelected(
                    props.categoryTotal.category ?? Uncategorized
                )
                    ? style.selected
                    : ""
            )}
            onClick={() =>
                categorySelection.toggleCategory(
                    props.categoryTotal.category ?? Uncategorized
                )
            }
        >
            <CategoryPill category={props.categoryTotal.category} />
            <h2>+{formatCurrency(props.categoryTotal.total)}</h2>
        </div>
    );
}

export default IncomeCard;
