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

    /*
     * AUTENTICAÇÃO
     */

    const {
        data: { user },
    } = await supabase.auth.getUser();

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
     * CRIA PEDIDO + ITENS + RESERVAS
     *
     * Tudo acontece dentro da RPC
     * em uma única transação PostgreSQL.
     */

    const {
        data: orderId,
        error,
    } = await supabase.rpc(
        "create_manual_order",
        {
            p_customer_name:
                input.customer_name,

            p_customer_phone:
                input.customer_phone,

            p_customer_email:
                input.customer_email,

            p_payment_method:
                input.payment_method,

            p_payment_due_date:
                input.payment_due_date,

            p_payment_notes:
                input.payment_notes,

            p_subtotal:
                input.subtotal,

            p_shipping_cost:
                input.shipping_cost,

            p_discount:
                input.discount,

            p_total:
                input.total,

            p_items:
                input.items.map(
                    (item) => ({
                        product_id:
                            item.product_id,

                        variant_id:
                            item.variant_id,

                        size:
                            item.size,

                        quantity:
                            item.quantity,

                        unit_price:
                            item.unit_price,

                        total_price:
                            item.total_price,
                    })
                ),
        }
    );

    if (error) {
        console.error(
            "Erro ao criar pedido manual:",
            error
        );

        return {
            success: false,
            error:
                error.message ||
                "Não foi possível criar o pedido.",
        };
    }

    /*
     * FINALIZADO
     */

    return {
        success: true,
        orderId,
    };
}