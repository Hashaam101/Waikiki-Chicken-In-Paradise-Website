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
      name: 'Coco Mango',
      image: 'Images/ProductImg_CocoMango.webp',
      price: 8.95,
      loyaltyPoints: 0,
      description: 'Creamy coconut jelly topped with fresh mango chunks — our signature summer special.',
      tags: ['With Mango', 'Without Mango'],
      isFavorite: false,
    },
    {
      id: '2',
      name: "Brown Sugar Soufflé Pancakes",
      image: 'Images/ProductImg_BrownSugarSoufflePancakes.webp',
      price: 12.95,
      loyaltyPoints: 0,
      description: 'Fluffy Japanese-style soufflé pancakes drizzled with brown sugar syrup & boba pearls.',
      tags: ['Pancake', 'Boba Pearls', 'Dessert'],
      isFavorite: false,
    },
    {
      id: '3',
      name: 'Classic Milk Tea',
      image: 'Images/ProductImg_ClassicMilkTea.webp',
      price: 6.50,
      loyaltyPoints: 0,
      description: 'Smooth black tea with rich milk — the foundation of every great boba shop.',
      tags: ['Tea'],
      isFavorite: true,
    },
    {
      id: '4',
      name: 'Strawberry Soufflé Pancakes',
      image: 'Images/ProductImg_StrawberrySoufflePancakes.webp',
      price: 11.95,
      loyaltyPoints: 0,
      description: 'Light, airy pancakes topped with fresh strawberries & cream.',
      tags: ['Strawberry', 'Pancakes'],
      isFavorite: false,
    },
    {
      id: '5',
      name: 'Tropical Lava Flow',
      image: 'Images/ProductImg_TropicalLavaFlow.webp',
      price: 7.95,
      loyaltyPoints: 0,
      description: 'Refreshing fruit tea layered with strawberry, pineapple, and mango.',
      tags: ['Fruit Tea', 'Strawberry', 'Pineapple', 'Mango'],
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
					Trending in
					<br />
					Honolulu
				</div>
				<div className='text-white/50 text-normal1 mt-[5px]'>
					Boba • Bubble Tea • Soufflé Pancakes • Smoothies • Dessert Café
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
