"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button/Button';
import styles from './HeroSection.module.scss';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleMainRef = useRef<HTMLSpanElement>(null);

    return (
        <section ref={sectionRef} className={styles.heroSection}>
            <div className={styles.heroContent}>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>
                        <span ref={titleMainRef} className={styles.titleMain}>HackaMined</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        THE ULTIMATE 48-HOUR HACKATHON EXPERIENCE
                    </p>
                    <div className={styles.heroMeta}>
                        <span className={styles.date}>MARCH 15-16, 2026</span>
                        <span className={styles.divider}>|</span>
                        <span className={styles.location}>VIRTUAL & ON-SITE</span>
                    </div>

                    <div className={styles.ctaContainer}>
                        <Link href="/register">
                            <Button variant="primary" size="lg">
                                REGISTER NOW
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
