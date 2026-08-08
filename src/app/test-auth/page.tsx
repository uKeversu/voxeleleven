// src/app/test-auth/page.tsx

"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function TestAuthPage() {
    const [result, setResult] = useState("");

    async function testRoleProtection() {
        const supabase = createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            setResult("Nenhum usuário autenticado.");
            return;
        }

        const { data, error } = await supabase
            .from("profiles")
            .update({
                role: "admin",
            })
            .eq("id", user.id)
            .select();

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if (error) {
            setResult(
                `Bloqueado corretamente: ${error.message}`
            );
            return;
        }

        if (!data || data.length === 0) {
            setResult(
                "Bloqueado corretamente: nenhuma linha foi alterada."
            );
            return;
        }

        setResult(
            `ATENÇÃO: uma linha foi alterada! Resultado: ${JSON.stringify(data)}`
        );
    }

    return (
        <div style={{ padding: 40 }}>
            <h1>Teste de segurança 🔐</h1>

            <button onClick={testRoleProtection}>
                Tentar alterar role para admin
            </button>

            <pre style={{ marginTop: 30 }}>
                {result}
            </pre>
        </div>
    );
}