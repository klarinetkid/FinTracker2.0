import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import IconButton from "../../components/IconButton";
import InOutPills from "../../components/InOutPills";
import Page from "../../components/Page";
import Spacer from "../../components/Spacer";
import TransactionTable from "../../components/TransactionTable";
import CategorySelectionProvider from "../../contexts/CategorySelectionProvider";
import BreakdownService from "../../services/BreakdownService";
import styles from "../../styles/BreakdownPage.module.css";
import Breakdown from "../../types/Breakdown";
import { breakdownParamsAreValid } from "../../utils/BreakdownHelper";
import { BackIcon } from "../../utils/Icons";
import IncomeCard from "./IncomeCard";
import SpendingTable from "./SpendingTable";
import Row from "../../components/Row";

function BreakdownPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const start = useMemo(
        () => searchParams.get("start") ?? "",
        [searchParams]
    );
    const end = useMemo(() => searchParams.get("end") ?? "", [searchParams]);
    const paramsAreValid = breakdownParamsAreValid(moment(start), moment(end));

    const [breakdown, setBreakdown] = useState<Breakdown>();
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        (async () => {
            if (!paramsAreValid) return;
            const data = await BreakdownService.getBreakdown(start, end);
            setBreakdown(data);
        })();
    }, [paramsAreValid, start, end, isUpdated]);


    return !paramsAreValid ? (
        <Page>
            <Row justifyContent="space-between">
                <IconButton
                    icon={BackIcon}
                    title="To dashboard"
                    onClick={() => navigate("/")}
                />
                <h1 className="centre">Invalid Query</h1>
                <div></div>
            </Row>
        </Page>
    ) : (
        <Page>
            <div className={styles.header}>
                <IconButton
                    title="Back to dashboard"
                    icon={BackIcon}
                    onClick={backClick}
                />
                <div>
                    <h1>{breakdown ? breakdown.title : "Loading..."}</h1>

                    <div className={styles.subtitle}>
                        {breakdown ? breakdown.subtitle : ""}
                    </div>
                </div>
            </div>

            {breakdown ? (
                <>
                    <InOutPills
                        totalIn={breakdown.totalIn}
                        totalOut={breakdown.totalOut}
                    />

                    <Spacer height={26} />

                    <CategorySelectionProvider>
                        <div className={styles.details}>
                            <div className={styles.spendingTableHolder}>
                                <SpendingTable
                                    categoryTotals={breakdown.categoryTotals}
                                />
                            </div>
                            <div className={styles.incomeColumn}>
                                {breakdown.categoryTotals
                                    .filter((c) => c.total > 0)
                                    .sort((a, b) => b.total - a.total)
                                    .map((c, i) => (
                                        <IncomeCard key={i} categoryTotal={c} />
                                    ))}
                            </div>
                        </div>

                        <Spacer height={26} />

                        <TransactionTable
                            query={{
                                after: moment(breakdown.start).format(
                                    "yyyy-MM-DD"
                                ),
                                before: moment(breakdown.end).format(
                                    "yyyy-MM-DD"
                                ),
                                orderBy: "date",
                                order: "asc",
                            }}
                            onChange={refreshBreakdown}
                        />
                    </CategorySelectionProvider>
                </>
            ) : (
                ""
            )}
        </Page>
    );

    function refreshBreakdown() {
        setIsUpdated(!isUpdated);
    }

    function backClick() {
        const year = moment(breakdown?.start).format("yyyy");
        switch (breakdown?.type) {
            case "Week":
                navigate(`/?year=${year}&view=weekly`);
                return;
            case "Month":
                navigate(`/?year=${year}`);
                return;
        }

        navigate("/");
    }
}

export default BreakdownPage;
