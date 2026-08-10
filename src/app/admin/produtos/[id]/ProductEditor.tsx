// src/app/admin/produtos/[id]/ProductEditor.tsx

"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Stack,
    Switch,
    TextField,
    Typography,
    FormControlLabel,
} from "@mui/material";

import { createClient } from "@/lib/supabase/client";

interface ProductEditorProps {
    productId: number;
    name: string;
    slug: string;
    team: string;
    category: string;
    season: string;
    price: number;
    badge: string | null;
    image: string;
    description: string;
    featured: boolean;
    active: boolean;
}

export default function ProductEditor({
    productId,
    name,
    slug,
    team,
    category,
    season,
    price,
    badge,
    image,
    description,
    featured,
    active,
}: ProductEditorProps) {
    const [nameValue, setNameValue] = useState(name);
    const [slugValue, setSlugValue] = useState(slug);
    const [teamValue, setTeamValue] = useState(team);
    const [categoryValue, setCategoryValue] =
        useState(category);
    const [seasonValue, setSeasonValue] =
        useState(season);
    const [priceValue, setPriceValue] = useState(
        Number(price).toFixed(2)
    );
    const [badgeValue, setBadgeValue] =
        useState(badge ?? "");
    const [imageValue, setImageValue] =
        useState(image);
    const [descriptionValue, setDescriptionValue] =
        useState(description);
    const [featuredValue, setFeaturedValue] =
        useState(featured);
    const [activeValue, setActiveValue] =
        useState(active);

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    function clearMessages() {
        setMessage("");
        setError("");
    }

    async function handleSave() {
        clearMessages();

        const normalizedPrice = priceValue
            .replace(",", ".")
            .trim();

        const newPrice = Number(normalizedPrice);

        if (!nameValue.trim()) {
            setError("Informe o nome do produto.");
            return;
        }

        if (!slugValue.trim()) {
            setError("Informe o slug do produto.");
            return;
        }

        if (!teamValue.trim()) {
            setError("Informe o time.");
            return;
        }

        if (!categoryValue.trim()) {
            setError("Informe a categoria.");
            return;
        }

        if (!seasonValue.trim()) {
            setError("Informe a temporada.");
            return;
        }

        if (!Number.isFinite(newPrice)) {
            setError("Informe um preço válido.");
            return;
        }

        if (newPrice < 0) {
            setError("O preço não pode ser negativo.");
            return;
        }

        setSaving(true);

        try {
            const supabase = createClient();

            const { data, error: updateError } =
                await supabase.rpc(
                    "admin_update_product",
                    {
                        p_product_id: productId,
                        p_name: nameValue.trim(),
                        p_slug: slugValue.trim(),
                        p_team: teamValue.trim(),
                        p_category: categoryValue.trim(),
                        p_season: seasonValue.trim(),
                        p_price: newPrice,
                        p_badge:
                            badgeValue.trim() || null,
                        p_image: imageValue.trim(),
                        p_description:
                            descriptionValue.trim(),
                        p_featured: featuredValue,
                        p_active: activeValue,
                    }
                );

            if (updateError) {
                console.error(
                    "Erro ao atualizar produto:",
                    updateError
                );

                setError(
                    updateError.message ||
                    "Não foi possível atualizar o produto."
                );

                return;
            }

            if (!data) {
                setError(
                    "A atualização não retornou o produto."
                );

                return;
            }

            setNameValue(data.name);
            setSlugValue(data.slug);
            setTeamValue(data.team);
            setCategoryValue(data.category);
            setSeasonValue(data.season);
            setPriceValue(
                Number(data.price).toFixed(2)
            );
            setBadgeValue(data.badge ?? "");
            setImageValue(data.image);
            setDescriptionValue(
                data.description ?? ""
            );
            setFeaturedValue(
                Boolean(data.featured)
            );
            setActiveValue(Boolean(data.active));

            setMessage("Produto atualizado com sucesso.");
            router.refresh();
        } catch (err) {
            console.error(
                "Erro inesperado ao atualizar produto:",
                err
            );

            setError(
                "Ocorreu um erro inesperado."
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
                Editar produto
            </Typography>

            <Stack spacing={3}>
                <TextField
                    fullWidth
                    label="Nome"
                    value={nameValue}
                    onChange={(event) => {
                        setNameValue(event.target.value);
                        clearMessages();
                    }}
                    disabled={saving}
                />

                <TextField
                    fullWidth
                    label="Slug"
                    value={slugValue}
                    onChange={(event) => {
                        setSlugValue(event.target.value);
                        clearMessages();
                    }}
                    disabled={saving}
                />

                <TextField
                    fullWidth
                    label="Time"
                    value={teamValue}
                    onChange={(event) => {
                        setTeamValue(event.target.value);
                        clearMessages();
                    }}
                    disabled={saving}
                />

                <TextField
                    fullWidth
                    label="Categoria"
                    value={categoryValue}
                    onChange={(event) => {
                        setCategoryValue(
                            event.target.value
                        );
                        clearMessages();
                    }}
                    disabled={saving}
                />

                <TextField
                    fullWidth
                    label="Temporada"
                    value={seasonValue}
                    onChange={(event) => {
                        setSeasonValue(
                            event.target.value
                        );
                        clearMessages();
                    }}
                    disabled={saving}
                />

                <TextField
                    fullWidth
                    label="Preço"
                    value={priceValue}
                    onChange={(event) => {
                        setPriceValue(
                            event.target.value
                        );
                        clearMessages();
                    }}
                    disabled={saving}
                    inputMode="decimal"
                    placeholder="119,90"
                />

                <TextField
                    fullWidth
                    label="Badge"
                    value={badgeValue}
                    onChange={(event) => {
                        setBadgeValue(
                            event.target.value
                        );
                        clearMessages();
                    }}
                    disabled={saving}
                    placeholder="NEW"
                />

                <TextField
                    fullWidth
                    label="Imagem"
                    value={imageValue}
                    onChange={(event) => {
                        setImageValue(
                            event.target.value
                        );
                        clearMessages();
                    }}
                    disabled={saving}
                />

                <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    label="Descrição"
                    value={descriptionValue}
                    onChange={(event) => {
                        setDescriptionValue(
                            event.target.value
                        );
                        clearMessages();
                    }}
                    disabled={saving}
                />

                <Divider />

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={2}
                >
                    <FormControlLabel
                        control={
                            <Switch
                                checked={featuredValue}
                                onChange={(event) => {
                                    setFeaturedValue(
                                        event.target
                                            .checked
                                    );
                                    clearMessages();
                                }}
                                disabled={saving}
                            />
                        }
                        label="Produto em destaque"
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                checked={activeValue}
                                onChange={(event) => {
                                    setActiveValue(
                                        event.target
                                            .checked
                                    );
                                    clearMessages();
                                }}
                                disabled={saving}
                            />
                        }
                        label="Produto ativo"
                    />
                </Stack>

                <Divider />

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
                            minWidth: 190,
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
                            "Salvar alterações"
                        )}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
}