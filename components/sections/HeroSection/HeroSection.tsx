"use client";
import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(containerRef.current,
                {
                    opacity: 0,
                    y: 800 // Start 200px below
                },
                {
                    opacity: 1,
                    y: 0, // Slide up to original position
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%", // slightly earlier
                        end: "center center",
                        scrub: 1,
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.heroSection} data-scroll-section>
            <div className={styles.imageContainer} ref={containerRef} style={{ zIndex: 10 }}>
                <img
                    src="/HackaMined.svg"
                    alt="HackaMined Title"
                    className={styles.titleImage}
                />
            </div>

            <Link
                href="/register"
                className={styles.registerButton}
                onMouseMove={(e) => {
                    const btn = e.currentTarget;
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    // Parallax intensity
                    const intensity = 5;

                    // Maintain rotation while moving
                    // Note: Adding perspective to make it feel 3D could be cool too, but let's stick to 2D translate
                    btn.style.transform = `rotate(0deg) translate(${x / intensity}px, ${y / intensity}px)`;
                }}
                onMouseLeave={(e) => {
                    const btn = e.currentTarget;
                    btn.style.transform = `rotate(0deg) translate(0, 0)`;
                }}
            >
                <img src="/register.svg" alt="Register" />
            </Link>
            <div
                className={styles.leftPlanet}
                onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    // Slower parallax for background elements
                    el.style.transform = `translate(${x / 8}px, ${y / 8}px)`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `translate(0, 0)`;
                }}
            >
                <img src="/left-planet.webp" alt="" />
            </div>

            <div
                className={styles.rightPlanet}
                onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    el.style.transform = `translate(${x / 6}px, ${y / 6}px)`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `translate(0, 0)`;
                }}
            >
                <img src="/right-planet.webp" alt="" />
            </div>

            {/* <div
                className={styles.bottomPlanet}
                onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    // Faster parallax for foreground/bottom element
                    el.style.transform = `translate(${x / 4}px, ${y / 4}px)`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `translate(0, 0)`;
                }}
            >
                <img src="/bottom-planet.webp" alt="" />
            </div> */}
            <div
                className={styles.satellite1}
                onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    el.style.transform = `translate(${x / 5}px, ${y / 5}px)`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `translate(0, 0)`;
                }}
            >
                <img src="/satellite1.svg" alt="" />
            </div>

            <div
                className={styles.satellite2}
                onMouseMove={(e) => {
                    const el = e.currentTarget;
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    el.style.transform = `translate(${x / 6}px, ${y / 6}px)`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `translate(0, 0)`;
                }}
            >
                <img src="/satellite2.svg" alt="" />
            </div>
        </section>
    );
}
