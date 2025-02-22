import { Link } from "react-router-dom";
import CategoryPill from "../../components/CategoryPill";
import Table from "../../components/Table";
import { CategoryTransactionCount } from "../../types/Category";
import Pages from "../../types/Pages";

interface CategoryTableProps {
    categories: CategoryTransactionCount[];
    editCategory: (category: CategoryTransactionCount) => void;
}

function CategoryTable(props: CategoryTableProps) {
    return (
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Category</th>
                    <th>Colour</th>
                    <th>Transaction Count</th>
                </tr>
            </thead>
            <tbody>
                {props.categories.map((category, i) => (
                    <tr key={i}>
                        <td className="bold centre">{i + 1}</td>
                        <td className="centre">
                            <CategoryPill
                                category={category}
                                onClick={() => props.editCategory(category)}
                            />
                        </td>
                        <td className="centre monospace">{category.colour}</td>
                        <td className="ralign">
                            {category.transactionCount > 0 ? (
                                <Link
                                    to={`${Pages.Transactions}?category=${category.id}`}
                                >
                                    {category.transactionCount}
                                </Link>
                            ) : (
                                category.transactionCount
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default CategoryTable;
