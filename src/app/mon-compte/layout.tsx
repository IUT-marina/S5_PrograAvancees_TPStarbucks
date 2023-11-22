import prisma from "@/utils/prisma";
import OrderTable from "@/components/OrderTable";

export default async function MonCompteLayout({children}: { children: React.ReactNode }) {

    const orders = await prisma.order.findMany({
        include: {
            lines: {}
        }
    });

    return (
        <>
            <OrderTable orders={orders}></OrderTable>
            {children}
        </>
)
}