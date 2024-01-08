"use client";

import {redirect, useRouter} from "next/navigation";
import {Button, SectionContainer} from "tp-kit/components";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";

export default function MonCompteCard({user}: {user: User | null}) {
    const router = useRouter();

    const supabase = createClientComponentClient();

    if (user === null)
        redirect('/connexion');

    async function logOut() {
        await supabase.auth.signOut();
        router.refresh();
    }

    console.log(user.user_metadata.name);

    return (
        <SectionContainer>
            <div className={"flex flex-col justify-center bg-white shadow-xl p-8 m-1 rounded-lg gap-3"}>
                <h3 className={"uppercase font-medium"}>Mon compte</h3>
                <div className={"flex flex-col gap-3"}>
                    <p>Bonjour, {user?.user_metadata.name}</p>
                    <span className={"flex flex-col gap-1"}>
                        <p><span className={"font-medium"}>Nom : </span>{user?.user_metadata.name}</p>
                        <p><span className={"font-medium"}>Email : </span>{user?.email}</p>
                    </span>
                </div>
                <Button variant={"ghost"} onClick={logOut}>Se déconnecter</Button>
            </div>
        </SectionContainer>
    )
}