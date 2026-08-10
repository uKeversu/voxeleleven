// src/app/admin/produtos/novo/NewProductForm.tsx

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Divider,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import { createClient } from "@/lib/supabase/client";

export default function NewProductForm() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [team, setTeam] = useState("");
    const [category, setCategory] = useState("");
    const [season, setSeason] = useState("");
    const [price, setPrice] = useState("");
    const [badge, setBadge] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const [featured, setFeatured] = useState(false);
    const [active, setActive] = useState(true);

    const [stockP, setStockP] = useState("0");
    const [stockM, setStockM] = useState("0");
    const [stockG, setStockG] = useState("0");
    const [stockGG, setStockGG] = useState("0");

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    function clearError() {
        setError("");
    }

    function parseStock(value: string) {
        const stock = Number(value);

        if (!Number.isInteger(stock) || stock < 0) {
            return null;
        }

        return stock;
    }

    async function handleCreate() {
        clearError();

        if (!name.trim()) {
            setError("Informe o nome do produto.");
            return;
        }

        if (!slug.trim()) {
            setError("Informe o slug do produto.");
            return;
        }

        if (!team.trim()) {
            setError("Informe o time.");
            return;
        }

        if (!category.trim()) {
            setError("Informe a categoria.");
            return;
        }

        if (!season.trim()) {
            setError("Informe a temporada.");
            return;
        }

        const normalizedPrice = price
            .replace(",", ".")
            .trim();

        const numericPrice = Number(normalizedPrice);

        if (
            !Number.isFinite(numericPrice) ||
            numericPrice < 0
        ) {
            setError("Informe um preço válido.");
            return;
        }

        const parsedP = parseStock(stockP);
        const parsedM = parseStock(stockM);
        const parsedG = parseStock(stockG);
        const parsedGG = parseStock(stockGG);

        if (
            parsedP === null ||
            parsedM === null ||
            parsedG === null ||
            parsedGG === null
        ) {
            setError(
                "O estoque deve conter apenas números inteiros iguais ou maiores que zero."
            );
            return;
        }

        setSaving(true);

        try {
            const supabase = createClient();

            const { data, error: createError } =
                await supabase.rpc(
                    "admin_create_product",
                    {
                        p_name: name.trim(),
                        p_slug: slug.trim(),
                        p_team: team.trim(),
                        p_category: category.trim(),
                        p_season: season.trim(),
                        p_price: numericPrice,
                        p_badge:
                            badge.trim() || null,
                        p_image: image.trim(),
                        p_description:
                            description.trim(),
                        p_featured: featured,
                        p_active: active,
                        p_stock_p: parsedP,
                        p_stock_m: parsedM,
                        p_stock_g: parsedG,
                        p_stock_gg: parsedGG,
                    }
                );

            if (createError) {
                console.error(
                    "Erro ao criar produto:",
                    createError
                );

                setError(
                    createError.message ||
                        "Não foi possível criar o produto."
                );

                return;
            }

            if (!data) {
                setError(
                    "O produto foi criado, mas a operação não retornou os dados."
                );

                return;
            }

            router.push(
                `/admin/produtos/${data.id}`
            );

            router.refresh();
        } catch (err) {
            console.error(
                "Erro inesperado ao criar produto:",
                err
            );

            setError(
                "Ocorreu um erro inesperado ao criar o produto."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
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
            <Stack spacing={4}>

                {/* INFORMAÇÕES */}

                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 900,
                            mb: 3,
                        }}
                    >
                        Informações do produto
                    </Typography>

                    <Stack spacing={3}>

                        <TextField
                            fullWidth
                            label="Nome"
                            value={name}
                            onChange={(event) => {
                                setName(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            placeholder="Brasil - Home 26/27"
                        />

                        <TextField
                            fullWidth
                            label="Slug"
                            value={slug}
                            onChange={(event) => {
                                setSlug(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            placeholder="brasil-home-26-27"
                            helperText="Identificador usado na URL do produto."
                        />

                        <TextField
                            fullWidth
                            label="Time"
                            value={team}
                            onChange={(event) => {
                                setTeam(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            placeholder="Brasil"
                        />

                        <TextField
                            fullWidth
                            label="Categoria"
                            value={category}
                            onChange={(event) => {
                                setCategory(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            placeholder="Seleções"
                        />

                        <TextField
                            fullWidth
                            label="Temporada"
                            value={season}
                            onChange={(event) => {
                                setSeason(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            placeholder="26"
                        />

                        <TextField
                            fullWidth
                            label="Preço"
                            value={price}
                            onChange={(event) => {
                                setPrice(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            inputMode="decimal"
                            placeholder="119,90"
                        />

                        <TextField
                            fullWidth
                            label="Badge"
                            value={badge}
                            onChange={(event) => {
                                setBadge(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            placeholder="NEW"
                        />

                        <TextField
                            fullWidth
                            label="Imagem"
                            value={image}
                            onChange={(event) => {
                                setImage(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            placeholder="https://..."
                        />

                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            label="Descrição"
                            value={description}
                            onChange={(event) => {
                                setDescription(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            placeholder="Descrição do produto..."
                        />

                    </Stack>
                </Box>

                <Divider />

                {/* ESTOQUE */}

                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 900,
                            mb: 1,
                        }}
                    >
                        Estoque inicial
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            mb: 3,
                        }}
                    >
                        Defina a quantidade disponível
                        para cada tamanho.
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr 1fr",
                                sm: "1fr 1fr 1fr 1fr",
                            },
                            gap: 2,
                        }}
                    >

                        <TextField
                            label="P"
                            type="number"
                            value={stockP}
                            onChange={(event) => {
                                setStockP(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    step: 1,
                                },
                            }}
                        />

                        <TextField
                            label="M"
                            type="number"
                            value={stockM}
                            onChange={(event) => {
                                setStockM(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    step: 1,
                                },
                            }}
                        />

                        <TextField
                            label="G"
                            type="number"
                            value={stockG}
                            onChange={(event) => {
                                setStockG(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    step: 1,
                                },
                            }}
                        />

                        <TextField
                            label="GG"
                            type="number"
                            value={stockGG}
                            onChange={(event) => {
                                setStockGG(
                                    event.target.value
                                );
                                clearError();
                            }}
                            disabled={saving}
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    step: 1,
                                },
                            }}
                        />

                    </Box>
                </Box>

                <Divider />

                {/* STATUS */}

                <Box>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 900,
                            mb: 2,
                        }}
                    >
                        Configurações
                    </Typography>

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
                                    checked={active}
                                    onChange={(event) => {
                                        setActive(
                                            event.target
                                                .checked
                                        );
                                        clearError();
                                    }}
                                    disabled={saving}
                                />
                            }
                            label="Produto ativo"
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={featured}
                                    onChange={(event) => {
                                        setFeatured(
                                            event.target
                                                .checked
                                        );
                                        clearError();
                                    }}
                                    disabled={saving}
                                />
                            }
                            label="Produto em destaque"
                        />

                    </Stack>
                </Box>

                {/* ERRO */}

                {error && (
                    <Alert
                        severity="error"
                        onClose={() => setError("")}
                    >
                        {error}
                    </Alert>
                )}

                <Divider />

                {/* AÇÕES */}

                <Stack
                    direction={{
                        xs: "column-reverse",
                        sm: "row",
                    }}
                    spacing={2}
                    sx={{
                        justifyContent:
                            "flex-end",
                    }}
                >

                    <Button
                        component={Link}
                        href="/admin/produtos"
                        variant="outlined"
                        disabled={saving}
                        sx={{
                            borderRadius: 2,
                            fontWeight: 800,
                        }}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleCreate}
                        disabled={saving}
                        sx={{
                            minWidth: 180,
                            borderRadius: 2,
                            fontWeight: 900,
                        }}
                    >
                        {saving ? (
                            <CircularProgress
                                size={22}
                                color="inherit"
                            />
                        ) : (
                            "Criar produto"
                        )}
                    </Button>

                </Stack>

            </Stack>
        </Paper>
    );
}