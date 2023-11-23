"use client";

import {z} from 'zod';
import {useForm, zodResolver} from "@mantine/form";
import {Box, PasswordInput, TextInput} from "@mantine/core";
import Link from "next/link";
import {Button, NoticeMessage} from "tp-kit/components";
import React, {useState} from "react";

export default function Page() {

    const schema = z.object({
        name: z.string().min(2, { message: 'Votre nom doit contenir au moins 2 caractères.' }),
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(6, { message: 'Votre mot de passe doit contenir au moins 6 caractères.' }),
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
                    form.onSubmit((values) => {
                        console.log(values);
                        setSuccessNotice(true);
                    })
                }>
                    {successNotice&&
                        <NoticeMessage type={"success"} message={'Votre inscription a bien été prise en compte. Validez votre adresse email pour vous connecter.'}></NoticeMessage>
                    }
                    {!errorNotice&&
                        <NoticeMessage type={"error"} message={'Error message.'}></NoticeMessage>
                    }
                    <TextInput
                        withAsterisk
                        label="Nom"
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
                <Link className={"flex justify-center text text-brand"} href={'/inscription'}>Déjà un compte ? Se connecter</Link>
            </Box>
        </div>

    );
}