"use client";

import {OrderTableLayout} from "tp-kit/components";
import {OrderTableRowData} from "tp-kit/types";
import {useRouter} from "next/navigation";

export default function OrderTable({orders}: {orders: OrderTableRowData[]}) {

    let router = useRouter();

    const fonction = (line: OrderTableRowData) => {
        router.push('/mon-compte/commandes/' + line.id);
    }

    return (
        <OrderTableLayout orders={orders} onRowClick={fonction}/>
    )
}