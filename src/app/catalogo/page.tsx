// src/app/catalogo/page.tsx

"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import {
    Box,
    Typography,
    Grid,
    Button,
    Drawer,
    IconButton,
} from "@mui/material";

import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";

import ProductCard from "@/components/ProductCard";

import FiltersSidebar from "@/components/FiltersSidebar";

import { products } from "@/data/products";

export default function CatalogoPage() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const [search, setSearch] =
        useState("");

    const [selectedCategory, setSelectedCategory] =
        useState(
            searchParams.get("categoria") || "Todos"
        );

    const [selectedTeam, setSelectedTeam] =
        useState(
            searchParams.get("time") || "Todos"
        );

    const [onlyFeatured, setOnlyFeatured] =
        useState(
            searchParams.get("featured") === "true" || false
        );

    useEffect(() => {
        const categoria =
            searchParams.get("categoria") || "Todos";

        const time =
            searchParams.get("time") || "Todos";

        const featured =
            searchParams.get("featured") === "true";

        setSelectedCategory(categoria);
        setSelectedTeam(time);
        setOnlyFeatured(featured);
    }, [searchParams]);

    const [sortBy, setSortBy] =
        useState("recentes");

    const [priceRange, setPriceRange] =
        useState<number[]>(([0, 300]));

    const [
        mobileFiltersOpen,
        setMobileFiltersOpen,
    ] = useState(false);

    const updateFiltersInUrl = (
        categoria: string,
        time: string,
        featured: boolean
    ) => {
        const params = new URLSearchParams();

        if (categoria !== "Todos") {
            params.set("categoria", categoria);
        }

        if (time !== "Todos") {
            params.set("time", time);
        }

        if (featured) {
            params.set("featured", "true");
        }

        router.replace(`/catalogo?${params.toString()}`);
    };

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // SEARCH
        filtered = filtered.filter(
            (product) =>
                product.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                product.team
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

        // CATEGORY
        if (
            selectedCategory !== "Todos"
        ) {
            filtered = filtered.filter(
                (product) =>
                    product.category ===
                    selectedCategory
            );
        }

        // TEAM
        if (selectedTeam !== "Todos") {
            filtered = filtered.filter(
                (product) =>
                    product.team ===
                    selectedTeam
            );
        }

        // PRICE
        filtered = filtered.filter(
            (product) =>
                product.price >=
                priceRange[0] &&
                product.price <=
                priceRange[1]
        );

        // FEATURED
        if (onlyFeatured) {
            filtered = filtered.filter(
                (product) =>
                    product.featured
            );
        }

        // SORT
        switch (sortBy) {
            case "menor-preco":
                filtered.sort(
                    (a, b) =>
                        a.price - b.price
                );
                break;

            case "maior-preco":
                filtered.sort(
                    (a, b) =>
                        b.price - a.price
                );
                break;

            case "az":
                filtered.sort((a, b) =>
                    a.name.localeCompare(
                        b.name
                    )
                );
                break;

            default:
                break;
        }

        return filtered;
    }, [
        search,
        selectedCategory,
        selectedTeam,
        sortBy,
        priceRange,
        onlyFeatured,
    ]);

    return (
        <Box
            sx={{
                minHeight: "100vh",

                backgroundColor:
                    "background.default",

                px: {
                    xs: 2,
                    md: 6,
                    xl: 10,
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
                        fontWeight: 900,

                        mb: 2,

                        fontSize: {
                            xs: "2.5rem",
                            md: "4rem",
                        },
                    }}
                >
                    Catálogo
                </Typography>

                <Typography
                    sx={{
                        color:
                            "text.secondary",

                        maxWidth: 700,

                        fontSize: {
                            xs: "1rem",
                            md: "1.1rem",
                        },
                    }}
                >
                    Explore toda a coleção
                    premium da Voxel Eleven.
                </Typography>
            </Box>

            {/* MOBILE BUTTON */}
            <Button
                startIcon={<TuneIcon />}
                variant="outlined"
                onClick={() =>
                    setMobileFiltersOpen(
                        true
                    )
                }
                sx={{
                    display: {
                        xs: "flex",
                        lg: "none",
                    },

                    mb: 4,

                    borderRadius: 999,

                    px: 3,
                    py: 1.2,
                }}
            >
                Filtros
            </Button>

            <Grid
                container
                spacing={4}
                sx={{
                    alignItems: "flex-start",
                }}
            >
                {/* SIDEBAR */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 3,
                    }}
                    sx={{
                        display: {
                            xs: "none",
                            lg: "block",
                        },
                    }}
                >
                    <Box
                        sx={{
                            position:
                                "sticky",

                            top: 100,

                            display: "flex",

                            flexDirection:
                                "column",

                            gap: 3,
                        }}
                    >
                        <FiltersSidebar
                            search={search}
                            setSearch={setSearch}
                            selectedCategory={
                                selectedCategory
                            }
                            setSelectedCategory={
                                setSelectedCategory
                            }
                            selectedTeam={
                                selectedTeam
                            }
                            setSelectedTeam={
                                setSelectedTeam
                            }
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            priceRange={
                                priceRange
                            }
                            setPriceRange={
                                setPriceRange
                            }
                            onlyFeatured={
                                onlyFeatured
                            }
                            setOnlyFeatured={
                                setOnlyFeatured
                            }
                            updateFiltersInUrl={
                                updateFiltersInUrl
                            }
                        />
                    </Box>
                </Grid>

                {/* PRODUTOS */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 9,
                    }}
                >
                    {/* TOP BAR */}
                    <Box
                        sx={{
                            mb: 4,

                            display: "flex",

                            justifyContent:
                                "space-between",

                            alignItems:
                                "center",

                            flexWrap: "wrap",

                            gap: 2,
                        }}
                    >
                        <Typography
                            sx={{
                                color:
                                    "text.secondary",

                                fontWeight: 500,
                            }}
                        >
                            {
                                filteredProducts.length
                            }{" "}
                            produtos encontrados
                        </Typography>
                    </Box>

                    {/* GRID */}
                    <Grid
                        container
                        spacing={3}
                    >
                        {filteredProducts.map(
                            (product) => (
                                <Grid
                                    key={
                                        product.id
                                    }
                                    size={{
                                        xs: 12,
                                        sm: 6,
                                        xl: 4,
                                    }}
                                >
                                    <ProductCard
                                        product={
                                            product
                                        }
                                    />
                                </Grid>
                            )
                        )}
                    </Grid>

                    {/* EMPTY */}
                    {filteredProducts.length ===
                        0 && (
                            <Box
                                sx={{
                                    py: 14,

                                    textAlign:
                                        "center",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        mb: 2,

                                        fontWeight: 700,
                                    }}
                                >
                                    Nenhum produto
                                    encontrado
                                </Typography>

                                <Typography
                                    sx={{
                                        color:
                                            "text.secondary",
                                    }}
                                >
                                    Tente alterar os
                                    filtros ou buscar
                                    outro termo.
                                </Typography>
                            </Box>
                        )}
                </Grid>
            </Grid>

            {/* MOBILE DRAWER */}
            <Drawer
                anchor="left"
                open={mobileFiltersOpen}
                onClose={() =>
                    setMobileFiltersOpen(
                        false
                    )
                }
                slotProps={{
                    paper: {
                        sx: {
                            width: 320,

                            p: 3,

                            background:
                                "#050505",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",

                        alignItems:
                            "center",

                        justifyContent:
                            "space-between",

                        mb: 4,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                        }}
                    >
                        Filtros
                    </Typography>

                    <IconButton
                        onClick={() =>
                            setMobileFiltersOpen(
                                false
                            )
                        }
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <FiltersSidebar
                    search={search}
                    setSearch={setSearch}
                    selectedCategory={
                        selectedCategory
                    }
                    setSelectedCategory={
                        setSelectedCategory
                    }
                    selectedTeam={
                        selectedTeam
                    }
                    setSelectedTeam={
                        setSelectedTeam
                    }
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    priceRange={
                        priceRange
                    }
                    setPriceRange={
                        setPriceRange
                    }
                    onlyFeatured={
                        onlyFeatured
                    }
                    setOnlyFeatured={
                        setOnlyFeatured
                    }
                    updateFiltersInUrl={
                        updateFiltersInUrl
                    }
                />
            </Drawer>
        </Box>
    );
}