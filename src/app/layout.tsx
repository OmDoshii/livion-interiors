import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Livion Interiors — Premium Residential Interiors, Hyderabad",
  description:
    "Transform your home with Livion Interiors. Specialising in 2BHK, 3BHK & Villa turnkey interior design in Hyderabad. Get a free consultation today.",
  keywords: [
    "interior design Hyderabad",
    "residential interiors",
    "2BHK interiors",
    "3BHK interiors",
    "villa interiors",
    "turnkey interior design",
    "Livion Interiors",
  ],
  icons: {
    icon: "/images/logo-transparent.png",
    apple: "/images/logo-transparent.png",
  },
  openGraph: {
    title: "Livion Interiors — Premium Residential Interiors, Hyderabad",
    description: "Transform your home with Livion Interiors.",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/images/logo-white-bg.png", width: 1200, height: 630 }],
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}