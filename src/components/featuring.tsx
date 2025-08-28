
"use client";
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MediaPreloader from './MediaPreloader';
import StarIcon from './StarIcon';

type FeaturedDishSectionProps = {
  imageSrc: string;
  alt: string;
  title: string;
  description: string | ReactNode;
  imagePriority?: boolean;
  reverse?: boolean;
  imageClass?: string;
  containerClass?: string;
  textClass?: string;
};

const FeaturedDishSection: React.FC<FeaturedDishSectionProps> = ({
  imageSrc,
  alt,
  title,
  description,
  imagePriority = false,
  reverse = false,
  imageClass = '',
  containerClass = '',
  textClass = '',
}) => {
  return (
    <motion.div
      className={`mt-16 md:mt-[100px] px-4 lg:px-[80px] ${containerClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className={`mx-auto w-full max-w-[1240px] flex flex-col lg:flex-row lg:justify-between items-center gap-8 lg:gap-0${reverse ? ' lg:flex-row-reverse' : ''}`}>
        <div className={`relative aspect-square max-w-[540px] max-h-[540px] block w-[60%] h-auto lg:w-[400px] lg:h-[400px] xl:w-[540px] xl:h-[540px] shrink-0 rounded-[24px] object-cover ${imageClass}`}>
          <MediaPreloader
            src={imageSrc}
            alt={alt}
            borderRadius="24px"
            className="w-full h-full object-cover"
          />
          <Image
            src={imageSrc}
            alt={alt}
            width={540} height={540} priority={imagePriority}
            className="w-full h-full object-cover rounded-[24px]"
          />
        </div>
        <div className={`flex w-full lg:w-fit max-w-[560px] flex-col items-center lg:items-start gap-[10px] md:gap-[20px] mt-8 lg:mt-0 lg:pl-8 ${textClass}`}>
          <div className="self-stretch text-h3 xl:text-h2 text-[var(--tt-color-text-gray)] text-center lg:text-left">
            {title}
          </div>
          <div className="text-normal4 md:text-normal3 text-[var(--tt-color-text-gray)] opacity-80 text-center lg:text-left">
            {description}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Animation variants for framer-motion
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};



function Featuring() {
  // Mobile scroll activation for star icons
  const starsContainerRef = useRef<HTMLDivElement | null>(null);
  const [starsActive, setStarsActive] = useState(false);

  useEffect(() => {
    const el = starsContainerRef.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const viewportCenter = viewportH / 2;
      // Activation band: +/- 20% of viewport height around center
      const band = viewportH * 0.2;
      const elementCenter = rect.top + rect.height / 2;
      const withinBand = Math.abs(elementCenter - viewportCenter) <= band && rect.top < viewportH && rect.bottom > 0;
      setStarsActive(withinBand);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <div className='w-full'>
      <motion.div
        className='w-full max-w-[1000px] mx-auto px-4 md:px-0'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionVariants}
      >
        <div className='text-center text-h2 text-[var(--tt-color-text-gray)] mb-12 md:mb-[80px]'>
          <div className=''>Featuring</div>
          <div className='text-normal2 sm:text-h5 mt-1 mx-2x'>Fresh, Quick, and Flavorful</div>
        </div>
        <div ref={starsContainerRef} className={`grid grid-cols-2 gap-x-4 gap-y-8 md:flex md:justify-between md:items-center md:gap-0 self-stretch text-[var(--tt-color-text-gray)] group ${starsActive ? 'text-[#FFD84D]' : ''}`}>
          <div className='flex flex-col items-center gap-[10px] w-full group'>
            <div className={`h-[22px] w-[22px] aspect-square transition-colors duration-300 ${starsActive ? 'text-[#FFD84D]' : 'text-[var(--tt-color-text-gray)] group-hover:text-[#FFD84D]'}`}>
              <StarIcon size={22} className='text-current' hoverRays active={starsActive} />
            </div>
            <div className='text-normal3 text-center'>Groups & Catering</div>
          </div>
          <div className='h-[80px] w-[1px] hidden md:block transition-all duration-300 group-hover:rotate-8 group-hover:scale-y-110 group-hover:bg-[#FFD84D]/50' style={{ background: 'color-mix(in oklab, var(--color-white) 25%, transparent)' }}></div>
          <div className='flex flex-col items-center gap-[10px] w-full group'>
            <div className={`h-[22px] w-[22px] aspect-square transition-colors duration-300 ${starsActive ? 'text-[#FFD84D]' : 'text-[var(--tt-color-text-gray)] group-hover:text-[#FFD84D]'}`}>
              <StarIcon size={22} className='text-current' hoverRays active={starsActive} />
            </div>
            <div className='text-normal3 text-center'>Crispiest Chicken</div>
          </div>
          <div className="col-span-2 md:hidden"></div>
          <div className='h-[80px] w-[1px] hidden md:block transition-all duration-300 group-hover:rotate-8 group-hover:scale-y-110 group-hover:bg-[#FFD84D]/50' style={{ background: 'color-mix(in oklab, var(--color-white) 25%, transparent)' }}></div>
          <div className='flex flex-col items-center gap-[10px] w-full group'>
            <div className={`h-[22px] w-[22px] aspect-square transition-colors duration-300 ${starsActive ? 'text-[#FFD84D]' : 'text-[var(--tt-color-text-gray)] group-hover:text-[#FFD84D]'}`}>
              <StarIcon size={22} className='text-current' hoverRays active={starsActive} />
            </div>
            <div className='text-normal3 text-center'>Family Friendly</div>
          </div>
          <div className='h-[80px] w-[1px] hidden md:block transition-all duration-300 group-hover:rotate-8 group-hover:scale-y-110 group-hover:bg-[#FFD84D]/50' style={{ background: 'color-mix(in oklab, var(--color-white) 25%, transparent)' }}></div>
          <div className='flex flex-col items-center gap-[10px] w-full group'>
            <div className={`h-[22px] w-[22px] aspect-square transition-colors duration-300 ${starsActive ? 'text-[#FFD84D]' : 'text-[var(--tt-color-text-gray)] group-hover:text-[#FFD84D]'}`}>
              <StarIcon size={22} className='text-current' hoverRays active={starsActive} />
            </div>
            <div className='text-normal3 text-center'>Dine-in & Take Away</div>
          </div>
        </div>
      </motion.div>

      <div className="h-[100px]" />
      <div className='text-center text-h2 text-[var(--tt-color-text-gray)] mb-12 md:mb-[80px]'>
        <div className=''>Best Fried Chicken Honolulu & Waikiki Beach</div>
        <div className='text-normal2 sm:text-h5 mt-1 mx-2x'>Juicy fried chicken and fish & chips made fresh daily — a fast food favorite near you!</div>
      </div>

      {/* Featured Dishes */}
      <FeaturedDishSection
        imageSrc="/Images/featuring/1.webp"
        alt="Chicken Sandwich"
        title="Chicken Sandwich"
        description="Crispy chicken with Hawaiian-flavored sauce — perfect for a quick bite in Waikiki! Served with delicious fries and mac salad on the side."
        reverse={false}
      />

      <FeaturedDishSection
        imageSrc="/Images/featuring/2.webp"
        alt="Fish & Chips"
        title="Fish & Chips"
        description="Crispy fish, golden fries, fresh lemon — classic fast food in Honolulu. Served with mac salad and Tartar Sauce."
        imagePriority={true}
        reverse={true}
      />

      <FeaturedDishSection
        imageSrc="/Images/featuring/3.webp"
        alt="Fried Chicken Loco Moco"
        title="Fried Chicken Loco Moco"
        description="Crispy fried chicken and a savory beef patty served on steamed rice, topped with rich brown gravy and a perfectly fried egg — a hearty Hawaiian comfort classic."
        reverse={false}
      />

      <FeaturedDishSection
        imageSrc="/Images/featuring/4.webp"
        alt="Loaded Fries"
        title="Loaded Fries"
        description="Golden fries topped with cheese, bacon, and our signature Hawaiian sauces"
        imagePriority={true}
        reverse={true}
      />

      {/* Story Section as FeaturedDishSection */}
      <FeaturedDishSection
        imageSrc="/Images/featuring/5.webp"
        alt="Story about Waikiki Chicken In Paradise"
        title="Story Behind Waikiki Chicken In Paradise"
        description={
          <>
            Waikiki Chicken In Paradise is a local favorite, known for bringing the flavors of Hawaii to the heart of Waikiki Beach. Founded by passionate food lovers, the restaurant quickly became famous for its juicy fried chicken, creative Hawaiian-inspired sauces, and friendly island hospitality.<br /><br />
            Whether you’re a tourist or a local, you’ll find comfort classics and new favorites on the menu. The team prides itself on using fresh ingredients and serving up generous portions, making it a must-visit for anyone craving delicious fast food in Honolulu.<br /><br />
            From crispy chicken sandwiches to loaded fries and the iconic Loco Moco, Waikiki Chicken In Paradise is dedicated to sharing the spirit of aloha — one bite at a time!
          </>
        }
        reverse={false}
      />
    </div>
  )
}

export default Featuring;