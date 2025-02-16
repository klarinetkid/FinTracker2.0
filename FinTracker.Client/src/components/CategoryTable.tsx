import CategoryTransactionCount from "../types/CategoryTransactionCount";
import CategoryTableRow from "./CategoryTableRow";

interface CategoryTableProps {
    categories: CategoryTransactionCount[],
    editCategory: (category: CategoryTransactionCount) => void
}

function CategoryTable(props: CategoryTableProps) {
    return (
        <div className="table-holder">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Category</th>
                        <th>Colour</th>
                        <th>Transaction Count</th>
                    </tr>
                </thead>
                <tbody>
                    {props.categories.map((c, i) =>
                        <CategoryTableRow key={i} category={c} num={i} editCategory={props.editCategory} />
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryTable;