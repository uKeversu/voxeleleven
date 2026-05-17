"use client";

import Link from "next/link";

import {
    Box,
    Typography,
    Button,
    Stack,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PagamentoSucessoPage() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 3,
            }}
        >
            <Stack
                spacing={3}
                sx={{
                    alignItems: "center",
                    textAlign: "center",
                    maxWidth: 500,
                }}
            >
                <CheckCircleIcon
                    sx={{
                        fontSize: 90,
                        color: "success.main",
                    }}
                />

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 900,
                    }}
                >
                    Pagamento realizado!
                </Typography>

                <Typography
                    sx={{
                        color: "text.secondary",
                    }}
                >
                    Seu pedido foi recebido com sucesso.
                    Em breve enviaremos mais informações.
                </Typography>

                <Button
                    component={Link}
                    href="/"
                    variant="contained"
                    size="large"
                >
                    Voltar para loja
                </Button>
            </Stack>
        </Box>
    );
}