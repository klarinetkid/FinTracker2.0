import { useState } from "react";
import ButtonFill from "../../components/ButtonFill";
import Page from "../../components/Page";
import Row from "../../components/Row";
import TrendService from "../../services/TrendService";
import styles from "../../styles/TrendsPage.module.css";
import TrendLineCollection from "../../types/TrendLineCollection";
import TrendQuery from "../../types/TrendQuery";
import CategoryList from "./CategoryList";
import TrendGraph from "./TrendGraph";
import TrendInputs from "./TrendInputs";

function TrendsPage() {
    const [query, setQuery] = useState<TrendQuery>({
        interval: "month",
        intervalNum: 1,
        // for dev
        start: "2024-01-01",
        end: "2025-01-01",
    });
    const [selectedCategories, setSelectedCategories] = useState<number[]>([3]);
    const [trends, setTrends] = useState<TrendLineCollection>();

    return (
        <Page className={styles.page}>
            <Row>
                <h1>Trends</h1>
            </Row>
            <TrendInputs query={query} setQuery={setQuery} />

            <Row className={styles.datarow}>
                <div className={styles.leftcol}>
                    <CategoryList
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />
                    <ButtonFill disabled={!queryIsValid()} onClick={getTrends}>
                        View Trends
                        {selectedCategories.length > 0 &&
                            ` (${selectedCategories.length})`}
                    </ButtonFill>
                </div>
                {trends !== undefined && (
                    <TrendGraph
                        trend={trends}
                        sizing={{
                            width: 820,
                            height: 820,
                            xAxis: 65,
                            yAxis: 80,
                        }}
                    />
                )}
            </Row>
        </Page>
    );

    function queryIsValid() {
        // TODO: validate the other shits
        return selectedCategories.length > 0;
    }

    function getTrends() {
        TrendService.getTrends({
            ...query,
            categoryId: selectedCategories,
        }).then(setTrends);
    }
}

export default TrendsPage;
