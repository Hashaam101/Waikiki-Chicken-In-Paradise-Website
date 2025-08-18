"use client";

import React, { useState } from 'react'
import { AnimatedCTAButton } from './CTA_header_btn'
import logo from "@/../public/Images/logo.webp"
import Image from 'next/image';
import { AnimatedMenuButton } from './Menu_Header_btn';
import { usePathname, useRouter } from 'next/navigation';

function Header( {onClick} : {onClick: () => void}) {

  const router = useRouter();
  const pathname = usePathname(); 

    const scrollToSection = (sectionId: string) => {
        if (pathname === '/') {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                console.warn(`Scroll target not found on home page: #${sectionId}`);

            }
        } else {
            router.push('/');
            const handleScroll = () => {
              const section = document.getElementById(sectionId);
              if (section) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                console.warn(`Scroll target not found on home page: #${sectionId}`);
              }
              window.removeEventListener('DOMContentLoaded', handleScroll);
            };
            window.addEventListener('DOMContentLoaded', handleScroll);
            if (typeof onClick === 'function') {
              onClick();
            }
        }
    };


  return (
    <div className="p-[20px] w-full">
      
      <div className={`w-full grid grid-cols-2 md:grid-cols-3 items-center`}>
        {/* Left Section */}
        <div className="hidden md:flex justify-start">
            <AnimatedMenuButton
                menuItems={[
                    { name: "Home", onclick: () => { scrollToSection('Home') } },
                    { name: "Menu", onclick: () => { scrollToSection('Menu') } },
                    { name: "Reviews", onclick: () => { scrollToSection('Reviews') } },
                    { name: "Our Story", onclick: () => { scrollToSection('Story') } },
                    { name: "Featuring", onclick: () => { scrollToSection('Featuring') } },
                    { name: "FAQ's", onclick: () => { scrollToSection("FAQ's") } },
                    { name: "Location", onclick: () => { scrollToSection('Location') } }
                ]}
            />           
        </div>

        {/* Center Section (Always Centered) */}
        <div className={`flex justify-start md:justify-center`}>
          <div className=" text-white" onClick={() => router.push("/")}>
            <Image
              src={logo}
              alt="Seasons Taiwanese Eatery Logo"
              width={70}
              height={70}
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-end w-full">
            <AnimatedCTAButton onRedirectClick={onClick} onBlogClick={() => {router.push("/blogs")}}/>
        </div>
      </div>
    </div>
  )
}

export default Header



