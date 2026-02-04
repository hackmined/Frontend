import styles from './VerticalScrollSection.module.scss';
import SponsorCard from "./SponserCard";
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const SPONSORS = [
    { logo: "⚡", name: "Scroll Sync", description: "Animations are synced with user scroll.", backgroundImage: "/Card_final.svg" },
    { logo: "🎯", name: "Precision Motion", description: "Hover, tilt, depth & parallax combined.", backgroundImage: "/Card_final.svg" },
    { logo: "🧊", name: "Glass UI", description: "Modern glassmorphic UI layers.", backgroundImage: "/Card_final.svg" },
    { logo: "🚀", name: "Speedster", description: "Optimized for high performance.", backgroundImage: "/Card_final.svg" },
];

export default function VerticalScrollSection() {
    return (
        <section className={styles.container} data-scroll-section="vertical" data-scroll-multiplier="1">
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
                                    backgroundImage={sponsor.backgroundImage}
                                />
                            </ScrollStackItem>
                        ))}
                    </ScrollStack>
                </div>

                <div className={styles.textColumn}>
                    <div className={styles.stickyText}>
                        <h2>Tracks</h2>
                        <p>Explore our diverse tracks designed to challenge your creativity and technical skills. Choose your path and build the future.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}