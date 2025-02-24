import CategorySelector from "../../components/CategorySelector";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Row from "../../components/Row";
import { FormValues } from "../../hooks/useFormValues";
import useGlobalDataCache from "../../hooks/useGlobalDataCache";
import Category from "../../types/Category";
import TransactionQuery from "../../types/TransactionQuery";

interface TransactionFiltersProps {
    formValues: FormValues<TransactionQuery>;
}

function TransactionFilters(props: TransactionFiltersProps) {
    const { formValues } = props;
    const globalDataCache = useGlobalDataCache();

    return (
        <Row gap={6}>
            <FormGroup fieldName="Search">
                <Input
                    placeholder="Search"
                    name="search"
                    value={formValues.values.search ?? ""}
                    onChange={formValues.updateValue}
                />
            </FormGroup>
            <FormGroup fieldName="Category">
                <CategorySelector
                    allowEmpty={true}
                    categories={globalDataCache.categories.value}
                    onChange={(c: Category | undefined) => {
                        const categoryId = c && c.id === undefined ? -1 : c?.id;
                        formValues.setValues({
                            ...formValues.values,
                            categoryId: categoryId,
                        });
                    }}
                    value={
                        globalDataCache.categories.value.filter(
                            (c) => c.id === formValues.values?.categoryId
                        )[0]
                    }
                />
            </FormGroup>
            <FormGroup fieldName="After">
                <Input
                    name="after"
                    value={formValues.values.after ?? ""}
                    onChange={formValues.updateValue}
                />
            </FormGroup>
            <FormGroup fieldName="Before">
                <Input
                    name="before"
                    value={formValues.values.before ?? ""}
                    onChange={formValues.updateValue}
                />
            </FormGroup>
        </Row>
    );
}

export default TransactionFilters;
