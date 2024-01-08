"use client";

import {MenuBar} from "tp-kit/components";
import {ShoppingCartSimple, X} from "@phosphor-icons/react";
import {Indicator} from "@mantine/core";
import {Popover} from "@headlessui/react";
import Cart from "@/components/cart";
import CartCounter from "@/components/cartCounter";
import Link from "next/link";
import {createClientComponentClient, Session, User} from "@supabase/auth-helpers-nextjs";
import getUser from "@/utils/supabase";
import {useEffect, useState} from "react";

const {stGreen} = require('tp-kit/tailwind/colors')

export default function Menu() {

    const [user, setUser] = useState<User | null>();
    const [session, setSession] = useState<Session>()

    const supabase = createClientComponentClient();
    useEffect(() => {
            getUser(supabase).then(u => setUser(u));
            supabase.auth.onAuthStateChange(
                (event, session) => {
                    if (session != null)
                        setSession(session);
                }
            );
        }
    );

    return (
        <MenuBar
            trailing={
                <div className={"flex justify-end items-center"}>
                    <Popover>
                        {({open}) => (
                            <div className={"flex gap-7 items-center"}>
                                <Link href={'/mon-compte/'}>Mon compte</Link>
                                {user != null && session != null &&
                                    <Popover.Button>
                                        <Indicator size={20} label={<CartCounter/>} color={stGreen.DEFAULT}>
                                            {!open &&
                                                <ShoppingCartSimple size={32}/>
                                            }
                                            {open &&
                                                <X size={32}/>

                                            }
                                        </Indicator>
                                    </Popover.Button>
                                }

                                <Popover.Panel>
                                    <Cart></Cart>
                                </Popover.Panel>
                            </div>
                        )}
                    </Popover>
                </div>}
        />
    )
}
