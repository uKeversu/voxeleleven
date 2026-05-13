// src/components/Categories.tsx

"use client";

import {
    Box,
    Typography,
    Grid,
    Paper,
} from "@mui/material";

const categories = [
    "Tailandesas 1.1",
    "Premium Gold",
    "Conjuntos",
    "Agasalhos",
    "Boné",
    "Basquete",
    "Tênis",
    "Outros",
];

export default function Categories() {
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
                Categorias
            </Typography>

            <Grid container spacing={3}>
                {categories.map((item) => (
                    <Grid size={{ xs: 12, md: 3 }} key={item}>
                        <Paper
                            sx={{
                                height: 70,
                                borderRadius: 4,
                                background: "linear-gradient(145deg, #0F0F0F, #141414)",
                                display: "flex",
                                alignItems: "flex-end",
                                p: 3,
                                transition: "0.3s",
                                cursor: "pointer",

                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: "0 0 30px #00ff40ff",
                                },
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                {item}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}