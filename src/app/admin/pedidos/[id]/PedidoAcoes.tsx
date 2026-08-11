"use client";

import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
} from "@mui/material";

import {
    Inventory2,
    LocalShipping,
} from "@mui/icons-material";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
    updateOrderDeliveryStatus,
    cancelOrder,
} from "./actions";

interface PedidoAcoesProps {
    orderId: number;
    status:
    | "reserved"
    | "packing"
    | "delivered"
    | "cancelled";
}

export default function PedidoAcoes({
    orderId,
    status,
}: PedidoAcoesProps) {

    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [cancelDialogOpen, setCancelDialogOpen] =
        useState(false);


    async function handleUpdate(
        newStatus:
            | "packing"
            | "delivered"
    ) {

        setLoading(true);
        setError(null);

        const result =
            await updateOrderDeliveryStatus(
                orderId,
                newStatus
            );

        if (!result.success) {

            setError(
                result.error ||
                "Não foi possível atualizar o pedido."
            );

            setLoading(false);

            return;
        }

        router.refresh();

        setLoading(false);
    }


    async function handleCancel() {

        setLoading(true);
        setError(null);

        const result =
            await cancelOrder(orderId);

        if (!result.success) {

            setError(
                result.error ||
                "Não foi possível cancelar o pedido."
            );

            setLoading(false);

            return;
        }

        setCancelDialogOpen(false);

        router.refresh();

        setLoading(false);
    }


    if (
        status === "delivered" ||
        status === "cancelled"
    ) {
        return null;
    }


    return (
        <>
            <Stack spacing={2}>

                {error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}


                {status === "reserved" && (

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={
                            <Inventory2 />
                        }
                        disabled={loading}
                        onClick={() =>
                            handleUpdate(
                                "packing"
                            )
                        }
                        sx={{
                            borderRadius: 2.5,
                            fontWeight: 900,
                        }}
                    >
                        {loading
                            ? "Atualizando..."
                            : "Iniciar embalagem"}
                    </Button>

                )}


                {status === "packing" && (

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={
                            <LocalShipping />
                        }
                        disabled={loading}
                        onClick={() =>
                            handleUpdate(
                                "delivered"
                            )
                        }
                        sx={{
                            borderRadius: 2.5,
                            fontWeight: 900,
                        }}
                    >
                        {loading
                            ? "Atualizando..."
                            : "Marcar como entregue"}
                    </Button>

                )}


                <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    fullWidth
                    disabled={loading}
                    onClick={() =>
                        setCancelDialogOpen(true)
                    }
                    sx={{
                        borderRadius: 2.5,
                        fontWeight: 900,
                    }}
                >
                    Cancelar pedido
                </Button>

            </Stack>


            <Dialog
                open={cancelDialogOpen}
                onClose={() =>
                    !loading &&
                    setCancelDialogOpen(false)
                }
            >

                <DialogTitle
                    sx={{
                        fontWeight: 900,
                    }}
                >
                    Cancelar pedido?
                </DialogTitle>


                <DialogContent>

                    <DialogContentText>
                        O pedido será cancelado e o
                        estoque reservado será liberado.
                    </DialogContentText>

                </DialogContent>


                <DialogActions
                    sx={{
                        p: 2,
                        gap: 1,
                    }}
                >

                    <Button
                        onClick={() =>
                            setCancelDialogOpen(false)
                        }
                        disabled={loading}
                        sx={{
                            fontWeight: 800,
                        }}
                    >
                        Voltar
                    </Button>


                    <Button
                        onClick={handleCancel}
                        color="error"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            fontWeight: 900,
                        }}
                    >
                        {loading
                            ? "Cancelando..."
                            : "Sim, cancelar"}
                    </Button>

                </DialogActions>

            </Dialog>
        </>
    );
}