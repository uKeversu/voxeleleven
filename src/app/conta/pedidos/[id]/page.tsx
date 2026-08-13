// src/app/conta/pedidos/[id]/page.tsx

import { redirect, notFound } from "next/navigation";

import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Divider,
    Chip,
    Button,
} from "@mui/material";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";

import { createClient } from "@/lib/supabase/server";


interface PedidoPageProps {
    params: Promise<{
        id: string;
    }>;
}


export default async function PedidoPage({
    params,
}: PedidoPageProps) {

    const {
        id,
    } = await params;


    const orderId =
        Number(id);


    if (
        !Number.isInteger(orderId) ||
        orderId <= 0
    ) {
        notFound();
    }


    const supabase =
        await createClient();


    const {
        data: {
            user,
        },
    } = await supabase
        .auth
        .getUser();


    if (!user) {
        redirect("/login");
    }


    /*
     * O RLS decide se o usuário
     * possui acesso ao pedido.
     */

    const {
        data: order,
        error,
    } = await supabase
        .from("orders")
        .select(`
            id,
            customer_name,
            status,
            payment_status,
            payment_method,
            subtotal,
            shipping_cost,
            discount,
            total,
            created_at
        `)
        .eq(
            "id",
            orderId
        )
        .maybeSingle();


    if (
        error ||
        !order
    ) {
        notFound();
    }


    const {
        data: items,
        error: itemsError,
    } = await supabase
        .from("order_items")
        .select(`
            id,
            product_id,
            variant_id,
            size,
            quantity,
            unit_price,
            total_price,
            products!order_items_product_id_fkey (
                name,
                slug
            )
        `)
        .eq(
            "order_id",
            order.id
        )
        .order(
            "id",
            {
                ascending: true,
            }
        );


    if (itemsError) {

        console.error(
            "Erro ao buscar itens do pedido:",
            itemsError
        );

        notFound();

    }


    /*
     * Normaliza a relação products.
     */

    const normalizedItems =
        (items || []).map(
            (item) => {

                const product =
                    Array.isArray(item.products)
                        ? item.products[0] || null
                        : item.products;

                return {
                    ...item,
                    product,
                };
            }
        );


    const formattedDate =
        new Intl.DateTimeFormat(
            "pt-BR",
            {
                dateStyle: "long",
                timeStyle: "short",
                timeZone: "America/Sao_Paulo",
            }
        ).format(
            new Date(order.created_at)
        );


    const formatCurrency =
        (value: number) => {

            return new Intl.NumberFormat(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL",
                }
            ).format(
                Number(value)
            );

        };


    /*
     * Status amigável para o cliente.
     */

    const orderStatusMap: Record<
        string,
        {
            label: string;
            color:
            | "default"
            | "primary"
            | "success"
            | "error"
            | "warning";
        }
    > = {
        reserved: {
            label: "Pedido reservado",
            color: "default",
        },

        packing: {
            label: "Embalando",
            color: "warning",
        },

        delivered: {
            label: "Pedido entregue",
            color: "primary",
        },

        cancelled: {
            label: "Pedido cancelado",
            color: "error",
        },
    };


    const paymentStatusMap: Record<
        string,
        {
            label: string;
            color:
            | "default"
            | "primary"
            | "success"
            | "error"
            | "warning";
        }
    > = {
        pending: {
            label: "Pagamento pendente",
            color: "default",
        },

        approved: {
            label: "Pagamento aprovado",
            color: "primary",
        },

        refunded: {
            label: "Pagamento estornado",
            color: "error",
        },
    };


    const orderStatus =
        orderStatusMap[order.status] || {
            label: order.status,
            color: "default" as const,
        };


    const paymentStatus =
        paymentStatusMap[
        order.payment_status
        ] || {
            label: order.payment_status,
            color: "default" as const,
        };


    /*
     * Link para contato sobre este pedido.
     */

    const whatsappMessage =
        `Olá! Gostaria de tirar uma dúvida sobre o pedido #${order.id}.`;

    const whatsappUrl =
        `https://wa.me/554788453656?text=${encodeURIComponent(
            whatsappMessage
        )}`;


    return (

        <Box
            sx={{
                minHeight: "100vh",

                pt: {
                    xs: 14,
                    md: 18,
                },

                pb: 10,
            }}
        >

            <Container maxWidth="md">

                {/* CABEÇALHO */}

                <Stack
                    spacing={1}
                    sx={{
                        mb: 5,
                    }}
                >

                    <Typography
                        variant="overline"
                        sx={{
                            color: "primary.main",
                            fontWeight: 900,
                            letterSpacing: 2,
                        }}
                    >
                        MEUS PEDIDOS
                    </Typography>


                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        spacing={2}
                        sx={{
                            justifyContent:
                                "space-between",

                            alignItems: {
                                sm: "center",
                            },
                        }}
                    >

                        <Box>

                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 900,
                                    letterSpacing: "-1px",
                                }}
                            >
                                Pedido #{order.id}
                            </Typography>


                            <Typography
                                sx={{
                                    color: "text.secondary",
                                    fontSize: 15,
                                    mt: 0.5,
                                }}
                            >
                                Realizado em {formattedDate}
                            </Typography>

                        </Box>


                        <Chip
                            label={orderStatus.label}
                            color={orderStatus.color}
                            sx={{
                                fontWeight: 800,
                                borderRadius: 2,
                                alignSelf: {
                                    xs: "flex-start",
                                    sm: "center",
                                },
                            }}
                        />

                    </Stack>



                </Stack>


                <Stack spacing={3}>


                    {/* RESUMO */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: {
                                xs: 3,
                                md: 4,
                            },

                            borderRadius: 4,

                            background:
                                "linear-gradient(135deg, rgba(0,255,64,.10), rgba(255,255,255,.025))",

                            border:
                                "1px solid rgba(0,255,64,.18)",
                        }}
                    >

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",
                            }}
                            spacing={3}
                            sx={{
                                justifyContent:
                                    "space-between",

                                alignItems: {
                                    sm: "center",
                                },
                            }}
                        >

                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    alignItems: "center",
                                }}
                            >

                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 3,

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",

                                        bgcolor:
                                            "rgba(0,255,64,.12)",

                                        color:
                                            "primary.main",
                                    }}
                                >
                                    <ShoppingBagOutlinedIcon />
                                </Box>


                                <Box>

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color:
                                                "text.secondary",
                                        }}
                                    >
                                        TOTAL DO PEDIDO
                                    </Typography>


                                    <Typography
                                        variant="h4"
                                        sx={{
                                            fontWeight: 900,
                                            color:
                                                "primary.main",
                                        }}
                                    >
                                        {formatCurrency(
                                            Number(order.total)
                                        )}
                                    </Typography>

                                </Box>

                            </Stack>


                            <Stack
                                spacing={0.7}
                                sx={{
                                    alignItems: {
                                        xs: "flex-start",
                                        sm: "flex-end",
                                    },
                                }}
                            >

                                <Typography
                                    variant="caption"
                                    sx={{
                                        color:
                                            "text.secondary",
                                    }}
                                >
                                    PAGAMENTO
                                </Typography>


                                <Chip
                                    label={
                                        paymentStatus.label
                                    }
                                    color={
                                        paymentStatus.color
                                    }
                                    size="small"
                                    sx={{
                                        fontWeight: 800,
                                    }}
                                />

                            </Stack>

                        </Stack>

                    </Paper>


                    {/* PRODUTOS */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: {
                                xs: 3,
                                md: 4,
                            },

                            borderRadius: 4,

                            bgcolor:
                                "rgba(255,255,255,.025)",

                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={1.5}
                            sx={{
                                alignItems: "center",
                                mb: 3,
                            }}
                        >

                            <ShoppingBagOutlinedIcon
                                sx={{
                                    color:
                                        "primary.main",
                                }}
                            />


                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 800,
                                }}
                            >
                                Produtos
                            </Typography>

                        </Stack>


                        {normalizedItems.length === 0 ? (

                            <Typography
                                sx={{
                                    color:
                                        "text.secondary",
                                }}
                            >
                                Nenhum produto encontrado
                                neste pedido.
                            </Typography>

                        ) : (

                            <Stack
                                spacing={2.5}
                            >

                                {normalizedItems.map(
                                    (item, index) => (

                                        <Box
                                            key={item.id}
                                        >

                                            {index > 0 && (
                                                <Divider
                                                    sx={{
                                                        mb: 2.5,

                                                        borderColor:
                                                            "rgba(255,255,255,.06)",
                                                    }}
                                                />
                                            )}

                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                sx={{
                                                    justifyContent:
                                                        "space-between",

                                                    alignItems:
                                                        "center",
                                                }}
                                            >

                                                <Box>

                                                    <Typography
                                                        sx={{
                                                            fontWeight: 800,
                                                            fontSize: 16,
                                                        }}
                                                    >
                                                        {item.product?.name ||
                                                            "Produto"}
                                                    </Typography>


                                                    <Typography
                                                        sx={{
                                                            color:
                                                                "text.secondary",

                                                            fontSize: 13,

                                                            mt: 0.5,
                                                        }}
                                                    >
                                                        Tamanho {item.size}
                                                        {" · "}
                                                        {item.quantity} {
                                                            Number(
                                                                item.quantity
                                                            ) === 1
                                                                ? "unidade"
                                                                : "unidades"
                                                        }
                                                    </Typography>

                                                </Box>


                                                <Typography
                                                    sx={{
                                                        fontWeight: 900,

                                                        whiteSpace:
                                                            "nowrap",
                                                    }}
                                                >
                                                    {formatCurrency(
                                                        Number(
                                                            item.total_price
                                                        )
                                                    )}
                                                </Typography>

                                            </Stack>

                                        </Box>

                                    )
                                )}

                            </Stack>

                        )}

                    </Paper>


                    {/* ACOMPANHAMENTO */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: {
                                xs: 3,
                                md: 4,
                            },

                            borderRadius: 4,

                            bgcolor:
                                "rgba(255,255,255,.025)",

                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >

                        <Stack
                            spacing={3}
                        >

                            <Stack
                                direction="row"
                                spacing={1.5}
                                sx={{
                                    alignItems:
                                        "center",
                                }}
                            >

                                <LocalShippingOutlinedIcon
                                    sx={{
                                        color:
                                            "primary.main",
                                    }}
                                />

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 800,
                                    }}
                                >
                                    Acompanhamento
                                </Typography>

                            </Stack>


                            <Divider />


                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row",
                                }}
                                spacing={3}
                                sx={{
                                    justifyContent:
                                        "space-between",
                                }}
                            >

                                <Box>

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color:
                                                "text.secondary",
                                        }}
                                    >
                                        STATUS DO PEDIDO
                                    </Typography>


                                    <Box
                                        sx={{
                                            mt: 1,
                                        }}
                                    >
                                        <Chip
                                            label={
                                                orderStatus.label
                                            }
                                            color={
                                                orderStatus.color
                                            }
                                            sx={{
                                                fontWeight: 800,
                                            }}
                                        />
                                    </Box>

                                </Box>


                                <Box>

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color:
                                                "text.secondary",
                                        }}
                                    >
                                        STATUS DO PAGAMENTO
                                    </Typography>


                                    <Box
                                        sx={{
                                            mt: 1,
                                        }}
                                    >
                                        <Chip
                                            label={
                                                paymentStatus.label
                                            }
                                            color={
                                                paymentStatus.color
                                            }
                                            sx={{
                                                fontWeight: 800,
                                            }}
                                        />
                                    </Box>

                                </Box>


                                {order.payment_method && (

                                    <Box>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color:
                                                    "text.secondary",
                                            }}
                                        >
                                            FORMA DE PAGAMENTO
                                        </Typography>


                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                mt: 1,
                                            }}
                                        >
                                            {
                                                order.payment_method
                                            }
                                        </Typography>

                                    </Box>

                                )}

                            </Stack>

                        </Stack>

                    </Paper>


                    {/* AJUDA / WHATSAPP */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: {
                                xs: 3,
                                md: 4,
                            },

                            borderRadius: 4,

                            bgcolor:
                                "rgba(37,211,102,.06)",

                            border:
                                "1px solid rgba(37,211,102,.18)",
                        }}
                    >

                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",
                            }}
                            spacing={3}
                            sx={{
                                justifyContent:
                                    "space-between",

                                alignItems: {
                                    sm: "center",
                                },
                            }}
                        >

                            <Box>

                                <Typography
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: 17,
                                    }}
                                >
                                    Ficou com alguma dúvida?
                                </Typography>


                                <Typography
                                    sx={{
                                        color:
                                            "text.secondary",

                                        fontSize: 14,

                                        mt: 0.5,
                                    }}
                                >
                                    Entre em contato conosco
                                    pelo WhatsApp. Já enviaremos
                                    o número deste pedido na
                                    mensagem.
                                </Typography>

                            </Box>


                            <Button
                                component="a"
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="contained"
                                startIcon={
                                    <WhatsAppIcon />
                                }
                                sx={{
                                    flexShrink: 0,

                                    fontWeight: 900,

                                    borderRadius: 2,

                                    px: 3,

                                    py: 1.2,

                                    color: "#fff",

                                    bgcolor:
                                        "#25D366",

                                    "&:hover": {
                                        bgcolor:
                                            "#20bd5a",
                                    },
                                }}
                            >
                                Falar no WhatsApp
                            </Button>

                        </Stack>

                    </Paper>

                </Stack>

            </Container>

        </Box>

    );

}