type Category = {
    id: number;
    categoryName: string;
    colour: string;
};

export const Uncategorized = {
    id: undefined,
    categoryName: "uncategorized",
    colour: "#ffffff",
} as const;

export const Total: Category = {
    id: -1,
    categoryName: "Total",
    colour: "#330033",
} as const;

export const NeverImport: Category = {
    id: -1,
    categoryName: "Never import",
    colour: "#990000",
} as const;

export type CategoryOrUncategorized = Category | typeof Uncategorized;

export default Category;
