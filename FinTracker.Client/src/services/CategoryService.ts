import Category, { CategoryTransactionCount } from "../types/Category";
import BaseService from "./baseService";

class CategoryService extends BaseService {
    getCategories(): Promise<Category[]> {
        return this.get<Category[]>("/Categories");
    }

    getCategoryTransactionCounts(): Promise<CategoryTransactionCount[]> {
        return this.get<CategoryTransactionCount[]>("/Categories/WithCounts");
    }

    createCategory(category: Category): Promise<Category> {
        return this.post<Category>("/Categories", category);
    }

    putCategory(category: Category): Promise<Category> {
        return this.put<Category>(`/Categories/${category.id}`, category);
    }

    deleteCategory(category: Category): Promise<void> {
        return this.delete(`/Categories/${category.id}`);
    }
}

export default new CategoryService();
