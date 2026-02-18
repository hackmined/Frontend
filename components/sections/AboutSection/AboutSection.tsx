"use client";
import React, { useRef } from "react";
import styles from "./AboutSection.module.scss";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className={styles.aboutSection}>
      {/* FIRST HALF: Intro */}
      <div className={styles.imageWrapper}>
        <div className={styles.bgImageContainer}>
          <img
            src="/about.svg"
            alt="About HackaMined"
            className={styles.aboutImage}
          />
        </div>
        <div className={styles.textBox}>
          {/* <h2>About HackaMined</h2> */}
          <p className={styles.p1}>
            Join us for an exciting 48-hour hackathon where innovation meets
            creativity. Build groundbreaking solutions, connect with fellow
            developers, and compete for amazing prizes.
          </p>
          <br />
          <p className={styles.p2}>Organized by CSI and COE-DS</p>
        </div>
      </div>

      {/* SECOND HALF: Stats / Spaceship */}
      <div className={styles.statsWrapper}>
        {/* Central Screen */}
        <div className={styles.centralScreen}>
          {/* The mainbanner.svg acts as the frame */}
          <img
            src="/mainbanner.png"
            alt="Screen Frame"
            className={styles.screenBg}
          />

          {/* Content inside the screen */}
          <div className={styles.screenContent}>
            {/* Placeholder video/image. Using a generic tech/hackathon image or video here would be good.
                             For now, let's use a placeholder or the logo if available. */}
            <div
              style={{ color: "black", textAlign: "center", fontSize: "2rem" }}
            >
              {/* <img src="/logo.png" alt="HackaMined" style={{ width: '80%', opacity: 0.8 }} /> */}
              <img
                src="/Hackamined Logo.svg"
                alt="HackaMined"
                style={{ width: "40%" }}
              />
            </div>
          </div>
        </div>

        {/* Floating Stat Cards */}
        {/* 1. 36 HOURS */}
        <div className={`${styles.statCard} ${styles.card1}`}>
          <img src="/banner.svg" alt="bg" className={styles.cardBg} />
          <div className={styles.statValue}>48</div>
          <div className={styles.statLabel}>HOURS</div>
        </div>

        {/* 2. 30 UNIVERSITIES */}
        <div className={`${styles.statCard} ${styles.card2}`}>
          <img src="/banner.svg" alt="bg" className={styles.cardBg} />
          <div className={styles.statValue}>30+</div>
          <div className={styles.statLabel}>UNIVERSITIES</div>
        </div>

        {/* 3. 1000+ HACKERS (Center Bottom) */}
        <div className={`${styles.statCard} ${styles.card3}`}>
          <img src="/banner.svg" alt="bg" className={styles.cardBg} />
          <div className={styles.statValue}>1000+</div>
          <div className={styles.statLabel}>HACKERS</div>
        </div>

        {/* 4. 12 STATES */}
        <div className={`${styles.statCard} ${styles.card4}`}>
          <img src="/banner.svg" alt="bg" className={styles.cardBg} />
          <div className={styles.statValue}>12</div>
          <div className={styles.statLabel}>STATES</div>
        </div>

        {/* 5. $150K+ PRIZES */}
        <div className={`${styles.statCard} ${styles.card5}`}>
          <img src="/banner.svg" alt="bg" className={styles.cardBg} />
          <div className={styles.statValue}>150K+</div>
          <div className={styles.statLabel}>PRIZES</div>
        </div>
      </div>
    </section>
  );
}
