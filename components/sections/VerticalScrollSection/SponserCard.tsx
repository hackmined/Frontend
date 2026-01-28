import { useEffect, useRef, useState } from "react";
import styles from "./SponserCard.module.scss"

interface SponsorCardProps {
    logo: React.ReactNode;
    name: string;
    description: string;
    website?: string;
}

const SponsorCard: React.FC<SponsorCardProps> = ({ logo, name, description, website }) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    // Reveal on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, []);

    // Hover tilt using requestAnimationFrame for smoothness
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * 10;
        const rotateY = ((x / rect.width) - 0.5) * -10;

        cardRef.current.style.transform = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    };

    const resetTilt = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    return (
        <div
            ref={cardRef}
            className={`${styles.card} ${visible ? styles.show : ""}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={resetTilt}
        >
            <div className={styles.logo}>{logo}</div>
            <h3>{name}</h3>
            <p>{description}</p>
            {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    Visit
                </a>
            )}
        </div>
    );
};

export default SponsorCard;
