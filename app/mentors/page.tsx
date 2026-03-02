import React from "react";
import MentorsSection from "@/components/sections/MentorsSection/MentorsSection";

export const metadata = {
  title: "Mentors — HACKAMINED 2026",
  description: "Meet the expert mentors who will guide you at HackaMined 2026.",
};

export default function MentorsPage() {
  return (
    <main>
      <div style={{ paddingTop: "80px" }}>
        <MentorsSection />
      </div>
    </main>
  );
}
