import CategoryTotal from "./CategoryTotal";

type Breakdown = {
    start: string;
    end: string;
    title: string;
    subtitle: string;
    totalIn: number;
    totalOut: number;
    categoryTotals: CategoryTotal[];
};

export default Breakdown;
