import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TabTitleHandler from "@/components/TabTitleHandler";
import Script from 'next/script';

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
  metadataBase: new URL("https://waikikichickeninparadise.com"),
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
    url: "https://waikikichickeninparadise.com/",
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
    site: "https://waikikichickeninparadise.com/",
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
  const gaMeasurementId = 'G-E7K6Z23GXM';


  return (
  <html lang="en" className="dark">
      <head>

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TabTitleHandler />

        {children}


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