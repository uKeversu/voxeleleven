// src/app/admin/produtos/[id]/StockEditor.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

interface StockVariant {
    id: number;
    size: string;
    stock: number;
}

interface StockEditorProps {
    productId: number;
    variants: StockVariant[];
}

export default function StockEditor({
    productId,
    variants,
}: StockEditorProps) {
    const router = useRouter();

    const [stockValues, setStockValues] = useState<
        Record<number, string>
    >(
        Object.fromEntries(
            variants.map((variant) => [
                variant.id,
                String(variant.stock),
            ])
        )
    );

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function clearMessages() {
        setMessage("");
        setError("");
    }

    function handleStockChange(
        variantId: number,
        value: string
    ) {
        clearMessages();

        if (!/^\d*$/.test(value)) {
            return;
        }

        setStockValues((current) => ({
            ...current,
            [variantId]: value,
        }));
    }

    async function handleSave() {
        clearMessages();

        const parsedVariants = variants.map((variant) => ({
            ...variant,
            newStock: Number(
                stockValues[variant.id] ?? ""
            ),
        }));

        const invalidVariant = parsedVariants.find(
            (variant) =>
                !Number.isInteger(variant.newStock) ||
                variant.newStock < 0
        );

        if (invalidVariant) {
            setError(
                `Informe um estoque válido para o tamanho ${invalidVariant.size}.`
            );

            return;
        }

        setSaving(true);

        try {
            const supabase = createClient();

            /*
             * Atualiza cada variante individualmente.
             */

            for (const variant of parsedVariants) {
                const { error: updateError } =
                    await supabase.rpc(
                        "admin_update_product_stock",
                        {
                            p_product_id: productId,
                            p_size: variant.size,
                            p_stock: variant.newStock,
                        }
                    );

                if (updateError) {
                    console.error(
                        "Erro ao atualizar estoque:",
                        updateError
                    );

                    setError(
                        updateError.message ||
                        `Não foi possível atualizar o estoque do tamanho ${variant.size}.`
                    );

                    return;
                }
            }

            setMessage(
                "Estoque atualizado com sucesso."
            );

            router.refresh();
        } catch (err) {
            console.error(
                "Erro inesperado ao atualizar estoque:",
                err
            );

            setError(
                "Ocorreu um erro inesperado ao atualizar o estoque."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <Box
            sx={{
                mt: 3,
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
                sx={{
                    fontWeight: 900,
                    mb: 3,
                }}
            >
                Editar estoque
            </Typography>

            {variants.length > 0 ? (
                <Stack spacing={2}>
                    {variants.map((variant) => (
                        <Box
                            key={variant.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent:
                                    "space-between",
                                gap: 2,
                                p: 2,
                                borderRadius: 2,
                                background:
                                    "rgba(255,255,255,.03)",
                                border:
                                    "1px solid rgba(255,255,255,.05)",
                            }}
                        >
                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: 18,
                                    }}
                                >
                                    {variant.size}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "text.secondary",
                                    }}
                                >
                                    Estoque atual:{" "}
                                    {variant.stock} un.
                                </Typography>
                            </Box>

                            <TextField
                                value={
                                    stockValues[
                                    variant.id
                                    ] ?? ""
                                }
                                onChange={(event) =>
                                    handleStockChange(
                                        variant.id,
                                        event.target.value
                                    )
                                }
                                disabled={saving}
                                type="text"
                                inputMode="numeric"
                                size="small"
                                sx={{
                                    width: 120,
                                }}
                                slotProps={{
                                    htmlInput: {
                                        min: 0,
                                    },
                                }}
                            />
                        </Box>
                    ))}

                    <Divider sx={{ my: 1 }} />

                    {error && (
                        <Typography
                            sx={{
                                color: "error.main",
                                fontSize: 14,
                                fontWeight: 700,
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
                                minWidth: 180,
                                borderRadius: 2,
                                fontWeight: 800,
                            }}
                        >
                            {saving ? (
                                <CircularProgress
                                    size={22}
                                    color="inherit"
                                />
                            ) : (
                                "Salvar estoque"
                            )}
                        </Button>
                    </Box>
                </Stack>
            ) : (
                <Typography
                    sx={{
                        color: "text.secondary",
                    }}
                >
                    Nenhuma variante cadastrada.
                </Typography>
            )}
        </Box>
    );
}