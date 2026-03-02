"use client";
import React from "react";
import styles from "./SponsorsSection.module.scss";

const TITLE_SPONSOR = {
  name: "Binghamton University",
  logo: "🎓", // Replace with actual logo image later
  tier: "In Collaboration With",
  website: "https://www.binghamton.edu",
};

const DIAMOND_SPONSOR = {
  name: "Diamond Corp",
  logo: "💎", // mock logo
};

const GOLD_SPONSOR = {
  name: "Gold Inc",
  logo: "🥇",
};

const TRACK_SPONSORS = [
  { name: "Sponsor 1", logo: "🚀" },
  { name: "Sponsor 2", logo: "🌟" },
  { name: "Sponsor 3", logo: "🔥" },
  { name: "Sponsor 4", logo: "💡" },
  { name: "Sponsor 5", logo: "⚡" },
  { name: "Sponsor 6", logo: "🎯" },
  { name: "Sponsor 7", logo: "🛡️" },
  { name: "Sponsor 8", logo: "🧠" },
  { name: "Sponsor 9", logo: "🌐" },
  { name: "Sponsor 10", logo: "📈" },
  { name: "Sponsor 11", logo: "🔧" },
  { name: "Sponsor 12", logo: "🎨" },
];

export default function SponsorsSection() {
  return (
    <section className={styles.sponsorsSection} id="sponsors">
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>Our Sponsors</h2>

        <div className={styles.sponsorsGrid}>
          {/* Title Sponsor */}
          <div className={styles.titleTier}>
            <h3 className={styles.tierHeading}>{TITLE_SPONSOR.tier}</h3>
            <a
              href={TITLE_SPONSOR.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.sponsorImagePlaceholder} ${styles.titleImage}`}
            >
              {TITLE_SPONSOR.name} Logo
            </a>
          </div>

          {/* Diamond & Gold Tiers */}
          <div className={styles.premiumTiers}>
            <div className={styles.premiumCol}>
              <h3 className={styles.tierHeading}>Diamond Sponsor</h3>
              <div
                className={`${styles.sponsorImagePlaceholder} ${styles.diamondImage}`}
              >
                {DIAMOND_SPONSOR.name} Logo
              </div>
            </div>
            <div className={styles.premiumCol}>
              <h3 className={styles.tierHeading}>Gold Sponsor</h3>
              <div
                className={`${styles.sponsorImagePlaceholder} ${styles.goldImage}`}
              >
                {GOLD_SPONSOR.name} Logo
              </div>
            </div>
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
                      {sponsor.name}
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
                      {sponsor.name}
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
