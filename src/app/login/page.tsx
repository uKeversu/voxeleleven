"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (!email.trim()) {
            setError("Digite seu e-mail.");
            return;
        }

        if (!password) {
            setError("Digite sua senha.");
            return;
        }

        try {
            setLoading(true);

            const { error } =
                await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password,
                });

            if (error) {
                setError("E-mail ou senha incorretos.");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(error);
            setError(
                "Ocorreu um erro inesperado. Tente novamente."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="sm" sx={{
            py: 8,
            pt: {
                xs: 14,
                md: 18,
            },
        }}>
            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 3,
                        sm: 5,
                    },
                    borderRadius: 4,
                }}
            >
                <Stack spacing={3}>
                    <Box>
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{ fontWeight: 800 }}
                        >
                            Entrar
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            Entre na sua conta para acessar
                            seus pedidos e sua área pessoal.
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <Stack spacing={2.5}>
                            <TextField
                                label="E-mail"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                fullWidth
                                required
                                autoComplete="email"
                            />

                            <TextField
                                label="Senha"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                fullWidth
                                required
                                autoComplete="current-password"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    minHeight: 52,
                                    fontWeight: 700,
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "Entrar"
                                )}
                            </Button>
                        </Stack>
                    </Box>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            textAlign: 'center'
                        }}
                    >
                        Ainda não possui uma conta?{" "}
                        <Box
                            component="span"
                            onClick={() =>
                                router.push("/cadastro")
                            }
                            sx={{
                                color: "primary.main",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            Criar conta
                        </Box>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    );
}