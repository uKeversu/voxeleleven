// src/app/catalogo/page.tsx

import { Suspense } from "react";
import CatalogoClient from "./CatalogoClient";

import { getProducts } from "@/lib/products";

export default async function CatalogoPage() {
    const products = await getProducts();

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CatalogoClient products={products} />
        </Suspense>
    );
}