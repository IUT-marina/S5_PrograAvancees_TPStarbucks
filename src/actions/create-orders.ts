'use server'

import prisma from "@/utils/prisma";
import {CartLine} from "tp-kit/types";
import {computeLineSubTotal} from "@/hooks/use-cart";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import getUser from "@/utils/supabase";

export default async function createOrder(lines: CartLine[]) : Promise<{ error: string | null, success: boolean }> {
    let total: number = 0;
    for (const line of lines) {
        total += computeLineSubTotal(line);
    }

    const supabase = createServerComponentClient({cookies});
    const user = await getUser(supabase);
    if (user === null) {
        return {error: 'Not connected', success: false}
    }

    let newOrder = await prisma.order.create(
        {
            data: {
                createdAt: new Date(),
                total: total,
                userId: user.id,
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
    return {error: null, success: true};
}