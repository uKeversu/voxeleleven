// src/components/admin/AdminSideBar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Box,
    Button,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useAuth } from "@/context/AuthContext";

const menuItems = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: <DashboardRoundedIcon />,
    },
    {
        label: "Produtos",
        href: "/admin/produtos",
        icon: <Inventory2RoundedIcon />,
    },
    {
        label: "Pedidos",
        href: "/admin/pedidos",
        icon: <ShoppingBagRoundedIcon />,
    },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { signOut } = useAuth();

    const handleLogout = async () => {
        await signOut();
        window.location.href = "/login";
    };

    return (
        <Box
            component="aside"
            sx={{
                width: 260,
                flexShrink: 0,
                minHeight: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                display: {
                    xs: "none",
                    md: "flex",
                },
                flexDirection: "column",
                background:
                    "linear-gradient(180deg, #080808 0%, #050505 100%)",
                borderRight:
                    "1px solid rgba(255,255,255,.07)",
                zIndex: 1200,
            }}
        >
            {/* LOGO / MARCA */}

            <Box
                sx={{
                    px: 3,
                    py: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: 18,
                        fontWeight: 950,
                        letterSpacing: 1.5,
                    }}
                >
                    VOXEL{" "}
                    <Box
                        component="span"
                        sx={{
                            color: "primary.main",
                        }}
                    >
                        ELEVEN
                    </Box>
                </Typography>

                <Typography
                    sx={{
                        mt: 0.5,
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 2,
                        color: "text.secondary",
                    }}
                >
                    PAINEL ADMIN
                </Typography>
            </Box>

            <Divider
                sx={{
                    borderColor:
                        "rgba(255,255,255,.07)",
                }}
            />

            {/* NAVEGAÇÃO */}

            <Box
                sx={{
                    px: 2,
                    py: 3,
                    flex: 1,
                }}
            >
                <Typography
                    sx={{
                        px: 1.5,
                        mb: 1,
                        fontSize: 10,
                        fontWeight: 900,
                        letterSpacing: 1.8,
                        color: "text.secondary",
                    }}
                >
                    GERENCIAMENTO
                </Typography>

                <List
                    disablePadding
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                    }}
                >
                    {menuItems.map((item) => {
                        const active =
                            item.href === "/admin"
                                ? pathname === "/admin"
                                : pathname.startsWith(item.href);

                        return (
                            <ListItemButton
                                key={item.href}
                                component={Link}
                                href={item.href}
                                selected={active}
                                sx={{
                                    minHeight: 46,
                                    px: 1.5,
                                    borderRadius: 2.5,
                                    color: active
                                        ? "primary.main"
                                        : "text.secondary",

                                    "& .MuiListItemIcon-root": {
                                        minWidth: 38,
                                        color: "inherit",
                                    },

                                    "& .MuiListItemText-primary": {
                                        fontSize: 14,
                                        fontWeight: active
                                            ? 800
                                            : 600,
                                    },

                                    "&.Mui-selected": {
                                        background:
                                            "rgba(0,255,64,.08)",
                                    },

                                    "&.Mui-selected:hover": {
                                        background:
                                            "rgba(0,255,64,.12)",
                                    },

                                    "&:hover": {
                                        background:
                                            "rgba(255,255,255,.04)",
                                        color: "text.primary",
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>

                                <ListItemText
                                    primary={item.label}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Box>

            {/* RODAPÉ */}

            <Box
                sx={{
                    p: 2,
                }}
            >
                <Divider
                    sx={{
                        mb: 2,
                        borderColor:
                            "rgba(255,255,255,.07)",
                    }}
                />

                <Stack spacing={1}>
                    <Button
                        component={Link}
                        href="/"
                        fullWidth
                        startIcon={
                            <StorefrontRoundedIcon />
                        }
                        sx={{
                            justifyContent: "flex-start",
                            px: 1.5,
                            color: "text.secondary",
                            fontWeight: 700,
                            borderRadius: 2,

                            "&:hover": {
                                background:
                                    "rgba(255,255,255,.04)",
                                color: "text.primary",
                            },
                        }}
                    >
                        Voltar para loja
                    </Button>

                    <Button
                        fullWidth
                        startIcon={
                            <LogoutRoundedIcon />
                        }
                        onClick={handleLogout}
                        sx={{
                            justifyContent: "flex-start",
                            px: 1.5,
                            color: "text.secondary",
                            fontWeight: 700,
                            borderRadius: 2,

                            "&:hover": {
                                background:
                                    "rgba(255,255,255,.04)",
                                color: "error.main",
                            },
                        }}
                    >
                        Sair
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
}