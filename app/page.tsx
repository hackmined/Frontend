"use client";
import HorizontalScroll from "@/containers/HorizontalScroll/HorizontalScroll";
import HeroSection from "@/components/sections/HeroSection/HeroSection";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import TimelineSection from "@/components/sections/TimelineSection/TimelineSection";
import TracksSection from "@/components/sections/TracksSection/TracksSection";
import CTASection from "@/components/sections/CTASection/CTASection";

export default function Home() {
  return (
    <HorizontalScroll>
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <TracksSection />
      <CTASection />
    </HorizontalScroll>
  );
}
