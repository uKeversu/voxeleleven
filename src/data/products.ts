// src/data/products.ts
import { Product } from "@/types/product";

export const products: Product[] = [
    {
        id: 1,

        name: "Corinthians 25/26",

        slug: "corinthians-2526",

        team: "Corinthians",

        category: "Brasileiros",

        season: "25/26",

        price: 129.9,

        badge: "NEW",

        image: "/camisa-corinthians.png",

        description:
            "Camisa premium inspirada na temporada 25/26.",

        featured: true,
    },

    {
        id: 2,

        name: "Milan Retro 2002",

        slug: "milan-retro-2002",

        team: "Milan",

        category: "Retrô",

        season: "2002",

        price: 129.9,

        badge: "RETRO",

        image: "/camisa-milan-retro.png",

        description:
            "Modelo clássico retrô do Milan.",

        featured: true,
    },

    {
        id: 3,

        name: "Vasco da Gama 26/27",

        slug: "vasco-2627",

        team: "Vasco da Gama",

        category: "Brasileiros",

        season: "26/27",

        price: 129.9,

        badge: "LIMITED",

        image: "/camisa-vasco.png",

        description:
            "Coleção exclusiva Vasco da Gama.",

        featured: true,
    },
];