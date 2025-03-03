import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import Drawer from "../../components/Drawer";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import { toBreakdown } from "../../utils/BreakdownHelper";

interface CustomReportFormProps {
    isDrawerOpen: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type CustomReport = {
    start?: string;
    end?: string;
};

function CustomReportForm(props: CustomReportFormProps) {
    const { isDrawerOpen, setIsDrawerOpen } = props;

    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<CustomReport>();

    useEffect(() => reset({ start: "", end: "" }), [isDrawerOpen]);

    return (
        <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
            <form className="form" onSubmit={handleSubmit(formSubmit)}>
                <div>
                    <h2>Custom Report</h2>

                    <FormGroup fieldName="Start" error={errors.start}>
                        <Input
                            placeholder="yyyy-mm-dd"
                            registration={register("start", { required: true })}
                        />
                    </FormGroup>
                    <FormGroup fieldName="End" error={errors.end}>
                        <Input
                            placeholder="yyyy-mm-dd"
                            registration={register("end", { required: true })}
                        />
                    </FormGroup>
                </div>
                <div>
                    <div>
                        <Button
                            type="button"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            Cancel
                        </Button>
                        <ButtonFill type="submit">Submit</ButtonFill>
                    </div>
                </div>
            </form>
        </Drawer>
    );

    function formSubmit(values: FieldValues) {
        navigate(toBreakdown(values.start, values.end));
        setIsDrawerOpen(false);
    }
}

export default CustomReportForm;
