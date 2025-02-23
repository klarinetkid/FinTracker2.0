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
    const globalDataCache = useGlobalDataCache();

    return (
        <Row gap={6}>
            <FormGroup fieldName="Search">
                <Input
                    placeholder="Search"
                    name="search"
                    value={props.formValues.values.search ?? ""}
                    onChange={props.formValues.updateValue}
                />
            </FormGroup>
            <FormGroup fieldName="Category">
                <CategorySelector
                    allowEmpty={true}
                    categories={globalDataCache.categories.value}
                    onChange={(c: Category | undefined) => {
                        const categoryId = c && c.id === undefined ? -1 : c?.id;
                        props.formValues.setValues({
                            ...props.formValues.values,
                            categoryId: categoryId,
                        });
                    }}
                    value={
                        globalDataCache.categories.value.filter(
                            (c) => c.id === props.formValues.values?.categoryId
                        )[0]
                    }
                />
            </FormGroup>
            <FormGroup fieldName="After">
                <Input
                    name="after"
                    value={props.formValues.values.after ?? ""}
                    onChange={props.formValues.updateValue}
                />
            </FormGroup>
            <FormGroup fieldName="Before">
                <Input
                    name="before"
                    value={props.formValues.values.before ?? ""}
                    onChange={props.formValues.updateValue}
                />
            </FormGroup>
        </Row>
    );
}

export default TransactionFilters;
