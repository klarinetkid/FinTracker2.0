import { createContext } from "react";
import Category from "../types/Category";
import ImportFormat from "../types/ImportFormat";

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

    public async refresh() {
        if (this.getValue && this.setValue) {
            const value = await this.getValue();
            this.setValue(value);
        }
    }
}

export class GlobalDataCacheContextManager {
    public availableYears: GlobalDataCacheItem<number[]>;
    public categories: GlobalDataCacheItem<Category[]>;
    public importFormats: GlobalDataCacheItem<ImportFormat[]>;

    constructor(params?: {
        availableYears: GlobalDataCacheItem<number[]>;
        categories: GlobalDataCacheItem<Category[]>;
        importFormats: GlobalDataCacheItem<ImportFormat[]>;
    }) {
        this.availableYears =
            params?.availableYears ?? new GlobalDataCacheItem<number[]>([]);
        this.categories =
            params?.categories ?? new GlobalDataCacheItem<Category[]>([]);
        this.importFormats =
            params?.importFormats ??
            new GlobalDataCacheItem<ImportFormat[]>([]);
    }

    public initializeData() {
        [this.availableYears, this.categories, this.importFormats].map((d) => {
            d.refresh();
        });
    }
}

export const GlobalDataCacheContext = createContext(
    new GlobalDataCacheContextManager()
);
