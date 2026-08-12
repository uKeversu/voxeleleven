//api/webhook/infinitepay/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log(
            "WEBHOOK INFINITEPAY:",
            JSON.stringify(
                body,
                null,
                2
            )
        );

        return NextResponse.json({
            success: true,
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