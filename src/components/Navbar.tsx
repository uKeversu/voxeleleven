"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

import { products } from "@/data/products";

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
    Autocomplete,
    Avatar,
    TextField,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SearchIcon from "@mui/icons-material/Search";


const navItems = [
    {
        label: "Catálogo",
        href: "/catalogo",
    },

    {
        label: "Brasileiros",
        href: "/catalogo?categoria=Brasileiros",
    },

    {
        label: "Europeus",
        href: "/catalogo?categoria=Europeus",
    },

    {
        label: "Seleções",
        href: "/catalogo?categoria=Seleções",
    },
];

export default function Navbar() {
    const { totalItems } = useCart();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const router = useRouter();

    const [search, setSearch] = useState("");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const searchOptions = useMemo(() => {
        if (!search.trim()) return [];

        const q = search.toLowerCase();

        return products
            .filter((product) => {
                const text = [
                    product.name,
                    product.team,
                    product.category,
                    product.description,
                    product.price,
                    product.season,
                    product.badge,
                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();

                return text.includes(q);
            })
            .slice(0, 6);
    }, [search]);

    const handleSearch = () => {
        const value = search.trim();

        if (!value) return;

        setSearch("");

        router.push(`/catalogo?q=${encodeURIComponent(value)}`);
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: 2000,
                    background: scrolled
                        ? "rgba(5,5,5,0.72)"
                        : "transparent",
                    backdropFilter: "blur(24px)",
                    borderBottom: scrolled
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid transparent",
                    transition: "0.3s ease",
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: 80,
                        display: "flex",
                        justifyContent: "space-between",
                        px: { xs: 2, md: 6 },
                    }}
                >
                    {/* LOGO */}
                    <Box component={Link} href="/" sx={{ display: "flex" }}>
                        <Box
                            component="img"
                            src="/v11-logo.png"
                            alt="Voxel Eleven"
                            sx={{
                                height: { xs: 32, md: 42 },
                                transition: "0.3s",
                                filter: "drop-shadow(0 0 2px #00ff40)",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        />
                    </Box>

                    {/* DESKTOP NAV */}
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                href={item.href}
                                sx={{
                                    color: "text.primary",
                                    fontWeight: 600,
                                    px: 2,
                                    borderRadius: 2,
                                    "&:hover": {
                                        color: "primary.main",
                                        backgroundColor: "rgba(255,255,255,0.04)",
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>

                    <Box
                        sx={{
                            flex: 1,
                            maxWidth: 520,
                            mx: 4,
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <IconButton
                                onClick={handleSearch}
                                size="small"
                            >
                                <SearchIcon color="action" />
                            </IconButton>

                            <Autocomplete
                                freeSolo
                                options={searchOptions}
                                filterOptions={(x) => x}
                                inputValue={search}
                                onInputChange={(_, value) => setSearch(value)}
                                getOptionLabel={(option) =>
                                    typeof option === "string"
                                        ? option
                                        : option.name
                                }
                                onChange={(_, value) => {
                                    if (!value || typeof value === "string") return;

                                    setSearch("");

                                    router.push(`/produto/${value.slug}`);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Buscar time, jogador ou seleção..."
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleSearch();
                                            }
                                        }}
                                    />
                                )}
                                renderOption={(props, option) => (
                                    <Box
                                        component="li"
                                        {...props}
                                        sx={{
                                            py: 1.5,
                                            gap: 2,
                                            borderRadius: 2,

                                            "&:hover": {
                                                background: "rgba(0,255,64,.08)",
                                            },
                                        }}
                                    >
                                        <Avatar
                                            src={option.image}
                                            variant="rounded"
                                            sx={{
                                                width: 50,
                                                height: 50,
                                            }}
                                        />

                                        <Box sx={{ flex: 1 }}>
                                            <Typography sx={{ fontWeight: 700, }}>
                                                {option.name}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {option.team}
                                            </Typography>
                                        </Box>

                                        <Typography
                                            color="primary.main"
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            R$ {Number(option.price).toFixed(2)}
                                        </Typography>
                                    </Box>
                                )}
                                noOptionsText="Nenhum produto encontrado"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        height: 46,
                                        borderRadius: 999,
                                        background: "rgba(255,255,255,.04)",

                                        "&:hover": {
                                            background: "rgba(255,255,255,.06)",
                                        },

                                        "&.Mui-focused": {
                                            boxShadow:
                                                "0 0 0 2px rgba(0,255,64,.15)",
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    {/* ACTIONS */}
                    <Stack direction="row" spacing={1}>
                        <Badge badgeContent={totalItems} color="primary">
                            <IconButton
                                onClick={() => setCartOpen(true)}
                                sx={{
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    backgroundColor: "rgba(255,255,255,0.03)",
                                    "&:hover": {
                                        backgroundColor: "primary.main",
                                        color: "#000",
                                    },
                                }}
                            >
                                <ShoppingBagOutlinedIcon />
                            </IconButton>
                        </Badge>

                        <IconButton
                            onClick={() => setMobileMenuOpen(true)}
                            sx={{ display: { xs: "flex", md: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* MOBILE */}
            <Drawer
                anchor="right"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: 320,
                            background: "#050505",
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        p: 3,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 800,
                                color: "primary.main",
                            }}
                        >
                            MENU
                        </Typography>

                        <IconButton onClick={() => setMobileMenuOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Stack
                        sx={{
                            mt: 4,
                        }}
                        spacing={2}
                    >
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                component={Link}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                sx={{
                                    justifyContent: "flex-start",
                                    color: "text.primary",
                                    fontWeight: 700,
                                    transition: "0.25s",
                                    "&:hover": {
                                        transform: "translateX(5px)",
                                        color: "primary.main",
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>
                </Box>
            </Drawer>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}