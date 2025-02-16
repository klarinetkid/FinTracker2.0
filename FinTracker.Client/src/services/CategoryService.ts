import Category from '../types/Category';
import CategoryTransactionCount from '../types/CategoryTransactionCount';
import BaseService from './baseService';

class CategoryService extends BaseService {

    getCategories(): Promise<Category[]> {
        return this.get<Category[]>("/Categories")
    }

    getCategoryTransactionCounts(): Promise<CategoryTransactionCount[]> {
        return this.get<CategoryTransactionCount[]>("/Categories/WithCounts")
    }

    createCategory(category: Category): Promise<Category> {
        return this.post<Category>("/Categories", category)
    }

    patchCategory(category: Category): Promise<Category> {
        return this.patch<Category>(`/Categories/${category.id}`, category)
    }

    deleteCategory(category: Category): Promise<void> {
        return this.delete(`/Categories/${category.id}`)
    }
}

export default new CategoryService();