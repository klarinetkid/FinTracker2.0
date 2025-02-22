import { SyntheticEvent } from "react";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Spacer from "../../components/Spacer";
import ImportFormatViewModel from "../../types/ImportFormatViewModel";
import { FormValues } from "../../hooks/useFormValues";

interface FormatsFormProps {
    formValues: FormValues<ImportFormatViewModel>;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

function FormatForm(props: FormatsFormProps) {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <h2>{props.formValues.values.id ? "Edit" : "New"} Format</h2>

                <Spacer height={24} />

                <input
                    name="id"
                    type="hidden"
                    value={props.formValues.values.id ?? ""}
                />
                <FormGroup
                    fieldName="Import File Format Name"
                    error={props.formValues.getFieldError("ImportFormatName")}
                >
                    <Input
                        name="importFormatName"
                        value={props.formValues.values.importFormatName ?? ""}
                        onChange={props.formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Date Key"
                    error={props.formValues.getFieldError("DateKey")}
                >
                    <Input
                        name="dateKey"
                        value={props.formValues.values.dateKey ?? ""}
                        onChange={props.formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Memo Format"
                    error={props.formValues.getFieldError("MemoFormat")}
                >
                    <Input
                        name="memoFormat"
                        value={props.formValues.values.memoFormat ?? ""}
                        onChange={props.formValues.updateValue}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Amount Key"
                    error={props.formValues.getFieldError("AmountKey")}
                >
                    <Input
                        name="amountKey"
                        value={props.formValues.values.amountKey ?? ""}
                        onChange={props.formValues.updateValue}
                        data-field-type="int"
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Invert Amounts"
                    error={props.formValues.getFieldError("InvertAmounts")}
                >
                    <Select
                        name="invertAmounts"
                        value={
                            props.formValues.values.invertAmounts?.toString() ??
                            ""
                        }
                        onChange={props.formValues.updateValue}
                    >
                        <option>false</option>
                        <option>true</option>
                    </Select>
                </FormGroup>
                <FormGroup
                    fieldName="Header Lines"
                    error={props.formValues.getFieldError("HeaderLines")}
                >
                    <Input
                        name="headerLines"
                        type="text"
                        value={
                            props.formValues.values.headerLines?.toString() ??
                            ""
                        }
                        onChange={props.formValues.updateValue}
                        data-field-type="int"
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Delimiter"
                    error={props.formValues.getFieldError("Delimiter")}
                >
                    <Input
                        name="delimiter"
                        value={props.formValues.values.delimiter ?? ""}
                        onChange={props.formValues.updateValue}
                        maxLength={1}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Image"
                    error={props.formValues.getFieldError("Image")}
                >
                    <Input
                        name="image"
                        value={props.formValues.values.image ?? ""}
                        onChange={props.formValues.updateValue}
                    />
                </FormGroup>
            </div>
            <div>
                <div>
                    <Button type="button" onClick={props.onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill type="submit">Submit</ButtonFill>
                </div>
                <div>
                    {props.formValues.values.id ? (
                        <Button type="button" onClick={props.onDelete}>
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
