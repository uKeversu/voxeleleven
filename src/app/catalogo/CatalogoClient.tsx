"use client";

import { useMemo, useState } from "react";
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

export default function CatalogoClient() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const search = searchParams.get("q") || "";

    const selectedCategory =
        searchParams.get("categoria") || "Todos";

    const selectedTeam =
        searchParams.get("time") || "Todos";

    const onlyFeatured =
        searchParams.get("featured") === "true";

    const [sortBy, setSortBy] =
        useState("recentes");

    const [priceRange, setPriceRange] =
        useState<number[]>([0, 300]);

    const [
        mobileFiltersOpen,
        setMobileFiltersOpen,
    ] = useState(false);

    const updateFiltersInUrl = (
        categoria: string,
        time: string,
        featured: boolean
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (categoria !== "Todos")
            params.set("categoria", categoria);
        else
            params.delete("categoria");

        if (time !== "Todos")
            params.set("time", time);
        else
            params.delete("time");

        if (featured)
            params.set("featured", "true");
        else
            params.delete("featured");

        router.replace(`/catalogo?${params.toString()}`);
    };

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        filtered = filtered.filter(
            (product) =>
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                product.team
                    .toLowerCase()
                    .includes(search.toLowerCase())
        );

        if (selectedCategory !== "Todos") {
            filtered = filtered.filter(
                (product) =>
                    product.category === selectedCategory
            );
        }

        if (selectedTeam !== "Todos") {
            filtered = filtered.filter(
                (product) =>
                    product.team === selectedTeam
            );
        }

        filtered = filtered.filter(
            (product) =>
                product.price >= priceRange[0] &&
                product.price <= priceRange[1]
        );

        if (onlyFeatured) {
            filtered = filtered.filter(
                (product) => product.featured
            );
        }

        switch (sortBy) {
            case "menor-preco":
                filtered.sort(
                    (a, b) => a.price - b.price
                );
                break;

            case "maior-preco":
                filtered.sort(
                    (a, b) => b.price - a.price
                );
                break;

            case "az":
                filtered.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                break;

            default:
                break;
        }


        // Sempre estoque zero no final
        filtered.sort((a, b) => {

            const estoqueA = Object.values(a.stock)
                .some((qtd) => qtd > 0);

            const estoqueB = Object.values(b.stock)
                .some((qtd) => qtd > 0);

            if (estoqueA && !estoqueB) return -1;

            if (!estoqueA && estoqueB) return 1;

            return 0;
        });


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
                backgroundColor: "background.default",
                px: {
                    xs: 2,
                    md: 6,
                    xl: 10,
                },
                py: 14,
            }}
        >
            <Box sx={{ mb: 6 }}>
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
                        color: "text.secondary",
                        maxWidth: 700,
                        fontSize: {
                            xs: "1rem",
                            md: "1.1rem",
                        },
                    }}
                >
                    Explore toda a coleção premium da
                    Voxel Eleven.
                </Typography>
            </Box>

            <Button
                startIcon={<TuneIcon />}
                variant="outlined"
                onClick={() =>
                    setMobileFiltersOpen(true)
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
                            position: "sticky",
                            top: 100,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                    >
                        <FiltersSidebar
                            search={search}
                            setSearch={setSearch}
                            selectedCategory={
                                selectedCategory
                            }
                            setSelectedCategory={(value) =>
                                updateFiltersInUrl(
                                    value,
                                    selectedTeam,
                                    onlyFeatured
                                )
                            }
                            selectedTeam={
                                selectedTeam
                            }
                            setSelectedTeam={(value) =>
                                updateFiltersInUrl(
                                    selectedCategory,
                                    value,
                                    onlyFeatured
                                )
                            }
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            priceRange={priceRange}
                            setPriceRange={
                                setPriceRange
                            }
                            onlyFeatured={
                                onlyFeatured
                            }
                            setOnlyFeatured={(value) =>
                                updateFiltersInUrl(
                                    selectedCategory,
                                    selectedTeam,
                                    value
                                )
                            }
                        />
                    </Box>
                </Grid>

                <Grid
                    size={{
                        xs: 12,
                        lg: 9,
                    }}
                >
                    <Box
                        sx={{
                            mb: 4,
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
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

                    <Grid
                        container
                        spacing={3}
                    >
                        {filteredProducts.map(
                            (product) => (
                                <Grid
                                    key={product.id}
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
                </Grid>
            </Grid>

            <Drawer
                anchor="left"
                open={mobileFiltersOpen}
                onClose={() =>
                    setMobileFiltersOpen(false)
                }
                slotProps={{
                    paper: {
                        sx: {
                            width: 320,
                            p: 3,
                            background: "#050505",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
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
                    setSelectedCategory={(value) =>
                        updateFiltersInUrl(
                            value,
                            selectedTeam,
                            onlyFeatured
                        )
                    }
                    selectedTeam={selectedTeam}
                    setSelectedTeam={(value) =>
                        updateFiltersInUrl(
                            selectedCategory,
                            value,
                            onlyFeatured
                        )
                    }
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    onlyFeatured={onlyFeatured}
                    setOnlyFeatured={(value) =>
                        updateFiltersInUrl(
                            selectedCategory,
                            selectedTeam,
                            value
                        )
                    }
                />
            </Drawer>
        </Box>
    );
}