import { useState } from 'react';
import Category from '../types/Category';
import { CategorySelectionContext, CategorySelectionManager } from './CategorySelectionContext';

export default function CategorySelectionProvider({ children }: { children: React.ReactNode }) {

    const state = useState<Category[]>([])
    const contextValue = new CategorySelectionManager(state)

    return (
        <CategorySelectionContext.Provider value={contextValue}>
            {children}
        </CategorySelectionContext.Provider>
    )
}