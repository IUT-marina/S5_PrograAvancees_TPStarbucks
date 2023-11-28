import {SupabaseClient} from "@supabase/supabase-js";

export default async function getUser(supabaseClient: SupabaseClient) {
    let session = await supabaseClient.auth.getSession();
    if(!session)
        return null;

    const user = session.data.session?.user;
    if(user === undefined)
        return null;

    return user;
}