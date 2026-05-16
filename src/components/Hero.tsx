"use client";

import { Box, Typography, Button, Stack } from "@mui/material";

export default function Hero() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: { xs: 3, md: 10 },
                background: "linear-gradient(180deg, #050505, #0d0d0d)",
                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* GLOW */}
            <Box
                sx={{
                    position: "absolute",
                    width: 500,
                    height: 500,
                    background: "#00ff40",
                    filter: "blur(180px)",
                    opacity: 0.12,
                    top: "20%",
                    right: "-10%",
                }}
            />

            {/* TEXTO (ESQUERDA) */}
            <Box
                sx={{
                    zIndex: 2,
                    maxWidth: 600,
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: "2.2rem", md: "4rem" },
                        fontWeight: 900,
                        lineHeight: 1,
                    }}
                >
                    VISTA MAIS QUE
                    <br />
                    UMA CAMISA.
                </Typography>

                <Typography
                    sx={{
                        fontSize: { xs: "2.2rem", md: "4rem" },
                        fontWeight: 900,
                        color: "primary.main",
                    }}
                >
                    VISTA CULTURA.
                </Typography>

                <Typography
                    sx={{
                        mt: 3,
                        color: "#aaa",
                        fontSize: "1.1rem",
                    }}
                >
                    Edições inspiradas nos maiores clubes e seleções do futebol mundial.
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 4 }}
                >
                    <Button variant="contained" sx={{ px: 4, py: 1.5 }}>
                        Explorar coleção
                    </Button>

                    <Button variant="outlined" sx={{ px: 4, py: 1.5 }}>
                        Ver lançamentos
                    </Button>
                </Stack>
            </Box>

            {/* IMAGEM (DIREITA) */}
            <Box
                sx={{
                    display: { xs: "none", md: "flex" },
                    width: 450,
                    height: 520,
                    borderRadius: 5,
                    overflow: "hidden",
                    zIndex: 2,

                    position: "relative",

                    // 👇 importante: só anima UM transform
                    animation: "floatHero 6s ease-in-out infinite",

                    willChange: "transform",

                    "@keyframes floatHero": {
                        "0%": { transform: "translateY(0px)" },
                        "50%": { transform: "translateY(-10px)" },
                        "100%": { transform: "translateY(0px)" },
                    },
                }}
            >
                <Box
                    component="img"
                    src="/brasil-dourada-Photoroom.png"
                    alt="Camisa Voxel Eleven"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",

                        transition: "transform 0.4s ease",

                        "&:hover": {
                            transform: "scale(1.03)",
                        },

                        backfaceVisibility: "hidden",
                        transform: "translateZ(0)",
                    }}
                />
            </Box>
        </Box>
    );
}