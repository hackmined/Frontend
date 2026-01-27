import React from 'react';
import Button from '@/components/ui/Button/Button';
import styles from './CTASection.module.scss';

export default function CTASection() {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>
                    <span className={styles.titleTop}>READY TO</span>
                    <span className={styles.titleMain}>HACK?</span>
                </h2>
                <p className={styles.ctaSubtitle}>
                    Join hundreds of innovators, builders, and creators
                </p>
                <Button variant="primary" size="lg">
                    REGISTER NOW
                </Button>
                <div className={styles.ctaInfo}>
                    <div className={styles.infoItem}>
                        <h4>Questions?</h4>
                        <p>hello@hackamined.com</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h4>Follow Us</h4>
                        <div className={styles.socialLinks}>
                            <a href="#twitter">Twitter</a>
                            <a href="#discord">Discord</a>
                            <a href="#linkedin">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
