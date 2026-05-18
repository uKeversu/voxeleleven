"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Stack,
} from "@mui/material";

import { useRouter } from "next/navigation";

// ajuste conforme seu contexto/carrinho
import { useCart } from "@/context/CartContext";

const slides = [
    {
        title: "BRASIL - HOME 26/27",
        subtitle: "OFERTA IMPERDÍVEL",
        description: "Por apenas R$ 119.90",
        image: "/brasil-home-26-67-Photoroom.png",
        button: "Comprar agora",
        action: "buy",
    },

    {
        title: "3 CAMISAS = 25% OFF",
        subtitle: "PROMOÇÃO ESPECIAL",
        description: "Monte sua coleção e economize no carrinho.",
        image: "/colecao.png",
        button: "Montar carrinho",
        action: "catalog",
    },

    {
        title: "COLEÇÃO RETRÔ PREMIUM",
        subtitle: "EDIÇÃO LIMITADA",
        description: "Os mantos que marcaram época por todo o mundo.",
        image: "/retros.png",
        button: "Ver coleção",
        action: "retro",
    },

    {
        title: "BRASIL DRY-FIT",
        subtitle: "PERFORMANCE & ESTILO",
        description:
            "Modelos dry-fit da Seleção Brasileira por R$ 59.90.",
        image: "/modelos-dryfit.png",
        button: "Explorar coleção",
        action: "dryfit",
    },
];

export default function PromoCarousel() {
    const [current, setCurrent] = useState(0);

    const router = useRouter();

    const { addToCart } = useCart();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleAction = () => {
        const slide = slides[current];

        // OFERTA IMPERDÍVEL
        if (slide.action === "buy") {
            addToCart(
                {
                    id: 3,
                    name: "Brasil - Home 26/27",
                    slug: "brasil-amarela-26",
                    team: "Brasil",
                    category: "Seleções",
                    season: "26",
                    price: 119.9,
                    badge: "NEW",
                    image: "/brasil-home-26-67-Photoroom.png",
                    description:
                        "Modelo premium da seleção brasileira 2026",
                    featured: true,
                    sizes: ["P", "M", "G", "GG", "XGG"],
                },
                "M"
            );

            router.push("/carrinho");
        }

        // PROMOÇÃO 25%
        if (slide.action === "catalog") {
            router.push("/catalogo");
        }

        // RETRÔ
        if (slide.action === "retro") {
            router.push("/catalogo?categoria=Retrô");
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                background: "linear-gradient(180deg, #050505, #0a0a0a)",
                py: 8,
                px: { xs: 2, md: 8 },
                overflow: "hidden",
            }}
        >
            {/* GLOW */}
            <Box
                sx={{
                    position: "absolute",
                    width: 400,
                    height: 400,
                    background: "#00ff40",
                    filter: "blur(180px)",
                    opacity: 0.08,
                    top: "10%",
                    left: "-10%",
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 6,
                    overflow: "hidden",
                    minHeight: 420,

                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },

                    alignItems: "center",
                    justifyContent: "space-between",

                    gap: 4,

                    px: { xs: 3, md: 8 },
                    py: 4,
                }}
            >
                {/* TEXTO */}
                <Box
                    sx={{
                        zIndex: 2,
                        maxWidth: 500,
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    <Typography
                        sx={{
                            color: "primary.main",
                            fontWeight: 800,
                            letterSpacing: 2,
                            mb: 1,
                            fontSize: {
                                xs: "0.9rem",
                                md: "1rem",
                            },
                        }}
                    >
                        {slides[current].subtitle}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: "1.8rem",
                                sm: "2rem",
                                md: "2.5rem",
                            },

                            fontWeight: 900,
                            lineHeight: 1,
                        }}
                    >
                        {slides[current].title}
                    </Typography>

                    <Typography
                        sx={{
                            mt: 3,
                            color: "#aaa",
                            fontSize: {
                                xs: "1rem",
                                md: "1.1rem",
                            },
                        }}
                    >
                        {slides[current].description}
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            mt: 4,

                            justifyContent: {
                                xs: "center",
                                md: "flex-start",
                            },
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleAction}
                            sx={{
                                px: 4,
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 700,
                            }}
                        >
                            {slides[current].button}
                        </Button>
                    </Stack>
                </Box>

                {/* IMAGEM */}
                <Box
                    sx={{
                        display: "flex",

                        width: {
                            xs: 260,
                            sm: 320,
                            md: 380,
                        },

                        height: {
                            xs: 260,
                            sm: 320,
                            md: 380,
                        },

                        position: "relative",

                        justifyContent: "center",
                        alignItems: "center",

                        mx: "auto",

                        zIndex: 2,

                        animation:
                            "floatPromo 6s ease-in-out infinite",

                        "@keyframes floatPromo": {
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
                        src={slides[current].image}
                        alt={slides[current].title}
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",

                            transition: "0.4s ease",

                            filter:
                                "drop-shadow(0 0 30px rgba(0,255,64,0.25))",

                            backfaceVisibility: "hidden",
                            transform: "translateZ(0)",

                            "&:hover": {
                                transform: "scale(1.03)",
                            },
                        }}
                    />
                </Box>

                {/* INDICADORES */}
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        position: "absolute",
                        bottom: 20,
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                >
                    {slides.map((_, index) => (
                        <Box
                            key={index}
                            onClick={() => setCurrent(index)}
                            sx={{
                                width:
                                    current === index
                                        ? 30
                                        : 10,

                                height: 10,

                                borderRadius: 10,

                                background:
                                    current === index
                                        ? "#00ff40"
                                        : "rgba(255,255,255,0.2)",

                                transition: "0.3s",
                                cursor: "pointer",
                            }}
                        />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}