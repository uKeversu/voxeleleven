// src/app/carrinho/page.tsx

"use client";

import Link from "next/link";

import { useState } from "react";

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
    InputAdornment,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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


    /*
     * DADOS DE CONTATO
     * E ENTREGA.
     */

    const [
        customerPhone,
        setCustomerPhone,
    ] = useState("");


    const [
        shippingZipCode,
        setShippingZipCode,
    ] = useState("");


    const [
        shippingAddress,
        setShippingAddress,
    ] = useState("");


    const [
        shippingNumber,
        setShippingNumber,
    ] = useState("");


    const [
        shippingComplement,
        setShippingComplement,
    ] = useState("");


    const [
        shippingNeighborhood,
        setShippingNeighborhood,
    ] = useState("");


    const [
        shippingCity,
        setShippingCity,
    ] = useState("");


    const [
        shippingState,
        setShippingState,
    ] = useState("");


    const handleWhatsAppCheckout = () => {

        const numero =
            "554788453656";


        const mensagem =
            generateWhatsAppMessage({
                cartItems,
                totalPrice,
            });


        const url =
            `https://wa.me/${numero}?text=${encodeURIComponent(
                mensagem
            )}`;


        window.open(
            url,
            "_blank"
        );

    };


    const handleInfiniteCheckout =
        async () => {

            /*
             * VALIDAÇÃO NO FRONTEND.
             *
             * O backend e a função SQL
             * também validam esses dados.
             */

            if (
                !customerPhone.trim() ||
                !shippingZipCode.trim() ||
                !shippingAddress.trim() ||
                !shippingNumber.trim() ||
                !shippingNeighborhood.trim() ||
                !shippingCity.trim() ||
                !shippingState.trim()
            ) {

                alert(
                    "Preencha todos os dados obrigatórios de contato e entrega."
                );

                return;

            }


            try {

                const response =
                    await fetch(
                        "/api/create-checkout",
                        {
                            method:
                                "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                            },

                            body:
                                JSON.stringify({
                                    items:
                                        cartItems,

                                    customer_phone:
                                        customerPhone,

                                    shipping_zip_code:
                                        shippingZipCode,

                                    shipping_address:
                                        shippingAddress,

                                    shipping_number:
                                        shippingNumber,

                                    shipping_complement:
                                        shippingComplement,

                                    shipping_neighborhood:
                                        shippingNeighborhood,

                                    shipping_city:
                                        shippingCity,

                                    shipping_state:
                                        shippingState,
                                }),
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "Resposta checkout:",
                    data
                );


                /*
                 * ERRO.
                 */

                if (!response.ok) {

                    alert(
                        data.message ||
                        "Não foi possível iniciar o checkout."
                    );

                    return;

                }


                /*
                 * REDIRECIONA PARA
                 * O CHECKOUT DA INFINITEPAY.
                 */

                if (data.url) {

                    window.location.href =
                        data.url;

                    return;

                }


                /*
                 * Proteção caso a API
                 * responda sucesso sem URL.
                 */

                alert(
                    "O checkout foi criado, mas a URL de pagamento não foi recebida."
                );

            } catch (error) {

                console.error(
                    "Erro ao finalizar compra:",
                    error
                );


                alert(
                    "Ocorreu um erro ao iniciar o pagamento."
                );

            }

        };


    if (cartItems.length === 0) {

        return (
            <Box
                sx={{
                    minHeight:
                        "100vh",

                    display:
                        "flex",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",

                    px:
                        3,

                    py:
                        12,
                }}
            >
                <Paper
                    sx={{
                        width:
                            "100%",

                        maxWidth:
                            600,

                        p: {
                            xs: 4,
                            md: 6,
                        },

                        borderRadius:
                            6,

                        textAlign:
                            "center",

                        border:
                            "1px solid",

                        borderColor:
                            "divider",
                    }}
                >
                    <Stack
                        spacing={3}
                        sx={{
                            alignItems:
                                "center",
                        }}
                    >
                        <Box
                            sx={{
                                width:
                                    110,

                                height:
                                    110,

                                borderRadius:
                                    "50%",

                                display:
                                    "flex",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                backgroundColor:
                                    "rgba(0, 255, 64, 0.08)",

                                border:
                                    "1px solid rgba(0, 255, 64, 0.2)",
                            }}
                        >
                            <ShoppingBagOutlinedIcon
                                sx={{
                                    fontSize:
                                        55,

                                    color:
                                        "primary.main",
                                }}
                            />
                        </Box>


                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight:
                                        900,

                                    mb:
                                        1,
                                }}
                            >
                                Seu carrinho está vazio
                            </Typography>

                            <Typography
                                sx={{
                                    color:
                                        "text.secondary",

                                    maxWidth:
                                        420,

                                    mx:
                                        "auto",
                                }}
                            >
                                Explore o catálogo da
                                Voxel Eleven e encontre
                                sua próxima camisa.
                            </Typography>
                        </Box>


                        <Button
                            component={Link}
                            href="/catalogo"
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={
                                <ArrowBackIcon />
                            }
                            sx={{
                                minWidth:
                                    220,

                                height:
                                    54,

                                borderRadius:
                                    3,

                                px:
                                    4,

                                fontWeight:
                                    800,
                            }}
                        >
                            Ir para catálogo
                        </Button>
                    </Stack>
                </Paper>
            </Box>
        );

    }


    return (
        <Box
            sx={{
                minHeight:
                    "100vh",

                maxWidth:
                    1500,

                mx:
                    "auto",

                px: {
                    xs: 2,
                    sm: 3,
                    md: 5,
                    lg: 6,
                },

                py: {
                    xs: 10,
                    md: 12,
                },
            }}
        >

            {/* HEADER */}

            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                spacing={3}
                sx={{
                    justifyContent:
                        "space-between",

                    alignItems: {
                        xs:
                            "flex-start",

                        md:
                            "center",
                    },

                    mb: {
                        xs:
                            4,

                        md:
                            5,
                    },
                }}
            >
                <Box>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems:
                                "center",

                            mb:
                                1,
                        }}
                    >
                        <Box
                            sx={{
                                width:
                                    48,

                                height:
                                    48,

                                borderRadius:
                                    3,

                                display:
                                    "flex",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                backgroundColor:
                                    "rgba(0, 255, 64, 0.08)",

                                border:
                                    "1px solid rgba(0, 255, 64, 0.18)",
                            }}
                        >
                            <ShoppingBagOutlinedIcon
                                sx={{
                                    color:
                                        "primary.main",
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight:
                                        900,

                                    lineHeight:
                                        1.1,
                                }}
                            >
                                Seu carrinho
                            </Typography>

                            <Typography
                                sx={{
                                    color:
                                        "text.secondary",

                                    mt:
                                        0.5,
                                }}
                            >
                                Revise seus produtos e
                                finalize seu pedido.
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Button
                    onClick={clearCart}
                    variant="outlined"
                    color="error"
                    startIcon={
                        <DeleteForeverOutlinedIcon />
                    }
                    sx={{
                        height:
                            46,

                        borderRadius:
                            3,

                        fontWeight:
                            700,
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
                        lg: 7,
                    }}
                >
                    <Stack
                        spacing={2.5}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight:
                                    800,

                                mb:
                                    0.5,
                            }}
                        >
                            Produtos selecionados
                        </Typography>


                        {cartItems.map(
                            (item) => (

                                <Paper
                                    key={`${item.product.id}-${item.size}`}
                                    sx={{
                                        overflow:
                                            "hidden",

                                        borderRadius:
                                            5,

                                        border:
                                            "1px solid",

                                        borderColor:
                                            "divider",

                                        transition:
                                            "transform 0.2s ease, border-color 0.2s ease",

                                        "&:hover": {
                                            transform:
                                                "translateY(-2px)",

                                            borderColor:
                                                "rgba(0, 255, 64, 0.35)",
                                        },
                                    }}
                                >
                                    <Grid
                                        container
                                        sx={{
                                            alignItems:
                                                "stretch",
                                        }}
                                    >

                                        {/* IMAGEM */}

                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 4,
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={
                                                    item.product.image
                                                }
                                                alt={
                                                    item.product.name
                                                }
                                                sx={{
                                                    width:
                                                        "100%",

                                                    height: {
                                                        xs:
                                                            260,

                                                        sm:
                                                            "100%",
                                                    },

                                                    minHeight: {
                                                        sm:
                                                            250,
                                                    },

                                                    objectFit:
                                                        "cover",

                                                    display:
                                                        "block",
                                                }}
                                            />
                                        </Grid>


                                        {/* INFORMAÇÕES */}

                                        <Grid
                                            size={{
                                                xs: 12,
                                                sm: 8,
                                            }}
                                        >
                                            <Stack
                                                spacing={3}
                                                sx={{
                                                    height:
                                                        "100%",

                                                    p: {
                                                        xs:
                                                            2.5,

                                                        md:
                                                            3,
                                                    },
                                                }}
                                            >

                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    sx={{
                                                        justifyContent:
                                                            "space-between",

                                                        alignItems:
                                                            "flex-start",
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            variant="h5"
                                                            sx={{
                                                                fontWeight:
                                                                    800,

                                                                lineHeight:
                                                                    1.2,

                                                                mb:
                                                                    1,
                                                            }}
                                                        >
                                                            {
                                                                item.product.name
                                                            }
                                                        </Typography>

                                                        <Typography
                                                            sx={{
                                                                color:
                                                                    "text.secondary",
                                                            }}
                                                        >
                                                            Tamanho{" "}

                                                            <Box
                                                                component="span"
                                                                sx={{
                                                                    color:
                                                                        "text.primary",

                                                                    fontWeight:
                                                                        800,
                                                                }}
                                                            >
                                                                {
                                                                    item.size
                                                                }
                                                            </Box>
                                                        </Typography>
                                                    </Box>


                                                    <IconButton
                                                        color="error"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.product.id,
                                                                item.size
                                                            )
                                                        }
                                                        sx={{
                                                            flexShrink:
                                                                0,

                                                            border:
                                                                "1px solid",

                                                            borderColor:
                                                                "rgba(255, 80, 80, 0.25)",
                                                        }}
                                                    >
                                                        <DeleteForeverOutlinedIcon />
                                                    </IconButton>
                                                </Stack>


                                                <Box
                                                    sx={{
                                                        flex:
                                                            1,
                                                    }}
                                                />


                                                <Stack
                                                    direction={{
                                                        xs:
                                                            "column",

                                                        sm:
                                                            "row",
                                                    }}
                                                    spacing={2}
                                                    sx={{
                                                        justifyContent:
                                                            "space-between",

                                                        alignItems: {
                                                            xs:
                                                                "flex-start",

                                                            sm:
                                                                "center",
                                                        },
                                                    }}
                                                >

                                                    {/* QUANTIDADE */}

                                                    <Box>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color:
                                                                    "text.secondary",

                                                                display:
                                                                    "block",

                                                                mb:
                                                                    0.75,

                                                                fontWeight:
                                                                    700,
                                                            }}
                                                        >
                                                            Quantidade
                                                        </Typography>

                                                        <Stack
                                                            direction="row"
                                                            sx={{
                                                                alignItems:
                                                                    "center",

                                                                border:
                                                                    "1px solid",

                                                                borderColor:
                                                                    "divider",

                                                                borderRadius:
                                                                    3,

                                                                width:
                                                                    "fit-content",

                                                                overflow:
                                                                    "hidden",
                                                            }}
                                                        >
                                                            <IconButton
                                                                onClick={() =>
                                                                    decreaseQuantity(
                                                                        item.product.id,
                                                                        item.size
                                                                    )
                                                                }
                                                                sx={{
                                                                    borderRadius:
                                                                        0,
                                                                }}
                                                            >
                                                                <RemoveIcon />
                                                            </IconButton>

                                                            <Typography
                                                                sx={{
                                                                    width:
                                                                        42,

                                                                    textAlign:
                                                                        "center",

                                                                    fontWeight:
                                                                        800,
                                                                }}
                                                            >
                                                                {
                                                                    item.quantity
                                                                }
                                                            </Typography>

                                                            <IconButton
                                                                onClick={() =>
                                                                    increaseQuantity(
                                                                        item.product.id,
                                                                        item.size
                                                                    )
                                                                }
                                                                sx={{
                                                                    borderRadius:
                                                                        0,
                                                                }}
                                                            >
                                                                <AddIcon />
                                                            </IconButton>
                                                        </Stack>
                                                    </Box>


                                                    {/* PREÇO */}

                                                    <Box
                                                        sx={{
                                                            textAlign: {
                                                                xs:
                                                                    "left",

                                                                sm:
                                                                    "right",
                                                            },
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color:
                                                                    "text.secondary",

                                                                display:
                                                                    "block",

                                                                mb:
                                                                    0.5,

                                                                fontWeight:
                                                                    700,
                                                            }}
                                                        >
                                                            Preço unitário
                                                        </Typography>

                                                        <Typography
                                                            variant="h5"
                                                            sx={{
                                                                color:
                                                                    "primary.main",

                                                                fontWeight:
                                                                    900,
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
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Paper>

                            )
                        )}


                        <Button
                            component={Link}
                            href="/catalogo"
                            variant="text"
                            color="primary"
                            startIcon={
                                <AddShoppingCartOutlinedIcon />
                            }
                            sx={{
                                alignSelf:
                                    "flex-start",

                                fontWeight:
                                    700,

                                mt:
                                    1,
                            }}
                        >
                            Adicionar mais produtos
                        </Button>
                    </Stack>
                </Grid>


                {/* LATERAL */}

                <Grid
                    size={{
                        xs: 12,
                        lg: 5,
                    }}
                >
                    <Stack
                        spacing={3}
                    >

                        {/* RESUMO */}

                        <Paper
                            sx={{
                                p: {
                                    xs:
                                        3,

                                    md:
                                        4,
                                },

                                borderRadius:
                                    5,

                                border:
                                    "1px solid",

                                borderColor:
                                    "divider",
                            }}
                        >
                            <Stack
                                spacing={2.5}
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
                                        sx={{
                                            color:
                                                "primary.main",
                                        }}
                                    />

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight:
                                                900,
                                        }}
                                    >
                                        Resumo do pedido
                                    </Typography>
                                </Stack>


                                <Divider />


                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center",
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

                                    <Typography
                                        sx={{
                                            fontWeight:
                                                700,
                                        }}
                                    >
                                        {cartItems.length}
                                    </Typography>
                                </Stack>


                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{
                                            alignItems:
                                                "center",
                                        }}
                                    >
                                        <LocalShippingOutlinedIcon
                                            sx={{
                                                fontSize:
                                                    18,

                                                color:
                                                    "text.secondary",
                                            }}
                                        />

                                        <Typography
                                            sx={{
                                                color:
                                                    "text.secondary",
                                            }}
                                        >
                                            Frete
                                        </Typography>
                                    </Stack>

                                    <Typography
                                        sx={{
                                            fontWeight:
                                                700,
                                        }}
                                    >
                                        Grátis
                                    </Typography>
                                </Stack>


                                <Divider />


                                <Stack
                                    direction="row"
                                    sx={{
                                        justifyContent:
                                            "space-between",

                                        alignItems:
                                            "center",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight:
                                                800,
                                        }}
                                    >
                                        Total
                                    </Typography>

                                    <Typography
                                        variant="h4"
                                        sx={{
                                            color:
                                                "primary.main",

                                            fontWeight:
                                                900,
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


                                <Box
                                    sx={{
                                        pt:
                                            1,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight:
                                                800,

                                            mb:
                                                1.25,
                                        }}
                                    >
                                        Cupom de desconto
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        placeholder="Digite seu cupom"
                                        slotProps={{
                                            input: {
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                    >
                                                        <LocalOfferOutlinedIcon
                                                            fontSize="small"
                                                        />
                                                    </InputAdornment>
                                                ),

                                                endAdornment: (
                                                    <InputAdornment
                                                        position="end"
                                                    >
                                                        <Button
                                                            size="small"
                                                            sx={{
                                                                fontWeight: 800,
                                                            }}
                                                        >
                                                            Aplicar
                                                        </Button>
                                                    </InputAdornment>
                                                ),
                                            },
                                        }}
                                    />
                                </Box>
                            </Stack>
                        </Paper>


                        {/* DADOS DE ENTREGA */}

                        <Paper
                            sx={{
                                p: {
                                    xs:
                                        3,

                                    md:
                                        4,
                                },

                                borderRadius:
                                    5,

                                border:
                                    "1px solid",

                                borderColor:
                                    "divider",
                            }}
                        >
                            <Stack
                                spacing={3}
                            >
                                <Box>
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        sx={{
                                            alignItems:
                                                "center",

                                            mb:
                                                1,
                                        }}
                                    >
                                        <LocationOnOutlinedIcon
                                            sx={{
                                                color:
                                                    "primary.main",
                                            }}
                                        />

                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight:
                                                    900,
                                            }}
                                        >
                                            Dados para entrega
                                        </Typography>
                                    </Stack>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color:
                                                "text.secondary",
                                        }}
                                    >
                                        Informe os dados para
                                        realizarmos a entrega do
                                        seu pedido.
                                    </Typography>
                                </Box>


                                <Divider />


                                <Grid
                                    container
                                    spacing={2}
                                >

                                    <Grid
                                        size={{
                                            xs:
                                                12,

                                            md:
                                                6,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Telefone"
                                            value={
                                                customerPhone
                                            }
                                            onChange={(event) =>
                                                setCustomerPhone(
                                                    event.target.value
                                                )
                                            }
                                            required
                                            slotProps={{
                                                input: {
                                                    startAdornment:
                                                        <InputAdornment
                                                            position="start"
                                                        >
                                                            <PhoneOutlinedIcon
                                                                fontSize="small"
                                                            />
                                                        </InputAdornment>
                                                },
                                            }}
                                        />
                                    </Grid>


                                    <Grid
                                        size={{
                                            xs:
                                                12,

                                            md:
                                                6,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="CEP"
                                            value={
                                                shippingZipCode
                                            }
                                            onChange={(event) =>
                                                setShippingZipCode(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Grid>


                                    <Grid
                                        size={{
                                            xs:
                                                12,

                                            md:
                                                8,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Endereço"
                                            value={
                                                shippingAddress
                                            }
                                            onChange={(event) =>
                                                setShippingAddress(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Grid>


                                    <Grid
                                        size={{
                                            xs:
                                                12,

                                            md:
                                                4,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Número"
                                            value={
                                                shippingNumber
                                            }
                                            onChange={(event) =>
                                                setShippingNumber(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Grid>


                                    <Grid
                                        size={{
                                            xs:
                                                12,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Complemento"
                                            value={
                                                shippingComplement
                                            }
                                            onChange={(event) =>
                                                setShippingComplement(
                                                    event.target.value
                                                )
                                            }
                                        />
                                    </Grid>


                                    <Grid
                                        size={{
                                            xs:
                                                12,

                                            md:
                                                6,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Bairro"
                                            value={
                                                shippingNeighborhood
                                            }
                                            onChange={(event) =>
                                                setShippingNeighborhood(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Grid>


                                    <Grid
                                        size={{
                                            xs:
                                                12,

                                            md:
                                                6,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Cidade"
                                            value={
                                                shippingCity
                                            }
                                            onChange={(event) =>
                                                setShippingCity(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Grid>


                                    <Grid
                                        size={{
                                            xs:
                                                12,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Estado"
                                            value={
                                                shippingState
                                            }
                                            onChange={(event) =>
                                                setShippingState(
                                                    event.target.value
                                                )
                                            }
                                            required
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Paper>


                        {/* AÇÕES */}

                        <Paper
                            sx={{
                                p: {
                                    xs:
                                        3,

                                    md:
                                        4,
                                },

                                borderRadius:
                                    5,

                                border:
                                    "1px solid",

                                borderColor:
                                    "divider",
                            }}
                        >
                            <Stack
                                spacing={2}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={
                                        handleInfiniteCheckout
                                    }
                                    startIcon={
                                        <LockOutlinedIcon />
                                    }
                                    sx={{
                                        height:
                                            58,

                                        borderRadius:
                                            3,

                                        fontWeight:
                                            900,

                                        fontSize:
                                            "1rem",
                                    }}
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
                                        height:
                                            56,

                                        borderRadius:
                                            3,

                                        fontWeight:
                                            800,

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
                                        height:
                                            52,

                                        borderRadius:
                                            3,

                                        fontWeight:
                                            700,
                                    }}
                                >
                                    Continuar comprando
                                </Button>
                            </Stack>
                        </Paper>

                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}