import { EntityManagementFormProps } from "../../components/EntityManagementPage";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Spacer from "../../components/Spacer";
import ImportFormatViewModel from "../../types/ImportFormatViewModel";

function FormatForm(props: EntityManagementFormProps<ImportFormatViewModel>) {
    const {
        form: {
            register,
            formState: { errors },
        },
    } = props;

    return (
        <>
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
                <Input registration={register("dateKey", { required: true })} />
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
            <FormGroup fieldName="Invert Amounts" error={errors.invertAmounts}>
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
        </>
    );
}

export default FormatForm;
