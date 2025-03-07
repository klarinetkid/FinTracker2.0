import moment from "moment";
import { UseFormReturn } from "react-hook-form";
import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Row from "../../components/Row";
import Select from "../../components/Select";
import styles from "../../styles/TrendInputs.module.css";
import TrendQuery from "../../types/TrendQuery";
import { DatePattern } from "../../utils/ValidationHelper";

interface TrendInputsProps {
    form: UseFormReturn<TrendQuery>;
}

function TrendInputs({ form }: TrendInputsProps) {
    const errors = form.formState.errors;

    return (
        <Row gap={6}>
            <FormGroup fieldName="Start" error={errors.start}>
                <Input
                    placeholder="yyyy-mm-dd"
                    registration={form.register("start", {
                        required: true,
                        pattern: DatePattern,
                    })}
                />
            </FormGroup>
            <FormGroup fieldName="End" error={errors.end}>
                <Input
                    placeholder="yyyy-mm-dd"
                    registration={form.register("end", {
                        required: true,
                        pattern: DatePattern,
                        validate: (end, query) => {
                            return moment(end).isSameOrBefore(
                                moment(query.start)
                            )
                                ? "End must be after start."
                                : true;
                        },
                    })}
                />
            </FormGroup>
            <FormGroup fieldName="Interval">
                <div className={styles.intervalGroup}>
                    <Select
                        registration={form.register("intervalNum", {
                            valueAsNumber: true,
                        })}
                    >
                        {[...Array(27).keys()].slice(1).map((i) => (
                            <option key={i}>{i}</option>
                        ))}
                    </Select>
                    <Select registration={form.register("interval")}>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </Select>
                </div>
            </FormGroup>
        </Row>
    );
}

export default TrendInputs;
