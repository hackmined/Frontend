"use client";
import React, { useState } from 'react';
import styles from './FAQSection.module.scss';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What is HACKaMINeD?",
        answer: "HACKaMINeD is a hybrid hackathon, formed by merging HackNUthon and MINeD, where participants build innovative solutions in online and offline (limited seats at Nirma University) modes."
    },
    {
        question: "Who can participate in HACKaMINeD?",
        answer: "Anyone can participate beginners, developers, designers, and innovators."
    },
    {
        question: "Do I need to attend any in-person events to be eligible?",
        answer: "No. Both online and offline participants are eligible. Offline participation is subject to limited seats."
    },
    {
        question: "How can I find a team to join?",
        answer: "Mention it during registration and connect via official community channels."
    },
    {
        question: "If you have additional questions…",
        answer: "You can contact us at hackamined.contact@gmail.com or reach out via our official Discord server."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.faqSection} id="faq">
            <div className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>FAQs</h2>
                <div className={styles.faqContainer}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
                        >
                            <button
                                className={styles.question}
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <div className={styles.questionContent}>
                                    <span className={styles.starIcon}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className={styles.questionText}>
                                        {faq.question}
                                    </span>
                                </div>
                                <span className={styles.iconContainer}>
                                    <span className={`${styles.icon} ${openIndex === index ? styles.rotate : ''}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </span>
                            </button>
                            <div className={`${styles.answer} ${openIndex === index ? styles.visible : ''}`}>
                                <p className={styles.answerText}>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
