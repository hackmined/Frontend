import styles from './VerticalScrollSection.module.scss';
import SponsorCard from "./SponserCard";
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const SPONSORS = [
    { logo: "⚡", name: "Scroll Sync", description: "Animations are synced with user scroll." },
    { logo: "🎯", name: "Precision Motion", description: "Hover, tilt, depth & parallax combined." },
    { logo: "🧊", name: "Glass UI", description: "Modern glassmorphic UI layers." },
    { logo: "🚀", name: "Speedster", description: "Optimized for high performance." },
];

export default function VerticalScrollSection() {
    return (
        <section className={styles.container} data-scroll-section="vertical" data-scroll-multiplier="2">
            <div className={styles.contentWrapper}>
                <div className={styles.stackColumn} data-vertical-content>
                    <ScrollStack
                        itemStackDistance={24}
                        baseScale={0.9}
                        itemScale={0.04}
                    /* blurAmount={1.5} Removed blur as requested */
                    >
                        {SPONSORS.map((sponsor, index) => (
                            <ScrollStackItem key={index}>
                                <SponsorCard
                                    logo={sponsor.logo}
                                    name={sponsor.name}
                                    description={sponsor.description}
                                />
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>

                <div className={styles.textColumn}>
                    <div className={styles.stickyText}>
                        <h2>Our Sponsors</h2>
                        <p>We thank our dear sponsors for making this event possible. Their support drives innovation and creativity.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}