// src/components/NavBar.tsx

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
    Typography,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Tooltip,
    Collapse,
    Button,
    Menu,
    MenuItem,
    Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import SearchBox from "@/components/SearchBox";

import { useAuth } from "@/context/AuthContext";

const navItems = [
    {
        label: "CATÁLOGO",
        href: "/catalogo",
    },
    {
        label: "BRASILEIROS",
        href: "/catalogo?categoria=Brasileiros",
    },
    {
        label: "EUROPEUS",
        href: "/catalogo?categoria=Europeus",
    },
    {
        label: "SELEÇÕES",
        href: "/catalogo?categoria=Seleções",
    },
];

interface NavbarProps {
    products: Product[];
}
export default function Navbar({
    products,
}: NavbarProps) {

    const router = useRouter();

    const {
        totalItems
    } = useCart();

    const {
        user,
        profile,
        loading,
        signOut,
    } = useAuth();

    const [accountMenuAnchor, setAccountMenuAnchor] =
        useState<null | HTMLElement>(null);

    const accountMenuOpen = Boolean(accountMenuAnchor);

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

    const handleSelectProduct = (product: Product) => {
        setSearch("");

        setSearchOpen(false);

        router.push(
            `/produto/${product.slug}`
        );
    };

    const handleSearch = () => {

        const value = search.trim();

        if (!value) return;

        setSearch("");

        setSearchOpen(false);

        router.push(`/catalogo?q=${encodeURIComponent(value)}`);
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    opacity: searchOpen ? 0 : 1,
                    pointerEvents: searchOpen ? "none" : "auto",
                    top: {
                        xs: 0,
                        md: 34,
                    },
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
                        minHeight: 72,
                        px: {
                            xs: 2,
                            md: 6,
                        },
                        gap: 4,
                    }}
                >
                    <Box
                        component={Link}
                        href="/"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            transition: ".3s",

                            "& img": {
                                transition: ".3s",
                            },

                            "&:hover img": {
                                filter: "drop-shadow(0 0 12px rgba(0,255,64,.35))",
                            },
                        }}
                    >
                        <Image
                            src="/v11-logo.png"
                            alt="Voxel Eleven"
                            width={165}
                            height={50}
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
                                        px: 1.8,
                                        py: 1,
                                        position: "relative",
                                        color: "text.primary",
                                        textDecoration: "none",
                                        fontSize: 13,
                                        fontWeight: 700,
                                        letterSpacing: ".8px",
                                        transition: ".25s",
                                        "&::after": {
                                            content: '""',
                                            position: "absolute",
                                            left: "50%",
                                            bottom: -4,
                                            transform: "translateX(-50%)",
                                            width: 0,
                                            height: 2,
                                            borderRadius: 999,
                                            background: "primary.main",
                                            transition: ".25s",
                                        },
                                        "&:hover": {
                                            color: "primary.main",
                                        },
                                        "&:hover::after": {
                                            width: "70%",
                                        },
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
                            maxWidth: 620,
                            mx: 6,
                            display: {
                                xs: "none",
                                lg: "block"
                            }
                        }}
                    >
                        <SearchBox
                            search={search}
                            setSearch={setSearch}
                            products={products}
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
                                    setSearchOpen((prev) => !prev);
                                }}

                                sx={{
                                    display: {
                                        xs: "flex",
                                        lg: "none"
                                    },
                                    width: 42,
                                    height: 42,
                                    borderRadius: "50%",
                                    transition: ".25s",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,.05)",
                                    },
                                }}

                            >
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>

                        {!loading && (
                            user ? (
                                <>
                                    <Tooltip title="Minha conta">
                                        <IconButton
                                            onClick={(event) => {
                                                setAccountMenuAnchor(
                                                    event.currentTarget
                                                );
                                            }}
                                            sx={{
                                                width: 42,
                                                height: 42,
                                                borderRadius: "50%",
                                                transition: ".25s",

                                                "&:hover": {
                                                    bgcolor:
                                                        "rgba(255,255,255,.05)",
                                                },
                                            }}
                                        >
                                            <PersonOutlineOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Menu
                                        anchorEl={accountMenuAnchor}
                                        open={accountMenuOpen}
                                        onClose={() =>
                                            setAccountMenuAnchor(null)
                                        }
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        slotProps={{
                                            paper: {
                                                sx: {
                                                    mt: 1.5,
                                                    minWidth: 250,
                                                    borderRadius: 3,
                                                    bgcolor: "#0b0b0b",
                                                    backgroundImage: "none",
                                                    border:
                                                        "1px solid rgba(255,255,255,.08)",
                                                    boxShadow:
                                                        "0 20px 60px rgba(0,0,0,.5)",
                                                },
                                            },
                                        }}
                                    >

                                        <Box
                                            sx={{
                                                px: 2.5,
                                                py: 2,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: 800,
                                                    fontSize: 15,
                                                }}
                                            >
                                                {profile?.name || "Cliente"}
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    mt: 0.3,
                                                    color: "text.secondary",
                                                    fontSize: 12,
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                {user.email}
                                            </Typography>
                                        </Box>

                                        <Divider
                                            sx={{
                                                borderColor:
                                                    "rgba(255,255,255,.07)",
                                            }}
                                        />

                                        <MenuItem
                                            onClick={() => {
                                                setAccountMenuAnchor(null);
                                                router.push("/conta");
                                            }}
                                            sx={{
                                                mx: 1,
                                                my: 0.5,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <PersonOutlineOutlinedIcon
                                                fontSize="small"
                                                sx={{ mr: 1.5 }}
                                            />

                                            Minha conta
                                        </MenuItem>

                                        <Divider
                                            sx={{
                                                borderColor:
                                                    "rgba(255,255,255,.07)",
                                            }}
                                        />

                                        <MenuItem
                                            onClick={async () => {
                                                setAccountMenuAnchor(null);
                                                await signOut();
                                            }}
                                            sx={{
                                                mx: 1,
                                                my: 0.5,
                                                borderRadius: 2,
                                            }}
                                        >
                                            <LogoutOutlinedIcon
                                                fontSize="small"
                                                sx={{ mr: 1.5 }}
                                            />

                                            Sair
                                        </MenuItem>

                                    </Menu>
                                </>
                            ) : (
                                <Tooltip title="Entrar">
                                    <IconButton
                                        onClick={() => {
                                            router.push("/login");
                                        }}
                                        sx={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: "50%",
                                            transition: ".25s",

                                            "&:hover": {
                                                bgcolor:
                                                    "rgba(255,255,255,.05)",
                                            },
                                        }}
                                    >
                                        <PersonOutlineOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        )}

                        <Tooltip title="Carrinho">
                            <IconButton
                                onClick={
                                    () => setCartOpen(true)
                                }
                                sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "50%",
                                    transition: ".25s",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,.05)",
                                    },
                                }}
                            >
                                <Badge
                                    badgeContent={totalItems}
                                    color="primary"
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            minWidth: 18,
                                            height: 18,
                                            borderRadius: 999,
                                            fontWeight: 800,
                                            color: "#000",
                                            background: "#00ff40",
                                            boxShadow: "0 0 10px rgba(0,255,64,.35)",
                                        },
                                    }}
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
                                },
                                width: 42,
                                height: 42,
                                borderRadius: "50%",
                                transition: ".25s",
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,.05)",
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Collapse
                in={searchOpen}
                timeout={350}
                unmountOnExit
                sx={{
                    position: "fixed",
                    top: {
                        xs: 72,
                        md: 106, // Navbar (72) + TopBar (34)
                    },
                    left: 0,
                    right: 0,
                    zIndex: 1999,
                }}
            >
                <Box
                    sx={{
                        px: {
                            xs: 2,
                            md: 6,
                        },
                        py: 2,
                        bgcolor: "rgba(8,8,8,.96)",
                        backdropFilter: "blur(20px)",
                        borderBottom: "1px solid rgba(255,255,255,.06)",
                        boxShadow: "0 12px 40px rgba(0,0,0,.45)",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "center",
                            maxWidth: 1400,
                            mx: "auto",
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <SearchBox
                                search={search}
                                setSearch={setSearch}
                                products={products}
                                onSelect={handleSelectProduct}
                                onEnter={() => {
                                    handleSearch();
                                    setSearchOpen(false);
                                }}
                            />
                        </Box>

                        <IconButton
                            onClick={() => setSearchOpen(false)}
                            sx={{
                                width: 46,
                                height: 46,
                                borderRadius: "50%",
                                bgcolor: "rgba(255,255,255,.04)",

                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,.08)",
                                },
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </Box>
            </Collapse>

            <Drawer
                anchor="right"
                open={menuOpen}
                onClose={
                    () => setMenuOpen(false)
                }
                slotProps={{
                    paper: {
                        sx: {
                            width: 320,
                            background: "#080808",
                            backgroundImage: "none",
                            borderLeft:
                                "1px solid rgba(255,255,255,.06)",
                        },
                    },
                }}
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
                            sx={{
                                width: 42,
                                height: 42,
                                borderRadius: "50%",
                                transition: ".25s",
                                "&:hover": {
                                    bgcolor: "rgba(255,255,255,.05)",
                                },
                            }}
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
                                    sx={{
                                        borderRadius: 3,
                                        mb: 1,
                                        "&:hover": {
                                            bgcolor: "rgba(255,255,255,.04)"
                                        }
                                    }}
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


            <CartDrawer
                open={cartOpen}
                onClose={
                    () => setCartOpen(false)
                }
            />
        </>
    );
}