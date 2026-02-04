"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';
import { NavItem } from '@/types';

const navItems: NavItem[] = [
    { label: 'CONTACT', href: '/contact' },
    { label: 'ORGANIZERS', href: '/organizers' },
    { label: 'REGISTER', href: '/register' },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLinkMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const link = e.currentTarget;
        const rect = link.getBoundingClientRect();

        // Calculate mouse position relative to link center
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;

        // Apply parallax transform
        const intensity = 15;
        const offsetX = deltaX * intensity;
        const offsetY = deltaY * intensity;

        link.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    const handleLinkMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const link = e.currentTarget;
        link.style.transform = 'translate(0, 0)';
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo} data-nav-logo>

                </Link>

                <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileOpen : ''}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={styles.navLink}
                            onClick={() => setMobileMenuOpen(false)}
                            onMouseMove={handleLinkMouseMove}
                            onMouseLeave={handleLinkMouseLeave}
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
