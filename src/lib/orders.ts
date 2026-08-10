// src/lib/orders.ts

import { createClient } from "@/lib/supabase/server";

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    size: string;
    quantity: number;
    unit_price: number;
    total_price: number;

    product: {
        name: string;
        image: string | null;
    } | null;
}

export interface Order {
    id: number;

    customer_name: string;
    customer_email: string | null;
    customer_phone: string | null;

    shipping_zip_code: string | null;
    shipping_address: string | null;
    shipping_number: string | null;
    shipping_complement: string | null;
    shipping_neighborhood: string | null;
    shipping_city: string | null;
    shipping_state: string | null;

    status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

    payment_status:
    | "pending"
    | "approved"
    | "failed"
    | "refunded";

    payment_method: string | null;

    payment_due_date: string | null;
    payment_notes: string | null;

    subtotal: number;
    shipping_cost: number;
    total: number;

    created_at: string;
    updated_at: string;

    items: OrderItem[];
}

export async function getOrders(): Promise<Order[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("orders")
        .select(`
            *,
            order_items (
                *,
                products (
                    name,
                    image
                )
            )
        `)
        .order("created_at", {
            ascending: false,
        });

    console.log("=================================");
    console.log("PEDIDOS RETORNADOS PELO SUPABASE:");
    console.dir(data, { depth: null });

    console.log("ERRO DO SUPABASE:");
    console.log(error);
    console.log("=================================");

    if (error) {
        throw new Error(
            "Não foi possível carregar os pedidos."
        );
    }

    if (!data) {
        return [];
    }

    return data.map((order) => ({
        id: order.id,

        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,

        shipping_zip_code:
            order.shipping_zip_code,

        shipping_address:
            order.shipping_address,

        shipping_number:
            order.shipping_number,

        shipping_complement:
            order.shipping_complement,

        shipping_neighborhood:
            order.shipping_neighborhood,

        shipping_city:
            order.shipping_city,

        shipping_state:
            order.shipping_state,

        status: order.status,
        payment_status:
            order.payment_status,

        payment_method:
            order.payment_method,

        subtotal:
            Number(order.subtotal),

        shipping_cost:
            Number(order.shipping_cost),

        total:
            Number(order.total),

        created_at:
            order.created_at,

        updated_at:
            order.updated_at,

        payment_due_date:
            order.payment_due_date,

        payment_notes:
            order.payment_notes,

        items: (
            order.order_items ?? []
        ).map((item: any) => ({
            id: item.id,
            order_id: item.order_id,
            product_id: item.product_id,
            size: item.size,
            quantity: item.quantity,

            unit_price:
                Number(item.unit_price),

            total_price:
                Number(item.total_price),

            product: item.products
                ? {
                    name:
                        item.products.name,
                    image:
                        item.products.image,
                }
                : null,
        })),
    }));
}