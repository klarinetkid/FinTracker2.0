import { Link } from "react-router-dom";
import CategoryPill from "../../components/CategoryPill";
import Table from "../../components/Table";
import { CategoryTransactionCount } from "../../types/Category";
import Pages from "../../types/Pages";
import EmptyTableMessage from "../../components/EmptyTableMessage";
import { classList } from "../../utils/HtmlHelper";
import tinycolor from "tinycolor2";
import styles from "../../styles/CategoryTable.module.css";

interface CategoryTableProps {
    categories: CategoryTransactionCount[];
    editCategory: (category: CategoryTransactionCount) => void;
}

function CategoryTable(props: CategoryTableProps) {
    const { categories, editCategory } = props;

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
                {categories.map((category, i) => (
                    <tr key={i}>
                        <td className="bold centre">{i + 1}</td>
                        <td className="centre">
                            <CategoryPill
                                category={category}
                                onClick={() => editCategory(category)}
                            />
                        </td>
                        <td
                            className={classList(
                                "centre monospace",
                                !tinycolor(category.colour).isValid()
                                    ? styles.invalidColour
                                    : ""
                            )}
                        >
                            {category.colour}
                        </td>
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

            {categories.length === 0 ? <EmptyTableMessage /> : ""}
        </Table>
    );
}

export default CategoryTable;
