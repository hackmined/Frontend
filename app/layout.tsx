import type { Metadata } from "next";
import {Bruno_Ace, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import ScrollProgress from "@/components/layout/ScrollProgress/ScrollProgress";
import CursorTrail from "@/components/ui/CursorTrail/CursorTrail";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300","400", "700"],
  variable: "--font-nunito"
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
      <head>
        {/* <link rel="preload" href="/panel.svg" as="image" /> */}
        <link rel="preload" href="/bg.svg" as="image" />
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body className={`${nunito.className} ${brunoAce.variable}`}>
        <CursorTrail />
        <ScrollProgress />
        <Header />
        {children}
      </body>
    </html>
  );
}
