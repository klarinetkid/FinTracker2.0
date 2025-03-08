import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Spacer from "../../components/Spacer";
import FormProps from "../../types/FormProps";
import ImportFormatViewModel from "../../types/ImportFormatViewModel";

function FormatForm(props: FormProps<ImportFormatViewModel>) {
    const { onSubmit, onDelete, onCancel, values } = props;

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<ImportFormatViewModel>();

    useEffect(() => {
        reset(values);
    }, [values]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>{values?.id ? "Edit" : "New"} Format</h2>

                <Spacer height={24} />

                <FormGroup
                    fieldName="Import File Format Name"
                    error={errors.importFormatName}
                >
                    <Input
                        registration={register("importFormatName", {
                            required: true,
                        })}
                    />
                </FormGroup>
                <FormGroup fieldName="Date Key" error={errors.dateKey}>
                    <Input
                        registration={register("dateKey", { required: true })}
                    />
                </FormGroup>
                <FormGroup fieldName="Memo Keys" error={errors.memoKeys}>
                    <Input
                        registration={register("memoKeys", {
                            required: true,
                        })}
                    />
                </FormGroup>
                <FormGroup fieldName="Amount Key" error={errors.amountKey}>
                    <Input
                        registration={register("amountKey", {
                            required: true,
                        })}
                    />
                </FormGroup>
                <FormGroup
                    fieldName="Invert Amounts"
                    error={errors.invertAmounts}
                >
                    <Select registration={register("invertAmounts")}>
                        <option>false</option>
                        <option>true</option>
                    </Select>
                </FormGroup>
                <FormGroup fieldName="Header Lines" error={errors.headerLines}>
                    <Input
                        registration={register("headerLines", {
                            required: true,
                            pattern: /^\d+$/,
                        })}
                    />
                </FormGroup>
                <FormGroup fieldName="Delimiter" error={errors.delimiter}>
                    <Input
                        maxLength={1}
                        registration={register("delimiter", {
                            required: true,
                            maxLength: 1,
                        })}
                    />
                </FormGroup>
                <FormGroup fieldName="Image" error={errors.image}>
                    <Input
                        maxLength={25}
                        registration={register("image", { maxLength: 25 })}
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
                    {values?.id && (
                        <Button type="button" onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}

export default FormatForm;
