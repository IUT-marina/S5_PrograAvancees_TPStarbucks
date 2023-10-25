import {BreadCrumbs, ProductRating, SectionContainer} from "tp-kit/components";
import Image from "next/image";
import ProductList from "@/components/productList";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {undefined} from "zod";
import {notFound} from "next/navigation";
import ProductAttributesTable from "@/components/productAttributesTable";
import {ProductAttribute} from "@/types";
import AddToCartButton from "@/components/addToCartButton";
import {cache} from "react";
import prisma from "@/utils/prisma";


const getProduct = cache(async (productSlug: string) => {

    const product = await prisma.product.findUnique({
        where: {
            slug: productSlug
        },
        include: {
          category: {
              include: {
                  products: {
                      where: {
                          NOT: [{
                              slug: productSlug
                          }]
                      }
                  }
              }
          }
        }
    });

    return product;
})

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


export async function generateMetadata({params} : NextPageProps<{productSlug:string, categorySlug: string}>) {

    const product = await getProduct(params.productSlug);
    if(!product)
       return {}

    return {
        title: product.slug,
        description: product.desc ? ("Succombez pour notre " + product.name + " et commandez-le sur notre site !") : product.desc,
    }
}


export default async function Page({params} : NextPageProps<{productSlug:string, categorySlug: string}>) {

    const product = await getProduct(params.productSlug);
    if (!product)
        notFound();

    const attributes: ProductAttribute[] = [
        { label: "Intensité", rating: 3 },
        { label: "Volupté", rating: 2 },
        { label: "Amertume", rating: 1 },
        { label: "Onctuosité", rating: 4 },
        { label: "Instagramabilité", rating: 5 },
    ];

    return (
        <main>

            <BreadCrumbs className={"p-10 px-40 bg-white"} items={[
                {
                    "label": "Accueil",
                    "url": "/"
                },
                {
                    "label": product.category.name,
                    "url": "/" + product.category.slug
                },
                {
                    "label": product.name,
                    "url": product.slug
                },
            ]}></BreadCrumbs>

            <SectionContainer background={"white"}>
                <div className={"flex gap-x-8"}>
                    <div>
                        <Image
                            src={product.img}
                            alt={product.slug}
                            width={400}
                            height={300}
                        >

                        </Image>
                    </div>
                    <div className={"flex flex-col gap-y-8"}>
                        <div className={"prose prose-2xl font-bold"}>
                            {product.name}
                        </div>
                        <div className={"text-green"}>
                            <ProductRating
                                size={24}
                                value={4}
                            />
                        </div>
                        <div>
                            {product.desc}
                        </div>
                        <div className={"flex justify-between"}>
                            <span className={"font-bold"}>
                                {product.price} €
                            </span>
                            <div>
                                <AddToCartButton product={product} />
                            </div>
                        </div>
                        <ProductAttributesTable attributes={attributes}></ProductAttributesTable>
                    </div>
                </div>
            </SectionContainer>


            <ProductList categoriesToDisplay={[product.category]} showCategoryName={false}/>

        </main>
    )
}