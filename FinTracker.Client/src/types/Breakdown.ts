import CategoryTotal from "./CategoryTotal";

type Breakdown = {
    start: string;
    end: string;
    title: string;
    subtitle: string;
    type: string;
    totalIn: number;
    totalOut: number;
    isEmpty: boolean;
    categoryTotals: CategoryTotal[];
};

export default Breakdown;
