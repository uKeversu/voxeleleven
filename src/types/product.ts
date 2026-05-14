export type Product = {
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
    featured: boolean;
};