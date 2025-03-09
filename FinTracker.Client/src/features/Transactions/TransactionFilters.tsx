import moment from "moment";
import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Row from "../../components/Row";
import Select from "../../components/Select";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import { Uncategorized } from "../../types/Category";
import TransactionQuery from "../../types/TransactionQuery";
import { isEmpty } from "../../utils/StringHelper";
import { AmountPattern, DatePattern } from "../../utils/ValidationHelper";

interface TransactionFiltersProps {
    filterQuery: TransactionQuery;
    setFilterQuery: React.Dispatch<React.SetStateAction<TransactionQuery>>;
    debouncedQuery: TransactionQuery;
    setDebouncedQuery: React.Dispatch<React.SetStateAction<TransactionQuery>>;
}

function TransactionFilters(props: TransactionFiltersProps) {
    const { filterQuery, setFilterQuery, debouncedQuery, setDebouncedQuery } =
        props;

    const globalDataCache = useGlobalDataCache();

    return (
        <Row gap={6}>
            <FormGroup fieldName="Search">
                <Input
                    placeholder="Keyword"
                    value={debouncedQuery.search ?? ""}
                    onChange={(e) =>
                        setDebouncedQuery({
                            ...debouncedQuery,
                            search: e.target.value,
                        })
                    }
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
                    value={
                        filterQuery.categoryId == -1
                            ? Uncategorized
                            : globalDataCache.getCategoryById(
                                  filterQuery?.categoryId
                              )
                    }
                />
            </FormGroup>
            <FormGroup
                fieldName="After"
                error={
                    !isValueValid(debouncedQuery.after, DatePattern) ||
                    !isDateSpanValid()
                }
            >
                <Input
                    placeholder="yyyy-mm-dd"
                    value={debouncedQuery.after ?? ""}
                    onChange={(e) =>
                        setDebouncedQuery({
                            ...debouncedQuery,
                            after: e.target.value,
                        })
                    }
                />
            </FormGroup>
            <FormGroup
                fieldName="Before"
                error={
                    !isValueValid(debouncedQuery.before, DatePattern) ||
                    !isDateSpanValid()
                }
            >
                <Input
                    placeholder="yyyy-mm-dd"
                    value={debouncedQuery.before ?? ""}
                    onChange={(e) =>
                        setDebouncedQuery({
                            ...debouncedQuery,
                            before: e.target.value,
                        })
                    }
                />
            </FormGroup>
            <FormGroup
                fieldName="More Than"
                error={
                    !isValueValid(debouncedQuery.moreThan, AmountPattern) ||
                    !isAmountSpanValid()
                }
            >
                <Input
                    className="ralign"
                    placeholder="$0.00"
                    value={debouncedQuery.moreThan ?? ""}
                    onChange={(e) =>
                        setDebouncedQuery({
                            ...debouncedQuery,
                            moreThan: e.target.value,
                        })
                    }
                />
            </FormGroup>
            <FormGroup
                fieldName="Less Than"
                error={
                    !isValueValid(debouncedQuery.lessThan, AmountPattern) ||
                    !isAmountSpanValid()
                }
            >
                <Input
                    className="ralign"
                    placeholder="$0.00"
                    value={debouncedQuery.lessThan ?? ""}
                    onChange={(e) =>
                        setDebouncedQuery({
                            ...debouncedQuery,
                            lessThan: e.target.value,
                        })
                    }
                />
            </FormGroup>
            <FormGroup fieldName="Type">
                <Select
                    value={filterQuery.type ?? ""}
                    onChange={(e) =>
                        setFilterQuery({ ...filterQuery, type: e.target.value })
                    }
                >
                    <option value="">All</option>
                    <option value="cash">Cash</option>
                    <option value="digital">Digital</option>
                </Select>
            </FormGroup>
        </Row>
    );

    function isValueValid(date: string | undefined | number, pattern: RegExp) {
        if (date === undefined || isEmpty(date.toString())) return true;
        return date.toString().match(pattern) !== null;
    }

    function isDateSpanValid() {
        if (
            isEmpty(debouncedQuery.before) ||
            !isValueValid(debouncedQuery.before, DatePattern) ||
            isEmpty(debouncedQuery.after) ||
            !isValueValid(debouncedQuery.after, DatePattern)
        )
            return true;

        return !moment(debouncedQuery.after).isAfter(
            moment(debouncedQuery.before)
        );
    }

    function isAmountSpanValid() {
        if (
            isEmpty(debouncedQuery.moreThan) ||
            !isValueValid(debouncedQuery.moreThan, AmountPattern) ||
            isEmpty(debouncedQuery.lessThan) ||
            !isValueValid(debouncedQuery.lessThan, AmountPattern)
        )
            return true;

        return (
            Number(debouncedQuery.lessThan) > Number(debouncedQuery.moreThan)
        );
    }
}

export default TransactionFilters;
