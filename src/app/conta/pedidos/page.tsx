// src/app/conta/pedidos/page.tsx

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Divider,
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
                                (order) => (

                                    <Paper
                                        key={order.id}
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

                                            transition:
                                                ".25s",

                                            "&:hover": {
                                                borderColor:
                                                    "rgba(0,255,64,.3)",

                                                transform:
                                                    "translateY(-2px)",
                                            },
                                        }}
                                    >

                                        <Stack
                                            spacing={2}
                                        >

                                            <Stack
                                                sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
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

                                                        fontWeight:
                                                            900,

                                                        fontSize:
                                                            18,
                                                    }}
                                                >
                                                    R$ {Number(
                                                        order.total
                                                    ).toFixed(2).replace(
                                                        ".",
                                                        ","
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
                                                spacing={2}
                                            >

                                                <Box>

                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color:
                                                                "text.secondary",
                                                        }}
                                                    >
                                                        Status do pedido
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            mt: 0.4,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {order.status}
                                                    </Typography>

                                                </Box>


                                                <Box>

                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color:
                                                                "text.secondary",
                                                        }}
                                                    >
                                                        Pagamento
                                                    </Typography>

                                                    <Typography
                                                        sx={{
                                                            mt: 0.4,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        {order.payment_status}
                                                    </Typography>

                                                </Box>

                                            </Stack>

                                        </Stack>

                                    </Paper>

                                )
                            )}

                        </Stack>

                    )}

            </Container>

        </Box>

    );

}