import {ProductData} from "tp-kit/types";

export interface ProductFiltersResult {
    categoriesSlugs: string[],
    search?: string
}

export interface ProductAttribute {
    label: string,
    rating: number
}

export interface ProductLineData {
    product: ProductData
    quantity: number
}

export interface CartData {
    lines: ProductLineData[]
}
