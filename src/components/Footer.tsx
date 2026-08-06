// src/components/Footer.tsx

"use client";

import Link from "next/link";

import { useRouter, usePathname } from "next/navigation";

import {
    Box,
    Container,
    Typography,
    Stack,
    IconButton,
    Divider,
} from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";


const links = [
    {
        label: "Catálogo",
        href: "/catalogo",
    },
    {
        label: "Brasileiros",
        href: "/catalogo",
    },
    {
        label: "Europeus",
        href: "/catalogo",
    },
    {
        label: "Seleções",
        href: "/catalogo",
    },
];

export default function Footer() {

    const router = useRouter();
    const pathname = usePathname();

    return (
        <Box
            component="footer"
            sx={{
                mt: 10,

                borderTop: "1px solid",
                borderColor: "divider",

                background:
                    "linear-gradient(to bottom, #050505, #090909)",
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    py: {
                        xs: 6,
                        md: 8,
                    },
                }}
            >
                {/* TOP */}
                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={6}
                    sx={{
                        justifyContent:
                            "space-between",
                    }}
                >
                    {/* BRAND */}
                    <Box
                        sx={{
                            maxWidth: 800,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",

                                flexDirection: {
                                    xs: "column",
                                    md: "row",
                                },

                                alignItems: "center",

                                justifyContent: "space-between",

                                gap: {
                                    xs: 2,
                                    md: 4,
                                },

                                textAlign: {
                                    xs: "center",
                                    md: "left",
                                },
                            }}
                        >
                            {/* LOGO */}
                            <Box
                                component="img"
                                src="/voxel-eleven-logo.png"
                                alt="Voxel Eleven"
                                onClick={() => {
                                    if (pathname === "/") {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                    } else {
                                        router.push("/");
                                    }
                                }}
                                sx={{
                                    cursor: "pointer",
                                    height: {
                                        xs: 280,
                                        md: 350,
                                    },
                                    width: "auto",
                                    objectFit: "contain",
                                    flexShrink: 0,
                                }}
                            />

                            {/* TEXTO */}
                            <Typography
                                sx={{
                                    color: "text.secondary",

                                    textAlign: {
                                        xs: "center",
                                        md: "justify",
                                    },

                                    lineHeight: 1.8,

                                    fontSize: {
                                        xs: "1rem",
                                        md: "1rem",
                                    },

                                    maxWidth: 500,
                                }}
                            >
                                Na Voxel Eleven, cada camisa
                                representa mais do que um
                                uniforme. Representa história,
                                identidade, paixão e cultura.
                                Inspiradas nos maiores clubes,
                                seleções e momentos do futebol
                                mundial, nossas peças unem
                                estilo, nostalgia e
                                autenticidade em uma coleção
                                feita para quem vive o futebol
                                dentro e fora dos estádios.

                                <Box
                                    component="span"
                                    sx={{
                                        display: "block",

                                        mt: 3,

                                        color: "primary.main",

                                        fontWeight: 700,

                                        fontSize: {
                                            xs: "1.1rem",
                                            md: "1.05rem",
                                        },

                                        lineHeight: 1.6,
                                    }}
                                >
                                    Vista tradição. Vista cultura.
                                    Vista Voxel Eleven.
                                </Box>
                            </Typography>
                        </Box>
                    </Box>

                    {/* LINKS */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,

                                fontWeight: 700,
                            }}
                        >
                            Navegação
                        </Typography>

                        <Stack spacing={1.5}>
                            {links.map((link) => (
                                <Typography
                                    key={link.label}
                                    component={Link}
                                    href={link.href}
                                    sx={{
                                        color:
                                            "text.secondary",

                                        textDecoration:
                                            "none",

                                        transition:
                                            "0.2s",

                                        width: "fit-content",

                                        "&:hover": {
                                            color:
                                                "primary.main",

                                            transform:
                                                "translateX(4px)",
                                        },
                                    }}
                                >
                                    {link.label}
                                </Typography>
                            ))}
                        </Stack>
                    </Box>

                    {/* SOCIAL */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 3,

                                fontWeight: 700,
                            }}
                        >
                            Redes sociais
                        </Typography>

                        <Stack
                            direction="row"
                            spacing={1.5}
                        >
                            <IconButton href="https://www.instagram.com/voxeleleven/"
                                sx={{
                                    border:
                                        "1px solid",

                                    borderColor:
                                        "divider",

                                    backgroundColor:
                                        "background.paper",

                                    transition:
                                        "0.3s",

                                    "&:hover": {
                                        backgroundColor:
                                            "primary.main",

                                        color:
                                            "primary.contrastText",

                                        transform:
                                            "translateY(-4px)",

                                        boxShadow:
                                            "0 0 20px rgba(0,255,64,0.25)",
                                    },
                                }}
                            >
                                <InstagramIcon />
                            </IconButton>

                            <IconButton href="https://wa.me/554788453656?text=Olá!%20Gostaria%20de%20mais%20informações."
                                sx={{
                                    border:
                                        "1px solid",

                                    borderColor:
                                        "divider",

                                    backgroundColor:
                                        "background.paper",

                                    transition:
                                        "0.3s",

                                    "&:hover": {
                                        backgroundColor:
                                            "primary.main",

                                        color:
                                            "primary.contrastText",

                                        transform:
                                            "translateY(-4px)",

                                        boxShadow:
                                            "0 0 20px rgba(0,255,64,0.25)",
                                    },
                                }}
                            >
                                <WhatsAppIcon />
                            </IconButton>

                            <IconButton href="https://voxeleleven.vercel.app"
                                sx={{
                                    border:
                                        "1px solid",

                                    borderColor:
                                        "divider",

                                    backgroundColor:
                                        "background.paper",

                                    transition:
                                        "0.3s",

                                    "&:hover": {
                                        backgroundColor:
                                            "primary.main",

                                        color:
                                            "primary.contrastText",

                                        transform:
                                            "translateY(-4px)",

                                        boxShadow:
                                            "0 0 20px rgba(0,255,64,0.25)",
                                    },
                                }}
                            >
                                <SportsSoccerIcon />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>

                {/* DIVIDER */}
                <Divider
                    sx={{
                        my: 5,
                    }}
                />

                {/* BOTTOM */}
                <Stack
                    sx={{
                        alignItems: "center",
                    }}
                >
                    <Typography
                        sx={{
                            color:
                                "text.secondary",

                            fontSize:
                                "0.95rem",
                        }}
                    >
                        © 2026 Voxel Eleven.
                        Todos os direitos
                        reservados.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}