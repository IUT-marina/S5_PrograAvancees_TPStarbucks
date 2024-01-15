"use client";

import {Dialog} from "@headlessui/react";
import {OrderDetailsLayout} from "tp-kit/components";
import {OrderData} from "tp-kit/types";
import {useRouter} from "next/navigation";
import RealTimeOrderDetails from "@/components/RealTimeOrderDetails";

export default function Order({order}: { order: OrderData }) {
    const router = useRouter();
    return (
        <Dialog as={"div"} open={true} onClose={() => { router.refresh() }}
            /*className={"absolute w-2/6 right-1 top-20 bg-grayPicture rounded-lg shadow-2xl flex flex-col justify-between p-5 gap-y-10 max-h-[80vh] overflow-y-scroll"}>*/
            className={"relative z-50"}>
            <Dialog.Panel className={"fixed top-0 left-0 right-0 bottom-0 flex-col justify-center align-middle p-5 bg-grayPicture"}>
                <div className={"w-2/6 "}>
                    <Dialog.Title>{order.id}</Dialog.Title>
                    <Dialog.Description as = "div">
                        <p>Voici le détail de votre commande.</p>
                    </Dialog.Description>
                </div>

                <RealTimeOrderDetails order={order} />
            </Dialog.Panel>
        </Dialog>
    )
}
/*<button onClick={() => setIsOpen(false)}>Fermer</button>*/

/*
<Dialog.Description as = "div">
    <p>Voici le détail de votre commande.</p>
</Dialog.Description>

<OrderDetailsLayout order={order} />
*/