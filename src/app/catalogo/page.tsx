// src/app/catalogo/page.tsx

"use client";

import {
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Chip,
    Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useMemo, useState } from "react";

import ProductCard from "@/components/ProductCard";

import { products } from "@/data/products";

const categories = [
    "Todos",
    "Brasileiros",
    "Europeus",
    "Seleções",
    "Retrô",
];

export default function CatalogoPage() {
    const [search, setSearch] = useState("");

    const [selectedCategory, setSelectedCategory] =
        useState("Todos");

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                product.team
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === "Todos" ||
                product.category === selectedCategory;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [search, selectedCategory]);

    return (
        <Box
            sx={{
                minHeight: "100vh",

                backgroundColor:
                    "background.default",

                px: {
                    xs: 3,
                    md: 10,
                },

                py: 14,
            }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    mb: 6,
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: 800,

                        mb: 2,
                    }}
                >
                    Catálogo
                </Typography>

                <Typography
                    sx={{
                        color: "text.secondary",
                        maxWidth: 700,
                    }}
                >
                    Explore a coleção completa da
                    Voxel Eleven.
                </Typography>
            </Box>

            {/* FILTROS */}
            <Stack
                spacing={3}
                sx={{
                    mb: 6,
                }}
            >
                {/* Busca */}
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Buscar camisa, time ou coleção..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 4,

                            backgroundColor:
                                "background.paper",
                        },
                    }}
                />

                {/* Categorias */}
                <Stack
                    direction="row"
                    spacing={1.5}
                    useFlexGap
                    sx={{
                        flexWrap: "wrap",
                    }}
                >
                    {categories.map((category) => {
                        const active =
                            selectedCategory ===
                            category;

                        return (
                            <Chip
                                key={category}
                                label={category}
                                clickable
                                onClick={() =>
                                    setSelectedCategory(
                                        category
                                    )
                                }
                                sx={{
                                    px: 1,

                                    height: 38,

                                    borderRadius: 999,

                                    fontWeight: 600,

                                    backgroundColor:
                                        active
                                            ? "primary.main"
                                            : "background.paper",

                                    color: active
                                        ? "primary.contrastText"
                                        : "text.primary",

                                    border:
                                        "1px solid",

                                    borderColor: active
                                        ? "primary.main"
                                        : "divider",

                                    transition:
                                        "0.2s",

                                    "&:hover": {
                                        backgroundColor:
                                            active
                                                ? "primary.main"
                                                : "rgba(255,255,255,0.05)",
                                    },
                                }}
                            />
                        );
                    })}
                </Stack>
            </Stack>

            {/* GRID */}
            <Grid container spacing={3}>
                {filteredProducts.map(
                    (product) => (
                        <Grid
                            key={product.id}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                                lg: 3,
                            }}
                        >
                            <ProductCard
                                product={product}
                            />
                        </Grid>
                    )
                )}
            </Grid>

            {/* EMPTY */}
            {filteredProducts.length === 0 && (
                <Box
                    sx={{
                        py: 10,
                        textAlign: "center",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            mb: 1,
                        }}
                    >
                        Nenhum produto encontrado
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                        }}
                    >
                        Tente outro termo ou
                        categoria.
                    </Typography>
                </Box>
            )}
        </Box>
    );
}