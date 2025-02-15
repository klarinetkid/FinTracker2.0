import moment from "moment";
import { useState } from "react";
import { toBreakdown } from "../utils/BreakdownHelper";
import { useNavigate } from "react-router-dom";

function CustomReportForm() {

    const [validationMessage, setValidationMessage] = useState("")

    const navigate = useNavigate()

    return (
        <div className="custom-report-form-holder">
            <h2>Custom Report</h2>
            <form onSubmit={formSubmit}>
                <div>
                    <h2>Start</h2>
                    <input name="start" placeholder="yyyy-MM-dd" />
                </div>
                <div>
                    <h2>End</h2>
                    <input name="end" placeholder="yyyy-MM-dd" />
                </div>
                {validationMessage == "" ? "" :
                    <p className="validation-error">{validationMessage}</p>    
                }
                <div>
                    <input value="Submit" type="submit" className="btn" />
                </div>
            </form>
        </div>
    );

    function formSubmit(event: React.FormEvent<HTMLFormElement>) {
        const formData = new FormData(event.target)
        const start = moment(formData.get("start")?.toString())
        const end = moment(formData.get("end")?.toString())

        let error: string | undefined;

        if (!start.isValid()) error = "Start is invalid."
        else if (!end.isValid()) error = "End is invalid."
        else if (!end.isAfter(start)) error = "End must be after start."
        
        if (error) {
            setValidationMessage(error)
        } else {
            navigate(toBreakdown(start, end))
        }

        event.preventDefault()
        return false
    }
}

export default CustomReportForm;