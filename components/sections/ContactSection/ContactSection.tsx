"use client";
import React, { useState } from 'react';
import styles from './ContactSection.module.scss';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        alert(`Thank you for your message, ${formData.name}! We'll get back to you soon.`);
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section className={styles.contactSection} id="contact">
            <div className={styles.sectionContent}>
                <h1 className={styles.sectionTitle}>
                    <span className={styles.titleMain}>CONTACT US</span>
                </h1>

                <div className={styles.contactContainer}>
                    <form className={styles.formCard} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">NAME</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">EMAIL</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message">MESSAGE</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="How can we help you?"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitBtn}>SEND MESSAGE</button>
                    </form>

                    <div className={styles.infoCard}>
                        <div className={styles.infoItem}>
                            <h3>General Inquiries</h3>
                            <p>
                                Have a question about the hackathon? <br />
                                Email us at: <a href="mailto:hackamined.contact@gmail.com">hackamined.contact@gmail.com</a>
                            </p>
                        </div>

                        <div className={styles.infoItem}>
                            <h3>Join the Community</h3>
                            <p>
                                Connect with other hackers, find teammates, and get the latest updates on our Discord server.
                            </p>
                            <a href="https://discord.gg/hackamined" target="_blank" rel="noopener noreferrer" className={styles.discordBtn}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
                                    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22c2.91-23.23-1.52-46.59-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.18-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
                                </svg>
                                JOIN DISCORD
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
