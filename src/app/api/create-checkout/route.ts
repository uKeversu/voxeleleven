import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch(
            "https://api.checkout.infinitepay.io/links",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    handle: "voxelkore",

                    items: body.items,

                    order_nsu: `pedido_${Date.now()}`,

                    redirect_url:
                        "http://voxeleleven.vercel.app/pagamento/sucesso",

                    webhook_url:
                        "https://voxeleleven.vercel.app/api/webhook/infinitepay",
                }),
            }
        );

        const data = await response.json();

        console.log(data);

        return NextResponse.json(data);
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                error: "Erro ao criar checkout",
            },
            {
                status: 500,
            }
        );
    }
}