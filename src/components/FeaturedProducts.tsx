// src/components/FeaturedProducts.tsx

"use client";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Chip,
} from "@mui/material";

const products = [
    {
        name: "Corinthians 25/26",
        price: "R$ 129,90",
        image: "/camisa-corinthians.png",
    },
    {
        name: "Milan Retro 2002",
        price: "R$ 129,90",
        image: "/camisa-milan-retro.png",
    },
    {
        name: "Vasco da Gama 26/27",
        price: "R$ 129,90",
        image: "/camisa-vasco.png",
    },
];

export default function FeaturedProducts() {
    return (
        <Box
            sx={{
                px: {
                    xs: 3,
                    md: 10,
                },
                py: 10,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: "bold",
                    mb: 4,
                }}
            >
                Destaques
            </Typography>

            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid
                        size={{ xs: 12, sm: 6, md: 4 }}
                        key={product.name}
                    >
                        <Card
                            sx={{
                                backgroundColor: "background.paper",
                                borderRadius: 4,
                                overflow: "hidden",
                                transition: "0.3s",

                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: "0 0 35px #00ff40ff",
                                },
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <CardMedia
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{
                                        height: 320,
                                        objectFit: "cover",
                                    }}
                                />

                                {/* overlay */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        inset: 0,
                                        background:
                                            "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                                    }}
                                />

                                <Chip
                                    label="NEW"
                                    sx={{
                                        position: "absolute",
                                        top: 16,
                                        left: 16,
                                        background: "primary.main",
                                        color: "#000",
                                        fontWeight: "bold",
                                    }}
                                />
                            </Box>

                            <CardContent>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: "bold",
                                        mb: 4,
                                    }}
                                >
                                    {product.name}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 1,
                                        color: "primary.main",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {product.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}