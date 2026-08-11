// src/app/admin/pedidos/[id]/actions.ts

"use server";

import { createClient } from "@/lib/supabase/server";

type DeliveryStatus =
    | "packing"
    | "delivered";

export async function updateOrderDeliveryStatus(
    orderId: number,
    newStatus: DeliveryStatus
) {
    const supabase = await createClient();

    /*
     * AUTENTICAÇÃO
     */

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            success: false,
            error: "Usuário não autenticado.",
        };
    }

    /*
     * VALIDAÇÃO
     */

    if (!Number.isInteger(orderId)) {
        return {
            success: false,
            error: "Pedido inválido.",
        };
    }

    /*
     * ALTERA STATUS
     */

    const { error } = await supabase.rpc(
        "update_order_delivery_status",
        {
            p_order_id: orderId,
            p_new_status: newStatus,
        }
    );

    if (error) {
        console.error(
            "Erro ao atualizar status do pedido:",
            error
        );

        return {
            success: false,
            error:
                error.message ||
                "Não foi possível atualizar o status.",
        };
    }

    return {
        success: true,
    };
}

/*
 * CANCELAR PEDIDO
 */

export async function cancelOrder(
    orderId: number
) {
    const supabase = await createClient();

    /*
     * AUTENTICAÇÃO
     */

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            success: false,
            error: "Usuário não autenticado.",
        };
    }

    /*
     * VALIDAÇÃO
     */

    if (!Number.isInteger(orderId)) {
        return {
            success: false,
            error: "Pedido inválido.",
        };
    }

    /*
     * CANCELA PEDIDO
     *
     * A RPC também libera
     * o estoque reservado.
     */

    const { error } = await supabase.rpc(
        "cancel_order",
        {
            p_order_id: orderId,
        }
    );

    if (error) {
        console.error(
            "Erro ao cancelar pedido:",
            error
        );

        return {
            success: false,
            error:
                error.message ||
                "Não foi possível cancelar o pedido.",
        };
    }

    return {
        success: true,
    };
}