import AboutSection from "@/components/sections/AboutSection";
import AlinaShowcase from "@/components/sections/AlinaShowcase";
import BrandMarquee from "@/components/sections/BrandMarquee";
import CareSplitScroll from "@/components/sections/CareSplitScroll";

import CategoryGrid from "@/components/sections/CategoryGrid";
import CollectionMarquee from "@/components/sections/CollectionMarquee";
import { Hero } from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Subscribe from "@/components/sections/Subcribe";
import Telier from "@/components/sections/Telier";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-[#FFFCF9]">
      <Hero />
      <BrandMarquee />
      <CollectionMarquee />
      <CategoryGrid />
      <AlinaShowcase />
      <Telier />
      <ProductShowcase/>
      <CareSplitScroll/>
      <AboutSection/>
      <Subscribe/>
    </div>
  );
}
