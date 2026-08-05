"use client";

import {
    Box,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const items = [
    {
        icon: <LocalShippingOutlinedIcon fontSize="inherit" />,
        text: "FRETE PARA TODO BRASIL",
    },
    {
        icon: <WorkspacePremiumOutlinedIcon fontSize="inherit" />,
        text: "ATÉ 7 DIAS PARA TROCA",
    },
    {
        icon: <SecurityOutlinedIcon fontSize="inherit" />,
        text: "COMPRA 100% SEGURA",
    },
    {
        icon: <WhatsAppIcon fontSize="inherit" />,
        text: "ATENDIMENTO VIA WHATSAPP",
    },
];

export default function TopBar() {
    return (
        <Box
            sx={{
                height: 34,
                bgcolor: "#030303",
                borderBottom: "1px solid rgba(255,255,255,.06)",
                display: {
                    xs: "none",
                    md: "flex",
                },
                alignItems: "center",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2100,
            }}
        >
            <Container maxWidth="xl">
                <Stack
                    direction="row"
                    spacing={5}
                    sx={{
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {items.map((item) => (
                        <Stack
                            key={item.text}
                            direction="row"
                            spacing={0.8}
                            sx={{
                                alignItems: "center",
                                color: "#bdbdbd",
                                fontSize: 11,
                                fontWeight: 700,
                                letterSpacing: ".5px",
                                transition: ".25s",
                                cursor: "default",

                                "& svg": {
                                    color: "primary.main",
                                    fontSize: 15,
                                    transition: ".25s",
                                },

                                "&:hover": {
                                    color: "#fff",

                                    "& svg": {
                                        transform: "scale(1.1)",
                                    },
                                },
                            }}
                        >
                            {item.icon}

                            <Typography
                                sx={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    letterSpacing: ".5px",
                                }}
                            >
                                {item.text}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
}