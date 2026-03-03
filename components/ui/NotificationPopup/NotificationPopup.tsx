"use client";
import React, { useState, useEffect } from "react";
import styles from "./NotificationPopup.module.scss";

interface NotificationPopupProps {
  /** Each string becomes one bullet point */
  items?: string[];
  /** Delay (ms) before the popup slides in. Default: 1200 */
  delay?: number;
}

const DEFAULT_ITEMS = [
  "DEADLINE EXTENDED: The final registration deadline is 2:00pm 4th March, 2026",
  "All participants must register on the website by then AND join their respective teams.",
  "MANDATORY: All participants must join the discord. All further announcements will be made there.",
];

export default function NotificationPopup({
  items = DEFAULT_ITEMS,
  delay = 1200,
}: NotificationPopupProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 350);
  };

  if (!visible && !closing) return null;

  return (
    <div
      className={`${styles.popup} ${closing ? styles.closing : styles.open}`}
      role="alert"
      aria-live="assertive"
    >
      {/* Pulsing danger border */}
      <span className={styles.border} aria-hidden="true" />

      {/* Alarming header strip */}
      <div className={styles.header} aria-hidden="true">
        {/* <span className={styles.dot} /> */}
        <span className={styles.label}>⚠ Important Notice</span>
      </div>

      <div className={styles.inner}>
        <div className={styles.contentWrapper}>
          <ul className={styles.messageList}>
            {items.map((item, i) => (
              <li key={i} className={styles.messageItem}>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://discord.gg/mSh382QpJJ"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.discordBtn}
          >
            Join Discord
          </a>
        </div>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
