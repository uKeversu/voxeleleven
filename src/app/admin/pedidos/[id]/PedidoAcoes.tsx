"use client";

import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import {
    Inventory2,
    LocalShipping,
    WhatsApp,
} from "@mui/icons-material";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
    updateOrderDeliveryStatus,
    cancelOrder,
} from "./actions";

import type { OrderItem } from "@/lib/orders";


interface PedidoAcoesProps {
    orderId: number;

    status:
    | "reserved"
    | "packing"
    | "delivered"
    | "cancelled";

    paymentStatus:
    | "pending"
    | "approved"
    | "failed"
    | "refunded";

    customerName: string;

    customerPhone: string | null;

    items: OrderItem[];

    total: number;
}


export default function PedidoAcoes({
    orderId,
    status,
    paymentStatus,
    customerName,
    customerPhone,
    items,
    total,
}: PedidoAcoesProps) {

    const router = useRouter();


    const [loading, setLoading] =
        useState(false);


    const [error, setError] =
        useState<string | null>(null);


    const [cancelDialogOpen, setCancelDialogOpen] =
        useState(false);


    const [cobrancaDialogOpen, setCobrancaDialogOpen] =
        useState(false);


    /*
     * MENSAGEM DA COBRANÇA
     */

    const [mensagemCobranca, setMensagemCobranca] =
        useState(
            criarMensagemCobranca(
                orderId,
                customerName,
                items,
                total
            )
        );


    /*
     * FORMATA MOEDA
     */

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


    /*
     * ATUALIZA STATUS DO PEDIDO
     */

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


    /*
     * CANCELA PEDIDO
     */

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


    /*
     * ABRE MODAL DE COBRANÇA
     */

    function handleAbrirCobranca() {

        setError(null);

        if (!customerPhone) {

            setError(
                "Este cliente não possui telefone cadastrado."
            );

            return;
        }

        const phone = formatPhone(customerPhone);

        if (!phone) {

            setError(
                "O telefone do cliente é inválido."
            );

            return;
        }

        setMensagemCobranca(
            criarMensagemCobranca(
                orderId,
                customerName,
                items,
                total
            )
        );

        setCobrancaDialogOpen(true);
    }


    /*
     * ABRE WHATSAPP
     */

    function handleWhatsApp() {

        setError(null);


        if (!customerPhone) {

            setError(
                "Este cliente não possui telefone cadastrado."
            );

            return;
        }


        const phone =
            formatPhone(customerPhone);


        if (!phone) {

            setError(
                "O telefone do cliente é inválido."
            );

            return;
        }


        const url =
            `https://wa.me/${phone}?text=${encodeURIComponent(
                mensagemCobranca
            )}`;


        window.open(
            url,
            "_blank"
        );


        setCobrancaDialogOpen(false);

    }


    /*
     * PEDIDOS CANCELADOS NÃO POSSUEM AÇÕES
     *
     * IMPORTANTE:
     *
     * Não retornamos mais null para "delivered",
     * pois um pedido entregue pode continuar
     * com pagamento pendente, especialmente
     * nos pedidos feitos no fiado.
     */

    if (status === "cancelled") {

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


                {/* COBRANÇA */}

                {paymentStatus === "pending" && (

                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        fullWidth
                        startIcon={
                            <WhatsApp />
                        }
                        disabled={loading}
                        onClick={
                            handleAbrirCobranca
                        }
                        sx={{
                            borderRadius: 2.5,
                            fontWeight: 900,
                        }}
                    >
                        Cobrar via WhatsApp
                    </Button>

                )}


                {/* INICIAR EMBALAGEM */}

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


                {/* MARCAR COMO ENTREGUE */}

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


                {/* CANCELAR */}

                {status !== "delivered" && (

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

                )}

            </Stack>


            {/* ===================================== */}
            {/* DIALOG DE CANCELAMENTO */}
            {/* ===================================== */}

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


            {/* ===================================== */}
            {/* DIALOG DE COBRANÇA */}
            {/* ===================================== */}

            <Dialog
                open={cobrancaDialogOpen}
                onClose={() =>
                    !loading &&
                    setCobrancaDialogOpen(false)
                }
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle
                    sx={{
                        fontWeight: 900,
                    }}
                >
                    💬 Cobrar via WhatsApp
                </DialogTitle>


                <DialogContent>

                    <Stack spacing={3}>

                        {/* IDENTIFICAÇÃO */}

                        <Box>

                            <Typography
                                variant="overline"
                                color="primary"
                                sx={{
                                    fontWeight: 900,
                                    letterSpacing: 1.5,
                                }}
                            >
                                PEDIDO #{orderId}
                            </Typography>


                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 900,
                                }}
                            >
                                {customerName}
                            </Typography>


                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {customerPhone}
                            </Typography>

                        </Box>


                        {/* PRODUTOS */}

                        <Stack spacing={1.5}>

                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 900,
                                }}
                            >
                                Produtos
                            </Typography>


                            {items.map(
                                (item) => (

                                    <Stack
                                        key={item.id}
                                        direction="row"
                                        spacing={2}
                                        sx={{
                                            alignItems:
                                                "center",

                                            p: 1.5,

                                            borderRadius: 2.5,

                                            background:
                                                "rgba(255,255,255,.025)",

                                            border:
                                                "1px solid rgba(255,255,255,.07)",
                                        }}
                                    >

                                        {item.product?.image ? (

                                            <Box
                                                component="img"
                                                src={
                                                    item.product.image
                                                }
                                                alt={
                                                    item.product?.name ??
                                                    "Produto"
                                                }
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    objectFit:
                                                        "cover",
                                                    borderRadius: 2,
                                                }}
                                            />

                                        ) : (

                                            <Box
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    borderRadius: 2,
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "center",
                                                    background:
                                                        "rgba(255,255,255,.05)",
                                                }}
                                            >

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Sem imagem
                                                </Typography>

                                            </Box>

                                        )}


                                        <Box
                                            sx={{
                                                flex: 1,
                                            }}
                                        >

                                            <Typography
                                                sx={{
                                                    fontWeight: 800,
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
                                                    alignItems:
                                                        "center",
                                                }}
                                            >

                                                <Chip
                                                    size="small"
                                                    label={
                                                        `Tamanho ${item.size}`
                                                    }
                                                />


                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {item.quantity}{" "}
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
                                            }}
                                        >
                                            {formatCurrency(
                                                item.total_price
                                            )}
                                        </Typography>

                                    </Stack>

                                )
                            )}

                        </Stack>


                        {/* TOTAL */}

                        <Stack
                            direction="row"
                            sx={{
                                justifyContent:
                                    "space-between",
                                alignItems:
                                    "center",

                                p: 2,

                                borderRadius: 2.5,

                                background:
                                    "rgba(0,255,64,.06)",

                                border:
                                    "1px solid rgba(0,255,64,.15)",
                            }}
                        >

                            <Typography
                                sx={{
                                    fontWeight: 800,
                                }}
                            >
                                Total da cobrança
                            </Typography>


                            <Typography
                                variant="h5"
                                color="primary.main"
                                sx={{
                                    fontWeight: 900,
                                }}
                            >
                                {formatCurrency(total)}
                            </Typography>

                        </Stack>


                        {/* MENSAGEM */}

                        <Box>

                            <Typography
                                variant="subtitle2"
                                sx={{
                                    fontWeight: 900,
                                    mb: 1,
                                }}
                            >
                                Mensagem que será enviada
                            </Typography>


                            <TextField
                                fullWidth
                                multiline
                                minRows={12}
                                value={
                                    mensagemCobranca
                                }
                                onChange={(event) =>
                                    setMensagemCobranca(
                                        event.target.value
                                    )
                                }
                                slotProps={{
                                    input: {
                                        sx: {
                                            fontSize: 14,
                                            lineHeight: 1.5,
                                        },
                                    },
                                }}
                            />

                        </Box>


                        <Alert
                            severity="info"
                        >
                            O WhatsApp será aberto com
                            esta mensagem já preenchida.
                            Você poderá revisar tudo antes
                            de enviar.
                        </Alert>

                    </Stack>

                </DialogContent>


                <DialogActions
                    sx={{
                        p: 2,
                        gap: 1,
                    }}
                >

                    <Button
                        onClick={() =>
                            setCobrancaDialogOpen(false)
                        }
                        disabled={loading}
                        sx={{
                            fontWeight: 800,
                        }}
                    >
                        Cancelar
                    </Button>


                    <Button
                        onClick={handleWhatsApp}
                        variant="contained"
                        color="success"
                        startIcon={
                            <WhatsApp />
                        }
                        disabled={
                            loading ||
                            !customerPhone ||
                            !mensagemCobranca.trim()
                        }
                        sx={{
                            fontWeight: 900,
                            borderRadius: 2.5,
                        }}
                    >
                        Abrir WhatsApp
                    </Button>

                </DialogActions>

            </Dialog>

        </>
    );
}


