"use client";

import {filterProducts} from "@/utils/filter-products";
import {BreadCrumbs, Button, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import ProductFilters from "@/components/product-filters";
import {useMemo, useState} from "react";
import {ProductFiltersResult} from "@/types";
import Link from "next/link";
import {ProductsCategoryData} from "tp-kit/types";


// Ptit Tips pour Marina : Affichage du contenu de la page :
// - La partie filtre
// - La partie listes des produits (si affichage des filtres demandé)

interface ProductListProps {
    showFilters?: boolean
    categoriesToDisplay: ProductsCategoryData[]
}
export default function ProductList({showFilters, categoriesToDisplay}: ProductListProps) {
    showFilters = showFilters === undefined ? false : showFilters;

    const [filters, setFilters] = useState(undefined as ProductFiltersResult | undefined);
    let categoriesToRender = useMemo(() =>
        filterProducts(categoriesToDisplay, filters), [categoriesToDisplay, filters]);

    return (
        <div className={"flex flex-row"} >
            { showFilters &&
                <SectionContainer>
                    <ProductFilters categories={categoriesToDisplay} onChange={setFilters} />
                </SectionContainer>
            }

            <SectionContainer className="flex flex-1 min-h-screen flex-col justify-between p-5">

                <BreadCrumbs items={[
                    {
                        "label": "Accueil",
                        "url": "#"
                    }
                ]}></BreadCrumbs>

                {categoriesToRender.map(category =>
                    <SectionContainer key={category.id}>
                        <Link href={category.slug}>
                                <h1 className={"p-5 font-bold"}>
                                {category.name} ({category.products.length})
                            </h1>
                        </Link>

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