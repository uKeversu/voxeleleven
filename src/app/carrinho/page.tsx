// src/app/carrinho/page.tsx

"use client";

import Link from "next/link";

import {
    Box,
    Typography,
    Stack,
    Button,
    Divider,
    IconButton,
    Grid,
    Paper,
    TextField,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { generateWhatsAppMessage } from "@/utils/generateWhatsAppMessage";
import { useCart } from "@/context/CartContext";

export default function CarrinhoPage() {
    const {
        cartItems,
        totalPrice,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    const handleWhatsAppCheckout = () => {
        const numero = "554788453656";

        const mensagem =
            generateWhatsAppMessage({
                cartItems,
                totalPrice,
            });

        const url = `https://wa.me/${numero}?text=${encodeURIComponent(
            mensagem
        )}`;

        window.open(url, "_blank");
    };

    const handleInfiniteCheckout =
        async () => {
            const response = await fetch(
                "/api/create-checkout",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        items: cartItems,
                    }),
                }
            );

            const data = await response.json();

            console.log(data);
            console.log(JSON.stringify(data, null, 2));

            if (data.url) {
                window.location.href = data.url;
            }

        };

    if (cartItems.length === 0) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    px: 3,

                    py: 12,
                }}
            >
                <Stack
                    spacing={3}
                    sx={{
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <ShoppingBagOutlinedIcon
                        sx={{
                            fontSize: 90,
                            color: "primary.main",
                        }}
                    />

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 800,
                        }}
                    >
                        Seu carrinho está vazio
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            maxWidth: 500,
                        }}
                    >
                        Explore o catálogo da
                        Voxel Eleven e encontre
                        sua próxima camisa.
                    </Typography>

                    <Button
                        component={Link}
                        href="/catalogo"
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            borderRadius: 3,
                            px: 4,
                            py: 1.5,
                            fontWeight: 700,
                        }}
                    >
                        Ir para catálogo
                    </Button>
                </Stack>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",

                px: {
                    xs: 2,
                    md: 8,
                },

                py: {
                    xs: 12,
                    md: 14,
                },
            }}
        >
            {/* HEADER */}
            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                spacing={2}
                sx={{
                    justifyContent:
                        "space-between",

                    alignItems: {
                        xs: "flex-start",
                        md: "center",
                    },

                    mb: 6,
                }}
            >
                <Box>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            mb: 1,
                        }}
                    >
                        Carrinho
                    </Typography>

                    <Typography
                        sx={{
                            color:
                                "text.secondary",
                        }}
                    >
                        Revise seus produtos
                        antes de finalizar o
                        pedido.
                    </Typography>
                </Box>

                <Button
                    onClick={clearCart}
                    variant="outlined"
                    color="error"
                    sx={{
                        borderRadius: 3,
                    }}
                >
                    Limpar carrinho
                </Button>
            </Stack>

            <Grid
                container
                spacing={4}
            >
                {/* PRODUTOS */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 8,
                    }}
                >
                    <Stack spacing={3}>
                        {cartItems.map(
                            (item) => (
                                <Paper
                                    key={`${item.product.id}-${item.size}`}
                                    sx={{
                                        p: 3,

                                        borderRadius: 5,

                                        backgroundColor:
                                            "background.paper",

                                        border:
                                            "1px solid",

                                        borderColor:
                                            "divider",
                                    }}
                                >
                                    <Grid
                                        container
                                        spacing={3}
                                        sx={{
                                            alignItems:
                                                "center",
                                        }}
                                    >
                                        {/* IMAGE */}
                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 3,
                                            }}
                                        >
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
                                                    width:
                                                        "100%",

                                                    height: 220,

                                                    objectFit:
                                                        "cover",

                                                    borderRadius: 4,
                                                }}
                                            />
                                        </Grid>

                                        {/* INFO */}
                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 9,
                                            }}
                                        >
                                            <Stack
                                                spacing={
                                                    2
                                                }
                                            >
                                                <Box>
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontWeight: 800,
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
                                                            mt: 0.5,
                                                        }}
                                                    >
                                                        Tamanho:{" "}
                                                        <strong>
                                                            {
                                                                item.size
                                                            }
                                                        </strong>
                                                    </Typography>
                                                </Box>

                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        color:
                                                            "primary.main",

                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    {item.product.price.toLocaleString(
                                                        "pt-BR",
                                                        {
                                                            style: "currency",
                                                            currency:
                                                                "BRL",
                                                        }
                                                    )}
                                                </Typography>

                                                {/* QUANTIDADE */}
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
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                item
                                                                    .product
                                                                    .id,
                                                                item.size
                                                            )
                                                        }
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>

                                                    <Typography
                                                        sx={{
                                                            minWidth: 24,
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
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                item
                                                                    .product
                                                                    .id,
                                                                item.size
                                                            )
                                                        }
                                                    >
                                                        <AddIcon />
                                                    </IconButton>

                                                    <Box
                                                        sx={{
                                                            flex: 1,
                                                        }}
                                                    />

                                                    <IconButton
                                                        color="error"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item
                                                                    .product
                                                                    .id,
                                                                item.size
                                                            )
                                                        }
                                                    >
                                                        <DeleteForeverOutlinedIcon />
                                                    </IconButton>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            )
                        )}
                    </Stack>
                </Grid>

                {/* RESUMO */}
                <Grid
                    size={{
                        xs: 12,
                        lg: 4,
                    }}
                >
                    <Box
                        sx={{
                            position:
                                "sticky",

                            top: 110,
                        }}
                    >
                        <Paper
                            sx={{
                                p: 4,

                                borderRadius: 5,

                                backgroundColor:
                                    "background.paper",

                                border:
                                    "1px solid",

                                borderColor:
                                    "divider",
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 800,
                                    mb: 3,
                                }}
                            >
                                Resumo
                            </Typography>

                            <Stack spacing={2}>
                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color:
                                                "text.secondary",
                                        }}
                                    >
                                        Produtos
                                    </Typography>

                                    <Typography>
                                        {
                                            cartItems.length
                                        }
                                    </Typography>
                                </Stack>

                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color:
                                                "text.secondary",
                                        }}
                                    >
                                        Frete
                                    </Typography>

                                    <Typography>
                                        Grátis
                                    </Typography>
                                </Stack>

                                <Divider />

                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 800,
                                        }}
                                    >
                                        Total
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            color:
                                                "primary.main",

                                            fontWeight: 900,
                                        }}
                                    >
                                        {totalPrice.toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL",
                                            }
                                        )}
                                    </Typography>
                                </Stack>

                                <TextField
                                    fullWidth
                                    placeholder="Cupom de desconto"
                                    sx={{
                                        mt: 2,
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleInfiniteCheckout}
                                >
                                    Finalizar compra
                                </Button>

                                <Button
                                    variant="contained"
                                    color="success"
                                    size="large"
                                    startIcon={
                                        <WhatsAppIcon />
                                    }
                                    onClick={
                                        handleWhatsAppCheckout
                                    }
                                    sx={{
                                        mt: 2,

                                        height: 56,

                                        borderRadius: 3,

                                        fontWeight: 800,

                                        fontSize:
                                            "1rem",
                                    }}
                                >
                                    Finalizar no WhatsApp
                                </Button>

                                <Button
                                    component={Link}
                                    href="/catalogo"
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        height: 56,

                                        borderRadius: 3,

                                        fontWeight: 700,
                                    }}
                                >
                                    Continuar comprando
                                </Button>
                            </Stack>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}