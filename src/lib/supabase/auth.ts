// src/lib/supabase/auth.ts

import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return {
            user: null,
            profile: null,
        };
    }

    const { data: profile, error: profileError } =
        await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

    if (profileError) {
        console.error(
            "Erro ao buscar profile:",
            profileError
        );

        return {
            user,
            profile: null,
        };
    }

    return {
        user,
        profile,
    };
}