// src/types/product.ts

export interface ProductVariant {
    id: number;
    size: string;
    stock: number;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    team: string;
    category: string;
    season: string;
    price: number;
    badge?: string;
    image: string;
    description: string;
    featured?: boolean;
    active?: boolean;

    stock: Record<string, number>;

    variants: ProductVariant[];
}