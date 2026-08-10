// src/app/admin/produtos/novo/page.tsx

import {
    Box,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import NewProductForm from "./NewProductForm";

export default function NewProductPage() {
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
                        PRODUTOS
                    </Typography>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 900,
                            letterSpacing: "-1px",
                        }}
                    >
                        Novo produto
                    </Typography>

                    <Typography
                        sx={{
                            color: "text.secondary",
                        }}
                    >
                        Cadastre um novo produto no catálogo
                        da Voxel Eleven.
                    </Typography>
                </Stack>

                <NewProductForm />

            </Container>
        </Box>
    );
}