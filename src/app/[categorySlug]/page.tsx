import {BreadCrumbs, Footer, Heading} from "tp-kit/components";
import Image from "next/image";
import ProductList from "@/components/productList";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {Metadata} from "next";
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

export async function generateMetadata({params} : NextPageProps<{categorySlug:string}>) {
    return {
        title: params.categorySlug,
        description: "Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits " + params.categorySlug ,
    }
}

export default function Page({params} : NextPageProps<{categorySlug:string}>) {

    const category = categories.filter(c => c.slug === params.categorySlug)

    return (
        <main>
            <BreadCrumbs className={"p-10 px-40 bg-white"} items={[
                {
                    "label": "Accueil",
                    "url": "./"
                },
                {
                    "label": category[0].name,
                    "url": "#"
                }
            ]}></BreadCrumbs>
            <ProductList categoriesToDisplay={category} />

            <Footer />
        </main>
    )
}