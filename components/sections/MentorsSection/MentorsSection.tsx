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
  role: string;
  bio: string;
  image: string;
  socials?: {
    linkedin?: string;
    email?: string;
  };
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "Abhishek Sharma",
    role: "Software Engineer @ Oracle",
    bio: "Specializes in building scalable backend systems and databases, having extensive experience with Java and cloud infrastructure.",
    image: "",
    socials: {
      linkedin: "https://linkedin.com/in/example1",
      email: "abhishek@example.com",
    },
  },
  {
    id: 2,
    name: "Sneha Patel",
    role: "Frontend Lead @ Meta",
    bio: "Expert in React and modern CSS design systems, passionate about web performance and accessibility.",
    image: "",
    socials: {
      linkedin: "https://linkedin.com/in/example2",
    },
  },
  {
    id: 3,
    name: "Anjali Gupta",
    role: "Data Scientist @ Google",
    bio: "Experienced in machine learning models and data pipelines, turning complex data into actionable insights.",
    image: "",
    socials: {
      email: "anjali@example.com",
    },
  },
  {
    id: 4,
    name: "Rohan Desai",
    role: "DevOps Engineer @ AWS",
    bio: "Enabling seamless CI/CD and cloud scalability. Focuses on system architecture and Kubernetes.",
    image: "",
    socials: {
      linkedin: "https://linkedin.com/in/example4",
      email: "rohan@example.com",
    },
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
            <p className={styles.role}>{mentor.role}</p>
            {mentor.bio && <p className={styles.bio}>{mentor.bio}</p>}

            <div className={styles.socials}>
              {mentor.socials?.linkedin && (
                <a
                  href={mentor.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </a>
              )}
              {mentor.socials?.email && (
                <a href={`mailto:${mentor.socials.email}`}>
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
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
