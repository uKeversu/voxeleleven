// src/app/produto/[slug]/page.tsx

import { notFound } from "next/navigation";

import { getProducts } from "@/lib/products";
import ProductContent from "@/components/ProductContent";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProdutoPage({
    params,
}: Props) {
    const { slug } = await params;

    const products = await getProducts();

    const product = products.find(
        (p) => p.slug === slug
    );

    if (!product) {
        notFound();
    }

    const relatedProducts = products
        .filter(
            (p) =>
                p.category === product.category &&
                p.slug !== product.slug
        )
        .slice(0, 4);

    return (
        <ProductContent
            product={product}
            relatedProducts={relatedProducts}
        />
    );
}