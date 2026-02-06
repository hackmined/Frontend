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
    const starsRef = useRef<HTMLImageElement | null>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const logoRef = useRef<HTMLImageElement | null>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            if (!sectionRef.current || !triggerRef.current) return;

            const scrollSection = sectionRef.current;
            const trigger = triggerRef.current;
            const bg = bgRef.current;
            const stars = starsRef.current;
            const portal = portalRef.current;
            const logo = logoRef.current;
            const portalMask = portal?.querySelector('[data-portal-mask]') as HTMLElement | null;

            // Portal scroll distance (in timeline units)
            const portalScrollDistance = window.innerHeight;

            // Build the combined timeline
            const sections = Array.from(scrollSection.children) as HTMLElement[];

            let totalHorizontalScroll = 0;
            let totalVerticalScroll = 0;

            // Initialize logo state explicitly to prevent lateral drift during animation
            if (logo) {
                gsap.set(logo, {
                    x: 0,
                    y: 0,
                    left: "50%",
                    top: "50%",
                    xPercent: -50,
                    yPercent: -50
                });
            }

            const tl = gsap.timeline({
                defaults: { ease: "none" }
            });

            // ===== PHASE 1: PORTAL EXPANSION WITH PARALLAX =====
            const portalPhaseLabel = "portalEnd";

            // Get portal text elements for parallax
            const portalTextFront = portal?.querySelector('[data-portal-text-front]') as HTMLElement;
            const portalTextBack = portal?.querySelector('[data-portal-text-back]') as HTMLElement;

            if (portal && portalMask) {
                // Create parallax zoom effect - different elements scale at different rates
                // Faster scale = appears closer (comes toward viewer faster)

                // Front text - scales fastest + moves DOWN fast (closest to viewer)
                if (portalTextFront) {
                    tl.to(portalTextFront, {
                        scale: 10,
                        yPercent: 4000, // Move downward fast
                        opacity: 0,
                        duration: portalScrollDistance,
                        ease: "power2.in",
                    }, 0);
                }

                // Portal mask - medium scale
                tl.to(portalMask, {
                    scale: 8,
                    duration: portalScrollDistance,
                    ease: "power2.inOut",
                }, 0);

                // Back text - scales slowest + moves UP fast (furthest from viewer)
                if (portalTextBack) {
                    tl.to(portalTextBack, {
                        scale: 8,
                        yPercent: -4000, // Move upward fast
                        opacity: 0,
                        duration: portalScrollDistance,
                        ease: "power2.in",
                    }, 0);
                }

                // LOGO ANIMATION
                // Moves from center (initial CSS) to navbar position
                if (logo) {
                    const navLogo = document.querySelector('[data-nav-logo]');
                    let targetTop = '35px'; // Fallback
                    let targetLeft = '40px'; // Fallback for phase 2

                    if (navLogo) {
                        const rect = navLogo.getBoundingClientRect();
                        // vertical center of nav logo
                        const centerY = rect.top + rect.height / 2;
                        targetTop = `${centerY}px`;
                        targetLeft = `${rect.left}px`;
                    }

                    tl.to(logo, {
                        top: targetTop, // Dynamic top
                        width: '40px', // Shrink to reasonable logo size
                        yPercent: -50, // Keep centered vertically relative to the new top
                        xPercent: -50, // FORCE horizontal centering
                        duration: portalScrollDistance,
                        ease: "power2.inOut",
                    }, 0);

                    // Store targetLeft for Phase 2 use if needed, though usually Phase 2 slides offscreen or to side.
                    // If Phase 2 is supposed to slide the logo to the left of the screen or left of content:
                    tl.addLabel(portalPhaseLabel);

                    // PHASE 2: LOGO SLIDE TO LEFT
                    const spacerWidth = window.innerWidth;

                    tl.to(logo, {
                        left: '40px', // Slide to left (fixed margin for side)
                        xPercent: 0, // Remove centering offset horizontally
                        duration: spacerWidth,
                        ease: "none"
                    }, portalPhaseLabel);
                } else {
                    tl.addLabel(portalPhaseLabel);
                }
            }

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
            let currentStarsX = 0;

            // ===== PHASE 2: HORIZONTAL SCROLL =====
            sections.forEach((section, index) => {
                const width = section.offsetWidth;
                const isVertical = section.getAttribute('data-scroll-section') === 'vertical';

                // Vertical Scroll Logic (Internal)
                if (isVertical) {
                    const vDist = getVerticalDistance(section);
                    if (vDist > 0) {
                        const content = section.querySelector('[data-vertical-content]') as HTMLElement;

                        const multiplier = parseFloat(section.getAttribute('data-scroll-multiplier') || "1");
                        const duration = vDist * multiplier;

                        tl.to(content, {
                            y: -vDist,
                            duration: duration
                        });

                        totalVerticalScroll += duration;
                    }
                }

                // Horizontal Scroll Logic
                if (index < sections.length - 1) {
                    currentX -= width;

                    // IF it's the first section (Spacer), we want it to scroll simulatenously
                    // with the Logo Slide (Phase 2), which starts at 'portalPhaseLabel'.
                    // Otherwise, just append to the timeline normally.
                    const position = index === 0 ? portalPhaseLabel : ">";

                    tl.to(scrollSection, {
                        x: currentX,
                        duration: width
                    }, position);

                    if (bg) {
                        currentBgX -= width * 0.15;
                        tl.to(bg, {
                            x: currentBgX,
                            duration: width
                        }, "<");
                    }

                    if (stars) {
                        // Stars move faster (0.25 multiplier vs 0.15 for bg)
                        currentStarsX -= width * 0.25;
                        tl.to(stars, {
                            x: currentStarsX,
                            duration: width
                        }, "<");
                    }

                    totalHorizontalScroll += width;
                }
            });

            const totalDistance = portalScrollDistance + totalHorizontalScroll + totalVerticalScroll;

            // Dynamic Background Sizing
            // Added extra buffer (1000px) to prevent corner cutting
            if (bg) {
                const parallaxDistance = totalHorizontalScroll * 0.15;
                const requiredBgWidth = window.innerWidth + parallaxDistance + 1000;
                bg.style.width = `${requiredBgWidth}px`;
                bg.style.maxWidth = "none";
                bg.style.objectFit = "cover";
            }

            if (stars) {
                const parallaxDistance = totalHorizontalScroll * 0.25;
                const requiredStarsWidth = window.innerWidth + parallaxDistance + 1000;
                stars.style.width = `${requiredStarsWidth}px`;
                stars.style.maxWidth = "none";
                stars.style.objectFit = "cover";
            }

            // SINGLE ScrollTrigger for everything
            // Calculate portal phase end progress (0-1 scale)
            const portalEndTime = tl.labels[portalPhaseLabel] || portalScrollDistance;
            const totalDuration = tl.duration();
            const portalEndProgress = portalEndTime / totalDuration;
            let portalHidden = false;

            ScrollTrigger.create({
                animation: tl,
                trigger: trigger,
                start: "top top",
                end: () => `+=${totalDistance}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    if (!portal) return;

                    // Hide portal once we've passed the portal phase
                    if (self.progress > portalEndProgress && !portalHidden) {
                        gsap.set(portal, { autoAlpha: 0 });
                        portalHidden = true;
                    }
                    // Show portal when scrolling back into the portal phase
                    else if (self.progress <= portalEndProgress && portalHidden) {
                        gsap.set(portal, { autoAlpha: 1 });
                        portalHidden = false;
                    }
                }
            });
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
                style={{ filter: "brightness(0.7)" }}
            />

            {/* Parallax Star Layer - Moves Faster */}
            <img
                ref={starsRef}
                src="/stars.svg"
                alt="Stars"
                className={styles.starsLayer}
            />

            {/* Logo - Animates from center to navbar */}
            <img
                ref={logoRef}
                src="/Hackamined Logo White.svg"
                alt="HackaMined"
                className={styles.animatedLogo}
            />

            {/* Portal Overlay - Creates "entering" effect on scroll */}
            {/* Elements scale at different rates for 3D parallax depth effect */}
            <div ref={portalRef} className={styles.portalOverlay}>
                {/* Back layer - scales slowest (appears furthest) */}
                <h2 data-portal-text-back className={styles.portalTextBack}>
                    WELCOME TO
                </h2>

                {/* Middle layer - the portal mask */}
                <img
                    data-portal-mask
                    src="/portal-mask.png"
                    alt=""
                    className={styles.portalMask}
                />

                {/* Front layer - scales fastest (appears closest) */}
                <h1 data-portal-text-front className={styles.portalTextFront}>
                    HackaMined
                </h1>
            </div>

            <div ref={triggerRef}>
                <div ref={sectionRef} className={styles.scrollSectionInner}>
                    {children}
                </div>
            </div>
        </main>
    );
}
