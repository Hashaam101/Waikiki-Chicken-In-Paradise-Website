// // components/ClientLayout.tsx

// "use client"; 

// import React, { useState, useEffect } from 'react'; // Import React and hooks
// import Header from '@/components/Header';
// // import SubscriptionPopup, { PopupConfig } from '@/components/SubscriptionPopup';

// const mealKeywayOrderUrl = "https://order.mealkeyway.com/customer/release/index?mid=674a336c694d346a53507453652b6d614b742b7345673d3d&utm_source=google&rwg_token=AAiGsoYpD58QwquOM6IMU90kRl7Z3Vb_vkjRnP4hMqMNDNB4aFqMwAmKRhCCAe8TPcMRH72Qc2irT-q3EAOXEg1OP0_L8QaiuA%3D%3D#/main";

// const automaticPopupConfig: PopupConfig = {
//     mode: 'automatic',
//     title: 'Stay Updated!',
//     message: 'Subscribe to our newsletter for the latest news and offers.',
//     submitButtonText: 'Subscribe Now'
// };

// const redirectPopupConfig: PopupConfig = {
//     mode: 'redirect',
//     title: 'WARNING!!!',
//     message: 'Entering Your Email May Cause Serious Regular Cravings',
//     submitButtonText: 'Spice Me Up!',
//     targetUrl: mealKeywayOrderUrl
// };


// export default function ClientLayout({
//     children,
// }: {
//     children: React.ReactNode
// }) {
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [popupConfig, setPopupConfig] = useState<PopupConfig | null>(null);
//     const [hasMounted, setHasMounted] = useState(false);

//     useEffect(() => {
//         setHasMounted(true); // Indicate component has mounted
//     }, []);

//     useEffect(() => {
//         if (!hasMounted) return;

//         const timer = setTimeout(() => {
//             const alreadySubscribed = localStorage.getItem('newsletterSubscribed') === 'true';

//             let dismissedAutomaticPopup = false;
//             try {
//                dismissedAutomaticPopup = sessionStorage.getItem('automaticPopupClosedThisSession') === 'true';
//             } catch (error) {
//                console.error("Could not read from sessionStorage:", error);
//             }


//             if (!alreadySubscribed && !isPopupOpen && !dismissedAutomaticPopup) {
//                 console.log("Layout Timer: Opening automatic popup...");
//                 setPopupConfig(automaticPopupConfig);
//                 setIsPopupOpen(true);
//             } else {
//                 console.log("Layout Timer: Automatic popup skipped (already subscribed or popup open).");
//             }
//         }, 10000);
//         return () => clearTimeout(timer);

//     }, [hasMounted, isPopupOpen]);

//     const handleRedirectFlowClick = () => {
//         const alreadySubscribed = localStorage.getItem('newsletterSubscribed') === 'true';

//         if (alreadySubscribed) {
//             console.log("Layout Button: Already subscribed, redirecting...");
//             window.location.href = mealKeywayOrderUrl;
//         } else {
//             console.log("Layout Button: Opening redirect popup...");
//             setPopupConfig(redirectPopupConfig);
//             setIsPopupOpen(true);
//         }
//     };

//     return (
//         <>
//             <Header onClick={handleRedirectFlowClick} />

//             {hasMounted && (
//                 <SubscriptionPopup
//                     isOpen={isPopupOpen}
//                     setIsOpen={setIsPopupOpen}
//                     config={popupConfig}
//                 />
//             )}

//             <main>{children}</main>

//         </>
//     );
// }