import { SyntheticEvent } from "react";
import Spacer from "../../components/Spacer";
import { FormatFormValues } from "../../types/forms/ImportFileFormatFormValues";

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
        <form className="form drawer-content" onSubmit={props.onSubmit}>
            <div className="drawer-content-body">
                <h2>{props.formValues.id === 0 ? "New" : "Edit"} Format</h2>

                <Spacer height={24} />

                <input name="id" type="hidden" value={props.formValues.id} />
                <div className="control-group">
                    <h4>Import File Format Name</h4>
                    <input
                        name="importFileFormatName"
                        value={props.formValues.importFileFormatName}
                        onChange={props.updateFormValues}
                    />
                </div>
                <div className="control-group">
                    <h4>Date Key</h4>
                    <input
                        name="dateKey"
                        value={props.formValues.dateKey}
                        onChange={props.updateFormValues}
                    />
                </div>
                <div className="control-group">
                    <h4>Memo Format</h4>
                    <input
                        name="memoFormat"
                        value={props.formValues.memoFormat}
                        onChange={props.updateFormValues}
                    />
                </div>
                <div className="control-group">
                    <h4>Amount Key</h4>
                    <input
                        name="amountKey"
                        value={props.formValues.amountKey}
                        onChange={props.updateFormValues}
                        data-field-type="int"
                    />
                </div>
                {/*TODO: toggle*/}
                <div className="control-group">
                    <h4>Invert Amounts</h4>
                    <select
                        name="invertAmounts"
                        value={props.formValues.invertAmounts.toString()}
                        onChange={props.updateFormValues}
                        data-field-type="boolean"
                    >
                        <option>false</option>
                        <option>true</option>
                    </select>
                    {/*<input*/}
                    {/*    name="invertAmounts"*/}
                    {/*    value={props.formValues.invertAmounts.toString()}*/}
                    {/*    onChange={props.updateFormValues}*/}
                    {/*/>*/}
                </div>
                <div className="control-group">
                    <h4>Header Lines</h4>
                    <input
                        name="headerLines"
                        type="number"
                        value={props.formValues.headerLines.toString()}
                        onChange={props.updateFormValues}
                        data-field-type="int"
                    />
                </div>
                <div className="control-group">
                    <h4>Delimiter</h4>
                    <input
                        name="delimiter"
                        value={props.formValues.delimiter}
                        onChange={props.updateFormValues}
                        maxLength={1}
                    />
                </div>
                <div className="control-group">
                    <h4>Image</h4>
                    <input
                        name="image"
                        value={props.formValues.image}
                        onChange={props.updateFormValues}
                    />
                </div>
            </div>
            <div
                className="drawer-content-foot"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div>
                    {props.formValues.id === 0 ? (
                        ""
                    ) : (
                        <button
                            type="button"
                            className="button"
                            onClick={props.onDelete}
                        >
                            Delete
                        </button>
                    )}
                </div>

                <div>
                    <button
                        type="button"
                        className="button"
                        onClick={props.onCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="button-fill">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

export default FormatForm;
