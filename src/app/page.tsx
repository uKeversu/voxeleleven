// src/app/page.tsx

import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandSection from "@/components/BrandSection";
import PromoCarrousel from "@/components/PromoCarrousel";

import { getProducts } from "@/lib/products";

export default async function Home() {

  const products = await getProducts();

  return (
    <>
      <Hero />

      <PromoCarrousel
        products={products}
      />

      <Categories />

      <BrandSection />

      <FeaturedProducts
        products={products}
      />
    </>
  );
}