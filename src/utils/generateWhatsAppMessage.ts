// src/utils/generateWhatsAppMessage.ts

import { CartItem } from "@/context/CartContext";

type Params = {
    cartItems: CartItem[];
    totalPrice: number;
};

export function generateWhatsAppMessage({
    cartItems,
    totalPrice,
}: Params) {
    const produtos = cartItems
        .map((item) => {
            return `
• ${item.product.name}
Tamanho: ${item.size}
Qtd: ${item.quantity}
Valor: ${(
                item.product.price *
                item.quantity
            ).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            })}
`;
        })
        .join("\n");

    return `
🔥 NOVO PEDIDO - Voxel Eleven

${produtos}

----------------------------

Total:
${totalPrice.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })}

----------------------------

Olá! Quero finalizar esse pedido 👊
`;
}