// src/components/PromoCarrousel.tsx

"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Stack,
    Chip,
} from "@mui/material";

import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

const slides = [
    {
        title: "BRASIL - HOME 26/27",
        subtitle: "OFERTA IMPERDÍVEL",
        description: "Por apenas R$ 119,90",
        image: "/brasil-home-26-67-Photoroom.png",
        button: "Comprar agora",
        action: "buy",
    },
    {
        title: "3 CAMISAS = 15% OFF",
        subtitle: "PROMOÇÃO ESPECIAL",
        description:
            "Monte sua coleção e economize automaticamente no carrinho.",
        image: "/colecao.png",
        button: "Montar carrinho",
        action: "catalog",
    },
    {
        title: "COLEÇÃO RETRÔ PREMIUM",
        subtitle: "EDIÇÃO LIMITADA",
        description:
            "Os mantos que marcaram gerações e nunca saíram da história.",
        image: "/retros.png",
        button: "Ver coleção",
        action: "retro",
    },
    {
        title: "BRASIL DRY-FIT",
        subtitle: "PERFORMANCE",
        description:
            "Modelos Dry-Fit da Seleção Brasileira por apenas R$ 59,90.",
        image: "/modelos-dryfit.png",
        button: "Explorar coleção",
        action: "dryfit",
    },
];

