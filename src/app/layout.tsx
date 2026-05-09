import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Bin Arab Real Estate & Builders | Bahria Islamabad",
  description: "Luxury Living in Bahria Islamabad - Buy • Sell • Invest with Confidence",
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
      <body className={`${poppins.variable} ${playfair.variable} font-sans`}>
        <Navbar />
        <Cursor />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
