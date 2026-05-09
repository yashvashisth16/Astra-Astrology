import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Stars from "@/components/Stars";
import RevealManager from "@/components/RevealManager";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  title: "Parasharr Divine Astrology | By Dr Priti",
  description: "Parasharr Divine Astrology — Expert astrological consulting by Dr Priti for career, relationships, and strategic life decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body>
        <SessionProviderWrapper>
          <RevealManager />
          <Stars />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
