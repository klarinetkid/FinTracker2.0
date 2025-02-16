import Category from '../types/Category';
import CategoryTransactionCount from '../types/CategoryTransactionCount';
import BaseService from './baseService';

class CategoryService extends BaseService {

    getCategories(): Promise<Category[]> {
        return this.get<Category[]>("/Category/List")
    }

    getCategoryTransactionCounts(): Promise<CategoryTransactionCount[]> {
        return this.get<CategoryTransactionCount[]>("/Category/CategoryTransactionCounts")
    }

    createCategory(category: Category): Promise<Category> {
        return this.post<Category>("/Category/Create", category)
    }

    deleteCategory(categoryId: number): Promise<void> {
        return this.delete("/Category/Delete?id="+categoryId)
    }
}

export default new CategoryService();