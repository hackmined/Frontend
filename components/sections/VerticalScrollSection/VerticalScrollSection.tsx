import styles from './VerticalScrollSection.module.scss';

export default function VerticalScrollSection() {
    return (
        <section className={styles.container} data-scroll-section="vertical" data-scroll-multiplier="2">
            <div className={styles.header}>
                <h2>Vertical Scroll Zone</h2>
                <p>Scroll down to see more content</p>
            </div>
            
            <div className={styles.scrollContent} data-vertical-content>
                <div className={styles.card}>
                    <h3>Item 1</h3>
                    <p>This is the first item in the vertical list.</p>
                </div>
                <div className={styles.card}>
                    <h3>Item 2</h3>
                    <p>Notice how the horizontal movement stops...</p>
                </div>
                <div className={styles.card}>
                    <h3>Item 3</h3>
                    <p>...and the vertical content moves up.</p>
                </div>
                <div className={styles.card}>
                    <h3>Item 4</h3>
                    <p>Once you reach the end...</p>
                </div>
                <div className={styles.card}>
                    <h3>Item 5</h3>
                    <p>...horizontal scrolling resumes!</p>
                </div>
                <div className={styles.card}>
                    <h3>Item 6</h3>
                    <p>Adding more content to test heavier scrolling.</p>
                </div>
                <div className={styles.card}>
                    <h3>Item 7</h3>
                    <p>The timeline should adapt automatically.</p>
                </div>
                <div className={styles.card}>
                    <h3>Item 8</h3>
                    <p>Keep scrolling...</p>
                </div>
                <div className={styles.card}>
                    <h3>Item 9</h3>
                    <p>Almost there...</p>
                </div>
                <div className={styles.card}>
                    <h3>Item 10</h3>
                    <p>Final item before resuming horizontal flow.</p>
                </div>
            </div>
        </section>
    );
}
