import {ZodI18nProvider} from "tp-kit/components";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import getUser from "@/utils/supabase";

export default async function LoginLayout({children}: {
    children: React.ReactNode
}) {

    const supabase = createServerComponentClient({cookies});
    const user = await getUser(supabase);

    if (user != null)
        redirect('/mon-compte');

    return (
        <ZodI18nProvider>{children}</ZodI18nProvider>
    )
}

export const dynamic = "force-dynamic";