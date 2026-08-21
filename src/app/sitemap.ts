// src/app/sitemap.ts

import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://voxeleleven.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const supabase = await createClient();

    const { data: products, error } = await supabase
        .from("products")
        .select(`
            slug,
            updated_at
        `)
        .eq("active", true)
        .not("slug", "is", null);

    if (error) {
        console.error("Erro ao gerar sitemap:", error);
    }

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1
        },
        {
            url: `${BASE_URL}/catalogo`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9
        }
    ];

    const productPages: MetadataRoute.Sitemap =
        products?.map((product) => ({
            url: `${BASE_URL}/produto/${product.slug}`,
            lastModified: product.updated_at
                ? new Date(product.updated_at)
                : new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.8
        })) ?? [];

    return [...staticPages, ...productPages];
}