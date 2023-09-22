import {BreadCrumbs, Button, Footer, Heading, ProductRating, SectionContainer} from "tp-kit/components";
import Image from "next/image";
import ProductList from "@/components/productList";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {ProductData, ProductsCategoryData} from "tp-kit/types";
import {undefined} from "zod";
import {notFound} from "next/navigation";
import {Stars} from "tp-kit/components/products/product-rating.stories";
import ProductAttributesTable from "@/components/productAttributesTable";
import {ProductAttribute} from "@/types";

const categories = PRODUCTS_CATEGORY_DATA;


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

    const category = categories.find(cat => cat.slug === params.categorySlug);
    const product = category?.products.find(prod => prod.slug === params.productSlug);

    if(!category || !product) notFound();

    return {
        title: params.productSlug,
        description: product.desc ? ("Succombez pour notre " + product.name + " et commandez-le sur notre site !") : product.desc,
    }
}


export default function Page({params} : NextPageProps<{productSlug:string, categorySlug: string}>) {

    const category = categories.find(cat => cat.slug === params.categorySlug);
    const product = category?.products.find(prod => prod.slug === params.productSlug);

    if(!category || !product) notFound();

    const attributes: ProductAttribute[] = [
        { label: "Intensité", rating: 3 },
        { label: "Volupté", rating: 2 },
        { label: "Amertume", rating: 1 },
        { label: "Onctuosité", rating: 4 },
        { label: "Instagramabilité", rating: 5 },
    ];

    return (
        <main>
            <Heading
                as="h1"
                size="lg"
                weight="bold"
                className={"bg-vertsb text-white flex flex-col items-center justify-between text-6xl p-12"}
            >
                <Image src="/starbucks-logo-opacity-coffee-light.svg"
                       width={100} height={100}
                       alt={'logo starbucks'}
                />
                <div className={"p-2"}>Starbuucks</div>
            </Heading>

            <BreadCrumbs className={"p-10 px-40"} items={[
                {
                    "label": "Accueil",
                    "url": "/"
                },
                {
                    "label": category.name,
                    "url": "/" + category.slug
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
                            <Button type={"submit"} variant="primary">
                                Ajouter au panier
                            </Button>
                        </div>
                        <ProductAttributesTable attributes={attributes}></ProductAttributesTable>
                    </div>
                </div>
            </SectionContainer>


            <ProductList categoriesToDisplay={[category]} showCategoryName={false}/>

            <Footer />
        </main>
    )
}