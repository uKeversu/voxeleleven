// src/app/api/create-checkout/route.ts

import { NextResponse } from "next/server";

import { createClient } from
    "@/lib/supabase/server";

export async function POST(
    req: Request
) {
    try {

        const body = await req.json();

        /*
         * VALIDAÇÃO DO CARRINHO
         */

        if (
            !Array.isArray(body.items) ||
            body.items.length === 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Carrinho vazio.",
                },
                {
                    status: 400,
                }
            );
        }


        /*
         * CONECTA AO SUPABASE
         */

        const supabase =
            await createClient();


        /*
         * MONTA OS ITENS
         *
         * Não enviamos preço.
         * Não enviamos total.
         *
         * O banco busca essas
         * informações diretamente.
         */

        const orderItems =
            body.items.map(
                (item: any) => {

                    const variant =
                        item.product.variants.find(
                            (variant: any) =>
                                variant.size ===
                                item.size
                        );

                    if (!variant) {
                        throw new Error(
                            `Variante não encontrada para ${item.product.name} tamanho ${item.size}`
                        );
                    }

                    return {
                        variant_id:
                            Number(variant.id),

                        quantity:
                            Number(item.quantity),
                    };
                }
            );


        /*
         * CRIA O PEDIDO
         *
         * A RPC:
         *
         * - valida estoque
         * - reserva estoque
         * - cria orders
         * - cria order_items
         * - calcula valores reais
         */

        const {
            data: orderId,
            error: orderError,
        } = await supabase.rpc(
            "create_online_order",
            {
                p_items: orderItems,
                p_customer_name: "Cliente Online",

            }
        );


        if (orderError) {

            console.error(
                "Erro ao criar pedido:",
                orderError
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        orderError.message ||
                        "Não foi possível criar o pedido.",
                },
                {
                    status: 400,
                }
            );
        }


        /*
         * BUSCA OS ITENS REAIS
         * DO PEDIDO
         *
         * Agora usamos os valores
         * calculados pelo banco.
         */

        const {
            data: orderItemsFromDatabase,
            error: itemsError,
        } = await supabase
            .from("order_items")
            .select(`
                quantity,
                unit_price,
                products (
                    name
                )
            `)
            .eq(
                "order_id",
                orderId
            );


        if (
            itemsError ||
            !orderItemsFromDatabase ||
            orderItemsFromDatabase.length === 0
        ) {

            console.error(
                "Erro ao buscar itens do pedido:",
                itemsError
            );

            /*
             * O pedido já foi criado.
             *
             * Cancela para liberar
             * o estoque reservado.
             */

            await supabase.rpc(
                "cancel_order",
                {
                    p_order_id:
                        orderId,
                }
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Não foi possível preparar o pagamento.",
                },
                {
                    status: 500,
                }
            );
        }


        /*
         * PAYLOAD DA INFINITEPAY
         */

        const payload = {
            handle: "voxelkore",

            redirect_url:
                `https://voxeleleven.vercel.app/pagamento/sucesso?order_id=${orderId}`,

            webhook_url:
                "https://voxeleleven.vercel.app/api/webhook/infinitepay",

            /*
             * Referência do pedido
             * interno.
             *
             * Vamos utilizar no webhook.
             */

            external_reference:
                String(orderId),

            items:
                orderItemsFromDatabase.map(
                    (item: any) => ({
                        quantity:
                            Number(
                                item.quantity
                            ),

                        /*
                         * InfinitePay recebe
                         * centavos.
                         */

                        price:
                            Math.round(
                                Number(
                                    item.unit_price
                                ) * 100
                            ),

                        description:
                            item.products?.name ||
                            "Produto",
                    })
                ),
        };


        console.log(
            "Payload InfinitePay:",
            payload
        );


        /*
         * CRIA LINK
         */

        const response =
            await fetch(
                "https://api.checkout.infinitepay.io/links",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body:
                        JSON.stringify(
                            payload
                        ),
                }
            );


        const data =
            await response.json();


        console.log(
            "Resposta InfinitePay:",
            data
        );


        /*
         * ERRO AO CRIAR CHECKOUT
         *
         * Cancela o pedido para
         * devolver o estoque.
         */

        if (!response.ok) {

            console.error(
                "Erro InfinitePay:",
                data
            );

            const {
                error: cancelError,
            } = await supabase.rpc(
                "cancel_order",
                {
                    p_order_id:
                        orderId,
                }
            );

            if (cancelError) {
                console.error(
                    "Erro ao cancelar pedido após falha no checkout:",
                    cancelError
                );
            }

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Não foi possível criar o checkout.",
                },
                {
                    status:
                        response.status || 500,
                }
            );
        }


        /*
         * RETORNA CHECKOUT
         */

        return NextResponse.json({
            success: true,

            order_id:
                orderId,

            ...data,
        });

    } catch (error) {

        console.error(
            "Erro ao criar checkout:",
            error
        );

        return NextResponse.json(
            {
                success: false,

                message:
                    error instanceof Error
                        ? error.message
                        : "Erro ao criar checkout",
            },
            {
                status: 500,
            }
        );
    }
}