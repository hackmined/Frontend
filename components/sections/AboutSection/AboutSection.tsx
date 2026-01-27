"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./AboutSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const tickerRef = useRef<HTMLDivElement>(null);

    /* TEXT + IMAGE ANIMATIONS */
    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom top",
                    toggleActions: "play none none reverse",
                },
            });

            if (textRef.current) {
                tl.from(textRef.current.children, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out",
                });
            }

            if (imageRef.current) {
                gsap.to(imageRef.current, {
                    y: -50,
                    scale: 1.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2,
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* STABLE INFINITE VERTICAL TICKER */
    useLayoutEffect(() => {
        if (!tickerRef.current) return;

        const el = tickerRef.current;
        let animation: gsap.core.Tween | null = null;

        gsap.set(el, {
            force3D: true,
            willChange: "transform",
        });

        const setup = () => {
            animation?.kill();
            gsap.set(el, { clearProps: "y" });

            const distance = Math.floor(el.scrollHeight / 2);

            animation = gsap.fromTo(
                el,
                { y: 0 },
                {
                    y: -distance,
                    duration: 22,
                    ease: "none",
                    repeat: -1,
                }
            );
        };

        setup();

        const resizeObserver = new ResizeObserver(setup);
        resizeObserver.observe(el);

        document.fonts?.ready.then(setup);

        return () => {
            animation?.kill();
            resizeObserver.disconnect();
        };
    }, []);

    const text = "hackNUthon x MINeD";

    return (
        <section ref={sectionRef} className={styles.aboutSection}>
            {/* STIFF-STYLE VERTICAL TICKER */}
            <div className={styles.verticalTextWrapper}>
                <div ref={tickerRef} className={styles.verticalText}>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                </div>
            </div>

            <div className={styles.aboutContent}>
                <div ref={imageRef} className={styles.imageContainer}>
                    <div className={styles.imagePlaceholder}>
                        <span className={styles.imageIcon}>💡</span>
                    </div>
                </div>

                <div ref={textRef} className={styles.textContent}>
                    <span className={styles.label}>WHO WE ARE</span>
                    <h2 className={styles.title}>
                        BUILDING THE FUTURE, ONE HACK AT A TIME
                    </h2>
                    <p className={styles.description}>
                        HACKAMINED is where innovators, creators, and builders come together
                        to push the boundaries of what&apos;s possible.
                    </p>
                    <p className={styles.description}>
                        Join a community of passionate developers and designers who believe
                        technology can change the world.
                    </p>
                </div>
            </div>
        </section>
    );
}
