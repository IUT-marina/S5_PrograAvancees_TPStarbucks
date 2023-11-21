'use server'

import prisma from "@/utils/prisma";
import {CartLine} from "tp-kit/types";
import {computeLineSubTotal} from "@/hooks/use-cart";

export default async function submit(lines: CartLine[]) {
    let total: number = 0;
    for (const line of lines) {
        total += computeLineSubTotal(line);
    }
    let newOrder = await prisma.order.create(
        {
            data: {
                createdAt: new Date(),
                total: total,
            }
        }
    );
    await prisma.orderLine.createMany(
        {
            data: lines.map(value => {
                return {
                    orderId: newOrder.id,
                    productId: value.product.id,
                    qty: value.qty,
                    subtotal: computeLineSubTotal(value)
                }
            }),
        }
    );
}