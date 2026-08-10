// src/app/admin/pedidos/page.tsx

import {
    Box,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import { getOrders } from "@/lib/orders";

import OrderList from "./OrderList";

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
                        Visualize e acompanhe os pedidos
                        da Voxel Eleven.
                    </Typography>
                </Stack>

                <OrderList
                    orders={orders}
                />

            </Container>
        </Box>
    );
}