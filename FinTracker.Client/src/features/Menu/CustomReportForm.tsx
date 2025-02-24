import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import Drawer from "../../components/Drawer";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import { useFormValues } from "../../hooks/useFormValues";
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
    const navigate = useNavigate();
    const { isDrawerOpen, setIsDrawerOpen } = props;

    const formValues = useFormValues<CustomReport>({});

    useEffect(() => formValues.setValues({}), [isDrawerOpen]);

    return (
        <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
            <form className="form" onSubmit={formSubmit}>
                <div>
                    <h2>Custom Report</h2>

                    <FormGroup fieldName="Start">
                        <Input
                            name="start"
                            placeholder="yyyy-mm-dd"
                            value={formValues.values.start ?? ""}
                            onChange={formValues.updateValue}
                        />
                    </FormGroup>
                    <FormGroup fieldName="End">
                        <Input
                            name="end"
                            placeholder="yyyy-mm-dd"
                            value={formValues.values.end ?? ""}
                            onChange={formValues.updateValue}
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

    function formSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        navigate(
            toBreakdown(
                formValues.values.start ?? "",
                formValues.values.end ?? ""
            )
        );

        setIsDrawerOpen(false);
    }
}

export default CustomReportForm;
