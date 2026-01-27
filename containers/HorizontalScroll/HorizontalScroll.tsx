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
    const bgRef = useRef<HTMLImageElement | null>(null);

    useLayoutEffect(() => {
        // Ensure refs are available
        if (!sectionRef.current || !triggerRef.current) return;

        const scrollSection = sectionRef.current;
        const trigger = triggerRef.current;
        const bg = bgRef.current;

        // Calculate the horizontal scroll distance dynamically
        const scrollDistance = scrollSection.scrollWidth - window.innerWidth;

        // Debug: Log scroll width calculations
        console.log('=== HORIZONTAL SCROLL WIDTH CALCULATIONS ===');
        console.log('Total content width (scrollWidth):', scrollSection.scrollWidth, 'px');
        console.log('Viewport width (window.innerWidth):', window.innerWidth, 'px');
        console.log('Scroll distance (scrollWidth - viewport):', scrollDistance, 'px');
        console.log('Number of sections:', scrollSection.children.length);
        console.log('===========================================');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top top",
                end: () => `+=${scrollDistance}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        // Content scroll animation (fast)
        tl.to(scrollSection, {
            translateX: `-${scrollDistance}px`,
            ease: "none",
        }, 0);

        // Background parallax animation (slow)
        // Moves at 15% speed of content to create depth
        if (bg) {
            tl.to(bg, {
                translateX: `-${scrollDistance * 0.15}px`,
                ease: "none",
            }, 0);
        }

        return () => {
            tl.kill();
            tl.scrollTrigger?.kill();
        };
    }, []);

    return (
        <main className={styles.scrollSectionOuter}>
            {/* Parallax Background Image */}
            <img
                ref={bgRef}
                src="/bg.svg"
                alt="Background"
                className={styles.backgroundImage}
            />

            <div ref={triggerRef}>
                <div ref={sectionRef} className={styles.scrollSectionInner}>
                    {children}
                </div>
            </div>
        </main>
    );
}
