"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import styles from './HorizontalScroll.module.scss';

// Register GSAP plugin outside component to prevent re-registration on every render
gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
    children: React.ReactNode;
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        // Ensure refs are available
        if (!sectionRef.current || !triggerRef.current) return;

        const scrollSection = sectionRef.current;
        const trigger = triggerRef.current;

        // Calculate the horizontal scroll distance dynamically
        const scrollDistance = scrollSection.scrollWidth - window.innerWidth;

        const animation = gsap.fromTo(
            scrollSection,
            {
                translateX: 0,
            },
            {
                translateX: `-${scrollDistance}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: () => `+=${scrollDistance}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            }
        );

        return () => {
            animation.kill();
            animation.scrollTrigger?.kill();
        };
    }, []);

    return (
        <main className={styles.scrollSectionOuter}>
            <div ref={triggerRef}>
                <div ref={sectionRef} className={styles.scrollSectionInner}>
                    {children}
                </div>
            </div>
        </main>
    );
}
