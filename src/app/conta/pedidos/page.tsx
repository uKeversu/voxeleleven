// src/app/conta/pedidos/page.tsx

import Link from "next/link";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Divider,
    Chip,
} from "@mui/material";

export default async function MeusPedidosPage() {

    /*
     * CONECTA AO SUPABASE
     */

    const supabase =
        await createClient();


    /*
     * BUSCA USUÁRIO LOGADO
     */

    const {
        data: {
            user,
        },
    } = await supabase.auth.getUser();


    /*
     * USUÁRIO NÃO LOGADO
     */

    if (!user) {

        redirect("/login");

    }


    /*
     * BUSCA OS PEDIDOS
     *
     * A RLS garante:
     *
     * - cliente vê apenas os próprios pedidos
     * - admin pode ver todos
     */

    const {
        data: orders,
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
            created_at,
            paid_at
        `)
        .order(
            "created_at",
            {
                ascending: false,
            }
        );


    /*
     * ERRO AO BUSCAR
     */

    if (error) {

        console.error(
            "Erro ao buscar pedidos:",
            error
        );

    }

    const orderStatusMap: Record<
        string,
        {
            label: string;
            description: string;
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
            description:
                "Seu pedido foi reservado e aguarda preparação.",
            color: "default",
        },

        packing: {
            label: "Preparando seu pedido",
            description:
                "Seu pedido está sendo preparado para envio.",
            color: "warning",
        },

        delivered: {
            label: "Pedido entregue",
            description:
                "Seu pedido foi entregue com sucesso.",
            color: "primary",
        },

        cancelled: {
            label: "Pedido cancelado",
            description:
                "Este pedido foi cancelado.",
            color: "error",
        },

    };


    const paymentStatusMap: Record<
        string,
        {
            label: string;
            description: string;
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
            description:
                "Aguardando confirmação do pagamento.",
            color: "default",
        },

        approved: {
            label: "Pagamento aprovado",
            description:
                "Pagamento confirmado com sucesso.",
            color: "primary",
        },

        refunded: {
            label: "Pagamento estornado",
            description:
                "O pagamento deste pedido foi estornado.",
            color: "error",
        },

    };

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

                {/*
                 * CABEÇALHO
                 */}

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
                        MINHA CONTA
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        Meus pedidos
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: 16,
                        }}
                    >
                        Acompanhe seus pedidos e pagamentos.
                    </Typography>

                </Stack>


                {/*
                 * ERRO
                 */}

                {error && (

                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 4,

                            bgcolor:
                                "rgba(255,255,255,.025)",

                            border:
                                "1px solid rgba(255,80,80,.25)",
                        }}
                    >

                        <Typography
                            sx={{
                                color:
                                    "error.main",

                                fontWeight: 700,
                            }}
                        >
                            Não foi possível carregar seus pedidos.
                        </Typography>

                    </Paper>

                )}


                {/*
                 * NENHUM PEDIDO
                 */}

                {!error &&
                    (!orders ||
                        orders.length === 0) && (

                        <Paper
                            elevation={0}
                            sx={{
                                p: {
                                    xs: 3,
                                    md: 5,
                                },

                                borderRadius: 4,

                                textAlign:
                                    "center",

                                bgcolor:
                                    "rgba(255,255,255,.025)",

                                border:
                                    "1px solid rgba(255,255,255,.07)",
                            }}
                        >

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 800,
                                }}
                            >
                                Você ainda não fez nenhum pedido.
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1,
                                    color:
                                        "text.secondary",
                                }}
                            >
                                Quando você realizar uma compra,
                                ela aparecerá aqui.
                            </Typography>

                        </Paper>

                    )}


                {/*
                 * LISTA DE PEDIDOS
                 */}

                {!error &&
                    orders &&
                    orders.length > 0 && (

                        <Stack spacing={2}>

                            {orders.map(
                                (order) => {

                                    const orderStatus =
                                        orderStatusMap[order.status] || {
                                            label: "Status não informado",
                                            description:
                                                "Não foi possível identificar o status deste pedido.",
                                            color: "default" as const,
                                        };


                                    const paymentStatus =
                                        paymentStatusMap[
                                        order.payment_status
                                        ] || {
                                            label: "Pagamento não informado",
                                            description:
                                                "Não foi possível identificar o status do pagamento.",
                                            color: "default" as const,
                                        };


                                    return (

                                        <Link
                                            key={order.id}
                                            href={`/conta/pedidos/${order.id}`}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit",
                                                display: "block",
                                            }}
                                        >

                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    p: {
                                                        xs: 2.5,
                                                        md: 3,
                                                    },

                                                    borderRadius: 4,

                                                    bgcolor:
                                                        "rgba(255,255,255,.025)",

                                                    border:
                                                        "1px solid rgba(255,255,255,.07)",

                                                    cursor: "pointer",

                                                    transition: ".25s",

                                                    "&:hover": {
                                                        borderColor:
                                                            "rgba(0,255,64,.3)",

                                                        transform:
                                                            "translateY(-2px)",

                                                        bgcolor:
                                                            "rgba(0,255,64,.025)",
                                                    },
                                                }}
                                            >

                                                <Stack spacing={2}>

                                                    <Stack
                                                        sx={{
                                                            flexDirection: "row",

                                                            justifyContent:
                                                                "space-between",

                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >

                                                        <Box>

                                                            <Typography
                                                                sx={{
                                                                    fontWeight: 900,
                                                                    fontSize: 17,
                                                                }}
                                                            >
                                                                Pedido #{order.id}
                                                            </Typography>


                                                            <Typography
                                                                sx={{
                                                                    mt: 0.4,

                                                                    color:
                                                                        "text.secondary",

                                                                    fontSize: 13,
                                                                }}
                                                            >
                                                                {new Intl.DateTimeFormat(
                                                                    "pt-BR",
                                                                    {
                                                                        dateStyle:
                                                                            "medium",

                                                                        timeStyle:
                                                                            "short",
                                                                    }
                                                                ).format(
                                                                    new Date(
                                                                        order.created_at
                                                                    )
                                                                )}
                                                            </Typography>

                                                        </Box>


                                                        <Typography
                                                            sx={{
                                                                color:
                                                                    "primary.main",

                                                                fontWeight: 900,

                                                                fontSize: 18,
                                                            }}
                                                        >
                                                            {Number(
                                                                order.total
                                                            ).toLocaleString(
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
                                                            borderColor:
                                                                "rgba(255,255,255,.07)",
                                                        }}
                                                    />


                                                    <Stack
                                                        direction={{
                                                            xs: "column",
                                                            sm: "row",
                                                        }}
                                                        spacing={3}
                                                    >

                                                        <Box sx={{ flex: 1 }}>

                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color:
                                                                        "text.secondary",

                                                                    fontWeight: 700,

                                                                    textTransform:
                                                                        "uppercase",

                                                                    letterSpacing:
                                                                        0.5,
                                                                }}
                                                            >
                                                                Status do pedido
                                                            </Typography>


                                                            <Stack
                                                                direction="row"
                                                                spacing={1}
                                                                sx={{
                                                                    alignItems:
                                                                        "center",

                                                                    mt: 0.7,
                                                                }}
                                                            >

                                                                <Chip
                                                                    label={
                                                                        orderStatus.label
                                                                    }
                                                                    color={
                                                                        orderStatus.color
                                                                    }
                                                                    size="small"
                                                                    sx={{
                                                                        fontWeight: 800,
                                                                        borderRadius: 2,
                                                                    }}
                                                                />

                                                            </Stack>


                                                            <Typography
                                                                sx={{
                                                                    mt: 0.7,

                                                                    color:
                                                                        "text.secondary",

                                                                    fontSize: 12,
                                                                }}
                                                            >
                                                                {
                                                                    orderStatus.description
                                                                }
                                                            </Typography>

                                                        </Box>


                                                        <Box sx={{ flex: 1 }}>

                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color:
                                                                        "text.secondary",

                                                                    fontWeight: 700,

                                                                    textTransform:
                                                                        "uppercase",

                                                                    letterSpacing:
                                                                        0.5,
                                                                }}
                                                            >
                                                                Pagamento
                                                            </Typography>


                                                            <Stack
                                                                direction="row"
                                                                spacing={1}
                                                                sx={{
                                                                    alignItems:
                                                                        "center",

                                                                    mt: 0.7,
                                                                }}
                                                            >

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
                                                                        borderRadius: 2,
                                                                    }}
                                                                />

                                                            </Stack>


                                                            <Typography
                                                                sx={{
                                                                    mt: 0.7,

                                                                    color:
                                                                        "text.secondary",

                                                                    fontSize: 12,
                                                                }}
                                                            >
                                                                {
                                                                    paymentStatus.description
                                                                }
                                                            </Typography>

                                                        </Box>

                                                    </Stack>

                                                </Stack>

                                            </Paper>

                                        </Link>

                                    );

                                }
                            )}

                        </Stack>

                    )}

            </Container>

        </Box>

    );

}