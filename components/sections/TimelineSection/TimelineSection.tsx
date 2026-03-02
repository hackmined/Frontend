"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TimelineItem from "@/components/ui/TimelineItem/TimelineItem";
import styles from "./TimelineSection.module.scss";
import { TimelineEvent } from "@/types";

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    number: "01",
    title: "Registration Opens",
    date: "February 10, 2026",
    description: "Sign up and form your team",
  },
  {
    id: "2",
    number: "02",
    title: "Hacking Begins",
    date: "March 5, 9:00 AM",
    description: "48 hours of pure innovation",
  },
  {
    id: "3",
    number: "03",
    title: "Submissions Close",
    date: "March 7, 1:00 PM",
    description: "Final push and submit your project",
  },
  {
    id: "4",
    number: "04",
    title: "Evaluation Phase",
    date: "March 8th",
    description: "Projects are evaluated by judges",
  },
];

export default function TimelineSection() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tickerRef.current) return;

    // Classic GSAP infinite loop for horizontal text (rotated -90deg)
    // Use xPercent since the text is rotated horizontally
    const animation = gsap.to(tickerRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });

    return () => {
      animation.kill();
    };
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;

    // Staggered reveal for timeline items
    const items = gridRef.current.querySelectorAll(".timeline-item");

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const text = "HACKATHON X MINED";

  return (
    <section className={styles.timelineSection}>
      <div className={styles.sectionContent}>
        <div className={styles.headerContainer}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleAccent}>EVENT</span>
            <span className={styles.titleMain}>TIMELINE</span>
          </h2>
          <a
            href="https://drive.google.com/file/d/1_9cdlhFK1oiNkJ2q-trCUIFM1J3lpxnI/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.timelineButton}
          >
            View Detailed Inauguration Timeline
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
        <div ref={gridRef} className={styles.timelineGrid}>
          {timelineEvents.map((event) => (
            <TimelineItem key={event.id} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
