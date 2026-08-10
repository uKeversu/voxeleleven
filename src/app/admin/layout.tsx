// src/app/admin/layout.tsx

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

import Box from "@mui/material/Box";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: {
            user,
        },
    } = await supabase.auth.getUser();

    // Usuário não autenticado
    if (!user) {
        redirect("/login");
    }

    const {
        data: profile,
        error,
    } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    // Perfil inexistente ou erro
    if (error || !profile) {
        redirect("/");
    }

    // Usuário sem permissão administrativa
    if (profile.role !== "admin") {
        redirect("/");
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "#050505",
            }}
        >
            <AdminSidebar />

            <Box
                component="main"
                sx={{
                    minHeight: "100vh",

                    ml: {
                        xs: 0,
                        md: "260px",
                    },

                    width: {
                        xs: "100%",
                        md: "calc(100% - 260px)",
                    },
                }}
            >
                {children}
            </Box>
        </Box>
    );
}