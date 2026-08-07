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
        .eq("active", true)
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
        .select("product_id, size, stock")
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

    /**
     * Organiza as variantes por produto.
     *
     * Exemplo:
     *
     * {
     *   1: {
     *     P: 0,
     *     M: 5,
     *     G: 2,
     *     GG: 1
     *   }
     * }
     */
    const stockByProduct: Record<
        number,
        Record<string, number>
    > = {};

    variants?.forEach((variant) => {
        if (!stockByProduct[variant.product_id]) {
            stockByProduct[variant.product_id] = {};
        }

        stockByProduct[variant.product_id][variant.size] =
            variant.stock;
    });

    return products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        team: product.team,
        category: product.category,
        season: product.season,
        price: product.price,
        badge: product.badge ?? undefined,
        image: product.image,
        description: product.description,
        featured: product.featured ?? false,

        stock: stockByProduct[product.id] ?? {},
    }));
}