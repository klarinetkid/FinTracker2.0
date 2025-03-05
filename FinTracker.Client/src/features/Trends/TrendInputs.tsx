import FormGroup from "../../components/FormGroup";
import Input from "../../components/Input";
import Row from "../../components/Row";
import Select from "../../components/Select";
import TrendQuery from "../../types/TrendQuery";
import styles from "../../styles/TrendInputs.module.css";

interface TrendInputsProps {
    query: TrendQuery;
    setQuery: React.Dispatch<React.SetStateAction<TrendQuery>>;
}

function TrendInputs(props: TrendInputsProps) {
    const { query, setQuery } = props;

    return (
        <Row gap={6}>
            <FormGroup fieldName="Start">
                <Input
                    placeholder="yyyy-mm-dd"
                    value={query.start ?? ""}
                    onChange={(e) =>
                        setQuery({
                            ...query,
                            start: e.target.value,
                        })
                    }
                />
            </FormGroup>
            <FormGroup fieldName="End">
                <Input
                    placeholder="yyyy-mm-dd"
                    value={query.end ?? ""}
                    onChange={(e) =>
                        setQuery({
                            ...query,
                            end: e.target.value,
                        })
                    }
                />
            </FormGroup>
            <FormGroup fieldName="Interval">
                <div className={styles.intervalGroup}>
                    <Select
                        value={query.intervalNum ?? ""}
                        onChange={(e) =>
                            setQuery({
                                ...query,
                                intervalNum: Number(e.target.value),
                            })
                        }
                    >
                        {[...Array(27).keys()].slice(1).map((i) => (
                            <option key={i}>{i}</option>
                        ))}
                    </Select>
                    <Select
                        value={query.interval ?? ""}
                        onChange={(e) =>
                            setQuery({
                                ...query,
                                interval: e.target.value,
                            })
                        }
                    >
                        <option value="month">Month</option>
                        <option value="week">Week</option>
                        <option value="year">Year</option>
                    </Select>
                </div>
            </FormGroup>
        </Row>
    );
}

export default TrendInputs;
