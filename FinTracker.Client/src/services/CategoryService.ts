import Category from "../types/Category";
import CategoryReferenceCounts from "../types/CategoryReferenceCounts";
import CategoryViewModel from "../types/CategoryViewModel";
import BaseService from "./BaseService";

class CategoryService extends BaseService {
    constructor() {
        super("/Categories");
    }

    getCategories(): Promise<Category[]> {
        return this.get<Category[]>("");
    }

    getCategoryTransactionCounts(): Promise<CategoryReferenceCounts[]> {
        return this.get<CategoryReferenceCounts[]>("/WithCounts");
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
