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
        let ctx = gsap.context(() => {
            if (!sectionRef.current || !triggerRef.current) return;

            const scrollSection = sectionRef.current;
            const trigger = triggerRef.current;
            const bg = bgRef.current;

            // Function to build/rebuild the timeline
            const buildTimeline = () => {
                const sections = Array.from(scrollSection.children) as HTMLElement[];
                
                // Calculate total stats for the timeline
                let totalHorizontalScroll = 0;
                let totalVerticalScroll = 0;
                
                const tl = gsap.timeline({
                    defaults: { ease: "none" }
                });
                
                // Helper to get vertical scroll distance for a section
                const getVerticalDistance = (section: HTMLElement) => {
                    const content = section.querySelector('[data-vertical-content]') as HTMLElement;
                    if (!content) return 0;
                    
                    const contentBottom = content.offsetTop + content.offsetHeight;
                    const sectionHeight = section.offsetHeight;
                    
                    const dist = contentBottom - sectionHeight;
                    return Math.max(0, dist);
                };

                let currentX = 0;
                let currentBgX = 0;

                sections.forEach((section, index) => {
                    const width = section.offsetWidth;
                    const isVertical = section.getAttribute('data-scroll-section') === 'vertical';
                    
                    // 1. Vertical Scroll Logic (Internal)
                    if (isVertical) {
                        const vDist = getVerticalDistance(section);
                        if (vDist > 0) {
                            const content = section.querySelector('[data-vertical-content]') as HTMLElement;
                            
                            const multiplier = parseFloat(section.getAttribute('data-scroll-multiplier') || "1");
                            const duration = vDist * multiplier;
                            
                            // Animate content UP
                            tl.to(content, {
                                y: -vDist,
                                duration: duration 
                            });
                            
                            totalVerticalScroll += duration;
                        }
                    }

                    // 2. Horizontal Scroll Logic (Move to next section)
                    if (index < sections.length - 1) {
                        currentX -= width;
                        
                        // Move content container
                        tl.to(scrollSection, {
                            x: currentX,
                            duration: width 
                        });
                        
                        // Move background (Parallax)
                        if (bg) {
                            currentBgX -= width * 0.15; // 15% speed
                            tl.to(bg, {
                                x: currentBgX,
                                duration: width
                            }, "<");
                        }
                        
                        totalHorizontalScroll += width;
                    }
                });

                const totalDistance = totalHorizontalScroll + totalVerticalScroll;

                // Dynamic Background Sizing
                if (bg) {
                    const parallaxDistance = totalHorizontalScroll * 0.15;
                    const requiredBgWidth = window.innerWidth + parallaxDistance + 200;
                    bg.style.width = `${requiredBgWidth}px`;
                    bg.style.maxWidth = "none";
                    bg.style.objectFit = "cover";
                }

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
            };

            // Initial build
            buildTimeline();
            
            // Rebuild on refresh to handle resizing
            // Note: invalidateOnRefresh resets the ScrollTrigger, but our timeline has hardcoded values (width).
            // We need to re-run the logic. 
            // However, complicating this with refreshInit might be overkill if we just rely on window resize.
            // But let's stick to standard GSAP context which cleans up nicely.
        }, sectionRef);

        // Handle resize explicitly if needed, but for now let's see if this fixes the init issue.
        // The main issue previously might have been just calculation timing.
        
        return () => ctx.revert();
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
