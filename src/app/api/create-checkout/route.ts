// src/app/api/create-checkout/route.ts

import { NextResponse } from "next/server";

import { createClient } from
    "@/lib/supabase/server";


export async function POST(
    req: Request
) {

    try {

        const body =
            await req.json();


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
         * USUÁRIO AUTENTICADO
         */

        const {
            data: {
                user,
            },
            error: userError,
        } = await supabase
            .auth
            .getUser();


        if (
            userError ||
            !user
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Você precisa estar logado para finalizar o pedido.",
                },
                {
                    status: 401,
                }
            );

        }


        /*
         * BUSCA O PERFIL
         *
         * O nome do pedido continua
         * sendo obtido do perfil
         * do usuário autenticado.
         */

        const {
            data: profile,
            error: profileError,
        } = await supabase
            .from("profiles")
            .select("name")
            .eq(
                "id",
                user.id
            )
            .single();


        if (
            profileError ||
            !profile ||
            !profile.name ||
            !profile.name.trim()
        ) {

            console.error(
                "Erro ao buscar perfil do cliente:",
                profileError
            );

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Não foi possível identificar o cliente.",
                },
                {
                    status: 400,
                }
            );

        }


        /*
         * DADOS DO FRETE
         *
         * Normaliza os valores antes
         * de enviá-los para o banco.
         */

        const customerPhone =
            typeof body.customer_phone === "string"
                ? body.customer_phone.trim()
                : "";

        const shippingZipCode =
            typeof body.shipping_zip_code === "string"
                ? body.shipping_zip_code.trim()
                : "";

        const shippingAddress =
            typeof body.shipping_address === "string"
                ? body.shipping_address.trim()
                : "";

        const shippingNumber =
            typeof body.shipping_number === "string"
                ? body.shipping_number.trim()
                : "";

        const shippingComplement =
            typeof body.shipping_complement === "string"
                ? body.shipping_complement.trim()
                : "";

        const shippingNeighborhood =
            typeof body.shipping_neighborhood === "string"
                ? body.shipping_neighborhood.trim()
                : "";

        const shippingCity =
            typeof body.shipping_city === "string"
                ? body.shipping_city.trim()
                : "";

        const shippingState =
            typeof body.shipping_state === "string"
                ? body.shipping_state.trim()
                : "";


        /*
         * VALIDAÇÃO BÁSICA
         *
         * O banco também valida.
         *
         * Esta validação existe para
         * devolver um erro mais rápido
         * antes de iniciar a criação
         * do pedido.
         */

        if (
            !customerPhone ||
            !shippingZipCode ||
            !shippingAddress ||
            !shippingNumber ||
            !shippingNeighborhood ||
            !shippingCity ||
            !shippingState
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Preencha todos os dados obrigatórios de contato e entrega.",
                },
                {
                    status: 400,
                }
            );

        }


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

                    if (
                        !item.product ||
                        !Array.isArray(
                            item.product.variants
                        )
                    ) {

                        console.error(
                            "Produto recebido sem variants:",
                            item
                        );

                        throw new Error(
                            `Produto ${item.product?.name || "desconhecido"} não possui variantes válidas.`
                        );

                    }


                    const variant =
                        item.product.variants.find(
                            (variant: any) =>
                                variant.size ===
                                item.size
                        );


                    if (!variant) {

                        console.error(
                            "Variante não encontrada:",
                            {
                                product:
                                    item.product.name,

                                size:
                                    item.size,

                                variants:
                                    item.product.variants,
                            }
                        );

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
         * - exige usuário autenticado
         * - grava user_id
         * - valida estoque
         * - reserva estoque
         * - grava dados do cliente
         * - grava endereço de entrega
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
                p_items:
                    orderItems,

                p_customer_name:
                    profile.name.trim(),

                p_customer_email:
                    user.email ||
                    null,

                p_customer_phone:
                    customerPhone,

                p_shipping_zip_code:
                    shippingZipCode,

                p_shipping_address:
                    shippingAddress,

                p_shipping_number:
                    shippingNumber,

                p_shipping_complement:
                    shippingComplement ||
                    null,

                p_shipping_neighborhood:
                    shippingNeighborhood,

                p_shipping_city:
                    shippingCity,

                p_shipping_state:
                    shippingState,
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
         * Usamos exclusivamente os
         * valores calculados pelo banco.
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

            handle:
                "voxelkore",

            redirect_url:
                `https://voxeleleven.vercel.app/pagamento/sucesso?order_id=${orderId}`,

            webhook_url:
                "https://voxeleleven.vercel.app/api/webhook/infinitepay",


            /*
             * ID do pedido no nosso sistema.
             */

            order_nsu:
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
                         * o valor em centavos.
                         */

                        price:
                            Math.round(
                                Number(
                                    item.unit_price
                                ) * 100
                            ),

                        description:
                            Array.isArray(
                                item.products
                            )
                                ? item.products[0]?.name ||
                                "Produto"
                                : item.products?.name ||
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