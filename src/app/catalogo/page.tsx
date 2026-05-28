import { Suspense } from "react";
import CatalogoClient from "./CatalogoClient";

export default function CatalogoPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <CatalogoClient />
        </Suspense>
    );
}