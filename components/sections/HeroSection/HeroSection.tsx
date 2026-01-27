"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './HeroSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleTopRef = useRef<HTMLSpanElement>(null);
    const titleMainRef = useRef<HTMLSpanElement>(null);
    const titleBottomRef = useRef<HTMLSpanElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 2,
            },
        });

        // Parallax effects - each element moves at different speed
        if (titleTopRef.current) {
            tl.to(titleTopRef.current, { x: -50, opacity: 0.5 }, 0);
        }
        if (titleMainRef.current) {
            tl.to(titleMainRef.current, { x: -100, scale: 1.05 }, 0);
        }
        if (titleBottomRef.current) {
            tl.to(titleBottomRef.current, { x: -150, opacity: 0.3 }, 0);
        }
        if (badgeRef.current) {
            tl.to(badgeRef.current, { y: 100, rotation: 45, opacity: 0 }, 0);
        }

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.heroSection}>
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>
                        <span ref={titleTopRef} className={styles.titleTop}>WE BUILD</span>
                        <span ref={titleMainRef} className={styles.titleMain}>HACKAMINED</span>
                        <span ref={titleBottomRef} className={styles.titleBottom}>INNOVATION</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        THE ULTIMATE 24-HOUR HACKATHON EXPERIENCE
                    </p>
                    <div className={styles.heroMeta}>
                        <span className={styles.date}>MARCH 15-16, 2026</span>
                        <span className={styles.divider}>|</span>
                        <span className={styles.location}>VIRTUAL & ON-SITE</span>
                    </div>
                </div>
                <div className={styles.heroGraphic}>
                    <div ref={badgeRef} className={styles.circularBadge}>
                        <svg viewBox="0 0 200 200" className={styles.badgeSvg}>
                            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" />
                            <text x="100" y="95" textAnchor="middle" className={styles.badgeText}>24HR</text>
                            <text x="100" y="120" textAnchor="middle" className={styles.badgeSubtext}>HACKATHON</text>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
