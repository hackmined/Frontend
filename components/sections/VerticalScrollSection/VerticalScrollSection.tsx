import styles from './VerticalScrollSection.module.scss';
import SponsorCard from "./SponserCard";

const SPONSORS = [
    { logo: "⚡", name: "Scroll Sync", description: "Animations are synced with user scroll." },
    { logo: "🎯", name: "Precision Motion", description: "Hover, tilt, depth & parallax combined." },
    { logo: "🧊", name: "Glass UI", description: "Modern glassmorphic UI layers." },
    { logo: "🚀", name: "Speedster", description: "Optimized for high performance." },
    { logo: "🎨", name: "Creative Flow", description: "Smooth transitions and easing." },
    { logo: "💎", name: "Crystal Clear", description: "High fidelity rendering." },
    { logo: "🔧", name: "Robust Core", description: "Built on solid architecture." },
    { logo: "🌐", name: "Global Reach", description: "Content delivery optimization." },
    { logo: "🛡️", name: "Secure Guard", description: "Enterprise grade security." },
];

export default function VerticalScrollSection() {
    return (
        <section className={styles.container} data-scroll-section="vertical" data-scroll-multiplier="2">
            <div className={styles.header}>
                <h2>Our Sponsers</h2>
                <p> We thank our dear sponsers!</p>
            </div>
            
            <div className={styles.scrollContent} data-vertical-content>
                
                    {SPONSORS.map((sponsor, index) => (
                        <SponsorCard
                            key={index}
                            logo={sponsor.logo}
                            name={sponsor.name}
                            description={sponsor.description}
                        />
                    ))}
                
            </div>
        </section>
    );
}