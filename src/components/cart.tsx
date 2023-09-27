"use client";

import {Button, ProductCartLine} from "tp-kit/components";
import {clearCart, computeCartTotal, removeLine, updateLine, useCart} from "@/hooks/use-cart";

/* w-full space-y-8 bg-white p-5 rounded-lg shadow-2xl flex flex-col justify-between */
/* absolute w-2/6 right-1 top-20 bg-white rounded-lg shadow-2xl flex  justify-center items-center p-24 */
export default function Cart() {

    const lines = useCart(state => state.lines)

    return (
        <div className={"absolute w-2/6 right-1 top-20 bg-white rounded-lg shadow-2xl flex flex-col justify-between p-5 gap-y-10"}>
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

        </div>
    )
}