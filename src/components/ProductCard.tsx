// src/components/ProductCard.tsx

"use client";

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Chip,
    Stack,
    Button,
} from "@mui/material";

import Link from "next/link";

import { Product } from "@/types/product";

type Props = {
    product: Product;
};

export default function ProductCard({
    product,
}: Props) {
    return (
        <Card
            component={Link}
            href={`/produto/${product.slug}`}
            sx={{
                position: "relative",
                textDecoration: "none",
                color: "inherit",
                display: "block",
                backgroundColor: "black",
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                transition:
                    "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow:
                        "0 0 35px rgba(0,255,64,0.18)",
                    "& .product-image": {
                        transform: "scale(1.05)",
                    },
                },
            }}
        >
            {/* IMAGEM */}
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    className="product-image"
                    sx={{
                        height: 360,

                        width: "100%",

                        objectFit: "cover",

                        transition:
                            "transform 0.4s ease",
                    }}
                />

                {/* Overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,

                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.65), transparent 50%)",
                    }}
                />

                {/* Badge */}
                {product.badge && (
                    <Chip
                        label={product.badge}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 32,
                            left: 32,

                            backgroundColor:
                                "primary.main",

                            color:
                                "primary.contrastText",

                            fontWeight: 700,

                            backdropFilter:
                                "blur(10px)",
                        }}
                    />
                )}
            </Box>

            {/* CONTEÚDO */}
            <CardContent
                sx={{
                    p: 3,
                }}
            >
                <Stack spacing={1.5}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,

                            lineHeight: 1.2,
                        }}
                    >
                        {product.name}
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: "0.95rem",
                        }}
                    >
                        {product.description}
                    </Typography>

                    <Stack
                        direction="row"
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 1,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                color: "primary.main",
                                fontWeight: 800,
                            }}
                        >
                            {product.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{
                                px: 2,
                            }}
                        >
                            Ver produto
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}