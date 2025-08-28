// app/layout.tsx (Server Component - NO "use client")

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TabTitleHandler from "@/components/TabTitleHandler";
import Script from 'next/script';
// import ClientLayout from "@/components/ClientLayout"; // Import the new client wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- METADATA STAYS HERE ---
export const metadata: Metadata = {
  title: "Waikiki Chicken In Paradise | Best Fried Chicken Waikiki Beach",
  description: "Serving the Best Fried Chicken in Waikiki. Fresh, juicy chicken and island flavors just steps from Waikiki Beach! Try our most popular items and see why everyone in Honolulu is talking about us.",
  keywords: [
    "fried chicken", "waikiki chicken", "fish and chips", "food truck waikiki", "Restaurant" , "fast food waikiki", "best fried chicken honolulu", "crispy chicken sandwich", "loaded fries", "hawaiian flavors", "dine-in", "take away", "reservations", "waikiki beach", "honolulu food truck"
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Waikiki Chicken In Paradise | Best Fried Chicken Waikiki Beach",
    description: "Serving the Best Fried Chicken in Waikiki. Fresh, juicy chicken and island flavors just steps from Waikiki Beach! Try our most popular items and see why everyone in Honolulu is talking about us.",
    url: "https://waikiki-chicken-paradise.vercel.app/",
    siteName: "Waikiki Chicken In Paradise",
    images: [
      {
        url: "/Images/Logo.webp",
        width: 400,
        height: 400,
        alt: "Waikiki Chicken In Paradise Logo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "https://waikiki-chicken-paradise.vercel.app/",
    title: "Waikiki Chicken In Paradise | Fried Chicken | Fish & Chips | Fast Food | Food Truck Waikiki",
    description: "Serving the Best Fried Chicken in Waikiki. Fresh, juicy chicken and island flavors just steps from Waikiki Beach! Try our most popular items and see why everyone in Honolulu is talking about us.",
    images: ["/Images/Logo.webp"]
  }
};
// --- END METADATA ---


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;


  return (
  <html lang="en" className="dark">
      <head>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TabTitleHandler />

        {children}
        {/* <ClientLayout>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ClientLayout> */}


        {gaMeasurementId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                   window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}
                   gtag('js', new Date());
                   gtag('config', '${gaMeasurementId}');
                 `
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}