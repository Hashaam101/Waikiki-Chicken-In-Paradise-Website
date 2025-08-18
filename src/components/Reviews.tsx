import Image from 'next/image';
import ReviewCard from './ReviewCard';
import pattern from "@/../public/Svgs/BG Pattern.svg";
import ThemeButton from './ThemeBtn';

const Reviews = () => {
  return (
    <div className="relative"
        style={{
        overflow: "hidden",
        minHeight: '644px',
        alignSelf: "stretch",
        borderRadius: "36px",
        background: "var(--Site-Black-10, rgba(13, 13, 13, 0.10))",
        }}
    >
        <div className="absolute h-full w-full">
        <Image
            src={pattern}
            alt="bg pattern"
            fill
            className="object-cover -z-20 opacity-50"
        />
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
            <div className="text-h4 sm:text-h3 md:text-h2 font-bold text-primary-dark w-full text-center ">
            What our Customers are Saying
            </div>

            <div className="sm:text-normal1 md:text-h5 text-primary-dark w-full text-center font-medium mt-[20px]">
            Check out our most recent reviews!
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReviewCard 
            starCount={5}
            reviewText="Third time visiting here this year (first time in the new location) and we absolutely love it! The food is authentic and homey! Just like what I can get at home in Taiwan."
            reviewerName="April Chu"
            profileImage="https://lh3.googleusercontent.com/a-/ALV-UjUi1p4TdiHVTA7mNDjsqpvNxhv0Is_F9GXP77WcG1ZLi5Kc2Hrw=s64-c-rp-mo-ba2-br100"
            />
            
            <ReviewCard 
            starCount={4}
            reviewText="This place tasted like home! I could NOT recommend it enough. I've been searching so long for a great Taiwanese spot in town and this is gonna be the one. "
            reviewerName="Jhonny B."
            profileImage="https://lh3.googleusercontent.com/a-/ALV-UjUS07sVOCdDJIYcbP7-Tsz4RF6rudORo5JwZqSEQ7gadZxxmyJW=s64-c-rp-mo-ba3-br100"
            />
            
            <ReviewCard 
            starCount={5}
            reviewText="This place did not disappoint!!!! Since I came right at opening, got to meet the owner and mind master of the operations. "
            reviewerName="Dianna Kuo"
            profileImage="https://lh3.googleusercontent.com/a/ACg8ocJ5Q7OoufyEXbaXvBj19D0zYa0QkSGpKSIncicmQY-GOH84Dw=s64-c-rp-mo-ba3-br100"
            />
        </div>

        <div className='z-10'>
            <ThemeButton
                text='Give Us a Review'
                href='https://g.page/r/CQLXR1PKE02SEAI/review'
                textClassname="pr-[8px] pl-[14px]"
            />
        </div>

    </div>
    </div>
  );
};

export default Reviews;