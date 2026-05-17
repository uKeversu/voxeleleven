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
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { PiBaseballCapFill } from "react-icons/pi";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

import { useRouter } from "next/navigation";

const categories = [
    {
        name: "Brasileiros",
        icon: <SportsSoccerIcon fontSize="large" />,
    },

    {
        name: "Europeus",
        icon: <PublicIcon fontSize="large" />,
    },

    {
        name: "Seleções",
        icon: <FlagIcon fontSize="large" />,
    },

    {
        name: "Retrô",
        icon: <HistoryEduIcon fontSize="large" />,
    },

    {
        name: "Conjuntos",
        icon: <CheckroomIcon fontSize="large" />,
    },

    {
        name: "Agasalhos",
        icon: <AcUnitIcon fontSize="large" />,
    },

    {
        name: "Bonés",
        icon: <PiBaseballCapFill size={32} />,
    },

    {
        name: "Basquete",
        icon: <SportsBasketballIcon fontSize="large" />,
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
                            onClick={() =>
                                handleCategory(item.name)
                            }
                            sx={{
                                p: 3,

                                minHeight: 140,

                                borderRadius: 5,

                                background:
                                    "linear-gradient(135deg, rgba(0,255,64,0.06), #111)",

                                border:
                                    "1px solid rgba(255,255,255,0.05)",

                                cursor: "pointer",

                                position: "relative",

                                overflow: "hidden",

                                transition: "all 0.35s ease",

                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",

                                "&:hover": {
                                    transform:
                                        "translateY(-6px)",

                                    boxShadow:
                                        "0 0 25px rgba(0,255,64,0.18)",

                                    border:
                                        "1px solid rgba(0,255,64,0.25)",
                                },

                                "&::before": {
                                    content: '""',

                                    position: "absolute",

                                    width: 120,
                                    height: 120,

                                    background:
                                        "rgba(0,255,64,0.08)",

                                    filter: "blur(50px)",

                                    top: -30,
                                    right: -30,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    color: "primary.main",
                                    mb: 2,
                                    zIndex: 2,
                                }}
                            >
                                {item.icon}
                            </Box>

                            <Box sx={{ zIndex: 2 }}>
                                <Typography
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: "1.1rem",
                                    }}
                                >
                                    {item.name}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        color: "#999",
                                        mt: 0.5,
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