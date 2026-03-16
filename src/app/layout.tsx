import type { Metadata, Viewport } from "next";
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
  title: "Cafe Noir | Premium Coffee & Dining",
  description:
    "Where Every Cup Tells a Story. Book your table at Cafe Noir, New Delhi & Gurgaon.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import BackToTop from "@/components/ui/BackToTop";
import FloatingBookCTA from "@/components/ui/FloatingBookCTA";
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
        <FloatingBookCTA />
      </body>
    </html>
  );
}

