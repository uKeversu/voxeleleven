// src/app/test-supabase/page.tsx

import { getProducts } from "@/lib/products";
import { getCurrentUser } from "@/lib/supabase/auth";

export default async function TestSupabasePage() {
    const products = await getProducts();

    const { user, profile } = await getCurrentUser();

    return (
        <div style={{ padding: 40 }}>
            <h1>Teste Supabase 🎉</h1>

            <h2>Autenticação</h2>

            {user ? (
                <>
                    <p>
                        <strong>Usuário:</strong>{" "}
                        {profile?.name}
                    </p>

                    <p>
                        <strong>E-mail:</strong>{" "}
                        {user.email}
                    </p>

                    <p>
                        <strong>Role:</strong>{" "}
                        {profile?.role}
                    </p>

                    <p>
                        <strong>ID:</strong>{" "}
                        {user.id}
                    </p>
                </>
            ) : (
                <p>Nenhum usuário autenticado.</p>
            )}

            <hr />

            <h2>Produtos</h2>

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