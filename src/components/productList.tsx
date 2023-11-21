"use client";

import {ProductCardLayout, ProductGridLayout, SectionContainer} from "tp-kit/components";
import ProductFilters from "@/components/productFilters";
import {useEffect, useState} from "react";
import {ProductFiltersResult} from "@/types";
import Link from "next/link";
import {ProductsCategoryData} from "tp-kit/types";
import AddToCartButton from "@/components/addToCartButton";
import fetch from "node-fetch";


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


    async function getCategories() {
        if (filters == undefined)
            return;
        let searchParams = new URLSearchParams();
        searchParams.append('search', filters.search ?? '');
        for (const cat of filters.categoriesSlugs) {
            searchParams.append('cat', cat);
        }
        const response = await fetch('/api/product-filters?' + searchParams.toString());
        setCategories((await response.json())['categories']);
    }

    const [categories, setCategories] = useState(categoriesToDisplay as ProductsCategoryData[]);
    useEffect( () => {
        if (filters === undefined)
            return;
        getCategories().then(r => {});
    }, [filters]);

    return (
        <div className={"flex flex-row bg-grayPicture"} >
            { showFilters &&
                <SectionContainer className={"bg-grayPicture"}>
                    <ProductFilters categories={categories} onChange={setFilters} />
                </SectionContainer>
            }

            <SectionContainer className="flex flex-1 bg-grayPicture min-h-screen flex-col justify-between p-5">

                {categories.map(category =>
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