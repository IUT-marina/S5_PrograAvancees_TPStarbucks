"use client";

import {MenuBar} from "tp-kit/components";
import {ShoppingCartSimple, X} from "@phosphor-icons/react";
import {Indicator} from "@mantine/core";
import {Popover} from "@headlessui/react";
import Cart from "@/components/cart";
const {stGreen} = require('tp-kit/tailwind/colors')

export default function Menu() {
    return (
        <MenuBar leading={"Starbuucks"}
                 trailing={
            <div className={"flex justify-end items-center"}>
                <Popover>
                    {({open}) => (
                        <>
                            <Popover.Button>
                                <Indicator size={20} label="0" color={stGreen.DEFAULT} >
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
