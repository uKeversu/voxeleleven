// src/components/Navbar.tsx

"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import { useCart } from "@/context/CartContext";

import CartDrawer from "@/components/CartDrawer";

import {
    AppBar,
    Toolbar,
    Box,
    Button,
    IconButton,
    Drawer,
    Stack,
    Typography,
    Badge,
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
    const { totalItems } = useCart();

    const [mobileMenuOpen, setMobileMenuOpen] =
        useState(false);

    const [cartOpen, setCartOpen] =
        useState(false);

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
            {/* NAVBAR */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: 2000,

                    background: scrolled
                        ? "rgba(5,5,5,0.88)"
                        : "transparent",

                    backdropFilter:
                        "blur(20px)",

                    borderBottom:
                        scrolled
                            ? "1px solid rgba(255,255,255,0.06)"
                            : "1px solid transparent",

                    transition:
                        "all 0.3s ease",
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: 80,

                        display: "flex",

                        justifyContent:
                            "space-between",

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

                            textDecoration:
                                "none",
                        }}
                    >
                        <Box
                            component="img"
                            src="/v11-logo.png"
                            alt="Voxel Eleven"
                            sx={{
                                height: {
                                    xs: 34,
                                    md: 42,
                                },

                                width: "auto",

                                objectFit:
                                    "contain",

                                transition:
                                    "0.3s",

                                filter:
                                    "drop-shadow(0 0 2px #00c21a)",

                                "&:hover": {
                                    transform:
                                        "scale(1.03)",

                                    filter:
                                        "drop-shadow(0 0 4px #00ff40)",
                                },
                            }}
                        />
                    </Box>

                    {/* MENU DESKTOP */}
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
                                    px: 2.5,

                                    py: 1,

                                    borderRadius: 3,

                                    fontWeight: 600,

                                    color:
                                        "text.primary",

                                    transition:
                                        "0.25s",

                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.05)",

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
                        {/* CARRINHO */}
                        <Badge
                            badgeContent={
                                totalItems
                            }
                            color="primary"
                        >
                            <IconButton
                                onClick={() =>
                                    setCartOpen(
                                        true
                                    )
                                }
                                sx={{
                                    border:
                                        "1px solid",

                                    borderColor:
                                        "divider",

                                    backgroundColor:
                                        "rgba(255,255,255,0.03)",

                                    transition:
                                        "0.3s",

                                    "&:hover": {
                                        backgroundColor:
                                            "primary.main",

                                        color:
                                            "primary.contrastText",

                                        transform:
                                            "translateY(-2px)",

                                        boxShadow:
                                            "0 0 20px rgba(0,255,64,0.35)",
                                    },
                                }}
                            >
                                <ShoppingBagOutlinedIcon />
                            </IconButton>
                        </Badge>

                        {/* MENU MOBILE */}
                        <IconButton
                            onClick={() =>
                                setMobileMenuOpen(
                                    true
                                )
                            }
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
                                    "rgba(255,255,255,0.03)",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* DRAWER MOBILE */}
            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={() =>
                    setMobileMenuOpen(
                        false
                    )
                }
                slotProps={{
                    paper: {
                        sx: {
                            width: 320,

                            background:
                                "#050505",

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
                    {/* HEADER */}
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
                                fontWeight: 800,

                                color:
                                    "primary.main",
                            }}
                        >
                            MENU
                        </Typography>

                        <IconButton
                            onClick={() =>
                                setMobileMenuOpen(
                                    false
                                )
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
                                    setMobileMenuOpen(
                                        false
                                    )
                                }
                                sx={{
                                    justifyContent:
                                        "flex-start",

                                    py: 1.7,

                                    px: 2,

                                    borderRadius: 3,

                                    color:
                                        "text.primary",

                                    fontSize:
                                        "1rem",

                                    fontWeight: 700,

                                    transition:
                                        "0.3s",

                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(255,255,255,0.04)",

                                        color:
                                            "primary.main",

                                        transform:
                                            "translateX(5px)",
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

            {/* DRAWER CARRINHO */}
            <CartDrawer
                open={cartOpen}
                onClose={() =>
                    setCartOpen(false)
                }
            />
        </>
    );
}