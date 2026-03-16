import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cafe Noir | Online Booking & Menu",
  description: "A premium cafe experience in the heart of the city.",
};

import BackToTop from "@/components/ui/BackToTop";
import PageTransition from "@/components/layout/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased text-cafe-dark bg-cafe-bg`}>
        <PageTransition>
          {children}
        </PageTransition>
        <BackToTop />
      </body>
    </html>
  );
}
