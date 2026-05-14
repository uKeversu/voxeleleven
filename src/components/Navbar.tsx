// src/components/Navbar.tsx

"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Drawer,
    Stack,
    Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

const navItems = [
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

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const [scrolled, setScrolled] =
        useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, []);

    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: 2000,
                    background: scrolled
                        ? "rgba(5,5,5,0.85)"
                        : "transparent",
                    backdropFilter: "blur(20px)",
                    touchAction: "manipulation",

                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",

                        justifyContent:
                            "space-between",

                        minHeight: 80,

                        px: {
                            xs: 2,
                            md: 6,
                        },
                    }}
                >
                    {/* LOGO */}
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            display: "flex",
                            alignItems:
                                "center",
                        }}
                    >
                        <Box
                            component="img"
                            src="/v11-logo.png"
                            alt="Voxel Eleven"
                            sx={{
                                height: {
                                    xs: 32,
                                    md: 40,
                                },

                                width: "auto",

                                objectFit:
                                    "contain",

                                transition:
                                    "0.3s",

                                filter:
                                    "drop-shadow(0 0 2px #00c21aff)",

                                "&:hover": {
                                    transform:
                                        "scale(1.03)",

                                    filter:
                                        "drop-shadow(0 0 3px #00ff40ff)",
                                },
                            }}
                        />
                    </Box>

                    {/* DESKTOP */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                        }}
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                href={item.href}
                                color="inherit"
                                sx={{
                                    px: 2,

                                    borderRadius: 3,

                                    color:
                                        "text.primary",

                                    fontWeight: 600,

                                    transition:
                                        "0.3s",

                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.04)",

                                        color:
                                            "primary.main",
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>

                    {/* ACTIONS */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            alignItems:
                                "center",
                        }}
                    >
                        <IconButton
                            sx={{
                                border:
                                    "1px solid",

                                borderColor:
                                    "divider",

                                backgroundColor:
                                    "rgba(255,255,255,0.02)",

                                transition:
                                    "0.3s",

                                "&:hover": {
                                    backgroundColor:
                                        "primary.main",

                                    color:
                                        "primary.contrastText",

                                    transform:
                                        "translateY(-2px)",
                                },
                            }}
                        >
                            <ShoppingBagOutlinedIcon />
                        </IconButton>

                        {/* MOBILE MENU */}
                        <IconButton
                            onClick={() => {
                                setOpen(true);
                            }}
                            sx={{
                                display: {
                                    xs: "flex",
                                    md: "none",
                                },

                                border:
                                    "1px solid",

                                borderColor:
                                    "divider",

                                backgroundColor:
                                    "rgba(255,255,255,0.02)",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* DRAWER */}
            <Drawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: 320,

                            background: "#050505",

                            borderLeft:
                                "1px solid rgba(255,255,255,0.08)",

                            backdropFilter:
                                "blur(20px)",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        p: 3,

                        height: "100%",

                        display: "flex",

                        flexDirection:
                            "column",
                    }}
                >
                    {/* TOP */}
                    <Box
                        sx={{
                            display: "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "space-between",

                            mb: 5,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,

                                color:
                                    "primary.main",
                            }}
                        >
                            MENU
                        </Typography>

                        <IconButton
                            onClick={() =>
                                setOpen(false)
                            }
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* LINKS */}
                    <Stack spacing={2}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                href={item.href}
                                onClick={() =>
                                    setOpen(
                                        false
                                    )
                                }
                                sx={{
                                    justifyContent:
                                        "flex-start",

                                    py: 1.5,

                                    px: 2,

                                    borderRadius: 3,

                                    color:
                                        "text.primary",

                                    fontSize:
                                        "1rem",

                                    fontWeight: 600,

                                    transition:
                                        "0.3s",

                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.04)",

                                        color:
                                            "primary.main",

                                        transform:
                                            "translateX(6px)",
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>

                    {/* FOOTER */}
                    <Box
                        sx={{
                            mt: "auto",

                            pt: 4,
                        }}
                    >
                        <Typography
                            sx={{
                                color:
                                    "text.secondary",

                                fontSize:
                                    "0.9rem",
                            }}
                        >
                            © 2026 Voxel Eleven
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}