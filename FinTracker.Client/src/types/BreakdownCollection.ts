import Breakdown from "./Breakdown";

type BreakdownCollection = {
    breakdowns: Breakdown[];
    type: string;
    isEmpty: boolean;
    totalIn: number;
    totalOut: number;
    totalIncome: number;
};

export default BreakdownCollection;
