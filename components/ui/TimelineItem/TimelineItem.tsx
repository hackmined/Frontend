import React from 'react';
import styles from './TimelineItem.module.scss';
import { TimelineEvent } from '@/types';

export default function TimelineItem({ number, title, date, description }: TimelineEvent) {
    return (
        <div className={`${styles.timelineItem} timeline-item`}>
            <div className={styles.timeNumber}>{number}</div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.date}>{date}</p>
            <p className={styles.description}>{description}</p>
        </div>
    );
}
