import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandSection from "@/components/BrandSection";
import PromoCarrousel from "@/components/PromoCarrousel";

export default function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Hero />
      <PromoCarrousel />
      <Categories />
      <BrandSection />
      <FeaturedProducts />
    </>
  );
}