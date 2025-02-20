import moment from "moment";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import ButtonFill from "../../components/ButtonFill";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import { toBreakdown } from "../../utils/BreakdownHelper";

interface CustomReportFormProps {
    onCancel: () => void;
}

function CustomReportForm(props: CustomReportFormProps) {
    const navigate = useNavigate();

    return (
        <form className="form" onSubmit={formSubmit}>
            <div>
                <h2>Custom Report</h2>

                <FormGroup fieldName="Start">
                    <Input name="start" type="date" placeholder="yyyy-MM-dd" />
                </FormGroup>
                <FormGroup fieldName="End">
                    <Input name="end" type="date" placeholder="yyyy-MM-dd" />
                </FormGroup>
            </div>
            <div>
                <div>
                    <Button type="button" onClick={props.onCancel}>
                        Cancel
                    </Button>
                    <ButtonFill type="submit">Submit</ButtonFill>
                </div>
            </div>
        </form>
    );

    function formSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!(event.target instanceof HTMLFormElement)) return;

        const formData = new FormData(event.target);
        const start = moment(formData.get("start")?.toString());
        const end = moment(formData.get("end")?.toString());

        navigate(toBreakdown(start, end));

        props.onCancel();
        event.target.reset();
    }
}

export default CustomReportForm;
