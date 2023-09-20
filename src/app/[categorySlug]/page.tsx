"use client";

import {Footer, Heading} from "tp-kit/components";
import Image from "next/image";
import ProductList from "@/components/productList";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
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
export default function Page({params} : NextPageProps<{categorySlug:string}>) {

    const category = categories.filter(c => c.slug === params.categorySlug)

    return (
        <main>
            <Heading
                as="h1"
                size="lg"
                weight="bold"
                className={"bg-vertsb text-white flex flex-col items-center justify-between text-6xl p-14"}
            >
                <Image src="/starbucks-logo-opacity-coffee-light.svg"
                       width={100} height={100}
                       alt={'logo starbucks'}
                />
                <div className={"p-4"}>Starbuucks</div>
            </Heading>

            <ProductList categoriesToDisplay={category} />


            <Footer />
        </main>
    )
}