// src/app/test-supabase/page.tsx

import { getProducts } from "@/lib/products";

export default async function TestSupabasePage() {
    const products = await getProducts();

    return (
        <div style={{ padding: 40 }}>
            <h1>Produtos funcionando 🎉</h1>

            <p>
                Produtos encontrados: {products.length}
            </p>

            <pre>
                {JSON.stringify(
                    products.slice(0, 5),
                    null,
                    2
                )}
            </pre>
        </div>
    );
}