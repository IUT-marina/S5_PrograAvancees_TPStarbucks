"use client";

import {useCart} from "@/hooks/use-cart";

export default function CartCounter() {
    const lines = useCart(state => state.lines);
    console.log("rendu counter");
    return lines.length;
}