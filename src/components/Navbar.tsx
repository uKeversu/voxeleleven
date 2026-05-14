// src/components/Navbar.tsx

"use client";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
} from "@mui/material";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar() {
    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: "background.default",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: {
                        xs: 2,
                        md: 6,
                    },
                }}
            >
                <Box
                    component="img"
                    src="/v11-logo.png"
                    alt="Voxel Eleven"
                    sx={{
                        height: {
                            xs: 40,
                            md: 52,
                        },

                        width: "auto",
                        objectFit: "contain",

                        cursor: "pointer",

                        transition: "0.3s",

                        filter:
                            "drop-shadow(0 0 2px #00c21aff)",

                        "&:hover": {
                            transform: "scale(1.03)",
                            filter:
                                "drop-shadow(0 0 2px #00ff40ff)",
                        },
                    }}
                />

                <Box
                    sx={{
                        display: {
                            xs: "none",
                            md: "flex",
                        },
                        gap: 2,
                    }}
                >
                    <Button color="inherit">Catálogo</Button>
                    <Button color="inherit">Brasileiros</Button>
                    <Button color="inherit">Europeus</Button>
                    <Button color="inherit">Seleções</Button>
                </Box>

                <Box>
                    <IconButton color="inherit">
                        <ShoppingBagOutlinedIcon />
                    </IconButton>

                    <IconButton
                        color="inherit"
                        sx={{
                            display: {
                                xs: "inline-flex",
                                md: "none",
                            },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}