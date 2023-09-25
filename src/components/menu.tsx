"use client";

import {Button, MenuBar} from "tp-kit/components";
import {ShoppingCartSimple, X} from "@phosphor-icons/react";
import {Indicator} from "@mantine/core";
import {Popover} from "@headlessui/react";
const {stGreen} = require('tp-kit/tailwind/colors')
const {gray} = require('tailwindcss/colors');

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
                                <div className={"absolute w-2/6 right-1 top-20 bg-white rounded-lg shadow-2xl flex justify-center items-center p-24"}>
                                    Votre panier est vide.
                                </div>
                            </Popover.Panel>
                        </>
                    )}
                </Popover>
            </div>}
        />
    )
}

/**
 *          <Heading
 *                 as="h1"
 *                 size="lg"
 *                 weight="bold"
 *                 className={"bg-vertsb text-white flex flex-col items-center justify-between text-6xl p-12"}
 *             >
 *                 <Image src="/starbucks-logo-opacity-coffee-light.svg"
 *                        width={100} height={100}
 *                        alt={'logo starbucks'}
 *                 />
 *                 <div className={"p-2"}>Starbuucks</div>
*           </Heading>
 */