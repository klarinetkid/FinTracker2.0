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
import {
    breakdownParamsAreValid,
    getIncomeCategories,
    getSpendingCategories,
} from "../../utils/BreakdownHelper";
import { BackIcon } from "../../utils/Icons";
import IncomeCard from "./IncomeCard";
import SpendingTable from "./SpendingTable";
import Row from "../../components/Row";
import { formatDateOnly } from "../../utils/DateHelper";
import LoadingIndicator from "../../components/LoadingIndicator";

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
            setBreakdown(undefined);
            const data = await BreakdownService.getBreakdown(start, end);
            setBreakdown(data);
        })();
    }, [paramsAreValid, start, end, isUpdated]);

    const spendingCategories = getSpendingCategories(breakdown?.categoryTotals);
    const incomeCategories = getIncomeCategories(breakdown?.categoryTotals);

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
                            {spendingCategories.length > 0 ? (
                                <div className={styles.spendingTableHolder}>
                                    <SpendingTable
                                        spendingCategories={spendingCategories}
                                    />
                                </div>
                            ) : (
                                ""
                            )}

                            {incomeCategories.length > 0 ? (
                                <div className={styles.incomeColumn}>
                                    {incomeCategories.map((c, i) => (
                                        <IncomeCard key={i} categoryTotal={c} />
                                    ))}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>

                        <Spacer height={26} />

                        <TransactionTable
                            query={getTransactionQuery()}
                            onChange={refreshBreakdown}
                        />
                    </CategorySelectionProvider>
                </>
            ) : (
                <LoadingIndicator />
            )}
        </Page>
    );

    function refreshBreakdown() {
        setIsUpdated(!isUpdated);
    }

    function backClick() {
        const year = moment(breakdown?.start).get("year");
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

    function getTransactionQuery() {
        if (!breakdown) return {};

        return {
            after: formatDateOnly(breakdown.start),
            before: formatDateOnly(breakdown.end),
            orderBy: "date",
            order: "asc",
        };
    }
}

export default BreakdownPage;
