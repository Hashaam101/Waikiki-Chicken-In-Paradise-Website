// location component

"use client";

import React from 'react';


const LocationComponent = () => {

  const locationData = {
    title: "Kapuni St, Honolulu",
    subtitle: "Waikiki Chicken In Paradise",
    mapQuery: "Waikiki Chicken In Paradise, 208a Kapuni St, Honolulu, HI 96815, United States",
    contact: {
      phone: "(808) 219-5749",
      email: "email@email.com"
    },
    openingTime: "Timing",
    extraInfo: "",
    actionLinkDirections: {
      text: "Get Directions",
      url: "https://maps.google.com/?q=Waikiki Chicken In Paradise, 208a Kapuni St, Honolulu, HI 96815, United States"
    },
    actionLinkContact: {
      text: "Contact",
      url: "https://maps.google.com/?q=Waikiki Chicken In Paradise, 208a Kapuni St, Honolulu, HI 96815, United States"
    },
    openingHours: [
      { day: "Daily   -----------", hours: "11:00 AM – 9:00 PM" }
    ]
  };

  // Create the Google Maps embed URL
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(locationData.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  
  return (
  <div className="sm:mx-[70px] mx-0">
  <h2 className="text-h2 mb-[32px] sm:text-left text-center">Our Location</h2>
      <div className="relative">
        {/* Map Container */}
        <div className="w-full h-[400px] rounded-[14px] overflow-hidden bg-white border border-gray-500 location-map-container">
          <iframe
            width="100%"
            height="100%"
            id="gmap_canvas"
            src={mapUrl}
            aria-label={`Map showing location of ${locationData.subtitle}`}
            style={{ background: '#fff', filter: 'none', border: 'none' }}
          ></iframe>
        </div>
        {/* Responsive width/height for mobile */}
        <style>{`
          @media (max-width: 770px) {
            .location-map-container {
              max-width: 95vw !important;
              width: 95vw !important;
              height: 340px !important;
            }
          }
        `}</style>

        {/* Overlay Container (desktop only) */}
        <div className="hidden absolute inset-0 z-20 p-[16px] md:flex flex-wrap justify-between pointer-events-none">
          <div className='flex flex-col gap-2'>
            <div className="flex flex-col h-fit w-[264px] px-[24px] py-[21px] items-start gap-[10px] self-stretch rounded-[30px] border-primary-dark/25 border bg-white/40 shadow-black/15 shadow-[6px] backdrop-blur-[14px] z-99">
              <div>
                {locationData.title && <div className="text-normal2 font-medium text-black/50">{locationData.title}</div>}
                <p className="text-normal2 font-medium text-black">{locationData.subtitle}</p>
              </div>
              <div className='w-full'>
                <button
                  className='h-[25px] w-full flex items-center justify-center bg-primary rounded-full text-white z-100 cursor-pointer pointer-events-auto'
                  onClick={() => {
                    window.open(`https://www.google.com/maps?q=${encodeURIComponent(locationData.mapQuery)}`, '_blank');
                  }}
                >
                  Directions
                </button>
              </div>
            </div>
            <div className="flex flex-col h-fit w-[220px] px-[24px] py-[21px] items-start gap-[10px] self-stretch rounded-[30px] border-primary-dark/25 border bg-white/40 shadow-black/15 shadow-[6px] backdrop-blur-[14px]">
              <div>
                <div className='text-normal4 text-black/50'>Address</div>
                <div className='text-normal4 text-black leading-[24px] mb-[10px]'>
                  {locationData.mapQuery}
                </div>
                <div className='text-normal4 text-black/50'>Contact</div>
                <div className='text-normal4 text-black leading-[24px]'>
                  {locationData.contact?.phone}
                  <br />
                  {locationData.contact?.email}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-fit w-[264px] px-[24px] py-[21px] items-end gap-[10px] self-stretch rounded-[30px] border-primary-dark/25 border bg-white/40 shadow-black/15 shadow-[6px] backdrop-blur-[14px]">
            <div className="w-full">
              <h4 className="text-normal4 font-medium text-center text-gray-800 mb-2">Timings</h4>
              <div className="">
                {locationData.openingHours.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className='w-full flex items-center justify-between'>
                      <p className="text-normal4 text-black/60">{item.day}</p>
                      <p className="text-normal4 text-black/60">{item.hours}</p>
                    </div>
                  </React.Fragment>
                ))}
                <p className="text-normal4 text-black/60 mt-2">{locationData.extraInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationComponent;