"use client";

import { div } from 'framer-motion/client';
import { useCallback, useRef, useState } from 'react'

import Image from 'next/image';

import arrow from '@/../public/Svgs/Arrow.svg';
import ScrollableMenuCards, { ScrollableMenuRef } from './Home_menu_card';

import placeholderImg from "@/../public/Images/Product img 1.png";

export interface MenuItem {
  id: string;
  name: string;
  image: string;
  price: number;
  loyaltyPoints: number;
  description: string;
  tags: string[];
  isFavorite?: boolean;
}

export default function Home_menu_section() {
	
  const popularItems : MenuItem[] = [
    {
      id: '1',
      name: 'Fried Chicken Loco Moco',
      image: 'Images/ProductImg_FriedChickenLocoMoco.webp',
      price: 19.95,
      loyaltyPoints: 0,
      description: 'Juicy fried chicken on rice with gravy — a must-try Hawaiian favorite',
      tags: ['Chicken', 'Loco Moco', 'Sauce'],
      isFavorite: false,
    },
    {
      id: '2',
      name: 'Fish & Chips',
      image: 'Images/ProductImg_FishAndChips.webp',
      price: 17.95,
      loyaltyPoints: 0,
      description: 'Crispy fish and golden fries — a Honolulu classic',
      tags: ['Fish', 'Fries'],
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Loaded Fries',
      image: 'Images/ProductImg_LoadedFries.webp',
      price: 12.95,
      loyaltyPoints: 0,
      description: 'Golden fries with cheese, bacon, and our signature Hawaiian-flavored sauces',
      tags: ['Cheese', 'Bacon', 'Sauce', 'Chicken +$3.95'],
      isFavorite: false,
    },
    {
      id: '4',
      name: 'Chicken Sandwich',
      image: 'Images/ProductImg_ChickenSandwich.webp',
      price: 17.95,
      loyaltyPoints: 0,
      description: 'Freshly fried chicken, lettuce, and our Hawaiian-flavored sauce on a soft bun',
      tags: ['Chicken', 'Soft Bun', 'Sauce'],
      isFavorite: false,
    },
  ];


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

interface LocalScrollableMenuCardsProps {
  menuItems: MenuItem[];
  [key: string]: any;
}

const LocalScrollableMenuCards = ({ menuItems, ...props }: LocalScrollableMenuCardsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.getBoundingClientRect().left || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
    document.body.style.userSelect = "none";
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    document.body.style.userSelect = "";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.userSelect = "";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.getBoundingClientRect().left || 0);
    const walk = (x - startX.current) * 1; // scroll speed
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto gap-4 scrollbar-hide cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* Render your menu items here */}
      {menuItems.map(item => (
        <div key={item.id} className="min-w-[200px]">{item.name}</div>
      ))}
    </div>
  );
};

// Remove the export default for the local component
