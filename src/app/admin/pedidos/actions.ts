// src/app/admin/pedidos/actions.ts

"use server";

import { createClient } from "@/lib/supabase/server";

export async function markOrderAsPaid(
    orderId: number
) {
    const supabase = await createClient();

    const { error } = await supabase
        .from("orders")
        .update({
            payment_status: "approved",
            updated_at: new Date().toISOString(),
        })
        .eq("id", orderId);

    if (error) {
        console.error(
            "Erro ao marcar pedido como pago:",
            error
        );

        throw new Error(
            "Não foi possível marcar o pedido como pago."
        );
    }

    return {
        success: true,
    };
}


export async function markOrderAsDelivered(
    orderId: number
) {
    const supabase = await createClient();

    const { error } = await supabase.rpc(
        "mark_order_as_delivered",
        {
            p_order_id: orderId,
        }
    );

    if (error) {
        console.error(
            "Erro ao marcar pedido como entregue:",
            error
        );

        throw new Error(
            error.message ||
            "Não foi possível marcar o pedido como entregue."
        );
    }

    return {
        success: true,
    };
}