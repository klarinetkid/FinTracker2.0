import { useEffect, useState } from 'react';
import CategoryService from '../services/CategoryService';
import MetadataService from '../services/MetadataService';
import Category from '../types/Category';
import { GlobalDataCacheContext, GlobalDataCacheContextManager, GlobalDataCacheItem } from './GlobalDataCacheContext';
import ImportFileFormat from '../types/ImportFileFormat';
import ImportFileFormatService from '../services/ImportFileFormatService';

export default function GlobalDataCacheProvider({ children }: { children: React.ReactNode }) {

    const value = new GlobalDataCacheContextManager({
        availableYears: new GlobalDataCacheItem(...useState<number[]>([]), MetadataService.getAvailableYears.bind(MetadataService)),
        categories: new GlobalDataCacheItem(...useState<Category[]>([]), CategoryService.getCategories.bind(CategoryService)),
        importFileFormats: new GlobalDataCacheItem(...useState<ImportFileFormat[]>([]), ImportFileFormatService.getFormats.bind(ImportFileFormatService)),
    })

    useEffect(() => value.initializeData(), [])

    return (
        <GlobalDataCacheContext.Provider value={value}>
            {children}
        </GlobalDataCacheContext.Provider>
    )
}