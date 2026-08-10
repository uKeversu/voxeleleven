// src/app/admin/page.tsx

import {
    Box,
    Container,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { getProducts } from "@/lib/products";

export default async function AdminPage() {
    const products = await getProducts();

    const totalProducts = products.length;

    const totalStock = products.reduce((total, product) => {
        return (
            total +
            Object.values(product.stock).reduce(
                (sum, quantity) => sum + quantity,
                0
            )
        );
    }, 0);

    const outOfStock = products.filter((product) => {
        const total = Object.values(product.stock).reduce(
            (sum, quantity) => sum + quantity,
            0
        );

        return total === 0;
    }).length;

    const featuredProducts = products.filter(
        (product) => product.featured
    ).length;

    const stockBySize: Record<string, number> = {};

    products.forEach((product) => {
        Object.entries(product.stock).forEach(
            ([size, quantity]) => {
                stockBySize[size] =
                    (stockBySize[size] ?? 0) + quantity;
            }
        );
    });

    const outOfStockProducts = products.filter((product) => {
        const total = Object.values(product.stock).reduce(
            (sum, quantity) => sum + quantity,
            0
        );

        return total === 0;
    });

    const stats = [
        {
            label: "Produtos ativos",
            value: totalProducts,
        },
        {
            label: "Unidades em estoque",
            value: totalStock,
        },
        {
            label: "Sem estoque",
            value: outOfStock,
        },
        {
            label: "Em destaque",
            value: featuredProducts,
        },
    ];

    return (
        <Box
            sx={{
                minHeight: "100vh",
                py: {
                    xs: 12,
                    md: 6,
                },
                pt: {
                    xs: 14,
                    md: 18,
                },
            }}
        >
            <Container maxWidth="xl">

                {/* HEADER */}

                <Stack spacing={1} sx={{ mb: 5 }}>
                    <Typography
                        variant="overline"
                        sx={{
                            color: "primary.main",
                            fontWeight: 900,
                            letterSpacing: 2,
                        }}
                    >
                        DASHBOARD
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        Visão geral
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                        }}
                    >
                        Resumo atual da operação da Voxel Eleven.
                    </Typography>
                </Stack>

                {/* STATS */}

                <Grid
                    container
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    {stats.map((stat) => (
                        <Grid
                            key={stat.label}
                            size={{
                                xs: 12,
                                sm: 6,
                                lg: 3,
                            }}
                        >
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    background:
                                        "rgba(255,255,255,.025)",
                                    border:
                                        "1px solid rgba(255,255,255,.07)",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: 13,
                                        fontWeight: 700,
                                    }}
                                >
                                    {stat.label}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 1,
                                        fontSize: 34,
                                        fontWeight: 900,
                                        lineHeight: 1,
                                    }}
                                >
                                    {stat.value}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* ESTOQUE POR TAMANHO */}

                <Grid
                    container
                    spacing={2}
                    sx={{ mb: 4 }}
                >
                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                height: "100%",
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
                                    fontWeight: 800,
                                    mb: 3,
                                }}
                            >
                                Estoque por tamanho
                            </Typography>

                            <Stack spacing={2}>
                                {Object.entries(stockBySize)
                                    .sort(([a], [b]) =>
                                        a.localeCompare(b)
                                    )
                                    .map(
                                        ([size, quantity]) => (
                                            <Stack
                                                key={size}
                                                direction="row"
                                                sx={{
                                                    justifyContent:
                                                        "space-between",
                                                    alignItems:
                                                        "center",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {size}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontWeight: 900,
                                                        color:
                                                            "primary.main",
                                                    }}
                                                >
                                                    {quantity}
                                                </Typography>
                                            </Stack>
                                        )
                                    )}
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* RESUMO */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                        }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                height: "100%",
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
                                    fontWeight: 800,
                                    mb: 3,
                                }}
                            >
                                Resumo do estoque
                            </Typography>

                            <Stack spacing={2}>
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <Typography>
                                        Total de unidades
                                    </Typography>

                                    <Typography sx={{ fontWeight: '800' }}>
                                        {totalStock}
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <Typography>
                                        Produtos ativos
                                    </Typography>

                                    <Typography sx={{ fontWeight: '800' }}>
                                        {totalProducts}
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <Typography>
                                        Sem estoque
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: '800',
                                            color:
                                                outOfStock > 0
                                                    ? "error.main"
                                                    : "primary.main",
                                        }}
                                    >
                                        {outOfStock}
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <Typography>
                                        Em destaque
                                    </Typography>

                                    <Typography sx={{ fontWeight: '800' }}>
                                        {featuredProducts}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>

                {/* PRODUTOS SEM ESTOQUE */}

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
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
                            fontWeight: 800,
                            mb: 3,
                        }}
                    >
                        Produtos sem estoque
                    </Typography>

                    {outOfStockProducts.length === 0 ? (
                        <Typography
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            Nenhum produto está sem estoque.
                        </Typography>
                    ) : (
                        <Stack spacing={1.5}>
                            {outOfStockProducts
                                .slice(0, 10)
                                .map((product) => (
                                    <Stack
                                        key={product.id}
                                        direction="row"
                                        sx={{
                                            justifyContent:
                                                "space-between",
                                            alignItems:
                                                "center",
                                            gap: 2,
                                            p: 1.5,
                                            borderRadius: 2,
                                            background:
                                                "rgba(255,255,255,.02)",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            {product.name}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color:
                                                    "error.main",
                                                fontSize: 13,
                                                fontWeight: 800,
                                                whiteSpace:
                                                    "nowrap",
                                            }}
                                        >
                                            SEM ESTOQUE
                                        </Typography>
                                    </Stack>
                                ))}
                        </Stack>
                    )}
                </Paper>

            </Container>
        </Box>
    );
}