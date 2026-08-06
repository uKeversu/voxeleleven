"use client";

import {
    Box,
    Typography,
    Grid,
    Paper,
} from "@mui/material";

import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PublicIcon from "@mui/icons-material/Public";
import FlagIcon from "@mui/icons-material/Flag";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { PiBaseballCapFill } from "react-icons/pi";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import AcUnitIcon from "@mui/icons-material/AcUnit";

import { useRouter } from "next/navigation";

const categories = [
    {
        name: "Brasileiros",
        icon: <SportsSoccerIcon fontSize="large" />,
        image: "/vasco-home-26-27.jpg"
    },

    {
        name: "Europeus",
        icon: <PublicIcon fontSize="large" />,
        image: "/real-madrid-away-25-26.jpeg"
    },

    {
        name: "Seleções",
        icon: <FlagIcon fontSize="large" />,
        image: "/brasil-home-26-27.jpg"
    },

    {
        name: "Retrô",
        icon: <HistoryEduIcon fontSize="large" />,
        image: "/milan-retro.jpeg"
    },

    {
        name: "Colecionáveis V11",
        icon: <WorkspacePremiumIcon fontSize="large" />,
        image: "/colecionaveis/porta-copo-corinthians.png"
    },

    {
        name: "Agasalhos",
        icon: <AcUnitIcon fontSize="large" />,
        image: "/agasalhos/jaqueta-psg.png"
    },

    {
        name: "Bonés",
        icon: <PiBaseballCapFill size={32} />,
        image: "/bones/bone-brasil-preto.png"
    },

    {
        name: "Basquete",
        icon: <SportsBasketballIcon fontSize="large" />,
        image: "/basquete/celtics-preta-11.png"
    },
];

export default function Categories() {
    const router = useRouter();

    const handleCategory = (category: string) => {
        router.push(
            `/catalogo?categoria=${encodeURIComponent(
                category
            )}`
        );
    };

    return (
        <Box
            sx={{
                py: 10,
                px: { xs: 3, md: 10 },

                background:
                    "linear-gradient(180deg, #0a0a0a, #050505)",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 800,
                    mb: 1,
                    textAlign: {
                        xs: "center",
                        md: "left",
                    },
                }}
            >
                Categorias
            </Typography>

            <Typography
                sx={{
                    color: "#888",
                    mb: 5,

                    textAlign: {
                        xs: "center",
                        md: "left",
                    },
                }}
            >
                Explore coleções inspiradas no esporte mundial.
            </Typography>

            <Grid container spacing={3}>
                {categories.map((item) => (
                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 3,
                        }}
                        key={item.name}
                    >
                        <Paper
                            onClick={() => handleCategory(item.name)}
                            sx={{
                                position: "relative",
                                height: 220,
                                borderRadius: 5,
                                overflow: "hidden",
                                cursor: "pointer",
                                background: "#101010",
                                transition: ".35s",

                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: "0 25px 45px rgba(0,0,0,.45)",

                                    "& img": {
                                        transform: "scale(1.08)",
                                    },

                                    "& .overlay": {
                                        background:
                                            "linear-gradient(to top, rgba(0,0,0,.95), rgba(0,0,0,.25))",
                                    },

                                    "& .title": {
                                        color: "primary.main",
                                    },
                                },
                            }}
                        >
                            {/* Imagem */}
                            <Box
                                component="img"
                                src={item.image}
                                alt={item.name}
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    transition: ".6s ease",
                                }}
                            />

                            {/* Escurecimento */}
                            <Box
                                className="overlay"
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,.9), rgba(0,0,0,.45))",
                                    transition: ".35s",
                                }}
                            />

                            {/* Ícone */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 18,
                                    left: 18,

                                    width: 48,
                                    height: 48,

                                    borderRadius: "50%",

                                    bgcolor: "rgba(0,0,0,.45)",
                                    backdropFilter: "blur(12px)",

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                    color: "primary.main",
                                    zIndex: 2,
                                }}
                            >
                                {item.icon}
                            </Box>

                            {/* Texto */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    left: 22,
                                    right: 22,
                                    bottom: 20,
                                    zIndex: 2,
                                }}
                            >
                                <Typography
                                    className="title"
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: "1.35rem",
                                        transition: ".3s",
                                    }}
                                >
                                    {item.name}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#d0d0d0",
                                        fontSize: 14,
                                        mt: .5,
                                    }}
                                >
                                    Explorar coleção →
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}