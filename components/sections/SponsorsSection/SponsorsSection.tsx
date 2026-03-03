"use client";
import React from "react";
import Image from "next/image";
import styles from "./SponsorsSection.module.scss";

const TITLE_SPONSOR = {
  name: "Binghamton University",
  image: "/sponsors/BU.png",
  tier: "In Collaboration With",
  website: "https://www.binghamton.edu",
};

const DIAMOND_SPONSOR = {
  name: "Diamond Sponsor",
  image: "/Sponsors/diamond.png",
};

const GOLD_SPONSORS = [
  { name: "Gold Sponsor 1", image: "/Sponsors/gold1.png" },
  { name: "Gold Sponsor 2", image: "/Sponsors/gold2.png" },
];

const TRACK_SPONSORS = [
  { name: "Sponsor 1", image: "/Sponsors/1.png" },
  { name: "Sponsor 2", image: "/Sponsors/3.png" },
  { name: "Sponsor 4", image: "/Sponsors/4.png" },
  { name: "Sponsor 5", image: "/Sponsors/5.png" },
  { name: "Sponsor 6", image: "/Sponsors/6.png" },
  { name: "Sponsor 7", image: "/Sponsors/7.png" },
  { name: "Sponsor 8", image: "/Sponsors/8.png" },
  { name: "Sponsor 9", image: "/Sponsors/9.png" },
  { name: "Sponsor 10", image: "/Sponsors/10.png" },
  { name: "Sponsor 11", image: "/Sponsors/11.png" },
];
export default function SponsorsSection() {
  return (
    <section className={styles.sponsorsSection} id="sponsors">
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>Our Sponsors</h2>

        <div className={styles.sponsorsGrid}>
          <div className={styles.titleTier}>
            <h3 className={styles.tierHeading}>{TITLE_SPONSOR.tier}</h3>
            <a
              href={TITLE_SPONSOR.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.sponsorImagePlaceholder} ${styles.titleImage}`}
            >
              <Image
                src={TITLE_SPONSOR.image}
                alt={TITLE_SPONSOR.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </a>
          </div>

          {/* Diamond & Gold Tiers */}
          <div className={styles.premiumTiers}>
            <div className={styles.premiumCol}>
              <h3 className={styles.tierHeading}>Diamond Sponsor</h3>
              <div
                className={`${styles.sponsorImagePlaceholder} ${styles.diamondImage}`}
              >
                <Image
                  src={DIAMOND_SPONSOR.image}
                  alt={DIAMOND_SPONSOR.name}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            {GOLD_SPONSORS.map((sponsor, index) => (
              <div key={`gold-${index}`} className={styles.premiumCol}>
                <h3 className={styles.tierHeading}>Gold Sponsor</h3>
                <div
                  className={`${styles.sponsorImagePlaceholder} ${styles.goldImage}`}
                >
                  <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Track Sponsors */}
          <div className={styles.trackTiers}>
            <h3 className={styles.tierHeading}>Track Sponsors</h3>
            <div className={styles.marqueeWrapper}>
              <div className={styles.marqueeContent}>
                {/* First Group */}
                <div className={styles.marqueeGroup}>
                  {TRACK_SPONSORS.map((sponsor, index) => (
                    <div
                      key={`track-1-${index}`}
                      className={`${styles.sponsorImagePlaceholder} ${styles.trackImage}`}
                    >
                      <Image
                        src={sponsor.image}
                        alt={sponsor.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ))}
                </div>
                {/* Second Group (Duplicate for seamless loop) */}
                <div className={styles.marqueeGroup}>
                  {TRACK_SPONSORS.map((sponsor, index) => (
                    <div
                      key={`track-2-${index}`}
                      className={`${styles.sponsorImagePlaceholder} ${styles.trackImage}`}
                    >
                      <Image
                        src={sponsor.image}
                        alt={sponsor.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
