// src/app/produto/[slug]/page.tsx

"use client";

import {
    Box,
    Typography,
    Chip,
    Stack,
    Button,
    Divider,
    Grid,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import { notFound } from "next/navigation";

import { products } from "@/data/products";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProdutoPage({
    params,
}: Props) {

    const { slug } = await params;

    const product = products.find(
        (p) => p.slug === slug
    );

    if (!product) {
        notFound();
    }

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

                py: {
                    xs: 12,
                    md: 16,
                },
            }}
        >
            <Grid
                container
                spacing={{
                    xs: 6,
                    md: 8,
                }}
                sx={{
                    alignItems: "center",
                }}
            >
                {/* IMAGEM */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",

                            borderRadius: 3,

                            overflow: "hidden",

                            background:
                                "linear-gradient(145deg, #111, #1a1a1a)",

                            border: "1px solid",

                            borderColor: "divider",

                            boxShadow:
                                "0 0 40px rgba(0,255,64,0.12)",
                        }}
                    >
                        <Box
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{
                                width: "100%",

                                height: {
                                    xs: 450,
                                    md: 700,
                                },

                                objectFit: "cover",

                                display: "block",
                            }}
                        />

                        {/* overlay */}
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,

                                background:
                                    "linear-gradient(to top, rgba(0,0,0,0.45), transparent 40%)",
                            }}
                        />

                        {/* badge */}
                        {product.badge && (
                            <Chip
                                label={product.badge}
                                sx={{
                                    position: "absolute",

                                    top: 32,
                                    left: 32,

                                    backgroundColor:
                                        "primary.main",

                                    color:
                                        "primary.contrastText",

                                    fontWeight: 700,
                                }}
                            />
                        )}
                    </Box>
                </Grid>

                {/* INFO */}
                <Grid
                    size={{
                        xs: 12,
                        md: 6,
                    }}
                >
                    <Stack spacing={4}>
                        {/* categoria */}
                        <Typography
                            sx={{
                                color: "primary.main",

                                fontWeight: 700,

                                textTransform:
                                    "uppercase",

                                letterSpacing: 1.5,
                            }}
                        >
                            {product.category}
                        </Typography>

                        {/* nome */}
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,

                                lineHeight: 1,

                                fontSize: {
                                    xs: "2.5rem",
                                    md: "4rem",
                                },
                            }}
                        >
                            {product.name}
                        </Typography>

                        {/* descrição */}
                        <Typography
                            sx={{
                                color: "text.secondary",

                                fontSize: "1.05rem",

                                lineHeight: 1.8,

                                maxWidth: 600,
                            }}
                        >
                            {product.description}
                        </Typography>

                        {/* infos */}
                        <Stack
                            direction="row"
                            spacing={2}
                            useFlexGap
                            sx={{
                                flexWrap: "wrap",
                            }}
                        >
                            <Chip
                                label={`Temporada ${product.season}`}
                                variant="outlined"
                            />

                            <Chip
                                label={product.team}
                                variant="outlined"
                            />
                        </Stack>

                        <Divider />

                        {/* preço */}
                        <Typography
                            variant="h3"
                            sx={{
                                color: "primary.main",

                                fontWeight: 900,
                            }}
                        >
                            {product.price.toLocaleString(
                                "pt-BR",
                                {
                                    style: "currency",
                                    currency: "BRL",
                                }
                            )}
                        </Typography>

                        {/* ações */}
                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",
                            }}
                            spacing={2}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={
                                    <ShoppingBagOutlinedIcon />
                                }
                                sx={{
                                    height: 56,

                                    px: 5,

                                    fontSize:
                                        "1rem",

                                    fontWeight: 700,

                                    boxShadow:
                                        "0 0 20px rgba(0,255,64,0.25)",

                                    "&:hover": {
                                        boxShadow:
                                            "0 0 30px rgba(0,255,64,0.4)",
                                    },
                                }}
                            >
                                Comprar agora
                            </Button>

                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                sx={{
                                    height: 56,

                                    px: 5,

                                    fontSize:
                                        "1rem",

                                    fontWeight: 700,
                                }}
                            >
                                Adicionar ao carrinho
                            </Button>
                        </Stack>

                        {/* entrega */}
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                pt: 2,
                                alignItems: "center",
                            }}
                        >
                            <LocalShippingOutlinedIcon
                                color="primary"
                            />

                            <Typography
                                sx={{
                                    color:
                                        "text.secondary",
                                }}
                            >
                                Envio rápido para
                                todo o Brasil
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}