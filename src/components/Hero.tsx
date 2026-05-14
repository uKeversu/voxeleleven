// src/components/Hero.tsx

"use client";

import {
    Box,
    Typography,
    Button,
    Stack,
} from "@mui/material";

export default function Hero() {
    return (
        <Box
            sx={{
                minHeight: {
                    xs: "100vh",
                    md: "100vh",
                },
                position: "relative",
                zIndex: 0,
                isolation: "isolate",
                pointerEvents: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: {
                    xs: 3,
                    md: 10,
                },
                pt: 10,
                background:
                    "linear-gradient(to bottom, #050505, #0f0f0f)",
                overflow: "hidden",
            }}
        >
            {/* Glow */}
            <Box
                sx={{
                    width: 400,
                    height: 400,
                    background: "#3dff4dff",
                    position: "absolute",
                    right: -100,
                    top: 100,
                    borderRadius: "50%",
                    filter: "blur(180px)",
                    opacity: 0.2,
                    pointerEvents: "none"
                }}
            />

            {/* Texto */}
            <Box
                sx={{
                    zIndex: 2,
                    maxWidth: 600,
                }}
            >
                <Box>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            fontSize: {
                                xs: "2rem",
                                md: "4.5rem",
                            },
                            lineHeight: 1,
                        }}
                    >
                        VISTA MAIS QUE
                        <br />
                        UMA CAMISA
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: "bold",
                            fontSize: {
                                xs: "2rem",
                                md: "4.5rem",
                            },
                            lineHeight: 1,
                            color: "primary.main",
                        }}
                    >
                        VISTA CULTURA
                    </Typography>
                </Box>

                <Typography
                    sx={{
                        mt: 3,
                        color: "#999",
                        fontSize: "1.1rem",
                    }}
                >
                    Camisas premium inspiradas no futebol mundial.
                </Typography>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 4 }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                        }}
                    >
                        Explorar
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{
                            px: 4,
                            py: 1.5,
                        }}
                    >
                        Ver coleção
                    </Button>
                </Stack>
            </Box>

            {/* Imagem mock */}
            <Box
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },

                    width: 450,
                    height: 500,
                    borderRadius: 5,

                    alignItems: "center",
                    justifyContent: "center",

                    overflow: "hidden",

                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Box
                    component="img"
                    src="/camisa-brasil26.png"
                    alt="Voxel Eleven"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",

                        transition: "0.3s",

                        "&:hover": {
                            transform: "scale(1.05)",
                            filter: "drop-shadow(0 0 2px #00ff40ff)",
                        },
                    }}
                />
            </Box>
        </Box>
    );
}