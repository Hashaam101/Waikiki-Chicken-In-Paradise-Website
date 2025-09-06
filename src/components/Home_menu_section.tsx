"use client";

import { useCallback, useRef, useState } from 'react'

import Image from 'next/image';

import arrow from '@/../public/Svgs/Arrow.svg';
import ScrollableMenuCards, { ScrollableMenuRef } from './Home_menu_card';
import { products } from '@/data/products';

export default function Home_menu_section() {
	// Pull a subset of products for the homepage
  const popularItems = products.filter(p => p.showOnHomepage);


  const scrollableMenuRef = useRef<ScrollableMenuRef>(null);
  const [isMenuAtEnd, setIsMenuAtEnd] = useState(false);

  const handleScrollEndChange = useCallback((isAtEnd: boolean) => {
    console.log("Parent received isAtEnd:", isAtEnd);
    setIsMenuAtEnd(isAtEnd);
  }, []); // Empty dependency array means this function identity is stable

  // Function to trigger scroll in the child component
  const handleNextClick = () => {
      if (scrollableMenuRef.current) {
          scrollableMenuRef.current.scrollNext();
      }
  };

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className='relative w-full h-full overflow-hidden sm:h-[460px] rounded-l-[12px] bg-primary-dark flex flex-col sm:flex-row p-[20px] group'>
      <div
          className={`hidden sm:block absolute -bottom-60 -left-60 group-hover:-bottom-18 group-hover:-left-12 w-80 h-80 bg-black/10 rounded-full pointer-events-none transition-all duration-500 ease-in-out -z-0`}
      />
			<div className='h-full flex px-[8px] py-[26px] flex-col z-10'>
    <div className='text-h3 text-white text-start leading-[1.2]'>
      Best Sellers
      <br />
      Waikiki Chicken In Paradise
    </div>
    <div className='text-white/50 text-normal1 mt-[5px]'>
      Fried Chicken Loco Moco • Fish & Chips • Loaded Fries • Chicken Sandwich
    </div>

				<div className='flex-1'/>
				
				<div className='text-normal3 text-white'>
					Scroll through to explore our best-sellers
				</div>
				<div className='hover:bg-white/20 group-hover:translate-x-5 transition-all duration-400 rounded-full w-fit aspect-square flex items-center justify-center' 
          onClick={handleNextClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            rotate: isMenuAtEnd ? '180deg' : '0deg',
          }}
        >
					<Image
						src={arrow}
						alt="Arrow"
						className="w-[24px] h-[24px] m-[10px] cursor-pointer"
					/>
				</div>
			</div>

      <div className='overflow-x-hidden h-fit flex justify-center'>
        <ScrollableMenuCards
          ref={scrollableMenuRef}
          menuItems={popularItems}
          onScrollEndChange={handleScrollEndChange}
        />
      </div>
    </div>
)
}

// Removed unused local component to reduce duplication
