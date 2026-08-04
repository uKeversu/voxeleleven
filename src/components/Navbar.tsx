"use client";

import {
    useState,
    useEffect,
    useMemo,
    useCallback,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    AppBar,
    Toolbar,
    Box,
    Stack,
    IconButton,
    Badge,
    Autocomplete,
    TextField,
    Avatar,
    Typography,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Dialog,
    Tooltip,
} from "@mui/material";


import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";


import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import SearchBox from "@/components/SearchBox";



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

    const router = useRouter();

    const {
        totalItems
    } = useCart();



    const [
        scrolled,
        setScrolled
    ] = useState(false);


    const [
        menuOpen,
        setMenuOpen
    ] = useState(false);


    const [
        cartOpen,
        setCartOpen
    ] = useState(false);


    const [
        searchOpen,
        setSearchOpen
    ] = useState(false);



    const [
        search,
        setSearch
    ] = useState("");



    useEffect(() => {

        const handleScroll = () => {

            setScrolled(
                window.scrollY > 30
            );

        };


        window.addEventListener(
            "scroll",
            handleScroll
        );


        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };


    }, []);

    const handleSelectProduct = (product: any) => {
        setSearch("");

        setSearchOpen(false);

        router.push(
            `/produto/${product.slug}`
        );
    };

    const handleSearch = () => {
        const value =
            search.trim();

        if (!value)
            return;

        setSearch("");

        router.push(
            `/catalogo?q=${encodeURIComponent(value)}`
        );
    };

    const searchOptions = useMemo(() => {
        const value =
            search
                .trim()
                .toLowerCase();

        if (!value)
            return [];

        return products
            .filter(product => {

                const content = [

                    product.name,
                    product.team,
                    product.category,
                    product.description,
                    product.season,
                    product.badge,

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();



                return content.includes(value);


            })
            .slice(0, 8);


    }, [search]);




    const executeSearch = useCallback(() => {


        const value =
            search.trim();


        if (!value)
            return;


        setSearch("");


        router.push(
            `/catalogo?q=${encodeURIComponent(value)}`
        );


    }, [
        search,
        router
    ]);





    const selectProduct = useCallback(
        (product: any) => {


            setSearch("");

            setSearchOpen(false);


            router.push(
                `/produto/${product.slug}`
            );

        },
        [
            router
        ]
    );

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: 2000,
                    bgcolor:
                        scrolled
                            ? "rgba(5,5,5,.85)"
                            : "transparent",
                    backdropFilter:
                        "blur(25px)",
                    borderBottom:
                        scrolled
                            ? "1px solid rgba(255,255,255,.08)"
                            : "none",
                    transition:
                        ".3s",
                }}
            >
                <Toolbar
                    sx={{
                        minHeight: 82,
                        px: {
                            xs: 2,
                            md: 6
                        }
                    }}
                >
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            display: "flex"
                        }}
                    >
                        <Image
                            src="/v11-logo.png"
                            alt="Voxel Eleven"
                            width={140}
                            height={45}
                            style={{
                                objectFit: "contain"
                            }}
                        />
                    </Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            ml: 5,
                            display: {
                                xs: "none",
                                md: "flex"
                            }
                        }}
                    >
                        {
                            navItems.map(item => (
                                <Box
                                    key={item.label}
                                    component={Link}
                                    href={item.href}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        color: "text.primary",
                                        borderRadius: 2,
                                        fontWeight: 700,
                                        textDecoration: "none",
                                        "&:hover": {
                                            color:
                                                "primary.main",
                                            bgcolor:
                                                "rgba(255,255,255,.05)"
                                        }
                                    }}
                                >
                                    {item.label}
                                </Box>
                            ))
                        }


                    </Stack>





                    <Box

                        sx={{
                            flex: 1,
                            maxWidth: 520,
                            mx: 5,
                            display: {
                                xs: "none",
                                lg: "block"
                            }
                        }}
                    >
                        <SearchBox

                            search={search}

                            setSearch={setSearch}

                            onSelect={handleSelectProduct}

                            onEnter={handleSearch}

                        />

                    </Box>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            ml: "auto",
                        }}
                    >
                        <Tooltip title="Buscar">

                            <IconButton

                                onClick={() => {
                                    setSearch("");
                                    setSearchOpen(true);
                                }}

                                sx={{
                                    display: {
                                        xs: "flex",
                                        lg: "none"
                                    }
                                }}

                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Carrinho">
                            <IconButton
                                onClick={
                                    () => setCartOpen(true)
                                }
                            >
                                <Badge
                                    badgeContent={totalItems}
                                    color="primary"
                                >
                                    <ShoppingBagOutlinedIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>

                        <IconButton
                            onClick={
                                () => setMenuOpen(true)
                            }
                            sx={{
                                display: {
                                    xs: "flex",
                                    md: "none"
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={menuOpen}
                onClose={
                    () => setMenuOpen(false)
                }
            >
                <Box
                    sx={{
                        width: 320,
                        p: 3
                    }}
                >
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Typography sx={{ color: "primary.main", fontWeight: 900 }}
                        >
                            MENU
                        </Typography>


                        <IconButton

                            onClick={
                                () => setMenuOpen(false)
                            }

                        >

                            <CloseIcon />

                        </IconButton>


                    </Stack>



                    <List sx={{ mt: 3 }}>

                        {
                            navItems.map(item => (

                                <ListItemButton

                                    key={item.label}

                                    component={Link}

                                    href={item.href}

                                    onClick={
                                        () => setMenuOpen(false)
                                    }

                                >

                                    <ListItemText

                                        primary={item.label}

                                    />

                                </ListItemButton>

                            ))
                        }

                    </List>


                </Box>


            </Drawer>

            <Drawer
                anchor="top"
                open={searchOpen}
                onClose={() => setSearchOpen(false)}
                slotProps={{
                    paper: {
                        sx: {
                            background: "#050505",
                            backgroundImage: "none",
                            p: 2,
                            pt: 3,
                        }
                    }
                }}
            >

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: "center",
                    }}
                >

                    <IconButton
                        onClick={() => setSearchOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>


                    <Box
                        sx={{
                            flex: 1,
                        }}
                    >

                        <SearchBox

                            search={search}

                            setSearch={setSearch}

                            onSelect={handleSelectProduct}

                            onEnter={handleSearch}

                        />

                    </Box>


                </Stack>

            </Drawer>

            <CartDrawer
                open={cartOpen}
                onClose={
                    () => setCartOpen(false)
                }
            />
        </>
    );
}