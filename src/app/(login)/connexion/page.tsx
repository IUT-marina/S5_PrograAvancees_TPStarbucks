"use client";

import {z} from 'zod';
import {useForm, zodResolver} from "@mantine/form";
import {Box, PasswordInput, TextInput} from "@mantine/core";
import Link from "next/link";
import {Button, NoticeMessage, useZodI18n} from "tp-kit/components";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {

    useZodI18n(z);

    const router = useRouter();
    const supabase = createClientComponentClient();

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    const [successNotice, setSuccessNotice] = useState(false);
    const [errorNotice, setErrorNotice] = useState(false);

    return (
        <div className={"flex justify-center"}>
            <Box miw={400} mx="auto" className={"flex flex-col justify-center bg-white shadow-xl p-6 m-24 gap-y-2 rounded-lg"} >
                <h3 className={"uppercase font-medium"}>Connexion</h3>
                <form className={"flex flex-col gap-y-2 mt-5 mb-5"} onSubmit={
                    form.onSubmit(async (values) => {

                        const re = await supabase.auth.signInWithPassword({
                            email: values.email,
                            password: values.password
                        })

                        if (re.error != undefined)
                            setErrorNotice(true);
                        else {
                            setSuccessNotice(true);
                            router.refresh();
                        }
                    })
                }>
                    {successNotice&&
                        <NoticeMessage type={"success"} message={''}></NoticeMessage>
                    }
                    {errorNotice&&
                        <NoticeMessage type={"error"} message={'Une erreur est survenue. Vérifiez vos informations.'}></NoticeMessage>
                    }
                    <TextInput
                        withAsterisk
                        label="Adresse email"
                        placeholder="lin.guini@barilla.it..."
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        withAsterisk
                        label="Mot de passe"
                        placeholder="Ke$$a..."
                        mt="sm"
                        {...form.getInputProps('password')}
                    />

                    <Button className={"mt-3"} type="submit">Se connecter</Button>
                </form>
                <Link className={"flex justify-center text text-brand"} href={'/inscription'}>Créer un compte</Link>
            </Box>
        </div>

    );
}