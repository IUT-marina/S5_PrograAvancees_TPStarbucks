"use client";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {Button, ProductCardLayout, ProductCartLine, SectionContainer} from "tp-kit/components";
import {useCart, addLine, removeLine, updateLine, clearCart, computeCartTotal} from "@/hooks/use-cart";
import Cart from "@/components/cart";
import CartCounter from "@/components/cartCounter";
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
                        button={<Button variant={"ghost"} fullWidth onClick={() => addLine(product)}>Ajouter au panier</Button>}
                    />
                ))}
            </section>
            {/* /Produits */}

            {/* Panier */}
            <div className={"absolute top-100 right-100"}>
                Nombre de lignes :
                <CartCounter></CartCounter>
            </div>
            <Cart />

            {/* /Panier */}
        </SectionContainer>
    );
}