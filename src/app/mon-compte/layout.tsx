import prisma from "@/utils/prisma";
import OrderTable from "@/components/OrderTable";
import {SectionContainer} from "tp-kit/components";

export default async function MonCompteLayout({children}: { children: React.ReactNode }) {

    const orders = await prisma.order.findMany({
        include: {
            lines: {}
        }
    });

    return (
        <SectionContainer>
            <OrderTable orders={orders}></OrderTable>
            {children}
        </SectionContainer>
)
}