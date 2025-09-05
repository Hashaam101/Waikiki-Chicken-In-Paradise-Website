import Image from 'next/image';
import ReviewCard from './ReviewCard';
// For BG Pattern
// import pattern from "@/../public/Svgs/BG Pattern.svg";
import ThemeButton from './ThemeBtn';
import ReviewPopup from './ReviewPopup';
import { useState } from 'react';

const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJCeDZi7pzAHwR2-opn5R1-Is";

const Reviews = () => {
    const [showPopup, setShowPopup] = useState(false);

    // Handles rating and feedback logic
    const handleReviewSubmit = (rating: number, feedback?: string) => {
        // Do not close the popup here; let ReviewPopup handle it after showing confirmation
        if (rating >= 4) {
            // Redirect to Google review page (cannot pre-select stars due to Google limitations)
            window.open(GOOGLE_REVIEW_URL, '_blank');
        }
    };

    return (
        <div className="relative"
            style={{
                overflow: "hidden",
                minHeight: '644px',
                alignSelf: "stretch",
                borderRadius: "36px",
                background: "var(--primary-dark)",
            }}
        >
            <div className="absolute h-full w-full bg-primary-dark -z-20">
                {/* <Image
            src={pattern}
            alt="bg pattern"
            fill
            className="object-cover -z-20 opacity-50"
        /> */}
            </div>

            <div className='py-[46px] px-[15px] sm:py-[76px] sm:px-[52px]'
                style={{
                    display: 'flex',
                    width: '',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '42px',
                }}
            >

                <div>
                    <div className="
            text-center text-h2 sm:text-h3 md:text-h2 text-white w-full">
                        What our Customers are Saying
                    </div>

                    <div
                        className="sm:text-normal1 md:text-h5 w-full text-center font-medium mt-[20px]"
                        style={{ color: 'color-mix(in oklab, var(--color-white) 50%, transparent)' }}
                    >
                            Here are some reviews from our <a href='https://maps.app.goo.gl/1PtPGhkGc5cPMqbm9' target='_blank' rel='noopener noreferrer' className='hover:underline'>Google Maps!</a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ReviewCard
                        starCount={5}
                        reviewText="Great food, delicious crispy chicken (tried the sando and chicken curry). Both recommended. Hawaiian pineapple hotdog was a perfect balance of spicy and sweet! Very satisfying!"
                        reviewerName="Anzonette Pittet"
                        redirect="https://maps.app.goo.gl/6VQi5GkTPUhaH7Q67"
                        profileImage="https://lh3.googleusercontent.com/a-/ALV-UjXVju4wT3qwJoEJjmSEZJ1B6gMFVQDQHWs5dwxpbVxTCNAGA5gcYg=w49-h49-p-rp-mo-ba2-br100"
                    />

                    <ReviewCard
                        starCount={5}
                        reviewText="Tried the Fried Chicken Sando and was blown away by the flavors. The radish pickles gave it a tangy crunch, and I picked the Pineapple Ginger sauce super unique and refreshing! The portion was generous."
                        reviewerName="Nat View"
                        redirect='https://maps.app.goo.gl/nnxk38NXfxj8S6nR8'
                        profileImage="https://lh3.googleusercontent.com/a-/ALV-UjVZp7V7rCzpDKb7KvtQTJxMhPI-Quvk7QvzuQzwBj2pJpM4tWBB=w49-h49-p-rp-mo-ba3-br100"
                    />

                    <ReviewCard
                        starCount={5}
                        reviewText="I got the loco moco fried chicken plate. The salad was tasty; the chicken was crispy outside and soft inside; the egg was perfect. Our food came in a reasonable amount of time. The gravy was amazing."
                        reviewerName="Patt Promsit"
                        redirect='https://maps.app.goo.gl/EJkBnjWVj5Hf9nnf7'
                        profileImage="https://lh3.googleusercontent.com/a-/ALV-UjXGwFtBMZLbY2NUv0qTojknmbOWcb_h8L4pqAuYtajzDfQIK_s=w49-h49-p-rp-mo-br100"
                    />
                </div>

                <div className='z-10'>
                    <ThemeButton
                        text="Give Us a Review"
                        textClassname="pr-[8px] pl-[14px]"
                        textColor="text-grey"
                        className="bg-white border-2 hover:border-2 hover:bg-white"
                        iconBgColor="bg-black/5"
                        iconBgHoverColor="bg-primary-dark/10"
                        iconColor="text-primary"
                        iconHoverColor="text-primary-dark"
                        onClick={() => setShowPopup(true)}
                    />
                </div>
                {showPopup && (
                    <ReviewPopup
                        onClose={() => setShowPopup(false)}
                        onSubmit={handleReviewSubmit}
                    />
                )}

            </div>
        </div>
    );
};

export default Reviews;