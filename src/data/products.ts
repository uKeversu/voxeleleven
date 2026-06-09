// src/data/products.ts

import { Product } from "@/types/product";

const estoque = (
    P = 0,
    M = 0,
    G = 0,
    GG = 0
) => ({
    P,
    M,
    G,
    GG,
});

export const products: Product[] = [

    {
        id: 1,
        name: "Brasil - Home 26/27",
        slug: "brasil-amarela-26",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 119.90,
        badge: "NEW",
        image: "/brasil-home-26-27.jpg",
        description:
            "Modelo premium da seleção brasileira 2026",
        featured: true,
        stock: estoque(3, 12, 10, 7)
    },

    {
        id: 2,
        name: "Brasil - Away 22/23",
        slug: "brasil-dourada",
        team: "Brasil",
        category: "Seleções",
        season: "22",
        price: 99.90,
        badge: "LIMITED",
        image: "/brasil-dourada.jpeg",
        description:
            "Edição especial dourada da seleção brasileira 2022",
        featured: true,
        stock: estoque(0, 4, 0, 0)
    },

    {
        id: 3,
        name: "Argentina - Home 26/27",
        slug: "argentina-azul-branco",
        team: "Argentina",
        category: "Seleções",
        season: "26",
        price: 99.90,
        badge: "NEW",
        image: "/argentina-azul-branco.png",
        description:
            "Modelo premium da seleção argentina 2026",
        featured: false,
        stock: estoque(0, 1, 1, 0)
    },

    {
        id: 4,
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
        stock: estoque(0, 0, 1, 1)
    },

    {
        id: 5,
        name: "Corinthians - Retrô 98",
        slug: "corinthians-retro",
        team: "Corinthians",
        category: "Retrô",
        season: "Retrô",
        price: 99.90,
        badge: "RETRO",
        image: "/corinthians-retro.PNG",
        description:
            "Modelo premium retrô do Corinthians 1998",
        featured: false,
        stock: estoque(2, 0, 0, 0)
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
        stock: estoque(0, 2, 0, 0)
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
        stock: estoque(2, 0, 0, 0)
    },

    {
        id: 8,
        name: "AC Milan - Retrô 2002",
        slug: "milan-retro",
        team: "Milan",
        category: "Retrô",
        season: "2002",
        price: 99.90,
        badge: "RETRO",
        image: "/milan-retro.jpeg",
        description:
            "Modelo premium retrô do Milan 2002 Kaká",
        featured: true,
        stock: estoque(3, 4, 5, 2)
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
        stock: estoque(2, 0, 1, 3)
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
        featured: false,
        stock: estoque(2, 0, 0, 0)
    },

    {
        id: 11,
        name: "Roma - Away 20/21",
        slug: "roma-bege",
        team: "Roma",
        category: "Europeus",
        season: "26",
        price: 99.90,
        badge: "LIMITED",
        image: "/roma-bege.jpeg",
        description:
            "Modelo premium da Roma 2020",
        featured: true,
        stock: estoque(0, 2, 0, 0)
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
        stock: estoque(1, 3, 2, 1)
    },

    {
        id: 13,
        name: "Vasco Da Gama - Home 26/27",
        slug: "vasco-home-26-27",
        team: "Vasco da Gama",
        category: "Brasileiros",
        season: "26",
        price: 89.90,
        badge: "NEW",
        image: "/vasco-home-26-27.jpg",
        description:
            "Modelo premium Vasco da Gama 2026",
        featured: true,
        stock: estoque(3, 0, 0, 0)
    },

    {
        id: 14,
        name: "Manchester United - Away 24/25",
        slug: "manchester-united-away-24-25",
        team: "Manchester United",
        category: "Europeus",
        season: "24",
        price: 119.90,
        badge: "LIMITED",
        image: "/manchester-united-away-24-25.png",
        description:
            "Modelo premium alternativo do Manchester United 2024",
        featured: true,
        stock: estoque(3, 4, 2, 0)
    },

    {
        id: 15,
        name: "Vasco Da Gama - Away 26/27",
        slug: "vasco-away-26-27",
        team: "Vasco da Gama",
        category: "Brasileiros",
        season: "26",
        price: 89.90,
        badge: "NEW",
        image: "/vasco-away-26-27.jpg",
        description:
            "Modelo premium alternativo do Vasco da Gama 2026",
        featured: false,
        stock: estoque(1, 0, 0, 2)
    },

    {
        id: 16,
        name: "Santos - Away 25/26",
        slug: "santos-away-25-26",
        team: "Santos",
        category: "Brasileiros",
        season: "25",
        price: 89.90,
        badge: "NEW",
        image: "/santos-away-25-26.jpg",
        description:
            "Modelo premium alternativo do Santos 2025",
        featured: false,
        stock: estoque(0, 0, 0, 2)
    },

    {
        id: 17,
        name: "Fluminense - Away 25/26",
        slug: "fluminense-away-25-26",
        team: "Fluminense",
        category: "Brasileiros",
        season: "25",
        price: 89.90,
        badge: "LIMITED",
        image: "/fluminense-away-25-26.jpg",
        description:
            "Modelo premium alternativo do Fluminense 2025",
        featured: false,
        stock: estoque(2, 0, 0, 0)
    },

    {
        id: 18,
        name: "Flamengo - Away 25/26",
        slug: "flamengo-away-25-26",
        team: "Flamengo",
        category: "Brasileiros",
        season: "25",
        price: 89.90,
        badge: "BEST SELLER",
        image: "/flamengo-away-25-26.jpg",
        description:
            "Modelo premium alternativo do Flamengo 2025",
        featured: true,
        stock: estoque(1, 2, 3, 2)
    },

    {
        id: 19,
        name: "Corinthians - Away 25/26",
        slug: "corinthians-away-25-26",
        team: "Corinthians",
        category: "Brasileiros",
        season: "25",
        price: 89.90,
        badge: "NEW",
        image: "/corinthians-away-25-26.jpg",
        description:
            "Modelo premium alternativo do Corinthians 2025",
        featured: false,
        stock: estoque(3, 2, 5, 3)
    },

    {
        id: 20,
        name: "Portugal - Home 26/27",
        slug: "portugal-home-26-27",
        team: "Portugal",
        category: "Seleções",
        season: "26",
        price: 99.90,
        badge: "NEW",
        image: "/portugal-home-26-27.jpg",
        description:
            "Modelo premium da seleção portuguesa 2026",
        featured: false,
        stock: estoque(1, 2, 2, 2)
    },

    {
        id: 21,
        name: "Brasil - Retrô 98",
        slug: "brasil-retro-98",
        team: "Brasil",
        category: "Retrô",
        season: "1998",
        price: 99.90,
        badge: "RETRO",
        image: "/brasil-retro-98.jpg",
        description:
            "Modelo premium retrô da seleção brasileira 1998",
        featured: false,
        stock: estoque(1, 2, 3, 1)
    },

    {
        id: 22,
        name: "Roma - Home 25/26",
        slug: "roma-home-25-26",
        team: "Roma",
        category: "Europeus",
        season: "25",
        price: 89.90,
        badge: "LIMITED",
        image: "/roma-home-25-26.jpg",
        description:
            "Modelo premium titular da Roma 2025",
        featured: false,
        stock: estoque(0, 1, 2, 0)
    },

    {
        id: 23,
        name: "Brasil - Polo Preta 26/27",
        slug: "brasil-polo-preta-26-27",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 99.90,
        badge: "PREMIUM",
        image: "/brasil-polo-preta-26-27.jpeg",
        description:
            "Camisa polo premium da Seleção Brasileira com visual moderno e acabamento sofisticado",
        featured: false,
        stock: estoque(0, 1, 3, 0)
    },

    {
        id: 24,
        name: "Liverpool - Goleiro 25/26",
        slug: "liverpool-goleiro-25-26",
        team: "Liverpool",
        category: "Europeus",
        season: "25",
        price: 89.90,
        badge: "NEW",
        image: "/liverpool-goleiro-25-26.jpg",
        description:
            "Modelo de goleiro do Liverpool 2025/26 com design marcante e tecido dry fit premium",
        featured: false,
        stock: estoque(0, 1, 0, 0)
    },

    {
        id: 25,
        name: "Brasil - Azul 26/27",
        slug: "brasil-azul-26-27",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 99.90,
        badge: "NEW",
        image: "/brasil-azul-26-27.jpeg",
        description:
            "Camisa reserva da Seleção Brasileira 2026 com visual clássico em azul vibrante",
        featured: false,
        stock: estoque(2, 0, 0, 0)
    },

    {
        id: 26,
        name: "Real Madrid - Away 25/26",
        slug: "real-madrid-away-25-26",
        team: "Real Madrid",
        category: "Europeus",
        season: "25",
        price: 89.90,
        badge: "LIMITED",
        image: "/real-madrid-away-25-26.jpeg",
        description:
            "Modelo away do Real Madrid 2025/26 com detalhes premium e caimento confortável",
        featured: true,
        stock: estoque(1, 2, 3, 2)
    },

    {
        id: 27,
        name: "Brasil - Away 26/27",
        slug: "brasil-away-26-27",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 119.90,
        badge: "NEW",
        image: "/brasil-away-26-27.jpeg",
        description:
            "Versão visitante da Seleção Brasileira 2026 com tecido leve e acabamento premium",
        featured: false,
        stock: estoque(1, 3, 5, 2)
    },

    {
        id: 28,
        name: "Cruzeiro - Away 25/26",
        slug: "cruzeiro-away-25-26",
        team: "Cruzeiro",
        category: "Brasileiros",
        season: "25",
        price: 89.90,
        badge: "LIMITED",
        image: "/cruzeiro-away-25-26.jpeg",
        description:
            "Camisa visitante do Cruzeiro 2025/26 inspirada na tradição celeste do clube",
        featured: false,
        stock: estoque(2, 0, 0, 0)
    },

    {
        id: 29,
        name: "Flamengo - Home 26/27",
        slug: "flamengo-home-26-27",
        team: "Flamengo",
        category: "Brasileiros",
        season: "26",
        price: 99.90,
        badge: "BESTSELLER",
        image: "/flamengo-home-26-27.jpeg",
        description:
            "Modelo titular do Flamengo 2026/27 com listras clássicas e acabamento premium",
        featured: false,
        stock: estoque(3, 6, 5, 7)
    },

    {
        id: 30,
        name: "Liverpool - Home 25/26",
        slug: "liverpool-home-25-26",
        team: "Liverpool",
        category: "Europeus",
        season: "25",
        price: 89.90,
        badge: "LIMITED",
        image: "/liverpool-home-25-26.jpeg",
        description:
            "Camisa titular do Liverpool 2025/26 com design clássico e detalhes sofisticados",
        featured: false,
        stock: estoque(2, 0, 0, 0)
    },

    {
        id: 31,
        name: "Brasil - Home 26/27 - DTF",
        slug: "brasil-home-26-27-dtf",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 99.90,
        badge: "NEW",
        image: "/brasil-amarela-dtf-26-27.jpeg",
        description:
            "Versão com símobolo em DTF da camisa da seleção brasileira 2026",
        featured: false,
        stock: estoque(0, 0, 0, 0)
    },

    {
        id: 32,
        name: "Brasil - Dryfit Preta",
        slug: "brasil-dryfit-preta",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 59.90,
        badge: "DRY-FIT",
        image: "/brasil-dryfit-preta.jpeg",
        description:
            "Camisa dryfit preta inspirada na Seleção Brasileira com visual urbano e moderno",
        featured: false,
        stock: estoque(0, 1, 0, 0)
    },

    {
        id: 33,
        name: "Brasil - Dryfit Verde",
        slug: "brasil-dryfit-verde",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 59.90,
        badge: "DRY-FIT",
        image: "/brasil-dryfit-verde.jpg",
        description:
            "Camisa dryfit verde da Seleção Brasileira com tecido leve e visual esportivo premium",
        featured: false,
        stock: estoque(0, 0, 1, 0)
    },

    {
        id: 34,
        name: "Brasil - Dryfit Azul",
        slug: "brasil-dryfit-azul",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 59.90,
        badge: "DRY-FIT",
        image: "/brasil-dryfit-azul.jpg",
        description:
            "Modelo dryfit azul inspirado na tradição da Seleção Brasileira com conforto e respirabilidade",
        featured: false,
        stock: estoque(2, 0, 0, 0)
    },

    {
        id: 35,
        name: "Brasil - Dryfit Branca",
        slug: "brasil-dryfit-branca",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 59.90,
        badge: "DRY-FIT",
        image: "/brasil-dryfit-branca.jpg",
        description:
            "Camisa dryfit branca com design clean e acabamento moderno inspirado na Seleção Brasileira",
        featured: false,
        stock: estoque(0, 0, 0, 1)
    },

    {
        id: 36,
        name: "Brasil - Dryfit Amarela",
        slug: "brasil-dryfit-amarela",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 59.90,
        badge: "DRY-FIT",
        image: "/brasil-dryfit-amarela.jpg",
        description:
            "Versão dryfit amarela da Seleção Brasileira com tecido premium e estilo esportivo marcante",
        featured: false,
        stock: estoque(0, 4, 2, 3)
    },

    {
        id: 37,
        name: "Brasil - Polo amarela 26/27",
        slug: "brasil-polo-amarela-26-27",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 99.90,
        badge: "PREMIUM",
        image: "/brasil-polo-amarela-26-27.jpg",
        description:
            "Camisa polo premium da Seleção Brasileira com visual moderno e acabamento sofisticado",
        featured: false,
        stock: estoque(0, 2, 1, 3)
    },

    {
        id: 38,
        name: "Arsenal - Away 25/26",
        slug: "arsenal-away-25-26",
        team: "Arsenal",
        category: "Europeus",
        season: "26",
        price: 89.90,
        badge: "LIMITED",
        image: "/arsenal-away-25-26.jpg",
        description:
            "Camisa alternativa do Arsenal 25/26 com visual ousado, tecido leve e acabamento premium.",
        featured: false,
        stock: estoque(0, 2, 0, 0)
    },

    {
        id: 39,
        name: "Grêmio - Home 25/26",
        slug: "gremio-home-25-26",
        team: "Grêmio",
        category: "Brasileiros",
        season: "25/26",
        price: 89.90,
        badge: "NEW",
        image: "/gremio-home-25-26.jpg",
        description:
            "Camisa home do Grêmio 25/26 com listras tradicionais, tecido leve e acabamento premium.",
        featured: false,
        stock: estoque(0, 1, 0, 0)
    },

    {
        id: 40,
        name: "Borussia - Away 25/26",
        slug: "borussia-home-24-25",
        team: "Borussia Dortmund",
        category: "Europeus",
        season: "24/25",
        price: 89.90,
        badge: "LIMITED",
        image: "/borussia-home-24-25.jpg",
        description:
            "Camisa do Borussia 24/25 com design moderno, caimento confortável e detalhes premium.",
        featured: false,
        stock: estoque(0, 1, 1, 0)
    },

    {
        id: 41,
        name: "Vasco - Retro 2000",
        slug: "vasco-retro-2000",
        team: "Vasco da Gama",
        category: "Retrô",
        season: "2000",
        price: 199.90,
        badge: "CLASSIC",
        image: "/vasco-retro-2000.jpg",
        description:
            "Camisa retrô do Vasco inspirada na temporada 2000, com visual clássico e acabamento premium.",
        featured: false,
        stock: estoque(0, 1, 0, 0)
    },

    {
        id: 42,
        name: "Fluminense - Home 25/26",
        slug: "fluminense-home-26-27",
        team: "Fluminense",
        category: "Brasileiros",
        season: "26/27",
        price: 89.90,
        badge: "NEW",
        image: "/fluminense-home-26-27.jpg",
        description:
            "Camisa home do Fluminense 26/27 com visual tradicional, tecido leve e ótimo conforto.",
        featured: false,
        stock: estoque(1, 0, 0, 0)
    },

    {
        id: 43,
        name: "Ajax- Away 25/26",
        slug: "ajax-home-25-26",
        team: "Ajax",
        category: "Europeus",
        season: "25/26",
        price: 89.90,
        badge: "LIMITED",
        image: "/ajax-home-25-26.jpg",
        description:
            "Camisa do Ajax 25/26 com design moderno, tecido respirável e acabamento premium.",
        featured: false,
        stock: estoque(1, 0, 1, 0)
    },

    {
        id: 44,
        name: "Brasil - Polo Branca 26/27",
        slug: "brasil-polo-branca-26-27",
        team: "Brasil",
        category: "Seleções",
        season: "26",
        price: 99.90,
        badge: "PREMIUM",
        image: "/brasil-polo-branca-26-27.jpg",
        description:
            "Camisa polo premium da Seleção Brasileira com visual moderno e acabamento sofisticado",
        featured: false,
        stock: estoque(0, 0, 0, 0)
    },
];