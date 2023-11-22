import {ProductData} from "tp-kit/types";
import {undefined} from "zod";

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
    qty: number
}

export interface CartData {
    lines: ProductLineData[],
    count : number
}

export type NextPageProps<T = Record<string, string>> = {
    /**
     * The path parameters received
     * e.g. : page/[slug] --> params.slug
     */
    params: T,
    /**
     * The HTTP query parameters received
     * e.g. : my-page?page=1 --> searchParams.page (= '1')
     */
    searchParams: { [key: string]: string | string[] | undefined }
};
