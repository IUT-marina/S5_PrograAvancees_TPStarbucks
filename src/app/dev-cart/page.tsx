"use client";

import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import {Button, ProductCardLayout, ProductCartLine, SectionContainer} from "tp-kit/components";
import {useCart, addLine, removeLine, updateLine, clearCart, computeCartTotal} from "@/hooks/use-cart";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {

    const lines = useCart(state => state.lines)

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
            <div className={"lg:w-1/3"}>
                <section className="w-full space-y-8 bg-white p-5 rounded-lg shadow-2xl flex flex-col justify-between">
                    <div className={"flex justify-between items-center"}>
                        <span className={"font-bold uppercase"}>Mon panier</span>
                        <Button className={"border-none text-xs text-gray-500"} variant={"ghost"} onClick={clearCart}>Vider le panier</Button>
                    </div>
                    {lines.map((line) => (
                        <ProductCartLine
                            key={line.product.id}
                            onDelete={() => removeLine(line.product.id)}
                            onQtyChange={(quantity) => {line.quantity = quantity; updateLine(line)}}
                            product={line.product}
                            qty={line.quantity}
                        /> ))
                    }
                    <div className={"flex flex-col gap-y-5"}>
                        <div className={"flex justify-between"}>
                            <span className={"font-bold"}>Total</span>
                            <span className={"font-bold"}>{(computeCartTotal(lines)).toFixed(2)}€</span>
                        </div>
                        <Button className={"border-none bg-green"} fullWidth>Commander</Button>
                    </div>
                </section>
            </div>
            {/* /Panier */}
        </SectionContainer>
    );
}