import { ProductsCategoryData } from "tp-kit/types";
import { ProductFiltersResult } from "@/types";

// Petit tips pour Marina : function/aglo d'application de filtres
export function filterProducts(
    categories: ProductsCategoryData[],
    filters?: ProductFiltersResult
) : ProductsCategoryData[] {

    if (filters == null || !filters ) {
        return categories;
    }

    else {
        return(
            categories.filter(category =>
                (filters?.categoriesSlugs.includes(category.slug))
            )
        )
    }
}
