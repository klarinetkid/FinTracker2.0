import CategoryPill from "../../components/CategoryPill";
import { CategoryTransactionCount } from "../../types/Category";

interface CategoryTableRowProps {
    category: CategoryTransactionCount;
    num: number;
    editCategory: (category: CategoryTransactionCount) => void;
}

function CategoryTableRow(props: CategoryTableRowProps) {
    return (
        <tr onClick={() => props.editCategory(props.category)}>
            <td className="bold centre">{props.num + 1}</td>
            <td className="category-table-name centre">
                <CategoryPill category={props.category} />
            </td>
            <td className="centre monospace">#{props.category.colour}</td>
            <td className="ralign">{props.category.transactionCount}</td>
        </tr>
    );
}

export default CategoryTableRow;
