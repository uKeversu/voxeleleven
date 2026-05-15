import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandSection from "@/components/BrandSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <BrandSection/>
      <FeaturedProducts />
    </>
  );
}