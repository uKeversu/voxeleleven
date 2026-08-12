// src/lib/products.ts

import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
    const supabase = await createClient();

    const {
        data: products,
        error: productsError,
    } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

    if (productsError) {
        console.error(
            "Erro ao buscar produtos:",
            productsError
        );

        throw new Error(
            "Não foi possível carregar os produtos."
        );
    }

    if (!products || products.length === 0) {
        return [];
    }

    const productIds = products.map(
        (product) => product.id
    );

    const {
        data: variants,
        error: variantsError,
    } = await supabase
        .from("product_variants")
        .select("product_id, size, stock, reserved_stock")
        .in("product_id", productIds);

    if (variantsError) {
        console.error(
            "Erro ao buscar estoque:",
            variantsError
        );

        throw new Error(
            "Não foi possível carregar o estoque."
        );
    }

    const stockByProduct: Record<
        number,
        Record<string, number>
    > = {};

    variants?.forEach((variant) => {
        if (!stockByProduct[variant.product_id]) {
            stockByProduct[variant.product_id] = {};
        }

        const availableStock =
            Math.max(
                0,
                variant.stock -
                variant.reserved_stock
            );

        stockByProduct[variant.product_id][variant.size] =
            availableStock;
    });

    return products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        team: product.team,
        category: product.category,
        season: product.season,
        price: Number(product.price),
        badge: product.badge ?? undefined,
        image: product.image,
        description: product.description,
        featured: product.featured ?? false,
        active: product.active,

        stock: stockByProduct[product.id] ?? {},
    }));
}