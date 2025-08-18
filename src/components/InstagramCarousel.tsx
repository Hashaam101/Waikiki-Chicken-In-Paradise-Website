import React, { useState, useEffect, useRef, useCallback } from 'react';
import Slider from 'react-slick';
import { InstagramEmbed } from 'react-social-media-embed';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface InstagramCarouselProps {
    postUrls: string[];
}

const InstagramCarousel: React.FC<InstagramCarouselProps> = ({ postUrls }) => {
    const [slideHeight, setSlideHeight] = useState<number>(400);
    const sliderRef = useRef<Slider>(null);

    const calculateSlideHeight = useCallback((containerWidth: number) => {
        let newSlideHeight = 400;

        if (containerWidth < 480) {
            newSlideHeight = containerWidth;
        } else if (containerWidth < 768) {
            newSlideHeight = containerWidth * 0.8;
        } else {
            newSlideHeight = 400;
        }
        setSlideHeight(newSlideHeight);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const containerWidth = sliderRef.current?.innerSlider?.list?.offsetWidth || window.innerWidth * 0.95;
            calculateSlideHeight(containerWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [calculateSlideHeight]);

    const defaultSliderSettings = {
        infinite: postUrls.length > 1,
        dots: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    infinite: postUrls.length > 2,
                },
            },
            {
                breakpoint: 1080,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                    infinite: postUrls.length > 2,
                },
            },
            {
                breakpoint: 718,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true,
                    infinite: postUrls.length > 1,
                },
            },
        ],
        afterChange: () => {
            if (sliderRef.current) {
                // Access the slider's list element more safely
                const listElement = sliderRef.current.innerSlider?.list;
                if (listElement) {
                    calculateSlideHeight(listElement.offsetWidth);
                }
            }
        },
        onInit: () => {
          if (sliderRef.current) {
                const listElement = sliderRef.current.innerSlider?.list;
                if (listElement) {
                    calculateSlideHeight(listElement.offsetWidth);
                }
            }
        }
    };

    if (!postUrls || postUrls.length === 0) {
        return <p>No Instagram posts to display.</p>;
    }

    return (
        <div className="instagram-carousel-container w-[95%] mx-auto">
            <Slider ref={sliderRef} {...defaultSliderSettings}>
                {postUrls.map((url, index) => (
                    <div
                        key={index}
                        className="instagram-slide mx-auto"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            height: `${slideHeight}px`,
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ width: '100%', maxWidth: '', height: '700px' }} className="instagram-embed-container flex justify-center items-center">
                            <InstagramEmbed url={url} width="fit-content" />
                        </div>
                    </div>
                ))}
            </Slider>
            <style jsx global>{`
                .slick-prev,
                .slick-next {
                    z-index: 1;
                    height: 40px;
                    width: 40px;
                }
                .slick-prev:before,
                .slick-next:before {
                    font-size: 30px;
                    color: #B00C13;
                    opacity: 0.5;
                }
                .slick-prev:hover:before,
                .slick-next:hover:before {
                    opacity: 1;
                }
                .slick-prev {
                    left: -25px;
                }
                .slick-next {
                    right: -25px;
                }

                @media (max-width: 770px) {
                    .slick-prev{
                      display: hidden;
                    }

                    .slick-next {
                      display: hidden;
                    }
                }

                @media (max-width: 720px) {
                    .slick-prev{
                      left: 35px;
                    }

                    .slick-next {
                      right: 35px;    
                    }
                }

                    .slick-dots {
                        bottom: -40px;
                        color: #fff;
                    }

                    .slick-slide {
                        display: inline-block;
                        vertical-align: middle;
                        height: 100%;
                    }
                    .slick-slide > div {
                        margin: 0 10px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                    }
                    .slick-list {
                        margin: 0 -10px;
                    }

                    .slick-track {
                        display: flex;
                        align-items: stretch;
                        height: 100%;
                    }

                    .react-instagram-embed-frame {
                      height: 100% !important;
                    }
            `}</style>
        </div>
    );
};

export default InstagramCarousel;
