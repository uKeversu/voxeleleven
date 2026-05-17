"use client";

import { Box, Typography, Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();

    return (
        <Box
            sx={{
                minHeight: "100vh",

                display: "flex",

                flexDirection: {
                    xs: "column",
                    md: "row",
                },

                alignItems: "center",
                justifyContent: "space-between",

                px: { xs: 3, md: 10 },

                pt: { xs: 14, md: 0 },
                pb: { xs: 8, md: 0 },

                gap: { xs: 6, md: 0 },

                background:
                    "linear-gradient(180deg, #050505, #0d0d0d)",

                overflow: "hidden",
                position: "relative",
            }}
        >
            {/* GLOW */}
            <Box
                sx={{
                    position: "absolute",

                    width: {
                        xs: 300,
                        md: 500,
                    },

                    height: {
                        xs: 300,
                        md: 500,
                    },

                    background: "#00ff40",

                    filter: "blur(180px)",

                    opacity: 0.12,

                    top: {
                        xs: "10%",
                        md: "20%",
                    },

                    right: "-10%",
                }}
            />

            {/* TEXTO */}
            <Box
                sx={{
                    zIndex: 2,
                    maxWidth: 600,

                    textAlign: {
                        xs: "center",
                        md: "left",
                    },
                }}
            >
                <Typography
                    sx={{
                        fontSize: {
                            xs: "2.5rem",
                            sm: "3.2rem",
                            md: "4rem",
                        },

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
                        fontSize: {
                            xs: "2.5rem",
                            sm: "3.2rem",
                            md: "4rem",
                        },

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

                        fontSize: {
                            xs: "1rem",
                            md: "1.1rem",
                        },

                        maxWidth: {
                            xs: "100%",
                            md: 500,
                        },

                        mx: {
                            xs: "auto",
                            md: 0,
                        },
                    }}
                >
                    Edições inspiradas nos maiores clubes
                    e seleções do futebol mundial.
                </Typography>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}

                    spacing={2}

                    sx={{
                        mt: 4,

                        justifyContent: {
                            xs: "center",
                            md: "flex-start",
                        },

                        alignItems: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() =>
                            router.push("/catalogo")
                        }
                        sx={{
                            px: 4,
                            py: 1.5,

                            width: {
                                xs: "100%",
                                sm: "auto",
                            },

                            maxWidth: 280,

                            borderRadius: 3,
                            fontWeight: 700,
                        }}
                    >
                        Explorar coleção
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() =>
                            router.push("/catalogo")
                        }
                        sx={{
                            px: 4,
                            py: 1.5,

                            width: {
                                xs: "100%",
                                sm: "auto",
                            },

                            maxWidth: 280,

                            borderRadius: 3,
                            fontWeight: 700,
                        }}
                    >
                        Ver lançamentos
                    </Button>
                </Stack>
            </Box>

            {/* IMAGEM */}
            <Box
                sx={{
                    display: "flex",

                    width: {
                        xs: 280,
                        sm: 360,
                        md: 450,
                    },

                    height: {
                        xs: 340,
                        sm: 420,
                        md: 520,
                    },

                    borderRadius: 5,

                    overflow: "hidden",

                    zIndex: 2,

                    position: "relative",

                    justifyContent: "center",
                    alignItems: "center",

                    animation:
                        "floatHero 6s ease-in-out infinite",

                    willChange: "transform",

                    "@keyframes floatHero": {
                        "0%": {
                            transform: "translateY(0px)",
                        },

                        "50%": {
                            transform: "translateY(-10px)",
                        },

                        "100%": {
                            transform: "translateY(0px)",
                        },
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

                        objectFit: "contain",

                        transition:
                            "transform 0.4s ease",

                        filter:
                            "drop-shadow(0 0 40px rgba(0,255,64,0.25))",

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