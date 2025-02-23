type Category = {
    id: number | undefined;
    categoryName: string;
    colour: string;
};

export const Uncategorized: Category = {
    id: undefined,
    categoryName: "uncategorized",
    colour: "#ffffff",
};

export const Total: Category = {
    id: -1,
    categoryName: "Total",
    colour: "#330033",
};

export const NeverImport: Category = {
    id: undefined,
    categoryName: "Never import",
    colour: "#990000",
};

export type CategoryTransactionCount = {
    id: number;
    categoryName: string;
    colour: string;
    transactionCount: number;
};

export default Category;
