// scripts/generate-product-migration.ts

import fs from "fs";
import path from "path";

import { products } from "../src/data/products";

const outputPath = path.join(
    process.cwd(),
    "scripts",
    "migration-products.sql"
);

function escapeSql(value: string | null | undefined) {
    if (value === null || value === undefined) {
        return "NULL";
    }

    return `'${value.replace(/'/g, "''")}'`;
}

console.log("======================================");
console.log("VOXEL ELEVEN");
console.log("GERANDO MIGRAÇÃO");
console.log("======================================");

console.log(`Produtos encontrados: ${products.length}`);

if (products.length === 0) {
    throw new Error("Nenhum produto encontrado.");
}

const ids = products.map((product) => product.id);

const uniqueIds = new Set(ids);

if (uniqueIds.size !== ids.length) {
    throw new Error("Existem IDs de produtos duplicados.");
}

const productValues = products.map((product) => {
    return `(
        ${product.id},
        ${escapeSql(product.name)},
        ${escapeSql(product.slug)},
        ${escapeSql(product.team)},
        ${escapeSql(product.category)},
        ${escapeSql(product.season)},
        ${product.price},
        ${escapeSql(product.badge)},
        ${escapeSql(product.image)},
        ${escapeSql(product.description)},
        ${product.featured ?? false},
        true
    )`;
});

const variantValues = products.flatMap((product) => {
    return Object.entries(product.stock).map(
        ([size, stock]) => {
            return `(
                ${product.id},
                ${escapeSql(size)},
                ${stock}
            )`;
        }
    );
});

console.log(`Variantes encontradas: ${variantValues.length}`);

const sql = `
-- ============================================
-- VOXEL ELEVEN
-- Migração do catálogo estático
-- ============================================

BEGIN;

-- ============================================
-- PRODUTOS
-- ============================================

INSERT INTO products (
    id,
    name,
    slug,
    team,
    category,
    season,
    price,
    badge,
    image,
    description,
    featured,
    active
)
VALUES
${productValues.join(",\n")}
ON CONFLICT (id) DO NOTHING;


-- ============================================
-- VARIANTES / ESTOQUE
-- ============================================

INSERT INTO product_variants (
    product_id,
    size,
    stock
)
VALUES
${variantValues.join(",\n")}
ON CONFLICT (product_id, size) DO NOTHING;


-- ============================================
-- CORRIGE SEQUÊNCIA DO ID
-- ============================================

SELECT setval(
    pg_get_serial_sequence('products', 'id'),
    COALESCE((SELECT MAX(id) FROM products), 1)
);

COMMIT;
`;

fs.writeFileSync(outputPath, sql, "utf8");

console.log("======================================");
console.log("MIGRAÇÃO GERADA COM SUCESSO");
console.log("======================================");
console.log(`Produtos: ${products.length}`);
console.log(`Variantes: ${variantValues.length}`);
console.log(`Arquivo: ${outputPath}`);
console.log("======================================");