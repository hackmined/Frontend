import type { Metadata } from "next";
import { Gaegu, Bruno_Ace } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import ScrollProgress from "@/components/layout/ScrollProgress/ScrollProgress";
import CursorTrail from "@/components/ui/CursorTrail/CursorTrail";

const gaegu = Gaegu({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-gaegu"
});

const brunoAce = Bruno_Ace({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bruno-ace"
});

export const metadata: Metadata = {
  title: "HACKAMINED 2026 - The Ultimate Hackathon",
  description: "Join the ultimate 24-hour hackathon experience. March 15-16, 2026. Build, innovate, and win prizes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gaegu.className} ${brunoAce.variable}`}>
        <CursorTrail />
        <ScrollProgress />
        <Header />
        {children}
      </body>
    </html>
  );
}
