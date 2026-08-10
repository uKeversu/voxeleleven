// src/app/admin/pedidos/OrderList.tsx

"use client";

import Link from "next/link";

import {
    useMemo,
    useState,
} from "react";

import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";

import { markOrderAsPaid } from "./actions";

import type { Order } from "@/lib/orders";

interface OrderListProps {
    orders: Order[];
}

type StatusFilter =
    | "todos"
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

type PaymentFilter =
    | "todos"
    | "pending"
    | "approved"
    | "failed"
    | "refunded";

export default function OrderList({
    orders,
}: OrderListProps) {

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState<StatusFilter>("todos");

    const [paymentFilter, setPaymentFilter] =
        useState<PaymentFilter>("todos");

    const filteredOrders = useMemo(() => {

        const normalizedSearch =
            search
                .trim()
                .toLowerCase();

        return orders.filter((order) => {

            /*
             * BUSCA
             */

            const matchesSearch =
                !normalizedSearch ||
                String(order.id)
                    .includes(normalizedSearch) ||
                order.customer_name
                    .toLowerCase()
                    .includes(
                        normalizedSearch
                    ) ||
                order.customer_email
                    ?.toLowerCase()
                    .includes(
                        normalizedSearch
                    ) ||
                order.customer_phone
                    ?.toLowerCase()
                    .includes(
                        normalizedSearch
                    );

            if (!matchesSearch) {
                return false;
            }

            /*
             * STATUS
             */

            if (
                statusFilter !== "todos" &&
                order.status !== statusFilter
            ) {
                return false;
            }

            /*
             * PAGAMENTO
             */

            if (
                paymentFilter !== "todos" &&
                order.payment_status !==
                paymentFilter
            ) {
                return false;
            }

            return true;
        });

    }, [
        orders,
        search,
        statusFilter,
        paymentFilter,
    ]);

    /*
     * MÉTRICAS
     */

    const totalOrders =
        orders.length;

    const pendingOrders =
        orders.filter(
            (order) =>
                order.status ===
                "pending"
        ).length;

    const approvedPayments =
        orders.filter(
            (order) =>
                order.payment_status ===
                "approved"
        ).length;

    const totalRevenue =
        orders
            .filter(
                (order) =>
                    order.payment_status ===
                    "approved"
            )
            .reduce(
                (total, order) =>
                    total + order.total,
                0
            );

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
            pending: "PENDENTE",
            paid: "PAGO",
            processing: "PROCESSANDO",
            shipped: "ENVIADO",
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
            case "paid":
            case "delivered":
                return "success";

            case "processing":
            case "shipped":
                return "primary";

            case "cancelled":
                return "error";

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
        <Box>

            {/* RESUMO */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={2}
                sx={{
                    mb: 4,
                }}
            >

                <SummaryCard
                    label="Pedidos"
                    value={totalOrders}
                />

                <SummaryCard
                    label="Pendentes"
                    value={pendingOrders}
                />

                <SummaryCard
                    label="Pagamentos aprovados"
                    value={
                        approvedPayments
                    }
                />

                <SummaryCard
                    label="Receita aprovada"
                    value={formatCurrency(
                        totalRevenue
                    )}
                />

            </Stack>

            {/* BUSCA + FILTROS */}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 4,
                    background:
                        "rgba(255,255,255,.025)",
                    border:
                        "1px solid rgba(255,255,255,.07)",
                }}
            >

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={2}
                >

                    <TextField
                        fullWidth
                        label="Pesquisar pedido"
                        placeholder="Número, cliente, email ou telefone..."
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                    />

                    <FormControl
                        sx={{
                            minWidth: {
                                xs: "100%",
                                md: 220,
                            },
                        }}
                    >

                        <InputLabel>
                            Status
                        </InputLabel>

                        <Select
                            value={
                                statusFilter
                            }
                            label="Status"
                            onChange={(event) =>
                                setStatusFilter(
                                    event.target
                                        .value as StatusFilter
                                )
                            }
                        >

                            <MenuItem value="todos">
                                Todos
                            </MenuItem>

                            <MenuItem value="pending">
                                Pendente
                            </MenuItem>

                            <MenuItem value="paid">
                                Pago
                            </MenuItem>

                            <MenuItem value="processing">
                                Processando
                            </MenuItem>

                            <MenuItem value="shipped">
                                Enviado
                            </MenuItem>

                            <MenuItem value="delivered">
                                Entregue
                            </MenuItem>

                            <MenuItem value="cancelled">
                                Cancelado
                            </MenuItem>

                        </Select>

                    </FormControl>

                    <FormControl
                        sx={{
                            minWidth: {
                                xs: "100%",
                                md: 220,
                            },
                        }}
                    >

                        <InputLabel>
                            Pagamento
                        </InputLabel>

                        <Select
                            value={
                                paymentFilter
                            }
                            label="Pagamento"
                            onChange={(event) =>
                                setPaymentFilter(
                                    event.target
                                        .value as PaymentFilter
                                )
                            }
                        >

                            <MenuItem value="todos">
                                Todos
                            </MenuItem>

                            <MenuItem value="pending">
                                Pendente
                            </MenuItem>

                            <MenuItem value="approved">
                                Aprovado
                            </MenuItem>

                            <MenuItem value="failed">
                                Falhou
                            </MenuItem>

                            <MenuItem value="refunded">
                                Estornado
                            </MenuItem>

                        </Select>

                    </FormControl>

                </Stack>

                {(search ||
                    statusFilter !==
                    "todos" ||
                    paymentFilter !==
                    "todos") && (

                        <Box sx={{ mt: 2 }}>

                            <Button
                                size="small"
                                onClick={() => {
                                    setSearch("");
                                    setStatusFilter(
                                        "todos"
                                    );
                                    setPaymentFilter(
                                        "todos"
                                    );
                                }}
                                sx={{
                                    fontWeight: 800,
                                }}
                            >
                                Limpar filtros
                            </Button>

                        </Box>
                    )}

            </Paper>

            {/* RESULTADOS */}

            <Stack
                direction="row"
                sx={{
                    justifyContent:
                        "space-between",
                    alignItems:
                        "center",
                    mb: 2,
                }}
            >

                <Typography
                    sx={{
                        color:
                            "text.secondary",
                        fontWeight: 700,
                    }}
                >
                    {
                        filteredOrders.length
                    }{" "}
                    {filteredOrders.length ===
                        1
                        ? "pedido encontrado"
                        : "pedidos encontrados"}
                </Typography>

            </Stack>

            {/* TABELA */}

            <Paper
                elevation={0}
                sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    background:
                        "rgba(255,255,255,.025)",
                    border:
                        "1px solid rgba(255,255,255,.07)",
                }}
            >

                <TableContainer
                    sx={{
                        overflowX:
                            "auto",
                    }}
                >

                    <Table
                        sx={{
                            minWidth: 1100,
                        }}
                    >

                        <TableHead>

                            <TableRow>

                                <TableCell>
                                    Pedido
                                </TableCell>

                                <TableCell>
                                    Cliente
                                </TableCell>

                                <TableCell>
                                    Data
                                </TableCell>

                                <TableCell align="right">
                                    Total
                                </TableCell>

                                <TableCell align="center">
                                    Pagamento
                                </TableCell>

                                <TableCell align="center">
                                    Status
                                </TableCell>

                                <TableCell align="center">
                                    Ações
                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredOrders.map((order) => {

                                const totalItems = order.items.reduce(
                                    (total, item) => total + item.quantity,
                                    0
                                );

                                return (
                                    <TableRow
                                        key={order.id}
                                        hover
                                    >

                                        {/* PEDIDO */}

                                        <TableCell>

                                            <Typography
                                                sx={{
                                                    fontWeight: 900,
                                                }}
                                            >
                                                #
                                                {
                                                    order.id
                                                }
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color:
                                                        "text.secondary",
                                                }}
                                            >
                                                {totalItems}{" "}
                                                {totalItems === 1
                                                    ? "unidade"
                                                    : "unidades"}
                                            </Typography>

                                        </TableCell>

                                        {/* CLIENTE */}

                                        <TableCell>

                                            <Typography
                                                sx={{
                                                    fontWeight: 800,
                                                }}
                                            >
                                                {
                                                    order.customer_name
                                                }
                                            </Typography>

                                            {order.customer_email && (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color:
                                                            "text.secondary",
                                                    }}
                                                >
                                                    {
                                                        order.customer_email
                                                    }
                                                </Typography>
                                            )}

                                        </TableCell>

                                        {/* DATA */}

                                        <TableCell>

                                            <Typography
                                                variant="body2"
                                            >
                                                {formatDate(
                                                    order.created_at
                                                )}
                                            </Typography>

                                        </TableCell>

                                        {/* TOTAL */}

                                        <TableCell align="right">

                                            <Typography
                                                sx={{
                                                    fontWeight: 900,
                                                }}
                                            >
                                                {formatCurrency(
                                                    order.total
                                                )}
                                            </Typography>

                                        </TableCell>

                                        {/* PAGAMENTO */}

                                        <TableCell align="center">

                                            <Chip
                                                label={getPaymentLabel(
                                                    order.payment_status
                                                )}
                                                size="small"
                                                color={getPaymentColor(
                                                    order.payment_status
                                                )}
                                                sx={{
                                                    fontWeight: 800,
                                                }}
                                            />

                                        </TableCell>

                                        {/* STATUS */}

                                        <TableCell align="center">

                                            <Chip
                                                label={getStatusLabel(
                                                    order.status
                                                )}
                                                size="small"
                                                color={getStatusColor(
                                                    order.status
                                                )}
                                                sx={{
                                                    fontWeight: 800,
                                                }}
                                            />

                                        </TableCell>

                                        {/* AÇÕES */}

                                        <TableCell align="center">

                                            <Stack
                                                sx={{ flexDirection: 'row', justifyContent: 'center' }}
                                                spacing={1}
                                            >

                                                <Button
                                                    component={Link}
                                                    href={`/admin/pedidos/${order.id}`}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderRadius: 2,
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    Ver
                                                </Button>

                                                {order.payment_status === "pending" && (
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                        onClick={async () => {
                                                            const confirmed =
                                                                window.confirm(
                                                                    `Marcar o pedido #${order.id} como pago?`
                                                                );

                                                            if (!confirmed) {
                                                                return;
                                                            }

                                                            await markOrderAsPaid(
                                                                order.id
                                                            );

                                                            window.location.reload();
                                                        }}
                                                        sx={{
                                                            borderRadius: 2,
                                                            fontWeight: 800,
                                                        }}
                                                    >
                                                        Pago
                                                    </Button>
                                                )}

                                            </Stack>

                                        </TableCell>

                                    </TableRow>

                                )
                            })}

                            {filteredOrders.length ===
                                0 && (

                                    <TableRow>

                                        <TableCell
                                            colSpan={7}
                                            align="center"
                                            sx={{
                                                py: 8,
                                            }}
                                        >

                                            <Typography
                                                sx={{
                                                    fontWeight: 800,
                                                }}
                                            >
                                                Nenhum pedido
                                                encontrado.
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mt: 1,
                                                    color:
                                                        "text.secondary",
                                                }}
                                            >
                                                Tente alterar
                                                a busca ou os
                                                filtros.
                                            </Typography>

                                        </TableCell>

                                    </TableRow>
                                )}

                        </TableBody>

                    </Table>

                </TableContainer>

            </Paper>

        </Box>
    );
}

/*
 * CARD DE RESUMO
 */

function SummaryCard({
    label,
    value,
}: {
    label: string;
    value: number | string;
}) {
    return (
        <Paper
            elevation={0}
            sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                background:
                    "rgba(255,255,255,.025)",
                border:
                    "1px solid rgba(255,255,255,.07)",
            }}
        >

            <Typography
                variant="body2"
                sx={{
                    color:
                        "text.secondary",
                }}
            >
                {label}
            </Typography>

            <Typography
                variant="h4"
                sx={{
                    mt: 1,
                    fontWeight: 900,
                }}
            >
                {value}
            </Typography>

        </Paper>
    );
}