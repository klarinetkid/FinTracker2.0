import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Spacer from "../../components/Spacer";
import FormProps from "../../types/FormProps";
import ImportFormatViewModel from "../../types/ImportFormatViewModel";

function FormatForm(props: FormProps<ImportFormatViewModel>) {
    const { formValues, onSubmit, onDelete, onCancel } = props;

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>{formValues.values.id ? "Edit" : "New"} Format</h2>

                <Spacer height={24} />

                <input
                    name="id"
                    type="hidden"
                    value={formValues.values.id ?? ""}
                />
                <FormGroup
                    fieldName="Import File Format Name"
                    error={formValues.getFieldError("ImportFormatName")}
                >
                    <Input
                        name="importFormatName"
                        value={formValues.values.importFormatName ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Date Key"
                    error={formValues.getFieldError("DateKey")}
                >
                    <Input
                        name="dateKey"
                        value={formValues.values.dateKey ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Memo Format"
                    error={formValues.getFieldError("MemoFormat")}
                >
                    <Input
                        name="memoFormat"
                        value={formValues.values.memoFormat ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Amount Key"
                    error={formValues.getFieldError("AmountKey")}
                >
                    <Input
                        name="amountKey"
                        value={formValues.values.amountKey ?? ""}
                        onChange={formValues.updateValue}
                        data-field-type="int"
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Invert Amounts"
                    error={formValues.getFieldError("InvertAmounts")}
                >
                    <Select
                        name="invertAmounts"
                        value={
                            formValues.values.invertAmounts?.toString() ?? ""
                        }
                        onChange={formValues.updateValue}
                    >
                        <option>false</option>
                        <option>true</option>
                    </Select>
                </FormGroup>
                <FormGroup
                    fieldName="Header Lines"
                    error={formValues.getFieldError("HeaderLines")}
                >
                    <Input
                        name="headerLines"
                        type="text"
                        value={formValues.values.headerLines?.toString() ?? ""}
                        onChange={formValues.updateValue}
                        data-field-type="int"
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Delimiter"
                    error={formValues.getFieldError("Delimiter")}
                >
                    <Input
                        name="delimiter"
                        value={formValues.values.delimiter ?? ""}
                        onChange={formValues.updateValue}
                        maxLength={1}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Image"
                    error={formValues.getFieldError("Image")}
                >
                    <Input
                        name="image"
                        value={formValues.values.image ?? ""}
                        onChange={formValues.updateValue}
                    />
                </FormGroup>
            </div>
            <div>
                <div>
                    <Button type="button" onClick={onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill type="submit">Submit</ButtonFill>
                </div>
                <div>
                    {formValues.values.id ? (
                        <Button type="button" onClick={onDelete}>
                            Delete
                        </Button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </form>
    );
}

export default FormatForm;
