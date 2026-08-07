// src/types/product.ts

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

    stock: Record<string, number>;
}