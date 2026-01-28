import React from 'react';
import styles from './TracksSection.module.scss';

export default function TracksSection() {
    return (
        <section className={styles.tracksSection}>
            <div className={styles.sectionContent}>
                <div className={styles.comingSoonOverlay}>
                    <h2>SPONSORS</h2>
                    <h2>To be announced soon!</h2>
                </div>
            </div>
        </section>
    );
}
