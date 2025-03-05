import { createContext } from "react";
import Category, { CategoryOrUncategorized } from "../types/Category";

export class CategorySelectionManager {
    selectedCategories: CategoryOrUncategorized[];
    setSelectedCategories: React.Dispatch<
        React.SetStateAction<CategoryOrUncategorized[]>
    >;

    constructor(
        state?: [
            Category[],
            React.Dispatch<React.SetStateAction<CategoryOrUncategorized[]>>,
        ]
    ) {
        if (state)
            [this.selectedCategories, this.setSelectedCategories] = state;
        else {
            this.selectedCategories = [];
            this.setSelectedCategories = () => undefined;
        }
    }

    addCategory = (cat: CategoryOrUncategorized) => {
        if (!this.isSelected(cat)) {
            const newCategories = [...this.selectedCategories, cat];
            this.setSelectedCategories(newCategories);
        }
    };

    addCategories = (cats: CategoryOrUncategorized[]) => {
        const newCategories = [...this.selectedCategories];
        for (const cat of cats)
            if (!this.isSelected(cat)) newCategories.push(cat);

        if (newCategories.length !== this.selectedCategories.length)
            this.setSelectedCategories(newCategories);
    };

    removeCategory = (cat: CategoryOrUncategorized) => {
        if (this.isSelected(cat)) {
            const index = this.selectedCategories
                .map((c) => c.id)
                .indexOf(cat.id);
            const newCategories = [...this.selectedCategories];
            newCategories.splice(index, 1);
            this.setSelectedCategories(newCategories);
        }
    };

    toggleCategory = (cat: CategoryOrUncategorized) => {
        if (this.isSelected(cat)) this.removeCategory(cat);
        else this.addCategory(cat);
    };

    clear = () => {
        this.setSelectedCategories([]);
    };

    isSelected = (cat: CategoryOrUncategorized) => {
        return this.selectedCategories.map((c) => c.id).indexOf(cat.id) > -1;
    };
}

export const CategorySelectionContext = createContext(
    new CategorySelectionManager()
);
