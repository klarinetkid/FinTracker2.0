import CategoryPill from "../../components/CategoryPill";
import Checkbox from "../../components/Checkbox";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import styles from "../../styles/CategoryList.module.css";

interface CategoryListProps {
    selectedCategories: number[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
}

function CategoryList(props: CategoryListProps) {
    const { selectedCategories, setSelectedCategories } = props;

    const globalDataCache = useGlobalDataCache();

    return (
        <div className={styles.holder}>
            {globalDataCache.categories.value.map((category) => (
                <div
                    key={category.id}
                    className={styles.row}
                    onClick={() => toggleSelected(category.id)}
                >
                    <Checkbox
                        checked={selectedCategories.indexOf(category.id) > -1}
                        onChange={() => toggleSelected(category.id)}
                    />
                    <CategoryPill category={category} />
                </div>
            ))}
        </div>
    );

    function toggleSelected(id: number) {
        const idx = selectedCategories.indexOf(id);
        const newSelected = [...selectedCategories];

        if (idx > -1) {
            newSelected.splice(idx, 1);
        } else {
            newSelected.push(id);
        }

        if (newSelected.length !== selectedCategories.length)
            setSelectedCategories(newSelected);
    }
}

export default CategoryList;
