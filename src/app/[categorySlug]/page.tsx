import {BreadCrumbs} from "tp-kit/components";
import ProductList from "@/components/productList";
import prisma from "@/utils/prisma";
import {notFound} from "next/navigation";
import { cache } from 'react'

const getCategory = cache(async (categorySlug: string) => {
    const category = await prisma.productCategory.findUnique({
        where: {
            slug: categorySlug
        },
        include: {
            products: {}
        }
    });

    return category;
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

export async function generateMetadata({params} : NextPageProps<{categorySlug:string}>) {
    const category = await getCategory(params.categorySlug);
    if (!category)
        return {}

    return {
        title: category.slug,
        description: "Trouvez votre inspiration avec un vaste choix de boissons Starbucks parmi nos produits " + params.categorySlug ,
    }
}


export default async function Page({params} : NextPageProps<{categorySlug:string}>) {
    const category = await getCategory(params.categorySlug);
    if (!category)
        notFound()

    return (
        <main>
            <BreadCrumbs className={"p-10 px-40 bg-white"} items={[
                {
                    "label": "Accueil",
                    "url": "./"
                },
                {
                    "label": category.name,
                    "url": "#"
                }
            ]}></BreadCrumbs>
            <ProductList categoriesToDisplay={[category]} />

        </main>
    )
}