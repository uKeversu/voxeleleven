//api/webhook/infinitepay/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("Pagamento aprovado:", body);

        // salvar pedido no banco aqui

        // enviar email aqui

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

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