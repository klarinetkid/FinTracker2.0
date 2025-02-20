import { SyntheticEvent } from "react";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import Spacer from "../../components/Spacer";
import { FormatFormValues } from "../../types/forms/ImportFileFormatFormValues";
import Input from "../../components/Input";
import Select from "../../components/Select";
import FormGroup from "../../components/FormGroup";

interface FormatsFormProps {
    formValues: FormatFormValues;
    updateFormValues: (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLSelectElement>
    ) => void;
    onSubmit: (event: SyntheticEvent) => void;
    onDelete: () => void;
    onCancel: () => void;
}

function FormatForm(props: FormatsFormProps) {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                <h2>{props.formValues.id === 0 ? "New" : "Edit"} Format</h2>

                <Spacer height={24} />

                <input name="id" type="hidden" value={props.formValues.id} />
                <FormGroup fieldName="Import File Format Name">
                    <Input
                        name="importFileFormatName"
                        value={props.formValues.importFileFormatName}
                        onChange={props.updateFormValues}
                    />
                </FormGroup>
                <FormGroup fieldName="Date Key">
                    <Input
                        name="dateKey"
                        value={props.formValues.dateKey}
                        onChange={props.updateFormValues}
                    />
                </FormGroup>
                <FormGroup fieldName="Memo Format">
                    <Input
                        name="memoFormat"
                        value={props.formValues.memoFormat}
                        onChange={props.updateFormValues}
                    />
                </FormGroup>
                <FormGroup fieldName="Amount Key">
                    <Input
                        name="amountKey"
                        value={props.formValues.amountKey}
                        onChange={props.updateFormValues}
                        data-field-type="int"
                    />
                </FormGroup>
                <FormGroup fieldName="Invert Amounts">
                    <Select
                        name="invertAmounts"
                        value={props.formValues.invertAmounts.toString()}
                        onChange={props.updateFormValues}
                    >
                        <option>false</option>
                        <option>true</option>
                    </Select>
                </FormGroup>
                <FormGroup fieldName="Header Lines">
                    <Input
                        name="headerLines"
                        type="number"
                        value={props.formValues.headerLines.toString()}
                        onChange={props.updateFormValues}
                        data-field-type="int"
                    />
                </FormGroup>
                <FormGroup fieldName="Delimiter">
                    <Input
                        name="delimiter"
                        value={props.formValues.delimiter}
                        onChange={props.updateFormValues}
                        maxLength={1}
                    />
                </FormGroup>
                <FormGroup fieldName="Image">
                    <Input
                        name="image"
                        value={props.formValues.image}
                        onChange={props.updateFormValues}
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
                    {props.formValues.id === 0 ? (
                        ""
                    ) : (
                        <Button type="button" onClick={props.onDelete}>
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}

export default FormatForm;
