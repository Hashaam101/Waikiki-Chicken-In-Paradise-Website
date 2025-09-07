"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaPreloader from "@/components/MediaPreloader";
import HeroImg from "@/../public/Images/hero.webp";
import { products } from "@/data/products";
import Image from "next/image";
import ProductCard from '@/components/ProductCard';

const MenuPage = React.memo(function MenuPage() {
  const [heroLoaded, setHeroLoaded] = React.useState(false);
  const [maxCardHeight, setMaxCardHeight] = React.useState<number | null>(null);
  const gridRef = React.useRef<HTMLDivElement | null>(null);

  const measureHeights = React.useCallback(() => {
    const node = gridRef.current;
    if (!node) return;
    const cards = node.querySelectorAll<HTMLDivElement>('div.menu-card');
    if (!cards.length) return;
    const maxH = Array.from(cards).reduce((max, el) => Math.max(max, el.getBoundingClientRect().height), 0);
    setMaxCardHeight(maxH);
  }, []);

  React.useEffect(() => {
    // Measure on mount and on resize
    measureHeights();
    const raf = requestAnimationFrame(measureHeights);
    const onResize = () => measureHeights();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [measureHeights]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };



  return (
    <div className="p-[10px]">
      <Header onClick={() => {}} />

      <div className="sm:h-[20px]" />

      {/* hero section */}
      <div id="MenuHero" className="h-[320px] sm:h-[380px] md:h-[420px] w-full overflow-hidden rounded-[36px] relative">
        <div className="px-[20px] pb-8 sm:px-[40px] h-full flex flex-col items-start justify-end gap-2.5 bg-black/55 backdrop-blur-[13px]">
          <div className="text-[var(--tt-color-text-gray)] opacity-80 text-normal1 sm:text-normal2 sm:font-bold border-l-3 border-primary-dark pl-[20px]">
            Explore Our Full Menu
          </div>
          <div className="text-[var(--tt-color-text-gray)] font-creato-black font-semibold text-[32px] sm:text-h2  sm:font-medium leading-[1.2]">
            Crispy, fresh, and full of island flavor.
            <br />
            Find your new favorite today.
          </div>
          <MediaPreloader
            src={typeof HeroImg === "string" ? HeroImg : (HeroImg.src ?? "")}
            alt="Menu Page Image"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-[36px] -z-10"
            onLoaded={() => setHeroLoaded(true)}
          />
          {heroLoaded && (
            <>
              <div className="absolute bg-black/20 top-0 left-0 w-full h-full object-cover rounded-[36px] -z-9" />
              <div
                className="absolute top-0 left-0 w-full h-full object-cover rounded-[36px] -z-9"
                style={{
                  background:
                    "linear-gradient(59deg, rgb(13 13 13 / 30%) 20%, rgb(13 13 13 / 20%) 40%, rgb(13 13 13 / 15%) 60%, rgba(0, 0, 0, 0) 100%)",
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="h-[60px]" />

      <div id="Menu" className="w-full flex items-center justify-center text-center flex-col">
        <div className="text-h3 sm:text-h2 text-[var(--tt-color-text-gray)] w-full">
          Our Menu
        </div>
        <div className="text-normal mt-[12px] max-w-[900px] mx-auto" style={{ color: 'var(--tt-color-text-gray)' }}>
          From crispy classics to refreshing drinks and sweet treats, here’s everything we’re serving.
        </div>
      </div>

      <div className="h-[40px]" />

      {/* Products Grid */}
      <div className="w-full">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center"
          ref={gridRef}
        >
            {products.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                measureHeights={measureHeights}
              />
            ))}
        </div>
      </div>

      <div className="h-[80px]" />



      <Footer scrollToSection={scrollToSection} />
    </div>
  );
});

export default MenuPage;
