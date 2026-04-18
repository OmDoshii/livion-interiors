import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/ui/Preloader";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorOrb from "@/components/ui/CursorOrb";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://livioninteriors.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Livion Interiors — Premium Home Interior Designers in Hyderabad",
    template: "%s | Livion Interiors Hyderabad",
  },
  description:
    "Livion Interiors — top-rated residential interior designers in Hyderabad. Specialising in 2BHK, 3BHK & Villa turnkey interior design across Gachibowli, Kondapur, Jubilee Hills & Banjara Hills. Get a free consultation today.",
  keywords: [
    "interior designers in Hyderabad",
    "home interior design Hyderabad",
    "2BHK interior design Hyderabad",
    "3BHK interior design Hyderabad",
    "villa interior design Hyderabad",
    "turnkey interior design Hyderabad",
    "modular kitchen Hyderabad",
    "flat interior design Hyderabad",
    "apartment interior design Hyderabad",
    "luxury interior design Hyderabad",
    "affordable interior designers Hyderabad",
    "residential interior design Hyderabad",
    "interior designers Gachibowli",
    "interior designers Kondapur",
    "interior designers Jubilee Hills",
    "interior designers Banjara Hills",
    "interior designers HITEC City",
    "best interior designers Hyderabad",
    "Livion Interiors",
  ],
  authors: [{ name: "Livion Interiors", url: BASE_URL }],
  creator: "Livion Interiors",
  publisher: "Livion Interiors",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: { canonical: BASE_URL },
  icons: {
    icon: "/images/logo-transparent.png",
    apple: "/images/logo-transparent.png",
  },
  openGraph: {
    title: "Livion Interiors — Premium Home Interior Designers in Hyderabad",
    description:
      "Top-rated residential interior designers in Hyderabad. 2BHK, 3BHK & Villa turnkey design. 200+ projects delivered. Get a free consultation.",
    url: BASE_URL,
    siteName: "Livion Interiors",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/logo-white-bg.png", width: 1200, height: 630, alt: "Livion Interiors Hyderabad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Livion Interiors — Premium Home Interior Designers in Hyderabad",
    description: "Top-rated residential interior designers in Hyderabad. 2BHK, 3BHK & Villa turnkey design.",
    images: ["/images/logo-white-bg.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "InteriorDesigner"],
  name: "Livion Interiors",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo-white-bg.png`,
  image: `${BASE_URL}/images/logo-white-bg.png`,
  description:
    "Premium residential interior designers in Hyderabad specialising in 2BHK, 3BHK & Villa turnkey interior design.",
  telephone: "+917995758720",
  email: "livioninteriors@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 17.385,
    longitude: 78.4867,
  },
  areaServed: [
    "Gachibowli", "Kondapur", "Jubilee Hills", "Banjara Hills",
    "HITEC City", "Madhapur", "Manikonda", "Kukatpally", "Hyderabad",
  ],
  priceRange: "₹₹₹",
  sameAs: [
    "https://www.instagram.com/livioninteriors",
    "https://www.facebook.com/share/1JCWCA9Wge/",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 5,
    reviewCount: 200,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#F9F8F6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Preloader />
        <ScrollProgress />
        <CursorOrb />
        {children}
      </body>
    </html>
  );
}