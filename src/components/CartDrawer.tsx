// src/components/CartDrawer.tsx

"use client";

import Link from "next/link";

import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Stack,
    Button,
    Divider,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import { useCart } from "@/context/CartContext";

type Props = {
    open: boolean;

    onClose: () => void;
};

export default function CartDrawer({
    open,
    onClose,
}: Props) {
    const {
        cartItems,

        totalPrice,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,
    } = useCart();

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        width: {
                            xs: "100%",
                            sm: 430,
                        },

                        background:
                            "#050505",

                        borderLeft:
                            "1px solid rgba(255,255,255,0.08)",

                        display: "flex",

                        flexDirection:
                            "column",
                    },
                },
            }}
        >
            {/* HEADER */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 800,
                    }}
                >
                    Seu carrinho
                </Typography>

                <IconButton
                    onClick={onClose}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    px: 3,
                    py: 2.5,

                    display: "flex",

                    alignItems:
                        "center",

                    justifyContent:
                        "space-between",

                    borderBottom:
                        "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{
                        alignItems:
                            "center",
                    }}
                >
                    <ShoppingBagOutlinedIcon
                        color="primary"
                    />

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 800,
                        }}
                    >
                        Carrinho
                    </Typography>
                </Stack>

                <IconButton
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* EMPTY */}
            {cartItems.length === 0 && (
                <Box
                    sx={{
                        flex: 1,

                        display: "flex",

                        flexDirection:
                            "column",

                        alignItems:
                            "center",

                        justifyContent:
                            "center",

                        textAlign: "center",

                        px: 4,
                    }}
                >
                    <ShoppingBagOutlinedIcon
                        sx={{
                            fontSize: 80,

                            color:
                                "rgba(255,255,255,0.12)",

                            mb: 2,
                        }}
                    />

                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,

                            mb: 1,
                        }}
                    >
                        Seu carrinho está vazio
                    </Typography>

                    <Typography
                        sx={{
                            color:
                                "text.secondary",

                            mb: 4,
                        }}
                    >
                        Explore o catálogo e
                        adicione suas camisas
                        favoritas.
                    </Typography>

                    <Button
                        component={Link}
                        href="/catalogo"
                        variant="contained"
                        color="primary"
                        onClick={onClose}
                        sx={{
                            px: 4,
                            py: 1.5,

                            borderRadius: 3,

                            fontWeight: 700,
                        }}
                    >
                        Explorar catálogo
                    </Button>
                </Box>
            )}

            {/* ITEMS */}
            {cartItems.length > 0 && (
                <>
                    <Box
                        sx={{
                            flex: 1,

                            overflowY:
                                "auto",

                            px: 3,
                            py: 3,
                        }}
                    >
                        <Stack spacing={3}>
                            {cartItems.map(
                                (item) => (
                                    <Box
                                        key={`${item.product.id}-${item.size}`}
                                        sx={{
                                            p: 2,

                                            borderRadius: 4,

                                            border:
                                                "1px solid",

                                            borderColor:
                                                "divider",

                                            background:
                                                "rgba(255,255,255,0.02)",
                                        }}
                                    >
                                        <Stack
                                            direction="row"
                                            spacing={
                                                2
                                            }
                                        >
                                            {/* IMAGE */}
                                            <Box
                                                component="img"
                                                src={
                                                    item
                                                        .product
                                                        .image
                                                }
                                                alt={
                                                    item
                                                        .product
                                                        .name
                                                }
                                                sx={{
                                                    width: 90,

                                                    height: 110,

                                                    borderRadius: 3,

                                                    objectFit:
                                                        "cover",

                                                    flexShrink: 0,
                                                }}
                                            />

                                            {/* INFO */}
                                            <Box
                                                sx={{
                                                    flex: 1,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontWeight: 700,

                                                        mb: 0.5,
                                                    }}
                                                >
                                                    {
                                                        item
                                                            .product
                                                            .name
                                                    }
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        color:
                                                            "text.secondary",

                                                        fontSize:
                                                            "0.92rem",

                                                        mb: 1.5,
                                                    }}
                                                >
                                                    Tamanho{" "}
                                                    {
                                                        item.size
                                                    }
                                                </Typography>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Estoque disponível:{" "}
                                                    {item.product.stock[item.size]}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        color:
                                                            "primary.main",

                                                        fontWeight: 800,

                                                        fontSize:
                                                            "1.05rem",
                                                    }}
                                                >
                                                    {item.product.price.toLocaleString(
                                                        "pt-BR",
                                                        {
                                                            style:
                                                                "currency",

                                                            currency:
                                                                "BRL",
                                                        }
                                                    )}
                                                </Typography>

                                                {/* CONTROLS */}
                                                <Stack
                                                    direction="row"
                                                    sx={{
                                                        mt: 2,

                                                        alignItems:
                                                            "center",

                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    {/* QUANTITY */}
                                                    <Stack
                                                        direction="row"
                                                        spacing={
                                                            1
                                                        }
                                                        sx={{
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                decreaseQuantity(
                                                                    item
                                                                        .product
                                                                        .id,

                                                                    item.size
                                                                )
                                                            }
                                                            sx={{
                                                                border:
                                                                    "1px solid",

                                                                borderColor:
                                                                    "divider",
                                                            }}
                                                        >
                                                            <RemoveIcon
                                                                fontSize="small"
                                                            />
                                                        </IconButton>

                                                        <Typography
                                                            sx={{
                                                                minWidth: 20,

                                                                textAlign:
                                                                    "center",

                                                                fontWeight: 700,
                                                            }}
                                                        >
                                                            {
                                                                item.quantity
                                                            }
                                                        </Typography>

                                                        <IconButton
                                                            size="small"
                                                            disabled={
                                                                item.quantity >=
                                                                item.product.stock[item.size]
                                                            }
                                                            onClick={() =>
                                                                increaseQuantity(
                                                                    item.product.id,
                                                                    item.size
                                                                )
                                                            }
                                                            sx={{
                                                                border:
                                                                    "1px solid",

                                                                borderColor:
                                                                    "divider",
                                                            }}
                                                        >
                                                            <AddIcon
                                                                fontSize="small"
                                                            />
                                                        </IconButton>
                                                    </Stack>

                                                    {/* REMOVE */}
                                                    <IconButton
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item
                                                                    .product
                                                                    .id,

                                                                item.size
                                                            )
                                                        }
                                                        sx={{
                                                            color:
                                                                "#ff4d4d",
                                                        }}
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Box>
                                )
                            )}
                        </Stack>
                    </Box>

                    {/* FOOTER */}
                    <Box
                        sx={{
                            p: 3,

                            borderTop:
                                "1px solid rgba(255,255,255,0.06)",

                            background:
                                "#050505",
                        }}
                    >
                        {/* SUBTOTAL */}
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent:
                                    "space-between",

                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    color:
                                        "text.secondary",
                                }}
                            >
                                Subtotal
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 900,

                                    color:
                                        "primary.main",
                                }}
                            >
                                {totalPrice.toLocaleString(
                                    "pt-BR",
                                    {
                                        style:
                                            "currency",

                                        currency:
                                            "BRL",
                                    }
                                )}
                            </Typography>
                        </Stack>

                        <Divider
                            sx={{
                                mb: 3,
                            }}
                        />

                        {/* BUTTONS */}
                        <Stack spacing={1.5}>
                            <Button
                                component={Link}
                                href="/carrinho"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    height: 56,

                                    borderRadius: 3,

                                    fontWeight: 800,

                                    fontSize:
                                        "1rem",

                                    boxShadow:
                                        "0 0 25px rgba(0,255,64,0.25)",

                                    "&:hover": {
                                        boxShadow:
                                            "0 0 35px rgba(0,255,64,0.45)",
                                    },
                                }}
                            >
                                Ver carrinho
                            </Button>

                            <Button
                                component={Link}
                                href="/catalogo"
                                variant="outlined"
                                color="primary"
                                onClick={onClose}
                                sx={{
                                    height: 52,

                                    borderRadius: 3,

                                    fontWeight: 700,
                                }}
                            >
                                Continuar comprando
                            </Button>
                        </Stack>
                    </Box>
                </>
            )}
        </Drawer>
    );
}