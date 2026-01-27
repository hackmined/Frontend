"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
    { label: 'WORK', href: '#work' },
    { label: 'NEWS', href: '#news' },
    { label: 'ABOUT', href: '#about' },
    { label: 'CAPABILITIES', href: '#capabilities' },
    { label: 'CONTACT', href: '#contact' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    *logo*
                </Link>

                <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={styles.navLink}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    className={styles.mobileMenuToggle}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span className={mobileMenuOpen ? styles.closeIcon : styles.menuIcon}>
                        {mobileMenuOpen ? '✕' : '☰'}
                    </span>
                </button>
            </div>
        </header>
    );
}
