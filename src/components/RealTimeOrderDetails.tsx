"use client";

import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {OrderData} from "tp-kit/types";
import {useEffect, useState} from "react";
import {OrderDetailsLayout} from "tp-kit/components";

export default function RealTimeOrderDetails( {order}: {order: OrderData}) {

    const [newOrder, setNewOrder] = useState(order);
    const supabase = createClientComponentClient();
    
    useEffect(() => {
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'Order',
                    filter: 'id=eq.' + newOrder.id
                },
                (payload) => {
                    console.log('update sur order');
                    const values = payload.new;
                    setNewOrder(actualOrder => {
                        return {...actualOrder, ...values};
                    });
                }
            )
            .subscribe((status) => console.log(status));
        return () => { 
            channel.unsubscribe().then(r => {});
        };
        
    }, [newOrder.id, supabase]);
    
    return <OrderDetailsLayout order={newOrder} />;

}


