import React from "react";
import Image from "next/image";
import Logo from "@/assets/Images/Logo.webp";

const Footer = ({ scrollToSection }: { scrollToSection?: (sectionId: string) => void }) => (
    <footer className="w-full px-[10px] md:px-[50px] lg:px-[70px]" style={{ background: 'var(--tt-bg-color)', color: 'var(--tt-color-text-gray)' }}>
        <div className="text-h3 sm:text-h2 w-full">
            Waikiki Chicken In Paradise
        </div>
        <div className="mb-[32px] mx-2 text-normal2">
            Bubble tea and soufflé pancakes in Honolulu, featuring Waikiki Chicken In Paradise’s viral Coco Mango dessert.
        </div>
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 min-h-[100px] lg:grid-cols-3 gap-[10px] lg:gap-8">
                {/* Logo and Social Icons */}
                <div className="col-span-2 lg:col-span-1 mx-auto flex flex-row items-center lg:items-start gap-4">
                    <Image
                        src={Logo}
                        alt="Waikiki Chicken In Paradise Logo"
                        width={100}
                        height={100}
                        className="object-contain w-auto h-[200px] md:h-[230px] aspect-square rounded-full"
                    />
                    <div className="flex h-[120px] justify-evenly gap-[10px] flex-col my-auto max-w-100">
                        <a
                              href="https://www.instagram.com/waikikichickeninparadise/"
                              aria-label="Instagram"
                              className="min-w-[100px] p-2 py-4 h-full w-full items-center justify-center flex rounded-lg group transition-all"
                              style={{ background: 'color-mix(in oklab, var(--color-white) 5%, transparent)' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in oklab, black 30%, transparent)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'color-mix(in oklab, var(--color-white) 5%, transparent)'}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22 22"
                                fill="none"
                                style={{ color: 'var(--tt-color-text-gray)' }}
                            >
                                <defs>
                                    <linearGradient id="insta-gradient" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#f9ce34" />
                                        <stop offset="50%" stopColor="#ee2a7b" />
                                        <stop offset="100%" stopColor="#6228d7" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M15.9287 0H6.07107C2.72349 0 0 2.72362 0 6.07121V15.9288C0 19.2765 2.72349 22 6.07107 22H15.9287C19.2765 22 22 19.2764 22 15.9288V6.07121C22.0001 2.72362 19.2765 0 15.9287 0ZM20.0482 15.9288C20.0482 18.2002 18.2002 20.0481 15.9288 20.0481H6.07107C3.79979 20.0482 1.95195 18.2002 1.95195 15.9288V6.07121C1.95195 3.79992 3.79979 1.95195 6.07107 1.95195H15.9287C18.2001 1.95195 20.0481 3.79992 20.0481 6.07121V15.9288H20.0482Z"
                                    fill="currentColor"
                                    className="fill-opacity-60 group-hover:fill-[url(#insta-gradient)] group-hover:fill-opacity-100 transition-all"
                                />
                                <path
                                    d="M10.9999 5.33008C7.87405 5.33008 5.33105 7.87307 5.33105 10.9989C5.33105 14.1246 7.87405 16.6675 10.9999 16.6675C14.1257 16.6675 16.6687 14.1246 16.6687 10.9989C16.6687 7.87307 14.1257 5.33008 10.9999 5.33008ZM10.9999 14.7154C8.95048 14.7154 7.283 13.0482 7.283 10.9988C7.283 8.94925 8.95035 7.28189 10.9999 7.28189C13.0494 7.28189 14.7168 8.94925 14.7168 10.9988C14.7168 13.0482 13.0493 14.7154 10.9999 14.7154Z"
                                    fill="currentColor"
                                    className="fill-opacity-60 group-hover:fill-[url(#insta-gradient)] group-hover:fill-opacity-100 transition-all"
                                />
                                <path
                                    d="M16.9065 3.67773C16.5305 3.67773 16.161 3.82999 15.8954 4.09675C15.6285 4.36222 15.4751 4.73179 15.4751 5.10916C15.4751 5.48537 15.6287 5.85481 15.8954 6.12157C16.1609 6.38704 16.5305 6.54059 16.9065 6.54059C17.2839 6.54059 17.6522 6.38704 17.9189 6.12157C18.1857 5.85481 18.338 5.48524 18.338 5.10916C18.338 4.73179 18.1857 4.36222 17.9189 4.09675C17.6535 3.82999 17.2839 3.67773 16.9065 3.67773Z"
                                    fill="currentColor"
                                    className="fill-opacity-60 group-hover:fill-[url(#insta-gradient)] group-hover:fill-opacity-100 transition-all"
                                />
                            </svg>
                        </a>
                        <a
                              href="https://www.yelp.com/biz/waikiki-chicken-in-paradise-honolulu"
                              aria-label="Yelp"
                              className="p-2 py-4 h-full w-full items-center justify-center flex rounded-lg group transition-all"
                              style={{ background: 'color-mix(in oklab, var(--color-white) 5%, transparent)' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'color-mix(in oklab, black 30%, transparent)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'color-mix(in oklab, var(--color-white) 5%, transparent)'}
                        >
                            <svg height="22" width="22" viewBox="0 0 228.097 228.097" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--tt-color-text-gray)' }}>
                                <g>
                                    <path fill="currentColor" className="fill-opacity-60 group-hover:fill-[#C1272D] group-hover:fill-opacity-100 transition-all" d="M173.22,68.06c8.204,6.784,30.709,25.392,27.042,38.455c-1.696,5.867-8.434,7.746-13.43,9.579c-11.505,4.171-23.33,7.471-35.339,9.9c-9.717,1.971-30.48,6.279-26.63-10.909c1.512-6.646,6.875-12.284,11.184-17.28c8.846-10.404,17.876-21.405,28.555-29.93c0.871-0.688,1.925-0.871,2.842-0.733C169.232,66.41,171.386,66.502,173.22,68.06z" />
                                    <path fill="currentColor" className="fill-opacity-60 group-hover:fill-[#C1272D] group-hover:fill-opacity-100 transition-all" d="M161.119,205.197c-7.196-5.821-12.284-14.942-16.684-22.917c-4.309-7.7-11.092-17.876-12.238-26.813c-2.337-18.38,24.292-7.333,31.947-4.675c10.175,3.575,37.447,7.517,34.422,23.421c-2.521,12.971-18.151,28.784-31.213,30.801c-0.137,0.046-0.321,0-0.504,0c-0.046,0.046-0.092,0.092-0.137,0.137c-0.367,0.183-0.779,0.413-1.192,0.596C163.961,206.573,162.449,206.252,161.119,205.197z" />
                                    <path fill="currentColor" className="fill-opacity-60 group-hover:fill-[#C1272D] group-hover:fill-opacity-100 transition-all" d="M101.58,157.896c14.484-6.004,15.813,10.175,15.721,19.984c-0.137,11.688-0.504,23.421-1.375,35.063c-0.321,4.721-0.137,10.405-4.629,13.384c-5.546,3.667-16.225,0.779-21.955-1.008c-0.183-0.092-0.367-0.183-0.55-0.229c-12.054-2.108-26.767-7.654-28.188-18.792c-0.138-1.283,0.367-2.429,1.146-3.3c0.367-0.688,0.733-1.329,1.146-1.925c1.788-2.475,3.85-4.675,5.913-6.921c3.483-5.179,7.242-10.175,11.229-14.988C85.813,172.197,92.917,161.471,101.58,157.896z" />
                                    <path fill="currentColor" className="fill-opacity-60 group-hover:fill-[#C1272D] group-hover:fill-opacity-100 transition-all" d="M103.689,107.661c-21.13-17.371-41.71-44.276-52.344-69.164c-8.113-18.93,12.513-30.48,28.417-35.705c21.451-7.059,29.976-0.917,32.13,20.534c1.788,18.471,2.613,37.08,2.475,55.643c-0.046,7.838,2.154,20.488-2.429,27.547c0.733,2.888-3.621,4.95-6.096,2.979c-0.367-0.275-0.733-0.642-1.146-0.963C104.33,108.303,104.009,108.028,103.689,107.661z" />
                                    <path fill="currentColor" className="fill-opacity-60 group-hover:fill-[#C1272D] group-hover:fill-opacity-100 transition-all" d="M101.397,134.566c1.696,7.517-3.621,10.542-9.854,13.384c-11.092,4.996-22.734,8.984-34.422,12.284c-6.784,1.879-17.188,6.371-23.742,1.375c-4.95-3.758-5.271-11.596-5.729-17.28c-1.008-12.696,0.917-42.993,18.517-44.276c8.617-0.596,19.388,7.104,26.447,11.138c9.396,5.409,19.48,11.596,26.492,20.076C100.159,131.862,101.03,132.916,101.397,134.566z" />
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2 flex flex-row justify-evenly w-full mb-8 lg:mb-0">
                    {/* Contact Us */}
                    <div className="col-span-1 text-center h-full lg:mr-10 mr-0">
                        <div className="flex h-full flex-col items-center justify-center">
                            <div className="text-h5 font-semibold mb-[22px] text-[var(--tt-color-text-gray)]">Contact Us</div>
                            <div className="text-normal4 text-[var(--tt-color-text-gray)]">
                                <div className="flex flex-col items-center">
                                    <a
                                        href="tel:+18434788609"
                                        className="mb-[10px] hover:text-primary hover:underline cursor-pointer transition-colors"
                                    >
                                        +1 (843) 478-8609
                                    </a>
                                    <a
                                        href="mailto:chickeninparadise96815@gmail.com"
                                        className="hover:text-primary hover:underline cursor-pointer transition-colors"
                                    >
                                        chickeninparadise96815@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Quick Links */}
                    <div className="col-span-1 text-center h-full ">
                        <div className="flex h-full flex-col items-center justify-center">
                            <div className="text-h5 font-semibold mb-[22px] text-[var(--tt-color-text-gray)]">
                                Quick Links
                            </div>
                            <div className="text-normal4 text-[var(--tt-color-text-gray)]">
                                <div className="text-center grid grid-cols-2 gap-[10px]">
                                    <button onClick={() => scrollToSection && scrollToSection('Home')} className="hover:text-primary transition-colors cursor-pointer">
                                        <span className="hover:underline">Home</span>
                                    </button>
                                    <button onClick={() => scrollToSection && scrollToSection('Menu')} className="hover:text-primary transition-colors cursor-pointer">
                                        <span className="hover:underline">Menu</span>
                                    </button>
                                    <button onClick={() => scrollToSection && scrollToSection('Reviews')} className="hover:text-primary transition-colors cursor-pointer">
                                        <span className="hover:underline">Reviews</span>
                                    </button>
                                    <button onClick={() => scrollToSection && scrollToSection('Featuring')} className="hover:text-primary transition-colors cursor-pointer">
                                        <span className="hover:underline">Featuring</span>
                                    </button>
                                    <button onClick={() => scrollToSection && scrollToSection("FAQ's")} className="hover:text-primary transition-colors cursor-pointer">
                                        <span className="hover:underline">FAQ's</span>
                                    </button>
                                    <button onClick={() => scrollToSection && scrollToSection('Location')} className="hover:text-primary transition-colors cursor-pointer">
                                        <span className="hover:underline">Location</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="h-[60px]" />
        {/* Bottom Bar */}
        <div className="bg-primary rounded-full text-white w-[90%] mx-auto min-h-[37px] py-[10px] sm:px-[50px] md:px-[100px]">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-center text-normal4 gap-[20px]">
                <p className="hidden sm:block">
                    Waikiki Chicken In Paradise Inc. 2025 All Rights Reserved
                </p>
                <p className="text-nowrap">
                    Made with&nbsp;<a target="_blank" href="http://tableturnerr.com"><span className="hover:underline">TableTurnerr.com </span></a>
                </p>
            </div>
        </div>
        <div className="justify-between items-center text-center text-[10px] mt-1 flex sm:hidden">
            Waikiki Chicken In Paradise Inc. 2025 All Rights Reserved
        </div>
    </footer>
);

export default Footer;
