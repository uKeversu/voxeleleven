// src/app/api/webhook/infinitepay/route.ts

import { NextResponse } from "next/server";

import { supabaseAdmin } from
    "@/lib/supabase/admin";

export async function POST(
    req: Request
) {
    try {

        /*
         * RECEBE WEBHOOK
         */

        const body =
            await req.json();


        console.log(
            "========== WEBHOOK INFINITEPAY =========="
        );

        console.log(
            JSON.stringify(
                body,
                null,
                2
            )
        );

        console.log(
            "========================================"
        );


        /*
         * VALIDA CAMPOS ESSENCIAIS
         */

        const orderId =
            Number(
                body.order_nsu
            );

        const transactionNsu =
            body.transaction_nsu;

        const invoiceSlug =
            body.invoice_slug;

        const receiptUrl =
            body.receipt_url;

        const paidAmount =
            Number(
                body.paid_amount
            );

        const installments =
            Number(
                body.installments
            );

        const captureMethod =
            body.capture_method;


        if (
            !Number.isInteger(orderId) ||
            orderId <= 0 ||
            !transactionNsu ||
            !invoiceSlug ||
            !receiptUrl ||
            !Number.isFinite(paidAmount) ||
            paidAmount <= 0 ||
            !Number.isInteger(installments) ||
            installments <= 0 ||
            !captureMethod
        ) {

            console.error(
                "Webhook InfinitePay inválido:",
                body
            );

            return NextResponse.json(
                {
                    success: false,

                    message:
                        "Dados do webhook inválidos.",
                },
                {
                    status: 400,
                }
            );
        }


        /*
         * CONFIRMA PAGAMENTO
         *
         * Usa o client administrativo.
         *
         * Toda a regra crítica fica
         * centralizada no banco.
         */

        const {
            data,
            error,
        } = await supabaseAdmin.rpc(
            "confirm_online_payment",
            {
                p_order_id:
                    orderId,

                p_transaction_nsu:
                    transactionNsu,

                p_invoice_slug:
                    invoiceSlug,

                p_receipt_url:
                    receiptUrl,

                p_paid_amount:
                    paidAmount,

                p_installments:
                    installments,

                p_capture_method:
                    captureMethod,
            }
        );


        /*
         * ERRO DO BANCO
         */

        if (error) {

            console.error(
                "Erro ao confirmar pagamento:",
                error
            );

            return NextResponse.json(
                {
                    success: false,

                    message:
                        "Erro ao processar pagamento.",
                },
                {
                    status: 500,
                }
            );
        }


        /*
         * ERRO DE VALIDAÇÃO
         */

        if (!data?.success) {

            console.error(
                "Pagamento não confirmado:",
                data
            );

            return NextResponse.json(
                {
                    success: false,

                    message:
                        data?.message ||
                        "Pagamento não confirmado.",
                },
                {
                    status: 400,
                }
            );
        }


        console.log(
            "Pagamento confirmado com sucesso:",
            {
                orderId,

                transactionNsu,

                alreadyProcessed:
                    data.already_processed,
            }
        );


        /*
         * INFINITEPAY RECEBE 200
         */

        return NextResponse.json({
            success: true,

            order_id:
                orderId,

            already_processed:
                data.already_processed ||
                false,
        });

    } catch (error) {

        console.error(
            "Erro no webhook InfinitePay:",
            error
        );

        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}