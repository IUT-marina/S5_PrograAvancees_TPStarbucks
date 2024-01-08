"use client";

import {Button, NoticeMessage, ProductCartLine, ProductImage} from "tp-kit/components";
import {clearCart, computeCartTotal, removeLine, updateLine, useCart} from "@/hooks/use-cart";
import createOrder from "@/actions/create-orders";
import {useState} from "react";

export default function Cart() {

    const lines = useCart(state => state.lines);
    const [errorMsg, setErrorMsg] = useState('');
    const newOrder = async () => {
        const order = await createOrder(lines);
        if (order.success)
            clearCart();
        else if (order.error != null)
            setErrorMsg(order.error);
    };

    return (
        <div className={"absolute w-2/6 right-1 top-20 bg-grayPicture rounded-lg shadow-2xl flex flex-col justify-between p-5 gap-y-10 max-h-[80vh] overflow-y-scroll"}>
                <div className={"flex justify-between items-center"}>
                    <span className={"font-bold uppercase"}>Mon panier</span>
                    <Button className={"border-none text-xs text-gray-500"} variant={"ghost"} onClick={clearCart}>Vider le panier</Button>
                </div>
                {lines.map((line, index) => (
                    <div key={index} className={"flex justify-between gap-x-6"}>
                        <ProductImage
                            height={100}
                            width={100}
                            {...line.product}
                            className={"rounded-lg"}
                        />
                        <ProductCartLine
                            key={line.product.id}
                            onDelete={() => removeLine(line.product.id)}
                            onQtyChange={(quantity) => {line.qty = quantity; updateLine(line)}}
                            product={line.product}
                            qty={line.qty}
                            className={"flex-1"}
                        />
                    </div> ))
                }
                <div className={"flex flex-col gap-y-5"}>
                    <div className={"flex justify-between"}>
                        <span className={"font-bold"}>Total</span>
                        <span className={"font-bold"}>{(computeCartTotal(lines)).toFixed(2)}€</span>
                    </div>
                    <div>
                        <Button className={"border-none bg-stGreen"} onClick={newOrder} fullWidth>Commander</Button>
                        {errorMsg != null && errorMsg != '' &&
                            <NoticeMessage type={"error"} message={errorMsg}></NoticeMessage>
                        }
                    </div>

                </div>

        </div>
    )
}