"use client";
import React, { useRef } from 'react';
import styles from './AboutSection.module.scss';

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section ref={sectionRef} className={styles.aboutSection}>
            <div className={styles.imageWrapper}>
                <img
                    src="/about.svg"
                    alt="About HackaMined"
                    className={styles.aboutImage}
                />
                <div className={styles.textBox}>
                    {/* <h2>About HackaMined</h2> */}
                    <p>
                        Join us for an exciting 48-hour hackathon where innovation meets creativity.
                        Build groundbreaking solutions, connect with fellow developers, and compete for amazing prizes.
                    </p>
                    <br></br>
                    <p>
                        Organized by the Centre of Excellence in Data Science and the Computer Society of India (CSI) Student Chapter, Nirma University.
                    </p>
                </div>
            </div>
        </section>
    );
}
