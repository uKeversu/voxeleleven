// src/app/cadastro page.ts

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

export default function CadastroPage() {
    const router = useRouter();
    const supabase = createClient();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (!name.trim()) {
            setError("Digite seu nome.");
            return;
        }

        if (!email.trim()) {
            setError("Digite seu e-mail.");
            return;
        }

        if (password.length < 8) {
            setError("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: {
                    data: {
                        name: name.trim(),
                    },
                },
            });

            if (error) {
                setError(error.message);
                return;
            }

            if (!data.user) {
                setError("Não foi possível criar a conta.");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error(error);
            setError("Ocorreu um erro inesperado. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
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
                            sx={{fontWeight: 800}}
                            gutterBottom
                        >
                            Criar conta
                        </Typography>

                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >
                            Crie sua conta para acompanhar seus pedidos e
                            acessar sua área pessoal.
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
                                label="Nome"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                fullWidth
                                required
                                autoComplete="name"
                            />

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
                                autoComplete="new-password"
                            />

                            <TextField
                                label="Confirmar senha"
                                type="password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(event.target.value)
                                }
                                fullWidth
                                required
                                autoComplete="new-password"
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
                                    "Criar conta"
                                )}
                            </Button>
                        </Stack>
                    </Box>

                    <Typography
                        variant="body2"
                        sx={{color: 'text.secondary', textAlign: 'center'}}
                    >
                        Já possui uma conta?{" "}
                        <Box
                            component="span"
                            onClick={() => router.push("/login")}
                            sx={{
                                color: "primary.main",
                                fontWeight: 700,
                                cursor: "pointer",
                            }}
                        >
                            Entrar
                        </Box>
                    </Typography>
                </Stack>
            </Paper>
        </Container>
    );
}