// src/app/admin/pedidos/novo/actions.ts

"use server";

import { createClient } from "@/lib/supabase/server";

type ManualOrderItem = {
    product_id: number;
    variant_id: number;
    size: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    name: string;
};

type CreateManualOrderInput = {
    customer_name: string;
    customer_phone: string | null;
    customer_email: string | null;

    payment_method:
    | "pix"
    | "card"
    | "fiado";

    payment_due_date:
    | string
    | null;

    payment_notes:
    | string
    | null;

    subtotal: number;
    shipping_cost: number;
    discount: number;
    total: number;

    items: ManualOrderItem[];
};

export async function createManualOrder(
    input: CreateManualOrderInput
) {
    const supabase =
        await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    /*
     * VALIDAÇÕES
     */

    if (!user) {
        return {
            success: false,
            error:
                "Usuário não autenticado.",
        };
    }

    /*
     * VALIDAÇÕES
     */

    if (
        !input.customer_name.trim()
    ) {
        return {
            success: false,
            error:
                "Nome do cliente é obrigatório.",
        };
    }

    if (
        !input.items.length
    ) {
        return {
            success: false,
            error:
                "O pedido precisa ter pelo menos um produto.",
        };
    }

    if (
        input.payment_method ===
        "fiado" &&
        !input.payment_due_date
    ) {
        return {
            success: false,
            error:
                "Pedidos fiados precisam de uma data para pagamento.",
        };
    }

    /*
     * STATUS DO PEDIDO
     */

    const isPaid =
        input.payment_method ===
        "pix" ||
        input.payment_method ===
        "card";

    /*
     * CRIA PEDIDO
     */

    const { data: order, error: orderError } =
        await supabase
            .from("orders")
            .insert({
                customer_name:
                    input.customer_name,

                customer_phone:
                    input.customer_phone,

                customer_email:
                    input.customer_email,

                status:
                    isPaid
                        ? "paid"
                        : "pending",

                payment_status:
                    isPaid
                        ? "approved"
                        : "pending",

                payment_method:
                    input.payment_method,

                subtotal:
                    input.subtotal,

                shipping_cost:
                    input.shipping_cost,

                discount: input.discount,

                total:
                    input.total,

                payment_due_date:
                    input.payment_method ===
                        "fiado"
                        ? input.payment_due_date
                        : null,

                payment_notes:
                    input.payment_method ===
                        "fiado"
                        ? input.payment_notes
                        : null,

                updated_at:
                    new Date().toISOString(),
            })
            .select("id")
            .single();

    if (orderError) {

        console.error(
            "Erro ao criar pedido:",
            orderError
        );

        return {
            success: false,
            error:
                "Não foi possível criar o pedido.",
        };
    }

    /*
     * CRIA ITENS
     */

    const orderItems =
        input.items.map(
            (item) => ({
                order_id:
                    order.id,

                product_id:
                    item.product_id,

                size:
                    item.size,

                quantity:
                    item.quantity,

                unit_price:
                    item.unit_price,

                total_price:
                    item.total_price,
            })
        );

    const {
        data: insertedItems,
        error: itemsError,
    } = await supabase
        .from("order_items")
        .insert(orderItems)
        .select();

    if (itemsError) {

        console.error(
            "Erro ao criar itens do pedido:",
            itemsError
        );

        /*
         * Remove o pedido caso
         * os itens não sejam criados.
         */

        await supabase
            .from("orders")
            .delete()
            .eq(
                "id",
                order.id
            );

        return {
            success: false,
            error:
                "Não foi possível adicionar os produtos ao pedido.",
        };
    }

    /*
     * FINALIZADO
     */

    return {
        success: true,
        orderId: order.id,
    };
}