// src/lib/products.ts

import { createClient } from
    "@/lib/supabase/server";

import {
    Product,
    ProductVariant,
} from "@/types/product";


export async function getProducts():
    Promise<Product[]> {

    const supabase =
        await createClient();


    /*
     * BUSCA PRODUTOS
     */

    const {
        data: products,
        error: productsError,
    } = await supabase
        .from("products")
        .select("*")
        .order(
            "id",
            {
                ascending: true,
            }
        );


    if (productsError) {

        console.error(
            "Erro ao buscar produtos:",
            productsError
        );

        throw new Error(
            "Não foi possível carregar os produtos."
        );
    }


    if (
        !products ||
        products.length === 0
    ) {
        return [];
    }


    /*
     * IDs DOS PRODUTOS
     */

    const productIds =
        products.map(
            (product) =>
                product.id
        );


    /*
     * BUSCA VARIANTES
     *
     * Agora buscamos o ID,
     * pois o checkout precisa
     * saber exatamente qual
     * variante está sendo comprada.
     */

    const {
        data: variants,
        error: variantsError,
    } = await supabase
        .from("product_variants")
        .select(
            "id, product_id, size, stock, reserved_stock"
        )
        .in(
            "product_id",
            productIds
        );


    if (variantsError) {

        console.error(
            "Erro ao buscar estoque:",
            variantsError
        );

        throw new Error(
            "Não foi possível carregar o estoque."
        );
    }


    /*
     * ESTOQUE DISPONÍVEL
     * POR PRODUTO
     */

    const stockByProduct:
        Record<
            number,
            Record<string, number>
        > = {};


    /*
     * VARIANTES
     * POR PRODUTO
     */

    const variantsByProduct:
        Record<
            number,
            ProductVariant[]
        > = {};


    variants?.forEach(
        (variant) => {

            /*
             * Inicializa estoque
             */

            if (
                !stockByProduct[
                variant.product_id
                ]
            ) {

                stockByProduct[
                    variant.product_id
                ] = {};
            }


            /*
             * Inicializa variantes
             */

            if (
                !variantsByProduct[
                variant.product_id
                ]
            ) {

                variantsByProduct[
                    variant.product_id
                ] = [];
            }


            /*
             * ESTOQUE REALMENTE
             * DISPONÍVEL
             */

            const availableStock =
                Math.max(
                    0,
                    Number(variant.stock) -
                    Number(
                        variant.reserved_stock
                    )
                );


            /*
             * Mantém o formato antigo
             *
             * Exemplo:
             *
             * stock: {
             *     P: 2,
             *     M: 1
             * }
             */

            stockByProduct[
                variant.product_id
            ][
                variant.size
            ] =
                availableStock;


            /*
             * Adiciona a variante
             *
             * Exemplo:
             *
             * variants: [
             *     {
             *         id: 123,
             *         size: "M",
             *         stock: 1
             *     }
             * ]
             */

            variantsByProduct[
                variant.product_id
            ].push({
                id:
                    Number(variant.id),

                size:
                    variant.size,

                stock:
                    availableStock,
            });
        }
    );


    /*
     * MONTA PRODUTOS
     */

    return products.map(
        (product) => ({
            id:
                product.id,

            name:
                product.name,

            slug:
                product.slug,

            team:
                product.team,

            category:
                product.category,

            season:
                product.season,

            price:
                Number(product.price),

            badge:
                product.badge ??
                undefined,

            image:
                product.image,

            description:
                product.description,

            featured:
                product.featured ??
                false,

            active:
                product.active,

            /*
             * Compatibilidade com
             * componentes existentes
             */

            stock:
                stockByProduct[
                product.id
                ] ?? {},

            /*
             * Necessário para
             * checkout seguro
             */

            variants:
                variantsByProduct[
                product.id
                ] ?? [],
        })
    );
}