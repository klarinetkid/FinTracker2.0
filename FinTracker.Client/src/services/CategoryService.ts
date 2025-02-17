import Category, { CategoryTransactionCount } from "../types/Category";
import CategoryViewModel from "../types/models/CategoryViewModel";
import BaseService from "./baseService";

class CategoryService extends BaseService {
    getCategories(): Promise<Category[]> {
        return this.get<Category[]>("/Categories");
    }

    getCategoryTransactionCounts(): Promise<CategoryTransactionCount[]> {
        return this.get<CategoryTransactionCount[]>("/Categories/WithCounts");
    }

    createCategory(category: CategoryViewModel): Promise<Category> {
        return this.post<Category>("/Categories", category);
    }

    putCategory(category: CategoryViewModel): Promise<Category> {
        return this.put<Category>(`/Categories/${category.id}`, category);
    }

    deleteCategory(categoryId: number): Promise<void> {
        return this.delete(`/Categories/${categoryId}`);
    }
}

export default new CategoryService();
