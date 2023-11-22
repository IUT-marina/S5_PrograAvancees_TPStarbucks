"use client";

import {MenuBar} from "tp-kit/components";
import {ShoppingCartSimple, X} from "@phosphor-icons/react";
import {Indicator} from "@mantine/core";
import {Popover} from "@headlessui/react";
import Cart from "@/components/cart";
import CartCounter from "@/components/cartCounter";
import Link from "next/link";
const {stGreen} = require('tp-kit/tailwind/colors')

export default function Menu() {
    return (
        <MenuBar
                 trailing={
            <div className={"flex justify-end items-center"}>
                <Popover>
                    {({open}) => (
                        <>
                            <Link href={'/mon-compte/'} >Mon compte</Link>
                            <Popover.Button>
                                <Indicator size={20} label={<CartCounter/>} color={stGreen.DEFAULT} >
                                    {!open &&
                                        <ShoppingCartSimple size={32} />
                                    }
                                    {open &&
                                        <X size={32} />

                                    }
                                </Indicator>
                            </Popover.Button>

                            <Popover.Panel>
                                <Cart></Cart>
                            </Popover.Panel>
                        </>
                    )}
                </Popover>
            </div>}
        />
    )
}
