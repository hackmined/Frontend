import React from 'react';
import TrackCard from '@/components/ui/TrackCard/TrackCard';
import styles from './TracksSection.module.scss';
import { Track } from '@/types';

const tracks: Track[] = [
    {
        id: '1',
        icon: '🤖',
        title: 'AI/ML Innovation',
        description: 'Build intelligent solutions using cutting-edge AI',
        prize: '$5,000'
    },
    {
        id: '2',
        icon: '🌍',
        title: 'Sustainability',
        description: 'Create tech for a better planet',
        prize: '$5,000'
    },
    {
        id: '3',
        icon: '🏥',
        title: 'HealthTech',
        description: 'Innovate healthcare with technology',
        prize: '$5,000'
    },
    {
        id: '4',
        icon: '🎮',
        title: 'Gaming & XR',
        description: 'Build immersive experiences',
        prize: '$5,000'
    }
];

export default function TracksSection() {
    return (
        <section className={styles.tracksSection}>
            <div className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>
                    <span className={styles.titleAccent}>TRACKS &</span>
                    <span className={styles.titleMain}>PRIZES</span>
                </h2>
                <div className={styles.tracksGrid}>
                    {tracks.map((track) => (
                        <TrackCard key={track.id} {...track} />
                    ))}
                </div>
                <div className={styles.grandPrize}>
                    <p>GRAND PRIZE</p>
                    <h3>$10,000</h3>
                    <p className={styles.subtitle}>+ Mentorship & Incubation</p>
                </div>
            </div>
        </section>
    );
}
