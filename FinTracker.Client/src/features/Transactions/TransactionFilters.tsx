import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Row from "../../components/Row";
import Select from "../../components/Select";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import TransactionQuery from "../../types/TransactionQuery";

interface TransactionFiltersProps {
    filterQuery: TransactionQuery;
    setFilterQuery: React.Dispatch<React.SetStateAction<TransactionQuery>>;
}

function TransactionFilters(props: TransactionFiltersProps) {
    const { filterQuery, setFilterQuery } = props;
    const globalDataCache = useGlobalDataCache();

    return (
        <Row gap={6}>
            <FormGroup fieldName="Search">
                <Input
                    placeholder="Keyword"
                    name="search"
                    value={filterQuery.search ?? ""}
                    onChange={updateQuery}
                />
            </FormGroup>
            <FormGroup fieldName="Category">
                <CategorySelector
                    allowEmpty={true}
                    categories={globalDataCache.categories.value}
                    onChange={(c) => {
                        const categoryId = c && c.id === undefined ? -1 : c?.id;
                        setFilterQuery({
                            ...filterQuery,
                            categoryId: categoryId,
                        });
                    }}
                    value={globalDataCache.getCategoryById(
                        filterQuery?.categoryId
                    )}
                />
            </FormGroup>
            <FormGroup fieldName="After">
                <Input
                    name="after"
                    placeholder="yyyy-mm-dd"
                    value={filterQuery.after ?? ""}
                    onChange={updateQuery}
                />
            </FormGroup>
            <FormGroup fieldName="Before">
                <Input
                    name="before"
                    placeholder="yyyy-mm-dd"
                    value={filterQuery.before ?? ""}
                    onChange={updateQuery}
                />
            </FormGroup>
            <FormGroup fieldName="More Than">
                <Input
                    className="ralign"
                    placeholder="$0.00"
                    name="moreThan"
                    value={filterQuery.moreThan ?? ""}
                    onChange={updateQuery}
                />
            </FormGroup>
            <FormGroup fieldName="Less Than">
                <Input
                    className="ralign"
                    placeholder="$0.00"
                    name="lessThan"
                    value={filterQuery.lessThan ?? ""}
                    onChange={updateQuery}
                />
            </FormGroup>
            <FormGroup fieldName="Type">
                <Select
                    name="type"
                    value={filterQuery.type ?? ""}
                    onChange={updateQuery}
                >
                    <option value="">All</option>
                    <option value="cash">Cash</option>
                    <option value="credit">Digital</option>
                </Select>
            </FormGroup>
        </Row>
    );

    function updateQuery(
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ): void {
        const { name, value } = event.target;
        setFilterQuery({
            ...filterQuery,
            [name]: value,
        });
    }
}

export default TransactionFilters;
