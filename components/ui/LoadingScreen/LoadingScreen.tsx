
"use client";
import React, { useEffect, useRef } from 'react';
import styles from './LoadingScreen.module.scss';
import { gsap } from 'gsap';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface LoadingScreenProps {
    className?: string;
}

export default function LoadingScreen({ className = '' }: LoadingScreenProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const [loadingText, setLoadingText] = React.useState("Initializing...");
    const textRef = useRef<HTMLParagraphElement>(null);

    const loadingPhrases = [
        "Initializing core systems...",
        "Calibrating sensors...",
        "Establishing connection...",
        "Loading assets...",
        "Optimizing performance...",
        "Almost there..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingPhrases.length);
            setLoadingText(loadingPhrases[randomIndex]);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(logoRef.current,
                { opacity: 0.5, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1.05,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                }
            );

            // Animate text change
            gsap.fromTo(textRef.current,
                { opacity: 0.5, y: 5 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
            );

        }, containerRef);

        return () => ctx.revert();
    }, [loadingText]);

    return (
        <div ref={containerRef} className={`${styles.loadingScreen} ${className}`}>
            <div className={styles.content}>
                <img
                    ref={logoRef}
                    src="/Hackamined Logo.svg"
                    alt="Hackamined"
                    className={styles.logo}
                    style={{ filter: "invert(100%)" }}
                />
                <LoadingSpinner size="lg" className={styles.spinner} />
                <p ref={textRef} className={styles.loadingText}>{loadingText}</p>
            </div>
        </div>
    );
}
