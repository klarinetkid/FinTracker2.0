import moment from "moment";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ButtonFill from "../../components/ButtonFill";
import Page from "../../components/Page";
import Row from "../../components/Row";
import StatusIndicator from "../../components/StatusIndicator";
import TrendService from "../../services/TrendService";
import styles from "../../styles/TrendsPage.module.css";
import TrendLineCollection from "../../types/TrendLineCollection";
import TrendQuery from "../../types/TrendQuery";
import { formatDateOnly } from "../../utils/DateHelper";
import CategoryList from "./CategoryList";
import TrendGraph from "./TrendGraph";
import TrendInputs from "./TrendInputs";

type TrendsPageState =
    | "initial"
    | "loading"
    | "no data"
    | "show data"
    | "error";

const defaultValues: TrendQuery = {
    interval: "week",
    intervalNum: 1,
    start: formatDateOnly(moment().subtract(6, "months")),
    end: formatDateOnly(moment()),
};

function TrendsPage() {
    const [pageState, setPageState] = useState<TrendsPageState>("initial");
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [trends, setTrends] = useState<TrendLineCollection>();
    const form = useForm<TrendQuery>({ defaultValues });

    return (
        <Page className={styles.page}>
            <Row>
                <h1>Trends</h1>
            </Row>

            <form onSubmit={form.handleSubmit(getTrends)}>
                <TrendInputs form={form} />

                <Row className={styles.datarow}>
                    <div className={styles.leftcol}>
                        <CategoryList
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                        <ButtonFill type="submit" disabled={!anyCatsSelected()}>
                            View Trends
                            {selectedCategories.length > 0 &&
                                ` (${selectedCategories.length})`}
                        </ButtonFill>
                    </div>
                    <div className={styles.bodyContainer}>{getPageBody()}</div>
                </Row>
            </form>
        </Page>
    );

    function getPageBody() {
        switch (pageState) {
            case "error":
                return <StatusIndicator status="error" />;

            case "no data":
                return (
                    <StatusIndicator
                        status="info"
                        message="No data for the selected query"
                    />
                );

            case "show data":
            case "loading":
                return (
                    <>
                        {pageState === "loading" && (
                            <StatusIndicator status="loading" />
                        )}

                        {trends !== undefined && (
                            <TrendGraph
                                trend={trends}
                                sizing={{
                                    width: 820,
                                    height: 820,
                                    xAxis: 65,
                                    yAxis: 75,
                                    padding: 10,
                                }}
                            />
                        )}
                    </>
                );
        }
    }

    function anyCatsSelected() {
        // TODO: validate the other shits
        return selectedCategories.length > 0;
    }

    function getTrends(query: FieldValues) {
        setPageState("loading");

        TrendService.getTrends({
            ...query,
            categoryId: selectedCategories,
        })
            .then((trends) => {
                form.reset({}, { keepValues: true });
                if (trends.lowerBound === null && trends.upperBound === null) {
                    setTrends(undefined);
                    setPageState("no data");
                } else {
                    setTrends(trends);
                    setPageState("show data");
                }
            })
            .catch(() => {
                setPageState("error");
            });
    }
}

export default TrendsPage;
