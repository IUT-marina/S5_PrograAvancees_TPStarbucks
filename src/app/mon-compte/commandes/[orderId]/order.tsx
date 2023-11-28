"use client";

import {Dialog} from "@headlessui/react";
import {OrderDetailsLayout} from "tp-kit/components";
import {OrderData} from "tp-kit/types";
import {useState} from "react";

export default function Order({order}: { order: OrderData }) {
    let [isOpen, setIsOpen] = useState(true)
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}
            className={"absolute w-2/6 right-1 top-20 bg-grayPicture rounded-lg shadow-2xl flex flex-col justify-between p-5 gap-y-10"}>
            <Dialog.Panel>
                <Dialog.Title>{order.id}</Dialog.Title>
                <Dialog.Description as = "div">
                    <p>Voici le détail de votre commande.</p>
                </Dialog.Description>

                <OrderDetailsLayout order={order} />
            </Dialog.Panel>
        </Dialog>
    )
}
/*<button onClick={() => setIsOpen(false)}>Fermer</button>*/