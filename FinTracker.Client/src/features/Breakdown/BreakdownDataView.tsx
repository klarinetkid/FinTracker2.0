import InOutPills from "../../components/InOutPills";
import Spacer from "../../components/Spacer";
import TransactionTable from "../../components/TransactionTable";
import CategorySelectionProvider from "../../contexts/CategorySelectionProvider";
import styles from "../../styles/BreakdownDataView.module.css";
import Breakdown from "../../types/Breakdown";
import {
    getIncomeCategories,
    getSpendingCategories,
} from "../../utils/BreakdownHelper";
import { formatDateOnly } from "../../utils/DateHelper";
import { classList } from "../../utils/HtmlHelper";
import IncomeCard from "./IncomeCard";
import SpendingTable from "./SpendingTable";

interface BreakdownDataViewProps {
    breakdown: Breakdown;
    refresh: () => void;
}

function BreakdownDataView({ breakdown, refresh }: BreakdownDataViewProps) {

    const spendingCategories = getSpendingCategories(breakdown?.categoryTotals);
    const incomeCategories = getIncomeCategories(breakdown?.categoryTotals);

    return (
        <>
            <div className={styles.inOutPillHolder}>
                <InOutPills
                    totalIn={breakdown.totalIn}
                    totalOut={breakdown.totalOut}
                />
            </div>

            <Spacer height={26} />

            <CategorySelectionProvider>
                <div className={styles.details}>
                    {spendingCategories.length > 0 && (
                        <div className={styles.spendingTableHolder}>
                            <SpendingTable
                                spendingCategories={spendingCategories}
                            />
                        </div>
                    )}

                    {incomeCategories.length > 0 && (
                        <div
                            className={classList(
                                styles.incomeColumn,
                                spendingCategories.length === 0
                                    ? styles.horizontal
                                    : ""
                            )}
                        >
                            {incomeCategories.map((c, i) => (
                                <IncomeCard key={i} categoryTotal={c} />
                            ))}
                        </div>
                    )}
                </div>

                <Spacer height={26} />

                <TransactionTable
                    query={getTransactionQuery()}
                    onChange={refresh}
                />
            </CategorySelectionProvider>
        </>
    );

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

export default BreakdownDataView;
