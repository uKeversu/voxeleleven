// src/app/conta/ContaForm.tsx

"use client";

import { useState } from "react";

import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/context/AuthContext";

interface ContaFormProps {
    name: string;
    email: string;
    role: string;
}

export default function ContaForm({
    name,
    email,
    role,
}: ContaFormProps) {

    const {
        refreshProfile,
    } = useAuth();

    const [nameValue, setNameValue] = useState(name);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSave = async () => {

        const newName = nameValue.trim();

        setMessage("");
        setError("");

        if (!newName) {
            setError("Informe seu nome.");
            return;
        }

        if (newName.length < 2) {
            setError(
                "O nome precisa ter pelo menos 2 caracteres."
            );
            return;
        }

        if (newName === name.trim()) {
            setMessage(
                "Nenhuma alteração foi feita."
            );
            return;
        }

        setSaving(true);

        const supabase = createClient();

        try {

            const {
                data,
                error: updateError,
            } = await supabase.rpc(
                "update_my_profile",
                {
                    new_name: newName,
                }
            );

            if (updateError) {

                console.error(
                    "Erro ao atualizar perfil:",
                    updateError
                );

                setError(
                    "Não foi possível atualizar seu nome."
                );

                return;
            }

            if (!data) {

                setError(
                    "Não foi possível atualizar seu perfil."
                );

                return;
            }

            setNameValue(data.name);

            // Atualiza o profile armazenado no AuthContext
            await refreshProfile();

            setMessage(
                "Nome atualizado com sucesso."
            );

        } finally {
            setSaving(false);
        }
    };

    return (
        <Stack spacing={3}>

            <Box>

                <Typography
                    variant="caption"
                    sx={{
                        color: "text.secondary",
                    }}
                >
                    Nome
                </Typography>

                <TextField
                    fullWidth
                    value={nameValue}
                    onChange={(event) => {
                        setNameValue(
                            event.target.value
                        );

                        setMessage("");
                        setError("");
                    }}
                    disabled={saving}
                    placeholder="Seu nome"
                    sx={{
                        mt: 1,
                    }}
                />

            </Box>

            <Divider />

            <Box>

                <Typography
                    variant="caption"
                    sx={{
                        color: "text.secondary",
                    }}
                >
                    E-mail
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 700,
                        mt: 0.7,
                    }}
                >
                    {email}
                </Typography>

            </Box>

            <Divider />

            <Box>

                <Typography
                    variant="caption"
                    sx={{
                        color: "text.secondary",
                    }}
                >
                    Tipo de conta
                </Typography>

                <Typography
                    sx={{
                        fontWeight: 700,
                        mt: 0.7,
                    }}
                >
                    {role === "admin"
                        ? "Administrador"
                        : "Cliente"}
                </Typography>

            </Box>

            {error && (
                <Typography
                    sx={{
                        color: "error.main",
                        fontSize: 14,
                        fontWeight: 600,
                    }}
                >
                    {error}
                </Typography>
            )}

            {message && (
                <Typography
                    sx={{
                        color: "primary.main",
                        fontSize: 14,
                        fontWeight: 700,
                    }}
                >
                    {message}
                </Typography>
            )}

            <Box>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={saving}
                    sx={{
                        minWidth: 150,
                        fontWeight: 800,
                        borderRadius: 2,
                    }}
                >
                    {saving ? (
                        <CircularProgress
                            size={22}
                            color="inherit"
                        />
                    ) : (
                        "Salvar alterações"
                    )}
                </Button>

            </Box>

        </Stack>
    );
}