// src/app/robots.ts

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/admin/",
                "/api/",
                "/login",
                "/minha-conta/"
            ]
        },
        sitemap: "https://voxeleleven.com.br/sitemap.xml"
    };
}