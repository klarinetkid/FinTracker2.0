import { useEffect, useState } from "react";
import CategoryService from "../services/CategoryService";
import MetadataService from "../services/MetadataService";
import Category from "../types/Category";
import {
    GlobalDataCacheContext,
    GlobalDataCacheContextManager,
    GlobalDataCacheItem,
} from "./GlobalDataCacheContext";
import ImportFormat from "../types/ImportFormat";
import ImportFormatService from "../services/ImportFormatService";

export default function GlobalDataCacheProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const value = new GlobalDataCacheContextManager({
        availableYears: new GlobalDataCacheItem(
            ...useState<number[]>([]),
            MetadataService.getAvailableYears.bind(MetadataService)
        ),
        categories: new GlobalDataCacheItem(
            ...useState<Category[]>([]),
            CategoryService.getCategories.bind(CategoryService)
        ),
        importFormats: new GlobalDataCacheItem(
            ...useState<ImportFormat[]>([]),
            ImportFormatService.getFormats.bind(ImportFormatService)
        ),
    });

    useEffect(() => value.initializeData(), []);

    return (
        <GlobalDataCacheContext.Provider value={value}>
            {children}
        </GlobalDataCacheContext.Provider>
    );
}
