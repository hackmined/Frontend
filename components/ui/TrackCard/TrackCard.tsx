import React from 'react';
import styles from './TrackCard.module.scss';
import { Track } from '@/types';

export default function TrackCard({ icon, title, description, prize }: Track) {
    return (
        <div className={styles.trackCard}>
            <div className={styles.trackIcon}>{icon}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <span className={styles.prize}>{prize}</span>
        </div>
    );
}
