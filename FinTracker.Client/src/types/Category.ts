
type Category = {
    id: number | undefined,
    categoryName: string,
    colour: string
}

export const Uncategorized: Category = {
    id: undefined,
    categoryName: "uncategorized",
    colour: "ffffff"
}

export const Total: Category = {
    id: -2,
    categoryName: "Total",
    colour: "330033"
}

export default Category;