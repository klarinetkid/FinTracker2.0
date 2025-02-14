import { useEffect, useState } from 'react';
import CategoryService from '../services/CategoryService';
import MetadataService from '../services/MetadataService';
import Category from '../types/Category';
import { GlobalDataCacheContext, GlobalDataCacheContextManager, GlobalDataCacheItem } from './GlobalDataCacheContext';

export default function GlobalDataCacheProvider({ children }: { children: React.ReactNode }) {

    const value = new GlobalDataCacheContextManager({
        availableYears: new GlobalDataCacheItem(...useState<number[]>([]), MetadataService.getAvailableYears.bind(MetadataService)),
        categories: new GlobalDataCacheItem(...useState<Category[]>([]), CategoryService.getCategories.bind(CategoryService))
    })

    useEffect(() => value.initializeData(), [])

    return (
        <GlobalDataCacheContext.Provider value={value}>
            {children}
        </GlobalDataCacheContext.Provider>
    )
}