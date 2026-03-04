"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./MentorsSection.module.scss";
import Starfield from "@/components/ui/Starfield/Starfield";
import { LinkedInIcon } from "@/components/ui/Icons/Icons";

gsap.registerPlugin(ScrollTrigger);

interface Mentor {
  id: number;
  name: string;
  companyLogo: string;
  trackTitle: string;
  image: string;
  linkedin: string;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Mr. Parth Agrawal",
    companyLogo: "/Sponsors/gold1.png",
    trackTitle: "Storyhack: Agentic Video Edits",
    image: "/Mentors/Cactus1.jpeg",
    linkedin: "https://www.linkedin.com/in/htrap94/",
  },
];

export default function MentorsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Animate Main Title
      gsap.fromTo(
        `.${styles.title}`,
        { y: -50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );

      // Animate Cards
      gsap.fromTo(
        `.${styles.card}`,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: `.${styles.grid}`,
            start: "top 85%",
          },
        },
      );

      // Background subtle movement
      gsap.to(`.${styles.bgDecoration}`, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) {
    return (
      <section
        ref={sectionRef}
        className={styles.section}
        style={{ minHeight: "100vh" }}
      />
    );
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.bgDecoration} />
      <Starfield className={styles.starfield} />

      <h1 className={styles.title}>Meet Our Mentors</h1>

      <div className={styles.grid}>
        {mentors.map((mentor) => (
          <div key={mentor.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={mentor.image}
                alt={mentor.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?name=" +
                    mentor.name +
                    "&background=random";
                }}
              />
            </div>
            <h3 className={styles.name}>{mentor.name}</h3>

            <div className={styles.infoContainer}>
              {mentor.companyLogo && (
                <img
                  src={mentor.companyLogo}
                  alt="Company logo"
                  className={styles.companyLogo}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
              {mentor.trackTitle && (
                <p className={styles.trackTitle}>{mentor.trackTitle}</p>
              )}
            </div>

            <div className={styles.socials}>
              {mentor.linkedin && (
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
