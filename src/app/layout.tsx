import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Bin Arab Real Estate & Builders | Luxury Living in Bahria Islamabad",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Bin Arab Real Estate",
    "Bin Arab Builders",
    "Real Estate Bahria Enclave",
    "Bahria Town Islamabad properties",
    "Luxury homes Islamabad",
    "Property investment Islamabad",
    "Commercial plaza Bahria",
    "Plots for sale Bahria Enclave",
    "Construction services Islamabad",
    "Rental management Islamabad",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Real Estate",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: "Bin Arab Real Estate & Builders | Luxury Living in Bahria Islamabad",
    description: SITE.description,
    images: [{ url: SITE.ogImage, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bin Arab Real Estate & Builders | Luxury Living in Bahria Islamabad",
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#c4a45a",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} font-sans antialiased`}>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {children}
      </body>
    </html>
  );
}
