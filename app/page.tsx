"use client";
import HorizontalScroll from "@/containers/HorizontalScroll/HorizontalScroll";
import HeroSection from "@/components/sections/HeroSection/HeroSection";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import TimelineSection from "@/components/sections/TimelineSection/TimelineSection";
import TracksSection from "@/components/sections/TracksSection/TracksSection";
import FAQSection from "@/components/sections/FAQSection/FAQSection";
import VerticalScrollSection from "@/components/sections/VerticalScrollSection/VerticalScrollSection";

export default function Home() {
  return (
    <HorizontalScroll>
      <HeroSection />
      <AboutSection />
      <VerticalScrollSection />
      <TimelineSection />
      <TracksSection />
      <FAQSection />
    </HorizontalScroll>
  );
}
