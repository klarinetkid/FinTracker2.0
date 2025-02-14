import { createContext } from "react"
import Category from "../types/Category"


export class GlobalDataCacheItem<T> {

    public value: T
    private setValue?: React.Dispatch<React.SetStateAction<T>>
    private getValue?: () => Promise<T>

    constructor(value: T, setValue?: typeof this.setValue, getValue?: typeof this.getValue) {
        this.value = value
        this.setValue = setValue
        this.getValue = getValue
    }

    public refresh() {
        if (this.getValue && this.setValue)
            this.getValue().then(this.setValue)
    }
}

export class GlobalDataCacheContextManager {

    public availableYears: GlobalDataCacheItem<number[]>
    public categories: GlobalDataCacheItem<Category[]>

    constructor(params?: { availableYears: GlobalDataCacheItem<number[]>, categories: GlobalDataCacheItem<Category[]> }) {

        this.availableYears = params?.availableYears ?? new GlobalDataCacheItem<number[]>([])
        this.categories = params?.categories ?? new GlobalDataCacheItem<Category[]>([])

    }

    public initializeData() {
        [this.availableYears, this.categories]
            .map(d => d.refresh())
    }
}

export const GlobalDataCacheContext = createContext(new GlobalDataCacheContextManager())