"use client";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {Button, ProductCardLayout, ProductCartLine, SectionContainer} from "tp-kit/components";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
    return (
        <SectionContainer
            className="py-36"
            wrapperClassName="flex flex-col lg:flex-row gap-24"
        >
            {/* Produits */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                {products.map((product) => (
                    <ProductCardLayout
                        key={product.id}
                        product={product}
                        button={<Button variant={"ghost"} fullWidth>Ajouter au panier</Button>}
                    />
                ))}
            </section>
            {/* /Produits */}

            {/* Panier */}
            <section className="w-full lg:w-1/3 space-y-8 bg-white p-5 rounded-lg shadow-2xl flex flex-col">
                <span className={"font-bold uppercase"}>Mon panier</span>
                    {products.map((product) => (
                        <ProductCartLine
                            key={product.id}
                            onDelete={function noRefCheck() {} }
                            onQtyChange={function noRefCheck() {} }
                            product={product}
                            qty={1}
                        /> ))
                    }
                    <div className={"flex justify-between"}>
                        <span className={"font-bold"}>Total</span>
                        <span className={"font-bold"}>Blabla€</span>
                    </div>
                <Button className={"text-white border-none bg-green"} variant={"outline"} fullWidth>Commander</Button>
            </section>
            {/* /Panier */}
        </SectionContainer>
    );
}