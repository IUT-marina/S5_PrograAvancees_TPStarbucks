import {BreadCrumbs, Footer} from "tp-kit/components";
import ProductList from "@/components/productList";

import {PRODUCTS_CATEGORY_DATA} from "tp-kit/data";
import {Metadata} from "next";
import prisma from "@/utils/prisma";

export const metadata: Metadata = {
    description: "Commandez de délicieuses boissons préparées avec sois par nos baristas"
}

export default async function Home() {
    const categories = await prisma.productCategory.findMany({
        include: {
            products: {}
        }
    });
    return (
        <main>
            <BreadCrumbs className={"p-10 px-40 bg-grayPicture"} items={[
                {
                    "label": "Accueil",
                    "url": "/"
                }
            ]}></BreadCrumbs>
            <ProductList categoriesToDisplay={categories} showFilters={true}/>

        </main>
    )
}
