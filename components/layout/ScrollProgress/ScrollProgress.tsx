"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './ScrollProgress.module.scss';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!progressRef.current) return;

        // Update progress bar based on overall page scroll
        const animation = gsap.to(progressRef.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            },
        });

        return () => {
            animation.kill();
        };
    }, []);

    return (
        <div className={styles.progressContainer}>
            <div ref={progressRef} className={styles.progressBar} />
        </div>
    );
}
