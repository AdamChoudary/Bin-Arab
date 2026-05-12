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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bin Arab Real Estate & Builders | Luxury Living in Bahria Islamabad",
  description: "Buy, sell, and invest with confidence in Bahria Islamabad's most prestigious properties. Expert builders and real estate consultants dedicated to luxury living.",
  keywords: ["Real Estate", "Bahria Town Islamabad", "Luxury Living", "Bin Arab Builders", "Property Investment"],
  authors: [{ name: "Bin Arab Real Estate" }],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  }
};

export const viewport = {
  themeColor: "#c4a45a",
  width: "device-width",
  initialScale: 1,
};

import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} font-sans antialiased`}>
        <Navbar />
        <Cursor />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
