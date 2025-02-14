import Category from '../types/Category';
import BaseService from './baseService';

class CategoryService extends BaseService {

    getCategories(): Promise<Category[]> {
        return this.get<Category[]>("/Category/List")
    }

}

export default new CategoryService();