"use client";

import {z} from 'zod';
import {useForm, zodResolver} from "@mantine/form";
import {Box, Group, PasswordInput, TextInput} from "@mantine/core";
import Link from "next/link";
import {Button} from "tp-kit/components";

export default function Page() {

    const schema = z.object({
        name: z.string().min(2, { message: 'Votre nom doit contenir au moins 2 caractères.' }),
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(6, { message: 'Votre mot de passe doit contenir au moins 6 caractères.' }),
    });

    const form = useForm({
        validate: zodResolver(schema),
        initialValues: {
            email: '',
            password: '',
        },
    });

    return (
        <div className={"flex justify-center"}>
            <Box miw={400} mx="auto" className={"flex flex-col justify-center bg-white shadow-xl p-6 m-24 gap-y-2 rounded-lg"} >
                <h3 className={"uppercase font-medium"}>Connexion</h3>
                <form className={"flex flex-col gap-y-2 mt-5 mb-5"} onSubmit={form.onSubmit((values) => console.log(values))}>
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