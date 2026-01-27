import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header/Header";
import ScrollProgress from "@/components/layout/ScrollProgress/ScrollProgress";
import CursorTrail from "@/components/ui/CursorTrail/CursorTrail";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <CursorTrail />
        <ScrollProgress />
        <Header />
        {children}
      </body>
    </html>
  );
}
