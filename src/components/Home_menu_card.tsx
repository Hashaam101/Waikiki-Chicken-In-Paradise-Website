import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Image from 'next/image';
import MediaPreloader from './MediaPreloader';

import placeholderImg from "@/../public/Images/menu.png";
import type { Product as MenuItem } from '@/data/products';

export interface ScrollableMenuRef {
  scrollNext: () => void;
}

interface ScrollableMenuCardsProps {
  menuItems: MenuItem[];
  onScrollEndChange?: (isAtEnd: boolean) => void;
}

const ScrollableMenuCards = forwardRef<ScrollableMenuRef, ScrollableMenuCardsProps>(
  ({ menuItems, onScrollEndChange }, ref) => {

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAtEnd, setIsAtEnd] = useState(false);
    // Store the timeout ID to clear it if component unmounts during scroll debounce
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // --- Function to scroll to the next card or loop back ---
    const scrollNext = useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container || menuItems.length === 0) return;

      const { scrollLeft, scrollWidth, clientWidth } = container;

      const firstCard = container.children[0] as HTMLElement | undefined;
      const cardWidth = firstCard?.offsetWidth ?? clientWidth; 
      const gap = 16; 
      const scrollAmount = cardWidth + gap; 
      const threshold = 10;
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - threshold;

      if (isNearEnd) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, [menuItems.length]); 

    useImperativeHandle(ref, () => ({
      scrollNext,
    }));

    const checkScrollPosition = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        const threshold = 10;
        const currentIsAtEnd = scrollLeft + clientWidth >= scrollWidth - threshold;

        setIsAtEnd(prevIsAtEnd => {
            if (prevIsAtEnd !== currentIsAtEnd) {
                if (onScrollEndChange) {
                    onScrollEndChange(currentIsAtEnd);
                }
                return currentIsAtEnd;
            }
            return prevIsAtEnd;
        });

    }, [onScrollEndChange]); 


     const handleScroll = useCallback(() => {
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            checkScrollPosition();
        }, 150);
     }, [checkScrollPosition]);



    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      container.addEventListener('scroll', handleScroll);

      // Only check scroll position after mount, not during render
      setTimeout(() => {
        checkScrollPosition();
      }, 0);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [menuItems, handleScroll, checkScrollPosition]); // Rerun if items or handlers change



  return (
    <div className="w-full bg-primary-dark text-white px-2 sm:px-6 pt-3 pb-0">

      {/* Scrollable Cards Section */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={e => {
          // Only start drag if not on selectable text
          if ((e.target as HTMLElement).closest('.selectable-text')) return;
          isDragging.current = true;
          startX.current = e.pageX - (scrollContainerRef.current?.getBoundingClientRect().left || 0);
          scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
          document.body.style.userSelect = "none";
        }}
        onMouseLeave={() => {
          isDragging.current = false;
          document.body.style.userSelect = "";
        }}
        onMouseUp={() => {
          isDragging.current = false;
          document.body.style.userSelect = "";
        }}
        onMouseMove={e => {
          if (!isDragging.current) return;
          e.preventDefault();
          const x = e.pageX - (scrollContainerRef.current?.getBoundingClientRect().left || 0);
          const walk = (x - startX.current) * 1;
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
          }
        }}
      >
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="w-[300px] sm:w-[386px] text-black rounded-[12px] overflow-hidden flex-shrink-0"
          >
            {/* Card Image */}
            <div className="relative w-full cursor-grab active:cursor-grabbing" style={{ maxHeight: '239.99px', height: '239.99px' }}>
              {/* Preloader overlays the image until loaded, matching shape and fill */}
              <MediaPreloader
                src={item.image}
                alt={item.name}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-[12px]"
                style={{ borderRadius: '12px', maxHeight: '239.99px', height: '239.99px' }}
              />
              <Image 
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-[12px]"
                style={{ borderRadius: '12px' }}
                draggable={false}
              />
            </div>

            {/* Card Content */}
            <div className="mt-[-12px] z-10 relative bg-white rounded-[12px] pb-[12px] px-[16px]">
              <div className="text-h5 font-bold py-3 selectable-text" style={{ cursor: "text", userSelect: "text" }}>{item.name}</div>
              <div className="text-normal4 text-black/60 selectable-text" style={{ cursor: "text", userSelect: "text" }}>{item.description}</div>
              {/* Price and Points */}
              <div className="flex mt-1 items-center pb-3">
                <span className="text-normal4 text-primary-dark font-bold selectable-text" style={{ cursor: "text", userSelect: "text" }}>$ {item.price}</span>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={`text-normal4 px-[12px] py-[3px] rounded-full bg-black/[0.03] text-black/50 selectable-text`}
                    style={{ cursor: "text", userSelect: "text" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>
        {`
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;     /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;             /* Chrome, Safari and Opera */
        }
      `}
      </style>

    </div>
  );
}
);

export default ScrollableMenuCards;