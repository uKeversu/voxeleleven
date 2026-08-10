// src/app/admin/pedidos/novo/page.tsx

import {
    Box,
    Button,
    Container,
    Divider,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import Link from "next/link";

export default function NovoPedidoPage() {
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

                <Stack spacing={3}>

                    {/* CLIENTE */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: {
                                xs: 2,
                                md: 4,
                            },
                            borderRadius: 4,
                            background:
                                "rgba(255,255,255,.025)",
                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 900,
                                mb: 3,
                            }}
                        >
                            Cliente
                        </Typography>

                        <Stack spacing={2}>

                            <TextField
                                fullWidth
                                label="Nome do cliente"
                                placeholder="Ex.: João da Silva"
                            />

                            <Stack
                                direction={{
                                    xs: "column",
                                    md: "row",
                                }}
                                spacing={2}
                            >

                                <TextField
                                    fullWidth
                                    label="Telefone"
                                    placeholder="(47) 99999-9999"
                                />

                                <TextField
                                    fullWidth
                                    label="E-mail"
                                    placeholder="cliente@email.com"
                                />

                            </Stack>

                        </Stack>

                    </Paper>

                    {/* PRODUTOS */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: {
                                xs: 2,
                                md: 4,
                            },
                            borderRadius: 4,
                            background:
                                "rgba(255,255,255,.025)",
                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >

                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 3,
                            }}
                        >

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 900,
                                }}
                            >
                                Produtos
                            </Typography>

                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 800,
                                }}
                            >
                                + Adicionar produto
                            </Button>

                        </Stack>

                        <Box
                            sx={{
                                py: 5,
                                textAlign: "center",
                                borderRadius: 3,
                                border:
                                    "1px dashed rgba(255,255,255,.15)",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontWeight: 800,
                                }}
                            >
                                Nenhum produto adicionado
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 1,
                                    color: "text.secondary",
                                }}
                            >
                                Adicione os produtos que fazem parte deste pedido.
                            </Typography>

                        </Box>

                    </Paper>

                    {/* PAGAMENTO */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: {
                                xs: 2,
                                md: 4,
                            },
                            borderRadius: 4,
                            background:
                                "rgba(255,255,255,.025)",
                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 900,
                                mb: 3,
                            }}
                        >
                            Pagamento
                        </Typography>

                        <Stack spacing={3}>

                            <TextField
                                select
                                fullWidth
                                label="Forma de pagamento"
                                defaultValue="fiado"
                            >

                                <MenuItem value="pix">
                                    Pix
                                </MenuItem>

                                <MenuItem value="card">
                                    Cartão
                                </MenuItem>

                                <MenuItem value="fiado">
                                    Fiado
                                </MenuItem>

                            </TextField>

                            <Stack
                                direction={{
                                    xs: "column",
                                    md: "row",
                                }}
                                spacing={2}
                            >

                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Data para pagamento"
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={1}
                                    label="Observações do pagamento"
                                    placeholder="Ex.: Vai pagar dia 15"
                                />

                            </Stack>

                        </Stack>

                    </Paper>

                    {/* RESUMO */}

                    <Paper
                        elevation={0}
                        sx={{
                            p: {
                                xs: 2,
                                md: 4,
                            },
                            borderRadius: 4,
                            background:
                                "rgba(255,255,255,.025)",
                            border:
                                "1px solid rgba(255,255,255,.07)",
                        }}
                    >

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 900,
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
                                    color="text.secondary"
                                >
                                    Subtotal
                                </Typography>

                                <Typography
                                    sx={{ fontWeight: 800 }}
                                >
                                    R$ 0,00
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
                                    color="text.secondary"
                                >
                                    Frete
                                </Typography>

                                <Typography
                                    sx={{ fontWeight: 800 }}
                                >
                                    R$ 0,00
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
                                    variant="h6"
                                    sx={{ fontWeight: 900 }}
                                >
                                    Total
                                </Typography>

                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 900 }}
                                    color="primary.main"
                                >
                                    R$ 0,00
                                </Typography>
                            </Stack>

                        </Stack>

                    </Paper>

                    {/* AÇÕES */}

                    <Stack
                        direction={{
                            xs: "column-reverse",
                            sm: "row",
                        }}
                        spacing={2}
                        sx={{
                            justifyContent: "flex-end",
                        }}
                    >

                        <Link
                            href="/admin/pedidos"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <Button
                                variant="outlined"
                                size="large"
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 800,
                                }}
                            >
                                Cancelar
                            </Button>
                        </Link>

                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                borderRadius: 2,
                                fontWeight: 900,
                                px: 5,
                            }}
                        >
                            Finalizar pedido
                        </Button>

                    </Stack>

                </Stack>

            </Container>
        </Box>
    );
}