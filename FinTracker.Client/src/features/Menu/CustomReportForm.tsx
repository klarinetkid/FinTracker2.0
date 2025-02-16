import moment from "moment";
import { useState } from "react";
import { toBreakdown } from "../../utils/BreakdownHelper";
import { useNavigate } from "react-router-dom";

interface CustomReportFormProps {
    onCancel: () => void;
}

function CustomReportForm(props: CustomReportFormProps) {
    const navigate = useNavigate();

    return (
        <form className="form drawer-content" onSubmit={formSubmit}>
            <div className="drawer-content-body">
                <h2>Custom Report</h2>

                <div className="control-group">
                    <h4>Start</h4>
                    <input name="start" placeholder="yyyy-MM-dd" />
                </div>
                <div className="control-group">
                    <h4>End</h4>
                    <input name="end" placeholder="yyyy-MM-dd" />
                </div>
            </div>
            <div
                className="drawer-content-foot"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div></div>

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
