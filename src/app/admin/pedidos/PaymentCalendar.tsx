// src/app/admin/pedidos/PaymentCalendar.tsx

"use client";

import { useMemo, useState } from "react";

import {
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { markOrderAsPaid } from "./actions";

import type { Order } from "@/lib/orders";

import Link from "next/link";

interface PaymentCalendarProps {
    orders: Order[];
}

function formatCurrency(value: number) {
    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function dateKey(date: Date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
    ].join("-");
}

function parseDueDate(value: string) {
    const [year, month, day] = value
        .slice(0, 10)
        .split("-")
        .map(Number);

    return new Date(year, month - 1, day);
}

function startOfDay(date: Date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
}

function getMonthName(date: Date) {
    return date.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
    });
}

export default function PaymentCalendar({
    orders,
}: PaymentCalendarProps) {
    const [currentDate, setCurrentDate] = useState(
        new Date()
    );

    const [selectedDate, setSelectedDate] = useState(
        dateKey(new Date())
    );

    const today = startOfDay(new Date());

    /*
     * SOMENTE PEDIDOS AINDA NÃO PAGOS
     */

    const pendingOrders = useMemo(() => {
        return orders.filter(
            (order) =>
                order.payment_status === "pending" &&
                !!order.payment_due_date
        );
    }, [orders]);

    /*
     * PEDIDOS AGRUPADOS POR DATA
     */

    const ordersByDate = useMemo(() => {
        const map = new Map<string, Order[]>();

        pendingOrders.forEach((order) => {
            if (!order.payment_due_date) {
                return;
            }

            const key = order.payment_due_date.slice(0, 10);

            const current = map.get(key) ?? [];

            current.push(order);

            map.set(key, current);
        });

        return map;
    }, [pendingOrders]);

    /*
     * PRIMEIRO DIA DO MÊS
     */

    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(
            year,
            month,
            1
        );

        const lastDay = new Date(
            year,
            month + 1,
            0
        );

        /*
         * JS:
         * domingo = 0
         *
         * Queremos:
         * segunda = 0
         */

        const firstWeekDay =
            (firstDay.getDay() + 6) % 7;

        const totalDays =
            lastDay.getDate();

        const days: Array<
            Date | null
        > = [];

        for (
            let i = 0;
            i < firstWeekDay;
            i++
        ) {
            days.push(null);
        }

        for (
            let day = 1;
            day <= totalDays;
            day++
        ) {
            days.push(
                new Date(
                    year,
                    month,
                    day
                )
            );
        }

        return days;
    }, [currentDate]);

    const selectedOrders =
        ordersByDate.get(
            selectedDate
        ) ?? [];

    /*
     * TOTAL DO MÊS
     */

    const monthOrders =
        pendingOrders.filter(
            (order) => {
                if (
                    !order.payment_due_date
                ) {
                    return false;
                }

                const date =
                    parseDueDate(
                        order.payment_due_date
                    );

                return (
                    date.getFullYear() ===
                    currentDate.getFullYear() &&
                    date.getMonth() ===
                    currentDate.getMonth()
                );
            }
        );

    const monthTotal =
        monthOrders.reduce(
            (total, order) =>
                total + order.total,
            0
        );

    /*
     * NAVEGAÇÃO
     */

    function previousMonth() {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                1
            )
        );
    }

    function nextMonth() {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                1
            )
        );
    }

    function goToToday() {
        const today = new Date();

        setCurrentDate(today);
        setSelectedDate(
            dateKey(today)
        );
    }

    function getDayState(
        date: Date,
        dayOrders: Order[]
    ) {
        if (dayOrders.length === 0) {
            return "none";
        }

        const currentDay =
            startOfDay(date);

        if (currentDay < today) {
            return "overdue";
        }

        if (
            currentDay.getTime() ===
            today.getTime()
        ) {
            return "today";
        }

        return "future";
    }

    async function handleMarkAsPaid(
        order: Order
    ) {
        const confirmed =
            window.confirm(
                `Marcar o pedido #${order.id} de ${order.customer_name} como pago?`
            );

        if (!confirmed) {
            return;
        }

        await markOrderAsPaid(
            order.id
        );

        window.location.reload();
    }

    return (
        <Box sx={{ mb: 5 }}>

            {/* CABEÇALHO */}

            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                spacing={2}
                sx={{
                    mb: 2,
                    alignItems: {
                        xs: "stretch",
                        md: "center",
                    },
                    justifyContent:
                        "space-between",
                }}
            >

                <Stack
                    sx={{ flexDirection: 'row', alignItems: 'center' }}
                    spacing={1.5}
                >

                    <EventRoundedIcon
                        sx={{
                            color: "primary.main",
                        }}
                    />

                    <Box>

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 900,
                            }}
                        >
                            Agenda de cobranças
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                color:
                                    "text.secondary",
                            }}
                        >
                            Acompanhe quem precisa pagar.
                        </Typography>

                    </Box>

                </Stack>

                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}
                    spacing={1}
                >

                    <Button
                        size="small"
                        onClick={
                            goToToday
                        }
                    >
                        Hoje
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={
                            previousMonth
                        }
                        sx={{
                            minWidth: 40,
                            px: 1,
                        }}
                    >
                        <ChevronLeftRoundedIcon />
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={
                            nextMonth
                        }
                        sx={{
                            minWidth: 40,
                            px: 1,
                        }}
                    >
                        <ChevronRightRoundedIcon />
                    </Button>

                </Stack>

            </Stack>

            {/* RESUMO DO MÊS */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={2}
                sx={{
                    mb: 2,
                }}
            >

                <Paper
                    elevation={0}
                    sx={{
                        flex: 1,
                        p: 2,
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
                        Cobranças no mês
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mt: .5,
                            fontWeight: 900,
                        }}
                    >
                        {monthOrders.length}
                    </Typography>

                </Paper>

                <Paper
                    elevation={0}
                    sx={{
                        flex: 1,
                        p: 2,
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
                        Total a receber
                    </Typography>

                    <Typography
                        variant="h5"
                        sx={{
                            mt: .5,
                            fontWeight: 900,
                        }}
                    >
                        {formatCurrency(
                            monthTotal
                        )}
                    </Typography>

                </Paper>

            </Stack>

            {/* CALENDÁRIO */}

            <Paper
                elevation={0}
                sx={{
                    p: {
                        xs: 1.5,
                        md: 3,
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
                        mb: 2,
                        fontWeight: 900,
                        textTransform:
                            "capitalize",
                    }}
                >
                    {getMonthName(
                        currentDate
                    )}
                </Typography>

                {/* DIAS DA SEMANA */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(7, 1fr)",
                        gap: {
                            xs: .5,
                            md: 1,
                        },
                        mb: 1,
                    }}
                >

                    {[
                        "SEG",
                        "TER",
                        "QUA",
                        "QUI",
                        "SEX",
                        "SÁB",
                        "DOM",
                    ].map((day) => (
                        <Typography
                            key={day}
                            variant="caption"
                            sx={{
                                textAlign:
                                    "center",
                                fontWeight: 900,
                                color:
                                    "text.secondary",
                                py: 1,
                            }}
                        >
                            {day}
                        </Typography>
                    ))}

                </Box>

                {/* DIAS */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(7, 1fr)",
                        gap: {
                            xs: .5,
                            md: 1,
                        },
                    }}
                >

                    {calendarDays.map(
                        (date, index) => {

                            if (!date) {
                                return (
                                    <Box
                                        key={`empty-${index}`}
                                        sx={{
                                            minHeight: {
                                                xs: 58,
                                                md: 90,
                                            },
                                        }}
                                    />
                                );
                            }

                            const key =
                                dateKey(
                                    date
                                );

                            const dayOrders =
                                ordersByDate.get(
                                    key
                                ) ?? [];

                            const state =
                                getDayState(
                                    date,
                                    dayOrders
                                );

                            const selected =
                                selectedDate ===
                                key;

                            return (
                                <Box
                                    key={key}
                                    onClick={() =>
                                        setSelectedDate(
                                            key
                                        )
                                    }
                                    sx={{
                                        minHeight: {
                                            xs: 58,
                                            md: 90,
                                        },
                                        p: {
                                            xs: .75,
                                            md: 1,
                                        },
                                        borderRadius: 2,
                                        cursor:
                                            "pointer",

                                        border:
                                            selected
                                                ? "2px solid"
                                                : "1px solid",

                                        borderColor:
                                            selected
                                                ? "primary.main"
                                                : "rgba(255,255,255,.07)",

                                        background:
                                            selected
                                                ? "rgba(0,255,64,.08)"
                                                : "rgba(255,255,255,.015)",

                                        transition:
                                            "all .15s ease",

                                        "&:hover": {
                                            background:
                                                "rgba(255,255,255,.05)",
                                        },
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            fontWeight: 900,
                                            fontSize: {
                                                xs: 13,
                                                md: 15,
                                            },
                                        }}
                                    >
                                        {date.getDate()}
                                    </Typography>

                                    {state !==
                                        "none" && (
                                            <Box
                                                sx={{
                                                    mt: .5,
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: .5,
                                                }}
                                            >

                                                <Box
                                                    sx={{
                                                        width: 7,
                                                        height: 7,
                                                        borderRadius:
                                                            "50%",
                                                        bgcolor:
                                                            state ===
                                                                "overdue"
                                                                ? "error.main"
                                                                : state ===
                                                                    "today"
                                                                    ? "warning.main"
                                                                    : "success.main",
                                                    }}
                                                />

                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontWeight: 800,
                                                        display: {
                                                            xs: "none",
                                                            sm: "block",
                                                        },
                                                    }}
                                                >
                                                    {
                                                        dayOrders.length
                                                    }{" "}
                                                    cobrança
                                                    {dayOrders.length !==
                                                        1
                                                        ? "s"
                                                        : ""}
                                                </Typography>

                                            </Box>
                                        )}

                                </Box>
                            );
                        }
                    )}

                </Box>

                {/* LEGENDA */}

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        mt: 2,
                        flexWrap:
                            "wrap",
                    }}
                >

                    <Legend
                        color="error.main"
                        label="Atrasado"
                    />

                    <Legend
                        color="warning.main"
                        label="Hoje"
                    />

                    <Legend
                        color="success.main"
                        label="Futuro"
                    />

                </Stack>

            </Paper>

            {/* COBRANÇAS DO DIA */}

            <Paper
                elevation={0}
                sx={{
                    mt: 2,
                    p: 3,
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
                        mb: 2,
                    }}
                >
                    Cobranças de{" "}
                    {new Date(
                        selectedDate +
                        "T12:00:00"
                    ).toLocaleDateString(
                        "pt-BR",
                        {
                            day: "2-digit",
                            month: "long",
                        }
                    )}
                </Typography>

                {selectedOrders.length ===
                    0 ? (

                    <Typography
                        sx={{
                            color:
                                "text.secondary",
                        }}
                    >
                        Nenhuma cobrança
                        programada para este dia.
                    </Typography>

                ) : (

                    <Stack spacing={1.5}>

                        {selectedOrders.map(
                            (order) => {

                                const dueDate =
                                    order.payment_due_date
                                        ? parseDueDate(
                                            order.payment_due_date
                                        )
                                        : null;

                                const overdue =
                                    dueDate &&
                                    startOfDay(
                                        dueDate
                                    ) < today;

                                const isToday =
                                    dueDate &&
                                    startOfDay(
                                        dueDate
                                    ).getTime() ===
                                    today.getTime();

                                return (
                                    <Paper
                                        key={
                                            order.id
                                        }
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            border:
                                                "1px solid rgba(255,255,255,.07)",
                                            background:
                                                "rgba(255,255,255,.02)",
                                        }}
                                    >

                                        <Stack
                                            direction={{
                                                xs: "column",
                                                md: "row",
                                            }}
                                            spacing={2}
                                            sx={{
                                                alignItems: {
                                                    md: "center",
                                                },
                                                justifyContent:
                                                    "space-between",
                                            }}
                                        >

                                            <Box>

                                                <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}
                                                    spacing={1}
                                                >

                                                    <Typography
                                                        sx={{
                                                            fontWeight: 900,
                                                            pr: 1
                                                        }}
                                                    >
                                                        #
                                                        {
                                                            order.id
                                                        }{" "}
                                                        {
                                                            order.customer_name
                                                        }
                                                    </Typography>

                                                    {overdue && (
                                                        <Chip
                                                            size="small"
                                                            color="error"
                                                            label="ATRASADO"
                                                        />
                                                    )}

                                                    {isToday && (
                                                        <Chip
                                                            size="small"
                                                            color="warning"
                                                            label="HOJE"
                                                        />
                                                    )}

                                                </Stack>

                                                <Typography
                                                    sx={{
                                                        mt: .5,
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    {formatCurrency(
                                                        order.total
                                                    )}
                                                </Typography>

                                                {order.payment_notes && (
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            mt: .5,
                                                            color:
                                                                "text.secondary",
                                                        }}
                                                    >
                                                        📝{" "}
                                                        {
                                                            order.payment_notes
                                                        }
                                                    </Typography>
                                                )}

                                            </Box>

                                            <Stack
                                                direction="row"
                                                spacing={1}
                                            >

                                                <Button
                                                    component={
                                                        Link
                                                    }
                                                    href={`/admin/pedidos/${order.id}`}
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{
                                                        borderRadius: 2,
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    Ver pedido
                                                </Button>

                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    startIcon={
                                                        <CheckCircleRoundedIcon />
                                                    }
                                                    onClick={() =>
                                                        handleMarkAsPaid(
                                                            order
                                                        )
                                                    }
                                                    sx={{
                                                        borderRadius: 2,
                                                        fontWeight: 800,
                                                    }}
                                                >
                                                    Pago
                                                </Button>

                                            </Stack>

                                        </Stack>

                                    </Paper>
                                );
                            }
                        )}

                    </Stack>
                )}

            </Paper>

        </Box>
    );
}

function Legend({
    color,
    label,
}: {
    color: string;
    label: string;
}) {
    return (
        <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}
            spacing={.75}
        >

            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: color,
                }}
            />

            <Typography
                variant="caption"
                sx={{
                    color:
                        "text.secondary",
                    fontWeight: 700,
                }}
            >
                {label}
            </Typography>

        </Stack>
    );
}