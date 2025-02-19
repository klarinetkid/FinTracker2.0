import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BackIcon from "../../assets/Back.svg?react";
import IconButton from "../../components/IconButton";
import InOutPills from "../../components/InOutPills";
import Spacer from "../../components/Spacer";
import CategorySelectionProvider from "../../contexts/CategorySelectionProvider";
import BreakdownService from "../../services/BreakdownService";
import style from "../../styles/BreakdownPage.module.css";
import Breakdown from "../../types/Breakdown";
import { breakdownParamsAreValid } from "../../utils/BreakdownHelper";
import IncomeCard from "./IncomeCard";
import SpendingTable from "./SpendingTable";
import TransactionTable from "./TransactionTable";
import Page from "../../components/Page";

function BreakdownPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const start = useMemo(
        () => searchParams.get("start") ?? "",
        [searchParams]
    );
    const end = useMemo(() => searchParams.get("end") ?? "", [searchParams]);
    const paramsAreValid = breakdownParamsAreValid(moment(start), moment(end));

    const monthCount = moment(end).diff(start, "months", true);

    const [breakdown, setBreakdown] = useState<Breakdown>();
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        if (!paramsAreValid) return;

        (async () => {
            const data = await BreakdownService.getBreakdown(start, end);
            setBreakdown(data);
        })();
    }, [paramsAreValid, start, end, isUpdated]);

    // TODO: use row here

    return !paramsAreValid ? (
        <>
            <h1>Invalid Parameters</h1>
        </>
    ) : (
        <Page width={1000}>
            <div className={style.header}>
                <IconButton
                    title="Go back"
                    icon={BackIcon}
                    onClick={() => navigate(-1)}
                />
                {/*TODO display month count below title*/}
                <h1
                    title={
                        monthCount + " month" + (monthCount === 1 ? "" : "s")
                    }
                >
                    {breakdown ? breakdown.title : "Loading..."}
                </h1>
            </div>

            {breakdown ? (
                <>
                    <InOutPills
                        totalIn={breakdown.totalIn}
                        totalOut={breakdown.totalOut}
                    />

                    <Spacer height={26} />

                    <CategorySelectionProvider>
                        <div className={style.details}>
                            <div className={style.spendingTableHolder}>
                                <SpendingTable breakdown={breakdown} />
                            </div>
                            <div className={style.incomeColumn}>
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
                            transactions={breakdown?.transactions}
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
}

export default BreakdownPage;
