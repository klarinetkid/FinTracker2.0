import Category, { CategoryTransactionCount } from "../types/Category";
import CategoryViewModel from "../types/models/CategoryViewModel";
import BaseService from "./baseService";

class CategoryService extends BaseService {
    constructor() {
        super("/Categories");
    }

    getCategories(): Promise<Category[]> {
        return this.get<Category[]>("");
    }

    getCategoryTransactionCounts(): Promise<CategoryTransactionCount[]> {
        return this.get<CategoryTransactionCount[]>("/WithCounts");
    }

    createCategory(model: CategoryViewModel): Promise<Category> {
        return this.post<Category>("", model);
    }

    putCategory(model: CategoryViewModel): Promise<Category> {
        const { id, ...values } = model;
        return this.put<Category>(`/${id}`, values);
    }

    deleteCategory(id: number): Promise<void> {
        return this.delete(`/${id}`);
    }
}

export default new CategoryService();
