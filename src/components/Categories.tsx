"use client";

import { Box, Typography, Grid, Paper } from "@mui/material";

const categories = [
    "Brasileiros",
    "Europeus",
    "Seleções",
    "Retrô",
    "Conjuntos",
    "Agasalhos",
    "Bonés",
    "Basquete",
];

export default function Categories() {
    return (
        <Box sx={{ py: 10, px: { xs: 3, md: 10 } }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 800,
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
                                p: 3,
                                height: 90,
                                borderRadius: 4,
                                background:
                                    "linear-gradient(135deg, rgba(0,255,64,0.06), #111)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                cursor: "pointer",
                                transition: "0.3s",
                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    boxShadow: "0 0 25px rgba(0,255,64,0.2)",
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                {item}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: "text.secondary",
                                }}
                            >
                                Explorar coleção →
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}