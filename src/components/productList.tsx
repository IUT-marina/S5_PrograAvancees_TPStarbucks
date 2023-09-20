"use client";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {filterProducts} from "@/utils/filter-products";
import {BreadCrumbs, Button, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import ProductFilters from "@/components/product-filters";
import {useMemo, useState} from "react";
import {ProductFiltersResult} from "@/types";
const categories = PRODUCTS_CATEGORY_DATA;


// Ptit Tips pour Marina : Affichage du contenu de la page :
// - La partie filtre
// - La partie listes des produits
export default function ProductList() {
    const [filters, setFilters] = useState(undefined as ProductFiltersResult | undefined);
    let categoriesToRender = useMemo(() =>
        filterProducts(categories, filters), [filters]);

    return (
        <div className={"flex flex-row"} >
            <SectionContainer>
                <ProductFilters categories={categories} onChange={setFilters} />
            </SectionContainer>

            <SectionContainer className="flex flex-1 min-h-screen flex-col justify-between p-5">

                <BreadCrumbs items={[
                    {
                        "label": "Accueil",
                        "url": "#"
                    }
                ]}></BreadCrumbs>

                {categoriesToRender.map(category =>
                    <SectionContainer key={category.id}>
                        <h1 className={"p-5 font-bold"}>
                            {category.name} ({category.products.length})
                        </h1>

                        <ProductGridLayout key={category.id} products={category.products} >
                            {product =>
                                <ProductCardLayout
                                    key={product.id}
                                    button={<Button fullWidth variant="ghost">Ajouter au panier</Button>}
                                    product={product}
                                />}
                        </ProductGridLayout>
                    </SectionContainer>)
                }
            </SectionContainer>
        </div>
    )
}