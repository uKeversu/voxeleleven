// src/app/produto/[slug]/page.tsx

"use client";

import { useMemo, useState } from "react";

import {
    Box,
    Typography,
    Chip,
    Stack,
    Button,
    Divider,
    Grid,
    IconButton,
    Rating,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useSnackbar } from "@/context/SnackbarContext";

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
        <ProductContent product={product} />
    );
}

function ProductContent({
    product,
}: {
    product: (typeof products)[0];
}) {
    const [selectedSize, setSelectedSize] =
        useState<string>("");

    const relatedProducts = useMemo(() => {
        return products
            .filter(
                (p) =>
                    p.category ===
                    product.category &&
                    p.slug !== product.slug
            )
            .slice(0, 4);
    }, [product]);

    const { addToCart } = useCart();
    const { showSnackbar } = useSnackbar();

    return (
        <Box
            sx={{
                minHeight: "100vh",

                backgroundColor:
                    "background.default",

                px: {
                    xs: 2,
                    md: 8,
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
                {/* GALERIA */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 6,
                    }}
                >
                    <Stack spacing={2}>
                        {/* IMAGEM PRINCIPAL */}
                        <Box
                            sx={{
                                position: "relative",

                                borderRadius: 5,

                                overflow: "hidden",

                                background:
                                    "#000",

                                border:
                                    "1px solid",

                                borderColor:
                                    "divider",

                                boxShadow:
                                    "0 0 40px rgba(0,255,64,0.12)",
                            }}
                        >
                            <Box
                                component="img"
                                src={
                                    product.image
                                }
                                alt={
                                    product.name
                                }
                                sx={{
                                    width: "100%",

                                    height: {
                                        xs: 450,
                                        md: 720,
                                    },

                                    objectFit:
                                        "cover",

                                    transition:
                                        "0.4s",

                                    "&:hover":
                                    {
                                        transform:
                                            "scale(1.03)",
                                    },
                                }}
                            />

                            {/* OVERLAY */}
                            <Box
                                sx={{
                                    position:
                                        "absolute",

                                    inset: 0,

                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.45), transparent 45%)",
                                }}
                            />

                            {/* BADGE */}
                            {product.badge && (
                                <Chip
                                    label={
                                        product.badge
                                    }
                                    sx={{
                                        position:
                                            "absolute",

                                        top: 24,
                                        left: 24,

                                        backgroundColor:
                                            "primary.main",

                                        color:
                                            "primary.contrastText",

                                        fontWeight: 800,

                                        backdropFilter:
                                            "blur(10px)",
                                    }}
                                />
                            )}

                            {/* FAVORITO */}
                            <IconButton
                                sx={{
                                    position:
                                        "absolute",

                                    top: 24,
                                    right: 24,

                                    backgroundColor:
                                        "rgba(0,0,0,0.45)",

                                    backdropFilter:
                                        "blur(10px)",

                                    border:
                                        "1px solid rgba(255,255,255,0.08)",

                                    "&:hover":
                                    {
                                        backgroundColor:
                                            "primary.main",

                                        color:
                                            "primary.contrastText",
                                    },
                                }}
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                        </Box>
                    </Stack>
                </Grid>

                {/* INFO */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 6,
                    }}
                >
                    <Stack spacing={4}>
                        {/* CATEGORY */}
                        <Typography
                            sx={{
                                color:
                                    "primary.main",

                                fontWeight: 700,

                                textTransform:
                                    "uppercase",

                                letterSpacing: 2,
                            }}
                        >
                            {
                                product.category
                            }
                        </Typography>

                        {/* NAME */}
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 900,

                                lineHeight: 1,

                                fontSize: {
                                    xs: "2.6rem",
                                    md: "4.5rem",
                                },
                            }}
                        >
                            {product.name}
                        </Typography>

                        {/* AVALIAÇÃO */}
                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{
                                alignItems:
                                    "center",
                            }}
                        >
                            <Rating
                                value={5}
                                readOnly
                            />

                            <Typography
                                sx={{
                                    color:
                                        "text.secondary",
                                }}
                            >
                                4.9 (128
                                avaliações)
                            </Typography>
                        </Stack>

                        {/* DESCRIPTION */}
                        <Typography
                            sx={{
                                color:
                                    "text.secondary",

                                fontSize:
                                    "1.05rem",

                                lineHeight: 1.9,

                                maxWidth: 650,
                            }}
                        >
                            {
                                product.description
                            }
                        </Typography>

                        {/* TAGS */}
                        <Stack
                            direction="row"
                            spacing={1.5}
                            useFlexGap
                            sx={{
                                flexWrap:
                                    "wrap",
                            }}
                        >
                            <Chip
                                label={`Temporada ${product.season}`}
                                variant="outlined"
                            />

                            <Chip
                                label={
                                    product.team
                                }
                                variant="outlined"
                            />

                            <Chip
                                label="Premium Quality"
                                variant="outlined"
                            />
                        </Stack>

                        <Divider />

                        {/* PREÇO */}
                        <Box>
                            <Typography
                                sx={{
                                    color:
                                        "text.secondary",

                                    textDecoration:
                                        "line-through",

                                    mb: 0.5,
                                }}
                            >
                                R$ 149,90
                            </Typography>

                            <Typography
                                variant="h2"
                                sx={{
                                    color:
                                        "primary.main",

                                    fontWeight: 900,
                                }}
                            >
                                {product.price.toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency:
                                            "BRL",
                                    }
                                )}
                            </Typography>

                            <Typography
                                sx={{
                                    color:
                                        "primary.main",

                                    fontWeight: 700,

                                    mt: 1,
                                }}
                            >
                                10% OFF no PIX
                            </Typography>
                        </Box>

                        {/* TAMANHOS */}
                        <Box>
                            <Typography
                                sx={{
                                    mb: 2,

                                    fontWeight: 700,

                                    fontSize:
                                        "1.05rem",
                                }}
                            >
                                Escolha o
                                tamanho
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={1.5}
                                useFlexGap
                                sx={{
                                    flexWrap:
                                        "wrap",
                                }}
                            >
                                {product.sizes.map(
                                    (
                                        size
                                    ) => {
                                        const active =
                                            selectedSize ===
                                            size;

                                        return (
                                            <Button
                                                key={
                                                    size
                                                }
                                                onClick={() =>
                                                    setSelectedSize(
                                                        size
                                                    )
                                                }
                                                variant={
                                                    active
                                                        ? "contained"
                                                        : "outlined"
                                                }
                                                color="primary"
                                                sx={{
                                                    minWidth: 68,

                                                    height: 54,

                                                    borderRadius: 3,

                                                    fontWeight: 800,

                                                    fontSize:
                                                        "1rem",

                                                    boxShadow:
                                                        active
                                                            ? "0 0 18px rgba(0,255,64,0.35)"
                                                            : "none",
                                                }}
                                            >
                                                {
                                                    size
                                                }
                                            </Button>
                                        );
                                    }
                                )}
                            </Stack>
                        </Box>

                        {/* ACTIONS */}
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
                                disabled={
                                    !selectedSize
                                }
                                startIcon={
                                    <ShoppingBagOutlinedIcon />
                                }
                                sx={{
                                    height: 60,

                                    px: 5,

                                    flex: 1,

                                    fontSize:
                                        "1rem",

                                    fontWeight: 800,

                                    boxShadow:
                                        "0 0 20px rgba(0,255,64,0.25)",

                                    "&:hover":
                                    {
                                        boxShadow:
                                            "0 0 35px rgba(0,255,64,0.4)",
                                    },
                                }}
                            >
                                Comprar agora
                            </Button>

                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                disabled={
                                    !selectedSize
                                }
                                sx={{
                                    height: 60,

                                    px: 5,

                                    fontWeight: 700,
                                }}
                                onClick={() => {
                                    addToCart(product, selectedSize);

                                    showSnackbar(
                                        "Produto adicionado ao carrinho!"
                                    );
                                }}
                            >
                                Adicionar ao
                                carrinho
                            </Button>
                        </Stack>

                        {/* ALERTA */}
                        {!selectedSize && (
                            <Typography
                                sx={{
                                    color:
                                        "#ffb84d",

                                    fontSize:
                                        "0.95rem",
                                }}
                            >
                                Selecione um
                                tamanho para
                                continuar
                            </Typography>
                        )}

                        <Divider />

                        {/* BENEFÍCIOS */}
                        <Stack
                            spacing={2.5}
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    alignItems:
                                        "center",
                                }}
                            >
                                <LocalShippingOutlinedIcon color="primary" />

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                        }}
                                    >
                                        Envio
                                        rápido
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color:
                                                "text.secondary",
                                        }}
                                    >
                                        Entrega
                                        para
                                        todo o
                                        Brasil
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    alignItems:
                                        "center",
                                }}
                            >
                                <ShieldOutlinedIcon color="primary" />

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                        }}
                                    >
                                        Compra
                                        segura
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color:
                                                "text.secondary",
                                        }}
                                    >
                                        Ambiente
                                        protegido
                                        e seguro
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    alignItems:
                                        "center",
                                }}
                            >
                                <ReplayOutlinedIcon color="primary" />

                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                        }}
                                    >
                                        Troca
                                        fácil
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color:
                                                "text.secondary",
                                        }}
                                    >
                                        7 dias
                                        para
                                        troca ou
                                        devolução
                                    </Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>

            {/* RELACIONADOS */}
            <Box
                sx={{
                    mt: {
                        xs: 12,
                        md: 18,
                    },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 900,

                        mb: 5,
                    }}
                >
                    Você também pode gostar
                </Typography>

                <Grid
                    container
                    spacing={3}
                >
                    {relatedProducts.map(
                        (related) => (
                            <Grid
                                key={related.id}
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    lg: 3,
                                }}
                            >
                                <ProductCard
                                    product={related}
                                />
                            </Grid>
                        )
                    )}
                </Grid>
            </Box>
        </Box >
    );
}