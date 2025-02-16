import moment from "moment";
import { useState } from "react";
import { toBreakdown } from "../utils/BreakdownHelper";
import { useNavigate } from "react-router-dom";


function CustomReportForm() {

    const [validationMessage, setValidationMessage] = useState("")

    const navigate = useNavigate()

    return (
        <>
            <div className="drawer-content-body">

                <h2>Custom Report</h2>

                <form className="form">
                    <div>
                        <h4>Start</h4>
                        <input name="start" placeholder="yyyy-MM-dd" />
                    </div>
                    <div>
                        <h4>End</h4>
                        <input name="end" placeholder="yyyy-MM-dd" />
                    </div>
                    {validationMessage == "" ? "" :
                        <p className="validation-error">{validationMessage}</p>
                    }
                </form>
            </div>
            <div className="drawer-content-foot" style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                </div>

                <div>
                    <button className="button">Cancel</button>
                    <button className="button-fill">Submit</button>
                </div>
            </div>
        </>
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