import React, { useMemo } from 'react';
import styles from './Starfield.module.scss';

interface StarfieldProps {
    className?: string;
    dimmed?: boolean;
}

const generateStars = (count: number, color: string) => {
    return Array.from({ length: count }, () =>
        `${Math.random() * 2000}px ${Math.random() * 2000}px ${color}`
    ).join(', ');
};

const Starfield: React.FC<StarfieldProps> = ({ className, dimmed = false }) => {
    const smallStars = useMemo(() => generateStars(100, 'white'), []);
    const mediumStars = useMemo(() => generateStars(50, 'white'), []);
    const largeStars = useMemo(() => generateStars(20, '#00f2ff'), []);

    return (
        <div className={`${styles.starfield} ${dimmed ? styles.dimmed : ''} ${className || ''}`}>
            <div className={styles.starsSmall} style={{ boxShadow: smallStars }}></div>
            <div className={styles.starsMedium} style={{ boxShadow: mediumStars }}></div>
            <div className={styles.starsLarge} style={{ boxShadow: largeStars }}></div>
        </div>
    );
};

export default Starfield;
