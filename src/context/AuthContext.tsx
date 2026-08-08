
// src/context/AuthContext.tsx

"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

type Profile = {
    id: string;
    name: string | null;
    role: string;
    created_at: string;
    updated_at: string;
};

type AuthContextType = {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    refreshProfile: () => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<
    AuthContextType | undefined
>(undefined);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    const loadProfile = async (userId: string) => {
        const supabase = createClient();

        const {
            data,
            error,
        } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error(
                "Erro ao carregar perfil:",
                error
            );

            setProfile(null);
            return;
        }

        setProfile(data);
    };

    const refreshProfile = async () => {
        if (!user) {
            setProfile(null);
            return;
        }

        await loadProfile(user.id);
    };

    useEffect(() => {
        const supabase = createClient();

        async function loadSession() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUser(user);

            if (user) {
                await loadProfile(user.id);
            } else {
                setProfile(null);
            }

            setLoading(false);
        }

        loadSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const user = session?.user ?? null;

                setUser(user);

                if (user) {
                    await loadProfile(user.id);
                } else {
                    setProfile(null);
                }

                setLoading(false);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    async function signOut() {
        const supabase = createClient();

        await supabase.auth.signOut();

        setUser(null);
        setProfile(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                refreshProfile,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth deve ser usado dentro de AuthProvider"
        );
    }

    return context;
}