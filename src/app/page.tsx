"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MediaPreloader from "@/components/MediaPreloader";
import Hero from "@/../public/Images/hero.webp";
import ThemeButton from "@/components/ThemeBtn";
import Home_menu_section from "@/components/Home_menu_section";
import InstagramComponent from "@/components/InstagramComponent";
import Reviews from "@/components/Reviews";
import FAQSection from "@/components/FAQ_section";
import LocationComponent from "@/components/OurLocation";
import Featuring from "@/components/featuring";

const Home = React.memo(function Home() {
  const [heroLoaded, setHeroLoaded] = React.useState(false);

  React.useEffect(() => {
    // Simple analytics: log page load
    if (typeof window !== 'undefined') {
      (window as any).__pageLoaded = true;
      // You could send analytics here
    }
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.warn(`Scroll target not found: #${sectionId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <div className="p-[10px]">
      <Header onClick={() => { /* handle header click here or leave empty */ }} />

      <div className="sm:h-[20px]" />

      {/* hero img section */}
      <div id="Home" className="h-[550px] sm:h-[500px] w-full overflow-hidden rounded-[36px] relative">
        <div className="px-[20px] pb-8 sm:px-[40px] h-full flex flex-col items-start justify-end gap-2.5 bg-black/55 backdrop-blur-[13px]">
          <div className="text-[var(--tt-color-text-gray)] opacity-80 text-normal1 sm:text-normal2 sm:font-bold border-l-3 border-primary-dark pl-[20px]">
            Serving the Best Fried Chicken in Waikiki
          </div>
          <div className="text-[var(--tt-color-text-gray)] font-creato-black font-semibold text-[32px] sm:text-h2 lg:text-h1  sm:font-medium leading-[1.2]">
            Fresh, juicy chicken
            <br />
            and island flavors&nbsp;
            <br className="hidden md:block" />
            just steps from Waikiki Beach!
            <br />
          </div>
          {/* Preloader for hero image */}
          <MediaPreloader
            src={typeof Hero === "string" ? Hero : (Hero.src ?? "")}
            alt="Home Page Image"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-[36px] -z-10"
            onLoaded={() => setHeroLoaded(true)}
          />
          {/* Only show overlays if heroLoaded */}
          {heroLoaded && (
            <>
              <div className="absolute bg-black/20 top-0 left-0 w-full h-full object-cover rounded-[36px] -z-9" />
              <div className="absolute top-0 left-0 w-full h-full object-cover rounded-[36px] -z-9"
                style={{
                  background: "linear-gradient(59deg, rgb(13 13 13 / 30%) 20%, rgb(13 13 13 / 20%) 40%, rgb(13 13 13 / 15%) 60%, rgba(0, 0, 0, 0) 100%)"
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="h-[100px]" />

      {/* section 2 */}
      <div id="Menu" className="w-full flex items-center justify-center text-center flex-col">
        <div className="text-h3 sm:text-h2 text-[var(--tt-color-text-gray)] w-full">
          Try our most popular items
        </div>
        <div className="text-normal mt-[20px]" style={{ color: 'var(--tt-color-text-gray)' }}>
          Treat yourself to our must-try dishes that everyone in Honolulu is talking about.
        </div>
        <div className="mt-[20px] gap-[20px] flex flex-col sm:flex-row items-center justify-center">
          <ThemeButton
            text="Get Directions"
            href="https://maps.app.goo.gl/zZErazVdPgZMqJLeA"
            textClassname="pr-[8px] pl-[14px] text-white"
            className="bg-primary-dark border-2 hover:bg-primary border-primary-dark hover:border-primary transition-colors"
          />

          <ThemeButton
            text="Our Menu"
            textClassname="pr-[8px] pl-[14px]"
            textColor="text-[var(--tt-color-text-gray)]"
            className="bg-transparent border-2 transition-all duration-200 hover:bg-primary-dark hover:text-white border-white/10 hover:border-primary-dark"
            iconBgColor="bg-white/10"
            iconBgHoverColor="border-primary-dark"
            iconColor="text-white"
            iconHoverColor="text-white"
            href="/Menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
          />

        </div>
      </div>

      <div className="h-[100px]" />

      {/* Menu Section */}

      <div>
        <Home_menu_section />
      </div>


      <div className="h-[100px]" />

      {/* Instagram Section */}
      <InstagramComponent />

      {/* reviews */}
      <div className="h-[100px]" />
      <div id="Reviews">
        <Reviews />
      </div>

      {/* Featuring and Story */}
      <div className="h-[100px]" />
      <div id="Featuring">
        <Featuring />
      </div>
      {/* Story section now included in Featuring */}

      <div className="h-[100px]" />
      {/* FAQ */}
      <div id="FAQ's">
        <FAQSection />
      </div>

      <div className="h-[100px]" />
      {/* OUR LOCATION */}

      <div id="Location">
        <LocationComponent />
      </div>

      <div className="h-[100px]" />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
});

export default Home;
