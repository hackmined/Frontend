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

        // Get all section children
        const sections = Array.from(scrollSection.children) as HTMLElement[];
        
        // Calculate total stats for the timeline
        let totalHorizontalScroll = 0;
        let totalVerticalScroll = 0;
        
        // We need to calculate the total "scroll duration" (pixel distance user has to scroll)
        // This will be the 'end' value of the ScrollTrigger.
        // We will build the timeline by adding durations that correspond to pixels.
        
        const tl = gsap.timeline();
        
        // Helper to get vertical scroll distance for a section
        const getVerticalDistance = (section: HTMLElement) => {
            const content = section.querySelector('[data-vertical-content]') as HTMLElement;
            if (!content) return 0;
            
            // Calculate how much the content overflows the section container
            // We want to scroll enough so that the BOTTOM of the content aligns with the BOTTOM of the section
            // Formula: (Content Top Offset + Content Height) - Section Height
            // content.offsetTop gives position relative to the section (since section is relative/flex parent)
            
            const contentBottom = content.offsetTop + content.offsetHeight;
            const sectionHeight = section.offsetHeight;
            
            const dist = contentBottom - sectionHeight;
            return Math.max(0, dist);
        };

        let currentX = 0;

        sections.forEach((section, index) => {
            const width = section.offsetWidth;
            const isVertical = section.getAttribute('data-scroll-section') === 'vertical';
            
            // 1. Vertical Scroll Logic (Internal)
            if (isVertical) {
                const vDist = getVerticalDistance(section);
                if (vDist > 0) {
                    const content = section.querySelector('[data-vertical-content]') as HTMLElement;
                    
                    // Allow manual tweaking of the scroll "length/speed"
                    // A multiplier of 2 means the user has to scroll 2x the pixels to get through the content.
                    const multiplier = parseFloat(section.getAttribute('data-scroll-multiplier') || "1");
                    
                    // The actual timeline duration (how many pixels of scroll it consumes)
                    const duration = vDist * multiplier;
                    
                    // Add vertical scroll to timeline
                    tl.to(content, {
                        y: -vDist,
                        ease: "none",
                        duration: duration 
                    });
                    
                    totalVerticalScroll += duration;
                }
            }

            // 2. Horizontal Scroll Logic (Move to next section)
            // We move IF this is not the last section
            if (index < sections.length - 1) {
                // Move container left by the width of THIS section to reveal the next one.
                currentX -= width;
                
                tl.to(scrollSection, {
                    x: currentX,
                    ease: "none",
                    duration: width // Use pixel value as duration weight
                });
                
                totalHorizontalScroll += width;
            }
        });

        // Total scroll distance required from user
        const totalDistance = totalHorizontalScroll + totalVerticalScroll;

        // Now creating the ScrollTrigger that drives this timeline
        ScrollTrigger.create({
            animation: tl,
            trigger: trigger,
            start: "top top",
            end: () => `+=${totalDistance}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        });

        // Background parallax animation (simple linear for now, spanning the whole interaction)
        if (bg) {
            gsap.to(bg, {
                x: `-${totalDistance * 0.15}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: () => `+=${totalDistance}`,
                    scrub: 1,
                }
            });
        }

        return () => {
            tl.kill();
            // Kill all ScrollTriggers created
            ScrollTrigger.getAll().forEach(t => t.kill());
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
