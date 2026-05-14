"use client";

import {
    Box,
    Typography,
    Grid,
} from "@mui/material";

import ProductCard from "./ProductCard";

import { products } from "@/data/products";

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
                {products
                    .filter(
                        (product) => product.featured
                    )
                    .map((product) => (
                        <Grid
                            key={product.id}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                            }}
                        >
                            <ProductCard
                                product={product}
                            />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}