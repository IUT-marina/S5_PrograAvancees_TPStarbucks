import prisma from "@/utils/prisma";
import {NextPageProps} from "@/types";
import {notFound} from "next/navigation";
import Order from "@/app/mon-compte/commandes/[orderId]/order";

export default async function Page({params}: NextPageProps<{ orderId: number }>) {
    const orderId = Number(params.orderId);
    if (orderId === undefined)
        notFound();


    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            lines: {
                include: {
                    product: {}
                }
            }
        }
    });

    if (order === undefined ||order === null)
        notFound();

    return (
        <Order order={order} />
    );
}