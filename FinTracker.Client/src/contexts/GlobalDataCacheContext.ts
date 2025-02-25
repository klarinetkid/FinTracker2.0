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
    public availableYears: GlobalDataCacheItem<number[] | undefined>;
    public categories: GlobalDataCacheItem<Category[]>;
    public importFormats: GlobalDataCacheItem<ImportFormat[]>;

    constructor(params?: {
        availableYears: GlobalDataCacheItem<number[] | undefined>;
        categories: GlobalDataCacheItem<Category[]>;
        importFormats: GlobalDataCacheItem<ImportFormat[]>;
    }) {
        this.availableYears =
            params?.availableYears ??
            new GlobalDataCacheItem<number[] | undefined>(undefined);
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

    public userHasTransactions(): boolean {
        return (
            this.availableYears.value === undefined ||
            this.availableYears.value.length > 0
        );
    }

    public getCategoryById(id: number | undefined): Category | undefined {
        return this.categories.value.filter((c) => c.id === id)[0];
    }
}

export const GlobalDataCacheContext = createContext(
    new GlobalDataCacheContextManager()
);
