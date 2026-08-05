// src/components/Hero.tsx

"use client";

import {
    Box,
    Typography,
    Button,
    Stack,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

import { useRouter } from "next/navigation";

export default function Hero() {

    const router = useRouter();

    return (

        <Box
            sx={{

                position: "relative",

                minHeight: "100vh",

                display: "flex",

                alignItems: "center",

                overflow: "hidden",

                background:
                    "linear-gradient(180deg,#040404 0%,#090909 45%,#050505 100%)",

                px: {
                    xs: 3,
                    md: 8,
                    lg: 12,
                },

                pt: {
                    xs: 16,
                    md: 12,
                },

                pb: {
                    xs: 10,
                    md: 6,
                },
            }}
        >

            {/* GRID */}

            <Box
                sx={{

                    position: "absolute",

                    inset: 0,

                    opacity: .03,

                    backgroundImage: `
                    linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)
                    `,

                    backgroundSize: "60px 60px",

                    pointerEvents: "none",
                }}
            />

            {/* GLOW ESQUERDA */}

            <Box
                sx={{

                    position: "absolute",

                    width: 500,

                    height: 500,

                    left: -220,

                    top: -120,

                    borderRadius: "50%",

                    background:
                        "radial-gradient(circle, rgba(0,255,64,.18), transparent 70%)",

                    filter: "blur(60px)",
                }}
            />

            {/* GLOW DIREITA */}

            <Box
                sx={{

                    position: "absolute",

                    width: 700,

                    height: 700,

                    right: -280,

                    top: 120,

                    borderRadius: "50%",

                    background:
                        "radial-gradient(circle, rgba(0,255,64,.14), transparent 70%)",

                    filter: "blur(80px)",
                }}
            />

            <Box
                sx={{

                    width: "100%",

                    display: "flex",

                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },

                    alignItems: "center",

                    justifyContent: "space-between",

                    gap: {
                        xs: 8,
                        lg: 4,
                    },

                    position: "relative",

                    zIndex: 2,
                }}
            >
                {/* ================= TEXTO ================= */}

                <Box
                    sx={{
                        flex: 1,
                        maxWidth: 640,
                        zIndex: 2,
                        textAlign: {
                            xs: "center",
                            lg: "left",
                        },
                    }}
                >

                    {/* Badge */}

                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1,
                            px: 2.2,
                            py: .9,
                            mb: 4,
                            borderRadius: 999,
                            border: "1px solid rgba(0,255,64,.22)",
                            bgcolor: "rgba(0,255,64,.06)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <WorkspacePremiumOutlinedIcon
                            sx={{
                                color: "primary.main",
                                fontSize: 18,
                            }}
                        />

                        <Typography
                            sx={{
                                fontSize: 12,
                                letterSpacing: "2px",
                                fontWeight: 800,
                                color: "#d8d8d8",
                            }}
                        >
                            FOOTBALL CULTURE
                        </Typography>
                    </Box>

                    {/* Título */}

                    <Typography
                        sx={{
                            fontSize: {
                                xs: "3rem",
                                sm: "4rem",
                                lg: "5.4rem",
                            },

                            fontWeight: 900,

                            lineHeight: .95,

                            letterSpacing: "-2px",
                        }}
                    >
                        VISTA MAIS
                        <br />
                        QUE UMA
                        <br />
                        CAMISA.
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,

                            fontSize: {
                                xs: "3rem",
                                sm: "4rem",
                                lg: "5.4rem",
                            },

                            fontWeight: 900,

                            lineHeight: .95,

                            letterSpacing: "-2px",

                            background:
                                "linear-gradient(90deg,#00ff40,#73ff8e)",

                            WebkitBackgroundClip: "text",

                            WebkitTextFillColor: "transparent",

                            textShadow:
                                "0 0 25px rgba(0,255,64,.18)",
                        }}
                    >
                        VISTA CULTURA.
                    </Typography>

                    {/* Texto */}

                    <Typography
                        sx={{
                            mt: 4,

                            color: "#9f9f9f",

                            fontSize: {
                                xs: 17,
                                lg: 19,
                            },

                            lineHeight: 1.8,

                            maxWidth: 520,

                            mx: {
                                xs: "auto",
                                lg: 0,
                            },
                        }}
                    >
                        Camisas inspiradas nos maiores clubes e seleções do mundo, 
                        feitas para quem vive o futebol dentro e fora dos estádios. 
                        Aqui, a paixão ganha forma.
                    </Typography>

                    {/* Indicadores */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={3}
                        sx={{
                            mt: 5,
                            justifyContent: {
                                xs: "center",
                                lg: "flex-start",
                            },
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: "center"
                            }}
                        >
                            <VerifiedOutlinedIcon
                                sx={{
                                    color: "primary.main",
                                    fontSize: 20,
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#d4d4d4",
                                    fontWeight: 700,
                                }}
                            >
                                Compra Segura
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: "center"
                            }}
                        >
                            <LocalShippingOutlinedIcon
                                sx={{
                                    color: "primary.main",
                                    fontSize: 20,
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#d4d4d4",
                                    fontWeight: 700,
                                }}
                            >
                                Envio Nacional
                            </Typography>
                        </Stack>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: "center"
                            }}
                        >
                            <WorkspacePremiumOutlinedIcon
                                sx={{
                                    color: "primary.main",
                                    fontSize: 20,
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#d4d4d4",
                                    fontWeight: 700,
                                }}
                            >
                                Modelos nacionais e importados
                            </Typography>
                        </Stack>

                    </Stack>

                    {/* Botões */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={2.5}
                        sx={{
                            mt: 6,

                            justifyContent: {
                                xs: "center",
                                lg: "flex-start",
                            },
                        }}
                    >

                        <Button
                            variant="contained"
                            onClick={() => router.push("/catalogo")}
                            sx={{
                                px: 5,
                                py: 1.8,

                                borderRadius: 999,

                                fontWeight: 800,

                                fontSize: 15,

                                boxShadow:
                                    "0 12px 40px rgba(0,255,64,.22)",

                                "&:hover": {
                                    transform: "translateY(-2px)",
                                    boxShadow:
                                        "0 20px 45px rgba(0,255,64,.30)",
                                },

                                transition: ".3s",
                            }}
                        >
                            EXPLORAR CATÁLOGO
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={() => router.push("/catalogo")}
                            sx={{
                                px: 5,
                                py: 1.8,

                                borderRadius: 999,

                                fontWeight: 700,

                                borderColor: "rgba(255,255,255,.15)",

                                color: "#d9d9d9",

                                "&:hover": {
                                    borderColor: "primary.main",
                                    bgcolor: "rgba(0,255,64,.05)",
                                },
                            }}
                        >
                            VER LANÇAMENTOS
                        </Button>

                    </Stack>

                </Box>

                {/* ================= IMAGEM ================= */}

                <Box
                    sx={{
                        flex: 1,

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center",

                        position: "relative",

                        minHeight: {
                            xs: 420,
                            lg: 720,
                        },
                    }}
                >

                    {/* Glow principal */}

                    <Box
                        sx={{
                            position: "absolute",

                            width: {
                                xs: 300,
                                lg: 520,
                            },

                            height: {
                                xs: 300,
                                lg: 520,
                            },

                            borderRadius: "50%",

                            background:
                                "radial-gradient(circle, rgba(0,255,64,.28), transparent 72%)",

                            filter: "blur(30px)",

                            animation:
                                "pulseGlow 5s ease-in-out infinite",

                            "@keyframes pulseGlow": {

                                "0%": {
                                    transform: "scale(1)",
                                    opacity: .65,
                                },

                                "50%": {
                                    transform: "scale(1.08)",
                                    opacity: 1,
                                },

                                "100%": {
                                    transform: "scale(1)",
                                    opacity: .65,
                                },
                            },
                        }}
                    />

                    {/* Círculo */}

                    <Box
                        sx={{
                            position: "absolute",

                            width: {
                                xs: 260,
                                lg: 470,
                            },

                            height: {
                                xs: 260,
                                lg: 470,
                            },

                            borderRadius: "50%",

                            border:
                                "1px solid rgba(255,255,255,.08)",

                            backdropFilter: "blur(4px)",
                        }}
                    />

                    {/* Segundo círculo */}

                    <Box
                        sx={{
                            position: "absolute",

                            width: {
                                xs: 340,
                                lg: 620,
                            },

                            height: {
                                xs: 340,
                                lg: 620,
                            },

                            borderRadius: "50%",

                            border:
                                "1px dashed rgba(255,255,255,.05)",

                            animation:
                                "rotateRing 40s linear infinite",

                            "@keyframes rotateRing": {

                                from: {
                                    transform: "rotate(0deg)",
                                },

                                to: {
                                    transform: "rotate(360deg)",
                                },
                            },
                        }}
                    />

                    {/* Pontos decorativos */}

                    <Box
                        sx={{
                            position: "absolute",

                            width: 8,
                            height: 8,

                            borderRadius: "50%",

                            bgcolor: "primary.main",

                            top: "18%",
                            left: "22%",

                            boxShadow:
                                "0 0 18px rgba(0,255,64,.7)",
                        }}
                    />

                    <Box
                        sx={{
                            position: "absolute",

                            width: 6,
                            height: 6,

                            borderRadius: "50%",

                            bgcolor: "#fff",

                            bottom: "22%",
                            right: "18%",

                            opacity: .6,
                        }}
                    />

                    {/* Camisa */}

                    <Box
                        component="img"
                        src="/brasil-dourada-Photoroom.png"
                        alt="Camisa Voxel Eleven"
                        sx={{

                            position: "relative",

                            zIndex: 10,

                            width: {
                                xs: 290,
                                sm: 360,
                                lg: 520,
                            },

                            objectFit: "contain",

                            filter:
                                `
                drop-shadow(0 35px 60px rgba(0,0,0,.75))
                drop-shadow(0 0 50px rgba(0,255,64,.16))
                `,

                            animation:
                                "floatHero 7s ease-in-out infinite",

                            transition:
                                ".45s ease",

                            cursor: "pointer",

                            "@keyframes floatHero": {

                                "0%": {
                                    transform:
                                        "translateY(0px) rotate(-3deg)",
                                },

                                "50%": {
                                    transform:
                                        "translateY(-18px) rotate(2deg)",
                                },

                                "100%": {
                                    transform:
                                        "translateY(0px) rotate(-3deg)",
                                },
                            },

                            "&:hover": {

                                transform:
                                    "scale(1.05) rotate(1deg)",

                                filter:
                                    `
                    drop-shadow(0 45px 80px rgba(0,0,0,.85))
                    drop-shadow(0 0 80px rgba(0,255,64,.28))
                    `,
                            },
                        }}
                    />

                </Box>

            </Box>

            {/* Fade inferior */}

            <Box
                sx={{
                    position: "absolute",

                    left: 0,

                    right: 0,

                    bottom: 0,

                    height: 180,

                    background:
                        "linear-gradient(180deg, transparent, #050505)",

                    pointerEvents: "none",
                }}
            />

        </Box>

    )
}