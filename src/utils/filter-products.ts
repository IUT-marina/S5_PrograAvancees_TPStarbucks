import { ProductsCategoryData } from "tp-kit/types";
import { ProductFiltersResult } from "@/types";

export function filterProducts(
    categories: ProductsCategoryData[],
    filters?: ProductFiltersResult
) : ProductsCategoryData[] {

    if (filters == null) {
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
