"use client";
import React from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main style={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#000', // Assuming dark theme based on context
            color: '#fff',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>REGISTRATION</h1>
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem', opacity: 0.8 }}>
                Registration for HackaMINeD is opening soon.
            </p>
            <Link href="/" style={{
                textDecoration: 'underline',
                color: '#fff',
                fontSize: '1rem'
            }}>
                Back to Home
            </Link>
        </main>
    );
}
