// src/app/admin/pedidos/novo/page.tsx

import {
    Box,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import { createClient } from "@/lib/supabase/server";

import NovoPedidoForm from "./NovoPedidoForm";

export default async function NovoPedidoPage() {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select(`
            id,
            name,
            price,
            image,
            active,
            product_variants (
                id,
                size,
                stock
            )
        `)
        .eq("active", true)
        .order("name");

    if (error) {
        console.error(
            "Erro ao carregar produtos:",
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
            <Container maxWidth="lg">

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
                        PEDIDOS
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        Fazer pedido
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                        }}
                    >
                        Registre uma venda manualmente pelo painel.
                    </Typography>
                </Stack>

                <NovoPedidoForm
                    products={products ?? []}
                />

            </Container>
        </Box>
    );
}