export default function PromoCarousel() {
    const router = useRouter();
    const { addToCart } = useCart();

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleAction = () => {
        const slide = slides[current];

        if (slide.action === "buy") {
            const brasilHome = products.find(
                (p) => p.slug === "brasil-amarela-26"
            );

            if (!brasilHome) return;

            const tamanhoDisponivel = Object.entries(
                brasilHome.stock
            ).find(([_, qtd]) => qtd > 0)?.[0];

            if (!tamanhoDisponivel) return;

            addToCart(brasilHome, tamanhoDisponivel);

            router.push("/carrinho");
            return;
        }

        router.push("/catalogo");
    };

    return (
        <Box
            sx={{
                position: "relative",
                py: {
                    xs: 8,
                    md: 12,
                },
                px: {
                    xs: 2,
                    md: 8,
                },
                overflow: "hidden",
                background:
                    "linear-gradient(180deg,#050505 0%,#090909 100%)",
            }}
        >
            {/* Glow esquerdo */}
            <Box
                sx={{
                    position: "absolute",
                    width: 450,
                    height: 450,
                    borderRadius: "50%",
                    background: "#00ff40",
                    filter: "blur(220px)",
                    opacity: .08,
                    left: -150,
                    top: -80,
                }}
            />

            {/* Glow direito */}
            <Box
                sx={{
                    position: "absolute",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background: "#00ff40",
                    filter: "blur(180px)",
                    opacity: .05,
                    right: -120,
                    bottom: -120,
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",

                    borderRadius: 2,

                    border:
                        "1px solid rgba(255,255,255,.08)",

                    background: `
                        linear-gradient(
                            145deg,
                            rgba(255,255,255,.05),
                            rgba(255,255,255,.015)
                        )
                    `,

                    backdropFilter: "blur(18px)",

                    minHeight: {
                        xs: 620,
                        md: 500,
                    },

                    px: {
                        xs: 3,
                        md: 8,
                    },

                    py: {
                        xs: 5,
                        md: 6,
                    },

                    display: "flex",

                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },

                    alignItems: "center",
                    justifyContent: "space-between",

                    gap: {
                        xs: 6,
                        md: 4,
                    },
                }}
            >
                {/* ================= TEXTO ================= */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 2,

                        flex: 1,

                        maxWidth: 620,

                        textAlign: {
                            xs: "center",
                            lg: "left",
                        },
                    }}
                >
                    <Chip
                        label={slides[current].subtitle}
                        sx={{
                            mb: 3,
                            px: 1,

                            height: 36,

                            borderRadius: 999,

                            bgcolor: "rgba(0,255,64,.10)",

                            border:
                                "1px solid rgba(0,255,64,.35)",

                            color: "primary.main",

                            fontWeight: 800,

                            letterSpacing: 1.2,

                            fontSize: 12,
                        }}
                    />

                    <Typography
                        sx={{
                            fontWeight: 900,

                            lineHeight: .95,

                            letterSpacing: "-2px",

                            fontSize: {
                                xs: "2.4rem",
                                sm: "3rem",
                                md: "4rem",
                            },
                        }}
                    >
                        {slides[current].title}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 3,

                            color: "rgba(255,255,255,.70)",

                            fontSize: {
                                xs: "1rem",
                                md: "1.15rem",
                            },

                            lineHeight: 1.8,

                            maxWidth: 520,

                            mx: {
                                xs: "auto",
                                lg: 0,
                            },
                        }}
                    >
                        {slides[current].description}
                    </Typography>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={2}
                        sx={{
                            mt: 5,

                            justifyContent: {
                                xs: "center",
                                lg: "flex-start",
                            },

                            alignItems: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            endIcon={<ArrowForwardRoundedIcon />}
                            onClick={handleAction}
                            sx={{
                                height: 56,

                                px: 5,

                                borderRadius: 999,

                                fontWeight: 800,

                                fontSize: 15,

                                textTransform: "none",

                                boxShadow:
                                    "0 15px 40px rgba(0,255,64,.25)",

                                transition: ".35s",

                                "&:hover": {
                                    transform:
                                        "translateY(-3px)",

                                    boxShadow:
                                        "0 25px 55px rgba(0,255,64,.35)",
                                },
                            }}
                        >
                            {slides[current].button}
                        </Button>

                        <Typography
                            sx={{
                                color:
                                    "rgba(255,255,255,.45)",

                                fontSize: 14,

                                letterSpacing: 1,

                                fontWeight: 700,
                            }}
                        >
                            ✓ Envio rápido

                            &nbsp;&nbsp;•

                            &nbsp;&nbsp;Qualidade Premium
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1.5}
                        sx={{
                            mt: 6,

                            justifyContent: {
                                xs: "center",
                                lg: "flex-start",
                            },

                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            "Qualidade Premium",
                            "Entrega para todo Brasil",
                            "Troca Garantida",
                        ].map((item) => (
                            <Box
                                key={item}
                                sx={{
                                    px: 2,

                                    py: 1,

                                    borderRadius: 999,

                                    border:
                                        "1px solid rgba(255,255,255,.08)",

                                    bgcolor:
                                        "rgba(255,255,255,.03)",

                                    color:
                                        "rgba(255,255,255,.72)",

                                    fontSize: 13,

                                    fontWeight: 700,
                                }}
                            >
                                {item}
                            </Box>
                        ))}
                    </Stack>
                </Box>
                {/* ================= IMAGEM ================= */}
                <Box
                    sx={{
                        position: "relative",

                        flex: 1,

                        display: "flex",

                        justifyContent: "center",
                        alignItems: "center",

                        minHeight: {
                            xs: 320,
                            md: 480,
                        },

                        width: "100%",

                        zIndex: 2,
                    }}
                >
                    {/* Halo Principal */}
                    <Box
                        sx={{
                            position: "absolute",

                            width: {
                                xs: 240,
                                md: 360,
                            },

                            height: {
                                xs: 240,
                                md: 360,
                            },

                            borderRadius: "50%",

                            background:
                                "radial-gradient(circle, rgba(0,255,64,.22) 0%, rgba(0,255,64,0) 72%)",

                            filter: "blur(35px)",

                            animation:
                                "pulseGlow 5s ease-in-out infinite",

                            "@keyframes pulseGlow": {
                                "0%": {
                                    transform: "scale(.95)",
                                    opacity: .55,
                                },
                                "50%": {
                                    transform: "scale(1.08)",
                                    opacity: 1,
                                },
                                "100%": {
                                    transform: "scale(.95)",
                                    opacity: .55,
                                },
                            },
                        }}
                    />

                    {/* Círculo externo */}
                    <Box
                        sx={{
                            position: "absolute",

                            width: {
                                xs: 260,
                                md: 420,
                            },

                            height: {
                                xs: 260,
                                md: 420,
                            },

                            borderRadius: "50%",

                            border:
                                "1px solid rgba(255,255,255,.06)",
                        }}
                    />

                    {/* Círculo interno */}
                    <Box
                        sx={{
                            position: "absolute",

                            width: {
                                xs: 190,
                                md: 300,
                            },

                            height: {
                                xs: 190,
                                md: 300,
                            },

                            borderRadius: "50%",

                            border:
                                "1px solid rgba(255,255,255,.04)",
                        }}
                    />

                    {/* Pedestal */}
                    <Box
                        sx={{
                            position: "absolute",

                            bottom: {
                                xs: 25,
                                md: 35,
                            },

                            width: {
                                xs: 180,
                                md: 280,
                            },

                            height: 45,

                            borderRadius: "50%",

                            background:
                                "radial-gradient(circle, rgba(0,255,64,.45), rgba(0,255,64,0))",

                            filter: "blur(18px)",
                        }}
                    />

                    {/* Produto */}
                    <Box
                        component="img"
                        src={slides[current].image}
                        alt={slides[current].title}
                        sx={{
                            position: "relative",

                            width: {
                                xs: 260,
                                sm: 330,
                                md: 470,
                            },

                            objectFit: "contain",

                            zIndex: 3,

                            filter:
                                "drop-shadow(0 35px 45px rgba(0,0,0,.65)) drop-shadow(0 0 30px rgba(0,255,64,.22))",

                            animation:
                                "floatProduct 6s ease-in-out infinite",

                            transition:
                                ".45s ease",

                            "@keyframes floatProduct": {
                                "0%": {
                                    transform:
                                        "translateY(0px)",
                                },

                                "50%": {
                                    transform:
                                        "translateY(-14px)",
                                },

                                "100%": {
                                    transform:
                                        "translateY(0px)",
                                },
                            },

                            "&:hover": {
                                transform:
                                    "translateY(-10px) scale(1.04)",
                            },
                        }}
                    />

                    {/* Partículas */}
                    {[...Array(8)].map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                position: "absolute",

                                width: 6,
                                height: 6,

                                borderRadius: "50%",

                                bgcolor: "primary.main",

                                opacity: .5,

                                left: `${20 + i * 8}%`,
                                top: `${15 + (i % 3) * 18}%`,

                                animation:
                                    `particle${i} ${4 + i * .3}s ease-in-out infinite`,

                                [`@keyframes particle${i}`]: {
                                    "0%": {
                                        transform:
                                            "translateY(0px)",
                                        opacity: .2,
                                    },

                                    "50%": {
                                        transform:
                                            "translateY(-12px)",
                                        opacity: .8,
                                    },

                                    "100%": {
                                        transform:
                                            "translateY(0px)",
                                        opacity: .2,
                                    },
                                },
                            }}
                        />
                    ))}
                </Box>
                {/* ================= CONTROLES ================= */}
                <Box
                    sx={{
                        position: "absolute",

                        left: {
                            xs: 24,
                            md: 40,
                        },

                        right: {
                            xs: 24,
                            md: 40,
                        },

                        bottom: 24,

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "space-between",

                        zIndex: 10,
                    }}
                >
                    {/* Contador */}
                    <Typography
                        sx={{
                            color: "rgba(255,255,255,.55)",
                            fontSize: 13,
                            fontWeight: 700,
                            letterSpacing: 1.5,
                        }}
                    >
                        {String(current + 1).padStart(2, "0")}
                        {" / "}
                        {String(slides.length).padStart(2, "0")}
                    </Typography>

                    {/* Indicadores */}
                    <Stack
                        direction="row"
                        spacing={1.2}
                    >
                        {slides.map((_, index) => (
                            <Box
                                key={index}
                                onClick={() => setCurrent(index)}
                                sx={{
                                    cursor: "pointer",

                                    width:
                                        current === index
                                            ? 42
                                            : 12,

                                    height: 12,

                                    borderRadius: 999,

                                    bgcolor:
                                        current === index
                                            ? "primary.main"
                                            : "rgba(255,255,255,.15)",

                                    boxShadow:
                                        current === index
                                            ? "0 0 18px rgba(0,255,64,.45)"
                                            : "none",

                                    transition:
                                        ".35s cubic-bezier(.4,0,.2,1)",

                                    "&:hover": {
                                        bgcolor: "primary.main",
                                    },
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                {/* Barra de progresso */}
                <Box
                    sx={{
                        position: "absolute",

                        left: 0,
                        bottom: 0,

                        width: "100%",
                        height: 3,

                        bgcolor: "rgba(255,255,255,.05)",

                        overflow: "hidden",
                    }}
                >
                    <Box
                        key={current}
                        sx={{
                            width: "100%",
                            height: "100%",

                            bgcolor: "primary.main",

                            transformOrigin: "left",

                            animation:
                                "progressSlide 5s linear",

                            "@keyframes progressSlide": {
                                from: {
                                    transform: "scaleX(0)",
                                },
                                to: {
                                    transform: "scaleX(1)",
                                },
                            },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}