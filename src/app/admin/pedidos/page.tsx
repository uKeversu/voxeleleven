// src/app/admin/pedidos/page.tsx

import Link from "next/link";

import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import { getOrders } from "@/lib/orders";

import OrderList from "./OrderList";
import PaymentCalendar from "./PaymentCalendar";

export default async function AdminPedidosPage() {
    const orders = await getOrders();

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
            <Container maxWidth="xl">

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: {
                            xs: "flex-start",
                            md: "center",
                        },
                        mb: 5,
                    }}
                >
                    <Stack spacing={1}>

                        <Typography
                            variant="overline"
                            sx={{
                                color: "primary.main",
                                fontWeight: 900,
                                letterSpacing: 2,
                            }}
                        >
                            PEDIDOS
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                letterSpacing: "-1px",
                            }}
                        >
                            Gerenciamento de pedidos
                        </Typography>

                        <Typography
                            sx={{
                                color: "text.secondary",
                            }}
                        >
                            Visualize e acompanhe os pedidos da Voxel Eleven.
                        </Typography>

                    </Stack>

                    <Link
                        href="/admin/pedidos/novo"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                mt: {
                                    xs: 2,
                                    md: 0,
                                },
                                borderRadius: 2.5,
                                fontWeight: 900,
                                px: 3,
                            }}
                        >
                            + Fazer pedido
                        </Button>
                    </Link>

                </Stack>

                {/* AGENDA DE COBRANÇAS */}

                <PaymentCalendar
                    orders={orders}
                />

                {/* LISTA DE PEDIDOS */}

                <OrderList
                    orders={orders}
                />

            </Container>
        </Box>
    );
}