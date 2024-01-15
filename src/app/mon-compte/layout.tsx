import prisma from "@/utils/prisma";
import OrderTable from "@/components/OrderTable";
import {SectionContainer} from "tp-kit/components";
import getUser from "@/utils/supabase";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import MonCompteCard from "@/components/MonCompteCard";

export default async function MonCompteLayout({children}: { children: React.ReactNode }) {

    const supabase = createServerComponentClient({cookies});
    const user = await getUser(supabase);

    const orders = await prisma.order.findMany({
        where: {
            userId: user?.id
        },
        include: {
            lines: {}
        }
    });

    return (
        <SectionContainer>
            <div className={"flex flex-row justify-around"}>
                <MonCompteCard user={user}></MonCompteCard>
                <SectionContainer className={"flex flex-col justify-center bg-white shadow-xl m-3 rounded-lg w-80"}>
                    <h3 className={"uppercase font-medium pb-3"}>Mes commandes</h3>
                    <OrderTable orders={orders}></OrderTable>
                </SectionContainer>
            </div>
            {children}
        </SectionContainer>
    )
}

export const dynamic = "force-dynamic";
