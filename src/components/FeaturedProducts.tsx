// src/components/FeaturedProducts.tsx

"use client";

import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface FeaturedProductsProps {
    products: Product[];
}

export default function FeaturedProducts({
    products,
}: FeaturedProductsProps) {
    return (
        <Box sx={{ py: 10, px: { xs: 3, md: 10 } }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 800,
                    mb: 5,
                }}
            >
                Destaques da coleção
            </Typography>

            <Grid container spacing={4}>
                {products
                    .filter((p) => p.featured)
                    .map((product) => (
                        <Grid
                            key={product.id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                        >
                            <ProductCard product={product} />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}