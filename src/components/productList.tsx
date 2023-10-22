"use client";

import {filterProducts} from "@/utils/filter-products";
import {BreadCrumbs, Button, ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import ProductFilters from "@/components/productFilters";
import {useMemo, useState} from "react";
import {ProductFiltersResult} from "@/types";
import Link from "next/link";
import {ProductsCategoryData} from "tp-kit/types";
import {addLine} from "@/hooks/use-cart";
import AddToCartButton from "@/components/addToCartButton";


// Ptit Tips pour Marina : Affichage du contenu de la page :
// - La partie filtre (si boolean à True) : Product filters
// - La partie listes des produits

interface ProductListProps {
    showFilters?: boolean
    showCategoryName?: boolean
    categoriesToDisplay: ProductsCategoryData[]
}
export default function ProductList({showFilters, showCategoryName, categoriesToDisplay}: ProductListProps) {
    showFilters = showFilters === undefined ? false : showFilters;
    showCategoryName = showCategoryName === undefined ? true : showCategoryName;

    const [filters, setFilters] = useState(undefined as ProductFiltersResult | undefined);
    let categoriesToRender = useMemo(() =>
        filterProducts(categoriesToDisplay, filters), [categoriesToDisplay, filters]);

    return (
        <div className={"flex flex-row bg-grayPicture"} >
            { showFilters &&
                <SectionContainer className={"bg-grayPicture"}>
                    <ProductFilters categories={categoriesToDisplay} onChange={setFilters} />
                </SectionContainer>
            }

            <SectionContainer className="flex flex-1 bg-grayPicture min-h-screen flex-col justify-between p-5">

                {categoriesToRender.map(category =>
                    <SectionContainer key={category.id} className={"bg-grayPicture"}>
                        { showCategoryName &&
                            <Link href={category.slug}>
                                <h2 className={"p-5 font-bold link"}>
                                    {category.name} ({category.products.length})
                                </h2>
                            </Link>
                        }
                        { !showCategoryName &&
                            <p className={"prose lg:prose-xl font-bold"}>Vous aimerez aussi...</p>
                        }

                        <ProductGridLayout key={category.id} products={category.products} >
                            {product =>
                                <ProductCardLayout
                                    key={product.id}
                                    button={<div className={"flex justify-center m-auto"}>
                                                <AddToCartButton product={product} />
                                            </div>}
                                    product={product}
                                />}
                        </ProductGridLayout>
                    </SectionContainer>)
                }
            </SectionContainer>
        </div>
    )
}