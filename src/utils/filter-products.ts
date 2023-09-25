import { ProductsCategoryData } from "tp-kit/types";
import { ProductFiltersResult } from "@/types";

// Petit tips pour Marina : function/aglo d'application de filtres
export function filterProducts(
    categories: ProductsCategoryData[],
    filters?: ProductFiltersResult
) : ProductsCategoryData[] {

    if (!filters ) {
        return categories;
    }

    let copy: ProductsCategoryData[] = JSON.parse(JSON.stringify(categories))
    if (filters.categoriesSlugs.length > 0) {
        copy = copy.filter((category: ProductsCategoryData) => filters.categoriesSlugs.includes(category.slug))
    }
    if ((filters.search?.trim().length ?? 0) > 0) {
        let search = filters.search!.trim().toLowerCase();
        copy.forEach(category => {
            category.products = category.products.filter(product => product.name.toLowerCase().includes(search))
        })
    }
    return copy;
}
