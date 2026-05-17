// src/app/api/create-checkout/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const payload = {
            handle: "voxelkore",

            redirect_url:
                "https://voxeleleven.vercel.app/pagamento/sucesso",

            items: body.items.map((item: any) => ({
                quantity: Number(item.quantity),

                price: parseInt(
                    (
                        item.product.price * 100
                    ).toFixed(0)
                ),

                description:
                    item.product.name,
            })),
        };

        console.log(payload);

        const response = await fetch(
            "https://api.checkout.infinitepay.io/links",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",
                },

                body: JSON.stringify(
                    payload
                ),
            }
        );

        const data =
            await response.json();

        console.log(data);

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message:
                    "Erro ao criar checkout",
            },
            {
                status: 500,
            }
        );
    }
}