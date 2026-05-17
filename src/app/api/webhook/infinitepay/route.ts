import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("Pagamento recebido:", body);

        // aqui você marca pedido como pago

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: true },
            { status: 400 }
        );
    }
}