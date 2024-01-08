"use client";

import {z} from 'zod';
import {useForm, zodResolver} from "@mantine/form";
import {Box, PasswordInput, TextInput} from "@mantine/core";
import Link from "next/link";
import {Button, NoticeMessage, useZodI18n} from "tp-kit/components";
import React, {useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";

export default function Page() {

    useZodI18n(z);

    const router = useRouter();
    const supabase = createClientComponentClient();

    const schema = z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const [successNotice, setSuccessNotice] = useState(false);
    const [errorNotice, setErrorNotice] = useState(false);

    return (
        <div className={"flex justify-center"}>
            <Box miw={450} mx="auto" className={"flex flex-col w-1/3 justify-center bg-white shadow-xl p-6 m-14 gap-y-2 rounded-lg"} >
                <h3 className={"uppercase font-medium"}>Inscription</h3>
                <form className={"flex flex-col gap-y-2 mt-5 mb-5"} onSubmit={
                    form.onSubmit(async (values) => {

                        const re = await supabase.auth.signUp(
                            {
                                email: values.email,
                                password: values.password,
                                options: {
                                    data: {
                                        name: values.name,
                                    },
                                    emailRedirectTo: `${location.origin}/auth/callback`,
                                }
                            }
                        )

                        router.refresh()

                        if (re.error != undefined)
                            setErrorNotice(true)
                        else
                            setSuccessNotice(true);
                    })
                }>
                    {successNotice&&
                        <NoticeMessage type={"success"} message={'Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter.'}></NoticeMessage>
                    }
                    {errorNotice&&
                        <NoticeMessage type={"error"} message={'Une erreur est survenue. Vérifiez vos informations.'}></NoticeMessage>
                    }
                    <TextInput
                        withAsterisk
                        label="Nom"
                        description={"Le nom qui sera utilisé pour vos commandes"}
                        placeholder="Maud zarella"
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        withAsterisk
                        label="Adresse email"
                        placeholder="lin.guini@barilla.it..."
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        withAsterisk
                        label="Mot de passe"
                        placeholder="Ke$$a1234"
                        mt="sm"
                        {...form.getInputProps('password')}
                    />

                    <Button className={"mt-3"} type="submit">Inscription</Button>
                </form>
                <Link className={"flex justify-center text text-brand"} href={'/connexion'}>Déjà un compte ? Se connecter</Link>
            </Box>
        </div>

    );
}