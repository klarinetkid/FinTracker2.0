import { createContext } from "react";
import Category from "../types/Category";
import ImportFileFormat from "../types/ImportFileFormat";

export class GlobalDataCacheItem<T> {
    public value: T;
    private setValue?: React.Dispatch<React.SetStateAction<T>>;
    private getValue?: () => Promise<T>;

    constructor(
        value: T,
        setValue?: typeof this.setValue,
        getValue?: typeof this.getValue
    ) {
        this.value = value;
        this.setValue = setValue;
        this.getValue = getValue;
    }

    public refresh() {
        if (this.getValue && this.setValue) this.getValue().then(this.setValue);
    }
}

export class GlobalDataCacheContextManager {
    public availableYears: GlobalDataCacheItem<number[]>;
    public categories: GlobalDataCacheItem<Category[]>;
    public importFileFormats: GlobalDataCacheItem<ImportFileFormat[]>;

    constructor(params?: {
        availableYears: GlobalDataCacheItem<number[]>;
        categories: GlobalDataCacheItem<Category[]>;
        importFileFormats: GlobalDataCacheItem<ImportFileFormat[]>;
    }) {
        this.availableYears =
            params?.availableYears ?? new GlobalDataCacheItem<number[]>([]);
        this.categories =
            params?.categories ?? new GlobalDataCacheItem<Category[]>([]);
        this.importFileFormats =
            params?.importFileFormats ??
            new GlobalDataCacheItem<ImportFileFormat[]>([]);
    }

    public initializeData() {
        [this.availableYears, this.categories, this.importFileFormats].map(
            (d) => d.refresh()
        );
    }
}

export const GlobalDataCacheContext = createContext(
    new GlobalDataCacheContextManager()
);
