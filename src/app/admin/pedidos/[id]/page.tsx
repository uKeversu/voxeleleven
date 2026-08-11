// src/app/admin/pedidos/[id]/page.tsx

import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    ArrowBack,
    CheckCircle,
    Person,
    ReceiptLong,
} from "@mui/icons-material";

import {
    getOrderById,
    type Order,
} from "@/lib/orders";

import PedidoAcoes from "./PedidoAcoes";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PedidoPage({
    params,
}: PageProps) {

    const { id } = await params;

    const orderId = Number(id);

    if (!Number.isInteger(orderId)) {
        return (
            <PedidoNaoEncontrado />
        );
    }

    const order =
        await getOrderById(orderId);

    if (!order) {
        return (
            <PedidoNaoEncontrado />
        );
    }

    function formatCurrency(
        value: number
    ) {
        return value.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );
    }

    function formatDate(
        date: string
    ) {
        return new Date(
            date
        ).toLocaleDateString(
            "pt-BR",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    }

    function getStatusLabel(
        status: Order["status"]
    ) {
        const labels = {
            reserved: "RESERVADO",
            packing: "EMBALANDO",
            delivered: "ENTREGUE",
            cancelled: "CANCELADO",
        };

        return labels[status];
    }

    function getPaymentLabel(
        status: Order["payment_status"]
    ) {
        const labels = {
            pending: "PENDENTE",
            approved: "APROVADO",
            failed: "FALHOU",
            refunded: "ESTORNADO",
        };

        return labels[status];
    }

    function getStatusColor(
        status: Order["status"]
    ) {
        switch (status) {
            case "delivered":
                return "primary";

            case "packing":
                return "warning";

            case "cancelled":
                return "error";

            case "reserved":
            default:
                return "default";
        }
    }

    function getPaymentColor(
        status: Order["payment_status"]
    ) {
        switch (status) {
            case "approved":
                return "success";

            case "failed":
                return "error";

            case "refunded":
                return "warning";

            default:
                return "default";
        }
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
            <Container maxWidth="xl">

                {/* CABEÇALHO */}

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    sx={{
                        justifyContent:
                            "space-between",

                        alignItems: {
                            xs: "flex-start",
                            md: "center",
                        },

                        gap: 2,

                        mb: 5,
                    }}
                >

                    <Stack spacing={1}>

                        <Button
                            href="/admin/pedidos"
                            startIcon={<ArrowBack />}
                            sx={{
                                alignSelf: "flex-start",
                                px: 0,
                                fontWeight: 800,
                            }}
                        >
                            Voltar para pedidos
                        </Button>

                        <Typography
                            variant="overline"
                            sx={{
                                color:
                                    "primary.main",
                                fontWeight: 900,
                                letterSpacing: 2,
                            }}
                        >
                            PEDIDO #{order.id}
                        </Typography>

                        <Typography
                            variant="h3"
                            sx={{
                                fontWeight: 900,
                                letterSpacing:
                                    "-1px",
                            }}
                        >
                            {order.customer_name}
                        </Typography>

                        <Stack
                            sx={{ flexDirection: 'row', flexWrap: 'wrap' }}
                            spacing={1}
                            useFlexGap
                        >
                            <Chip
                                label={getStatusLabel(
                                    order.status
                                )}
                                color={
                                    getStatusColor(
                                        order.status
                                    ) as any
                                }
                                sx={{
                                    fontWeight: 900,
                                }}
                            />

                            <Chip
                                label={`Pagamento: ${getPaymentLabel(
                                    order.payment_status
                                )}`}
                                color={
                                    getPaymentColor(
                                        order.payment_status
                                    ) as any
                                }
                                variant="outlined"
                                sx={{
                                    fontWeight: 800,
                                }}
                            />
                        </Stack>

                    </Stack>

                    <Typography
                        sx={{
                            color:
                                "text.secondary",
                            fontWeight: 700,
                        }}
                    >
                        Criado em{" "}
                        {formatDate(
                            order.created_at
                        )}
                    </Typography>

                </Stack>

                {/* GRID PRINCIPAL */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            lg: "minmax(0, 1.7fr) minmax(320px, .8fr)",
                        },
                        gap: 3,
                    }}
                >

                    {/* ESQUERDA */}

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

                            <Stack
                                direction="row"
                                spacing={1}
                                sx={{
                                    alignItems:
                                        "center",
                                    mb: 3,
                                }}
                            >

                                <Person
                                    color="primary"
                                />

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 900,
                                    }}
                                >
                                    Cliente
                                </Typography>

                            </Stack>

                            <Stack spacing={1.5}>

                                <Typography
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: 18,
                                    }}
                                >
                                    {
                                        order.customer_name
                                    }
                                </Typography>

                                {order.customer_email && (
                                    <Typography
                                        color="text.secondary"
                                    >
                                        {
                                            order.customer_email
                                        }
                                    </Typography>
                                )}

                                {order.customer_phone && (
                                    <Typography
                                        color="text.secondary"
                                    >
                                        {
                                            order.customer_phone
                                        }
                                    </Typography>
                                )}

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
                                spacing={1}
                                sx={{
                                    alignItems:
                                        "center",
                                    mb: 3,
                                }}
                            >

                                <ReceiptLong
                                    color="primary"
                                />

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 900,
                                    }}
                                >
                                    Produtos
                                </Typography>

                            </Stack>

                            <Stack spacing={1.5}>

                                {order.items.map(
                                    (item) => (
                                        <Paper
                                            key={
                                                item.id
                                            }
                                            elevation={
                                                0
                                            }
                                            sx={{
                                                p: 2,
                                                borderRadius: 3,
                                                background:
                                                    "rgba(255,255,255,.025)",
                                                border:
                                                    "1px solid rgba(255,255,255,.06)",
                                            }}
                                        >

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
                                                        xs: "flex-start",
                                                        sm: "center",
                                                    },
                                                }}
                                            >

                                                <Box
                                                    sx={{
                                                        flex: 1,
                                                    }}
                                                >

                                                    <Typography
                                                        sx={{
                                                            fontWeight: 900,
                                                        }}
                                                    >
                                                        {
                                                            item.product?.name ??
                                                            "Produto"
                                                        }
                                                    </Typography>

                                                    <Stack
                                                        direction="row"
                                                        spacing={1}
                                                        sx={{
                                                            mt: .5,
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >

                                                        <Chip
                                                            size="small"
                                                            label={`Tamanho ${item.size}`}
                                                        />

                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                item.quantity
                                                            }{" "}
                                                            x{" "}
                                                            {formatCurrency(
                                                                item.unit_price
                                                            )}
                                                        </Typography>

                                                    </Stack>

                                                </Box>

                                                <Typography
                                                    sx={{
                                                        fontWeight: 900,
                                                        fontSize: 17,
                                                    }}
                                                >
                                                    {formatCurrency(
                                                        item.total_price
                                                    )}
                                                </Typography>

                                            </Stack>

                                        </Paper>
                                    )
                                )}

                            </Stack>

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
                                        Forma de pagamento
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontWeight: 800,
                                        }}
                                    >
                                        {order.payment_method ===
                                            "pix"
                                            ? "Pix"
                                            : order.payment_method ===
                                                "card"
                                                ? "Cartão"
                                                : order.payment_method ===
                                                    "fiado"
                                                    ? "Fiado"
                                                    : "Não informado"}
                                    </Typography>
                                </Stack>

                                {order.payment_due_date && (
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
                                            Vencimento
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: 800,
                                            }}
                                        >
                                            {new Date(
                                                `${order.payment_due_date}T00:00:00`
                                            ).toLocaleDateString(
                                                "pt-BR"
                                            )}
                                        </Typography>
                                    </Stack>
                                )}

                                {order.payment_notes && (
                                    <>
                                        <Divider />

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Observações
                                        </Typography>

                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            {
                                                order.payment_notes
                                            }
                                        </Typography>
                                    </>
                                )}

                            </Stack>

                        </Paper>

                    </Stack>

                    {/* DIREITA */}

                    <Stack spacing={3}>

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

                                <ResumoLinha
                                    label="Subtotal"
                                    value={formatCurrency(
                                        order.subtotal
                                    )}
                                />

                                <ResumoLinha
                                    label="Frete"
                                    value={formatCurrency(
                                        order.shipping_cost
                                    )}
                                />

                                <ResumoLinha
                                    label="Desconto"
                                    value={
                                        order.discount > 0
                                            ? `- ${formatCurrency(
                                                order.discount
                                            )}`
                                            : formatCurrency(
                                                0
                                            )
                                    }
                                    valueColor={
                                        order.discount >
                                            0
                                            ? "success.main"
                                            : undefined
                                    }
                                />

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
                                            fontWeight: 900,
                                        }}
                                    >
                                        Total
                                    </Typography>

                                    <Typography
                                        variant="h5"
                                        color="primary.main"
                                        sx={{
                                            fontWeight: 900,
                                        }}
                                    >
                                        {formatCurrency(
                                            order.total
                                        )}
                                    </Typography>

                                </Stack>

                            </Stack>

                        </Paper>

                        {/* STATUS */}

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
                                Status
                            </Typography>

                            <Stack spacing={2}>

                                <ResumoLinha
                                    label="Pedido"
                                    value={
                                        getStatusLabel(
                                            order.status
                                        )
                                    }
                                />

                                <ResumoLinha
                                    label="Pagamento"
                                    value={
                                        getPaymentLabel(
                                            order.payment_status
                                        )
                                    }
                                />

                                <ResumoLinha
                                    label="Atualizado em"
                                    value={formatDate(
                                        order.updated_at
                                    )}
                                />

                            </Stack>

                        </Paper>

                        {/* ENDEREÇO */}

                        {(order.shipping_address ||
                            order.shipping_city) && (
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
                                        Endereço
                                    </Typography>

                                    <Typography
                                        sx={{
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {order.shipping_address}

                                        {order.shipping_number &&
                                            `, ${order.shipping_number}`}

                                        {order.shipping_complement &&
                                            ` - ${order.shipping_complement}`}

                                        <br />

                                        {order.shipping_neighborhood}

                                        <br />

                                        {order.shipping_city}

                                        {order.shipping_state &&
                                            ` - ${order.shipping_state}`}

                                        {order.shipping_zip_code && (
                                            <>
                                                <br />
                                                CEP:{" "}
                                                {
                                                    order.shipping_zip_code
                                                }
                                            </>
                                        )}
                                    </Typography>

                                </Paper>
                            )}

                        {/* AÇÃO */}

                        <PedidoAcoes
                            orderId={order.id}
                            status={order.status}
                        />

                        <Button
                            href="/admin/pedidos"
                            variant="outlined"
                            size="large"
                            startIcon={<ArrowBack />}
                            sx={{
                                borderRadius: 2.5,
                                fontWeight: 900,
                            }}
                        >
                            Voltar para pedidos
                        </Button>

                    </Stack>

                </Box>

            </Container>
        </Box>
    );
}

function ResumoLinha({
    label,
    value,
    valueColor,
}: {
    label: string;
    value: string;
    valueColor?: string;
}) {
    return (
        <Stack
            direction="row"
            sx={{
                justifyContent:
                    "space-between",
                gap: 2,
            }}
        >
            <Typography
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontWeight: 800,
                    color: valueColor,
                    textAlign: "right",
                }}
            >
                {value}
            </Typography>
        </Stack>
    );
}

function PedidoNaoEncontrado() {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Stack
                spacing={2}
                sx={{
                    textAlign: "center",
                    alignItems: "center",
                }}
            >

                <CheckCircle
                    sx={{
                        fontSize: 60,
                        color: "text.secondary",
                    }}
                />

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 900,
                    }}
                >
                    Pedido não encontrado
                </Typography>

                <Typography
                    color="text.secondary"
                >
                    O pedido informado não existe
                    ou não está disponível.
                </Typography>

                <Button
                    href="/admin/pedidos"
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        fontWeight: 900,
                    }}
                >
                    Voltar para pedidos
                </Button>

            </Stack>
        </Box>
    );
}