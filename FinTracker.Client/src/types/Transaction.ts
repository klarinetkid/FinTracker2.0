import Category from "./Category"

type Transaction = {
	id: number,
	date: Date,
	amount: number,
	memo: string,
	categoryId: number | undefined,
	category: Category | undefined
}

export default Transaction