// src/app/conta/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import ContaForm from "./ContaForm";

import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Divider,
    Chip,
} from "@mui/material";

export default async function ContaPage() {
    const supabase = await createClient();

    const {
        data: {
            user,
        },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const {
        data: profile,
        error,
    } = await supabase
        .from("profiles")
        .select("id, name, role, created_at")
        .eq("id", user.id)
        .single();

    if (error || !profile) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    pt: {
                        xs: 14,
                        md: 18,
                    },
                    pb: 10,
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 800 }}
                    >
                        Não foi possível carregar sua conta.
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                            color: "text.secondary",
                        }}
                    >
                        Tente atualizar a página.
                    </Typography>
                </Container>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                pt: {
                    xs: 14,
                    md: 18,
                },
                pb: 10,
            }}
        >
            <Container maxWidth="md">

                <Stack spacing={1} sx={{ mb: 5 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: "primary.main",
                            fontWeight: 900,
                            letterSpacing: 2,
                        }}
                    >
                        MINHA CONTA
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        Olá, {profile.name || "Cliente"}.
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: 16,
                        }}
                    >
                        Gerencie seus dados e acompanhe sua conta.
                    </Typography>
                </Stack>

                <Paper
                    elevation={0}
                    sx={{
                        p: {
                            xs: 3,
                            md: 4,
                        },
                        borderRadius: 4,
                        background:
                            "rgba(255,255,255,.025)",
                        border:
                            "1px solid rgba(255,255,255,.07)",
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{ mb: 3, fontWeight: 800 }}
                    >
                        Dados da conta
                    </Typography>

                    <ContaForm
                        name={profile.name || ""}
                        email={user.email || ""}
                        role={profile.role}
                    />

                </Paper>

            </Container>
        </Box>
    );
}