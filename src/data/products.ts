// src/data/products.ts

import { Product } from "@/types/product";

export const products: Product[] = [
    {
        id: 1,
        name: "Argentina - Home 26/27",
        slug: "argentina-azul-branco",
        team: "Argentina",
        category: "Seleções",
        season: "26",
        price: 89.90,
        badge: "NEW",
        image: "/argentina-azul-branco.png",
        description:
            "Modelo premium da seleção argentina 2026",
        featured: true,
        sizes: ["P", "M", "G", "GG"],
    },

    {
        id: 2,
        name: "Atlético Mineiro - Home 26/27",
        slug: "atletico-mineiro-preto-branco",
        team: "Atlético Mineiro",
        category: "Brasileiros",
        season: "26",
        price: 89.90,
        badge: "NEW",
        image: "/atleticomineiro-preto-branco.jpeg",
        description:
            "Modelo premium do Atlético Mineiro 2026",
        featured: false,
        sizes: ["M", "G", "GG"],
    },

    {
        id: 3,
        name: "Brasil - Home 26/27",
        slug: "brasil-amarela-26",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 109.90,
        badge: "NEW",
        image: "/brasil-amarela-26.png",
        description:
            "Modelo premium da seleção brasileira 2026",
        featured: true,
        sizes: ["P", "M", "G", "GG", "XGG"],
    },

    {
        id: 4,
        name: "Brasil - Away 22/23",
        slug: "brasil-dourada",
        team: "Brasil",
        category: "Seleções",
        season: "22",
        price: 89.90,
        badge: "LIMITED",
        image: "/brasil-dourada.jpeg",
        description:
            "Edição especial dourada da seleção brasileira 2022",
        featured: false,
        sizes: ["M", "G"],
    },

    {
        id: 5,
        name: "Corinthians - Retrô 98",
        slug: "corinthians-retro",
        team: "Corinthians",
        category: "Retrô",
        season: "Retrô",
        price: 89.90,
        badge: "RETRO",
        image: "/corinthians-retro.PNG",
        description:
            "Modelo premium retrô do Corinthians 1998",
        featured: false,
        sizes: ["P", "M", "G"],
    },

    {
        id: 6,
        name: "Flamengo - Away 25/26",
        slug: "flamengo-preto",
        team: "Flamengo",
        category: "Brasileiros",
        season: "25",
        price: 89.90,
        badge: "LIMITED",
        image: "/flamengo-preto.png",
        description:
            "Modelo premium do Flamengo 2025",
        featured: false,
        sizes: ["M", "G", "GG", "XGG"],
    },

    {
        id: 7,
        name: "Manchester City - Away 25/26",
        slug: "manchester-city-preto",
        team: "Manchester City",
        category: "Europeus",
        season: "26",
        price: 89.90,
        badge: "LIMITED",
        image: "/manchestercity-preto.jpeg",
        description:
            "Modelo premium alternativo do Manchester City 2025",
        featured: true,
        sizes: ["P", "M", "GG"],
    },

    {
        id: 8,
        name: "AC Milan - Retrô 2002",
        slug: "milan-retro",
        team: "Milan",
        category: "Retrô",
        season: "2002",
        price: 89.90,
        badge: "RETRO",
        image: "/milan-retro.jpeg",
        description:
            "Modelo premium retrô do Milan 2002 Kaká",
        featured: true,
        sizes: ["P", "M", "G", "GG"],
    },

    {
        id: 9,
        name: "Palmeiras - Home 26/27",
        slug: "palmeiras-verde",
        team: "Palmeiras",
        category: "Brasileiros",
        season: "26",
        price: 89.90,
        badge: "NEW",
        image: "/palmeiras-verde.jpeg",
        description:
            "Modelo premium do Palmeiras 2026",
        featured: false,
        sizes: ["M", "G", "GG"],
    },

    {
        id: 10,
        name: "PSG - Away 25/26",
        slug: "psg-preto",
        team: "PSG",
        category: "Europeus",
        season: "26",
        price: 89.90,
        badge: "LIMITED",
        image: "/psg-preto.jpeg",
        description:
            "Modelo premium alternativa do PSG 2025",
        featured: true,
        sizes: ["P", "M", "G", "GG", "XGG"],
    },

    {
        id: 11,
        name: "Roma - Away 20/21",
        slug: "roma-bege",
        team: "Roma",
        category: "Europeus",
        season: "26",
        price: 89.90,
        badge: "LIMITED",
        image: "/roma-bege.jpeg",
        description:
            "Modelo premium da Roma 2020",
        featured: false,
        sizes: ["M", "G"],
    },

    {
        id: 12,
        name: "São Paulo - Away 26/27",
        slug: "sao-paulo-branco",
        team: "São Paulo",
        category: "Brasileiros",
        season: "26",
        price: 89.90,
        badge: "NEW",
        image: "/saopaulo-branco.jpeg",
        description:
            "Modelo premium do São Paulo 2026",
        featured: false,
        sizes: ["P", "M", "G", "GG"],
    },

    {
        id: 13,
        name: "Vasco Da Gama - Home 26/27",
        slug: "vasco-preto-26",
        team: "Vasco da Gama",
        category: "Brasileiros",
        season: "26",
        price: 89.90,
        badge: "NEW",
        image: "/vasco-preto-26.png",
        description:
            "Modelo premium Vasco da Gama 2026",
        featured: true,
        sizes: ["G", "GG", "XGG"],
    },
];