/*
 * ============================================
 * FORMATA TELEFONE
 * ============================================
 */

function formatPhone(
    phone: string
) {

    const digits =
        phone.replace(/\D/g, "");


    if (!digits) {
        return null;
    }


    /*
     * Já possui código do Brasil
     *
     * Ex:
     * 5547999999999
     */

    if (
        digits.startsWith("55")
    ) {

        return digits;

    }


    /*
     * Telefone nacional
     *
     * Ex:
     * 47999999999
     */

    return `55${digits}`;

}


/*
 * ============================================
 * CRIA MENSAGEM DA COBRANÇA
 * ============================================
 */

function criarMensagemCobranca(
    orderId: number,
    customerName: string,
    items: OrderItem[],
    total: number
) {

    const produtos =
        items
            .map(
                (item) => {

                    const nome =
                        item.product?.name ??
                        "Produto";


                    return (
                        `👕 *${nome}*\n` +
                        `📏 Tamanho: ${item.size}\n` +
                        `🔢 Quantidade: ${item.quantity}`
                    );

                }
            )
            .join("\n\n");


    const valor =
        total.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );


    return (
        `⚽💚 *Voxel Eleven | Pagamento do pedido #${orderId}*\n\n` +

        `Olá, ${customerName}! Tudo bem?\n\n` +

        `Estamos entrando em contato sobre o seu pedido realizado na *Voxel Eleven*.\n\n` +

        `${produtos}\n\n` +

        `💰 *Total: ${valor}*\n\n` +

        `O pagamento deste pedido ainda está pendente.\n\n` +

        `🔑 *PIX:*\n` +

        `59516bca-2971-4f92-92da-216893dff545\n\n` +

        `Após realizar o pagamento, envie o comprovante por este WhatsApp para confirmarmos o pagamento e prosseguirmos com o pedido.\n\n` +

        `🏪 *Voxel Eleven*\n` +

        `A Paixão Ganha Forma.\n\n` +

        `Esta mensagem foi enviada pelo canal oficial de atendimento da Voxel Eleven.`
    );

}