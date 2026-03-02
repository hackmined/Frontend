"use client";
import React, { useRef, useLayoutEffect } from "react";
import styles from "./TracksSection.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tracks = [
    {
        id: "ai-ml",
        icon: "🤖",
        title: "AI & Machine Learning",
        tag: "INTELLIGENCE",
        description:
            "Build intelligent systems using ML to solve real-world problems like prediction, automation, and personalization. Push the boundaries of what machines can learn and understand.",
        accentClass: styles.accentBlue,
        gradientClass: styles.gradientBlue,
    },
    {
        id: "healthtech",
        icon: "🏥",
        title: "Healthcare Tech",
        tag: "WELLNESS",
        description:
            "Design solutions that revolutionize healthcare delivery, patient monitoring, mental health, or medical diagnostics. Technology can save lives — build something that matters.",
        accentClass: styles.accentGreen,
        gradientClass: styles.gradientGreen,
    },
    {
        id: "fintech",
        icon: "💸",
        title: "FinTech",
        tag: "FINANCE",
        description:
            "Reimagine how people interact with money. From digital payments and personal finance tools to decentralized banking and fraud detection, financial inclusion starts here.",
        accentClass: styles.accentYellow,
        gradientClass: styles.gradientYellow,
    },
    {
        id: "sustainability",
        icon: "🌱",
        title: "Sustainability",
        tag: "EARTH",
        description:
            "Tackle climate change, pollution, renewable energy, and sustainable agriculture through creative tech solutions. Build a greener future with code.",
        accentClass: styles.accentEmerald,
        gradientClass: styles.gradientEmerald,
    },
    {
        id: "web3",
        icon: "⛓️",
        title: "Web3 / Blockchain",
        tag: "DECENTRALIZED",
        description:
            "Explore decentralized applications, smart contracts, DAOs, digital identity, and NFT utilities. Shape the next era of the internet where users own their data.",
        accentClass: styles.accentPurple,
        gradientClass: styles.gradientPurple,
    },
    {
        id: "open",
        icon: "🚀",
        title: "Open Innovation",
        tag: "WILDCARD",
        description:
            "Got an idea that doesn't fit a box? This track is for bold, unconventional projects that challenge norms. If it's impactful — it belongs here.",
        accentClass: styles.accentPink,
        gradientClass: styles.gradientPink,
    },
    {
        id: "ai-ml1",
        icon: "🤖",
        title: "AI & Machine Learning",
        tag: "INTELLIGENCE",
        description:
            "Build intelligent systems using ML to solve real-world problems like prediction, automation, and personalization. Push the boundaries of what machines can learn and understand.",
        accentClass: styles.accentBlue,
        gradientClass: styles.gradientBlue,
    },
    {
        id: "healthtech1",
        icon: "🏥",
        title: "Healthcare Tech",
        tag: "WELLNESS",
        description:
            "Design solutions that revolutionize healthcare delivery, patient monitoring, mental health, or medical diagnostics. Technology can save lives — build something that matters.",
        accentClass: styles.accentGreen,
        gradientClass: styles.gradientGreen,
    },
    {
        id: "fintech1",
        icon: "💸",
        title: "FinTech",
        tag: "FINANCE",
        description:
            "Reimagine how people interact with money. From digital payments and personal finance tools to decentralized banking and fraud detection, financial inclusion starts here.",
        accentClass: styles.accentYellow,
        gradientClass: styles.gradientYellow,
    },
    {
        id: "sustainability1",
        icon: "🌱",
        title: "Sustainability",
        tag: "EARTH",
        description:
            "Tackle climate change, pollution, renewable energy, and sustainable agriculture through creative tech solutions. Build a greener future with code.",
        accentClass: styles.accentEmerald,
        gradientClass: styles.gradientEmerald,
    },
    {
        id: "web32",
        icon: "⛓️",
        title: "Web3 / Blockchain",
        tag: "DECENTRALIZED",
        description:
            "Explore decentralized applications, smart contracts, DAOs, digital identity, and NFT utilities. Shape the next era of the internet where users own their data.",
        accentClass: styles.accentPurple,
        gradientClass: styles.gradientPurple,
    },
    {
        id: "open1",
        icon: "🚀",
        title: "Open Innovation",
        tag: "WILDCARD",
        description:
            "Got an idea that doesn't fit a box? This track is for bold, unconventional projects that challenge norms. If it's impactful — it belongs here.",
        accentClass: styles.accentPink,
        gradientClass: styles.gradientPink,
    },
];

export default function TracksSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate header
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Animate cards with stagger
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.4,
                        delay: i * 0.06,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.tracksSection}>
            {/* Background large text */}
            <div className={styles.bgLabel} aria-hidden="true">
                TRACKS
            </div>

            <div className={styles.sectionContent}>
                {/* Header */}
                <div ref={headingRef} className={styles.header}>
                    <span className={styles.headerTag}>CHALLENGE DOMAINS</span>
                    <h2 className={styles.title}>Choose Your Challenge</h2>
                    <p className={styles.subtitle}>
                        Pick a track that aligns with your interests and build impactful
                        solutions.
                    </p>
                </div>

                {/* Track Cards Grid */}
                <div className={styles.tracksGrid}>
                    {tracks.map((track, i) => (
                        <div
                            key={track.id}
                            ref={(el) => { cardsRef.current[i] = el; }}
                            className={`${styles.trackCard} ${track.gradientClass}`}
                        >
                            {/* Glow border overlay */}
                            <div className={`${styles.cardBorder} ${track.accentClass}`} />

                            {/* Card content */}
                            <div className={styles.cardInner}>
                                <div className={styles.cardTop}>
                                    <span className={styles.cardIcon}>{track.icon}</span>
                                    <span className={`${styles.cardTag} ${track.accentClass}`}>
                                        {track.tag}
                                    </span>
                                </div>
                                <h3 className={styles.cardTitle}>{track.title}</h3>
                                <p className={styles.cardDescription}>{track.description}</p>
                            </div>

                            {/* Number watermark */}
                            <div className={styles.cardNumber} aria-hidden="true">
                                {String(i + 1).padStart(2, "0")}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
