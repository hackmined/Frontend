"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import GoogleSignIn from '@/components/auth/GoogleSignIn';
import Starfield from '@/components/ui/Starfield/Starfield';
import Link from 'next/link';
import styles from './login.module.scss';

import { loginWithGoogle } from '@/lib/api/auth';
import { getErrorMessage } from '@/lib/utils/errors';
import { RegistrationStatus } from '@/types';

export default function LoginPage() {
    const router = useRouter();
    const { isAuthenticated, checkAuth, login } = useAuthStore();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkAuth();
        setIsCheckingAuth(false);
        if (isAuthenticated) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, router, checkAuth]);

    const handleGoogleSuccess = async (credential: string) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const authResponse = await loginWithGoogle(credential);
            login(authResponse.data.token, authResponse.data.user);

            if (authResponse.data.user.registrationStatus === RegistrationStatus.REGISTERED) {
                router.push('/dashboard');
            } else {
                router.push('/register');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCheckingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    // Even if authenticated, we might briefly show this before redirect, or if redirect fails.
    // Ideally we return null if authenticated inside the effect, but here we handle the !isAuthenticated case for content.

    return (
        <main className={`${styles.pageContainer} ${styles.centerContent}`}>
            <Starfield />

            <div className={styles.loginWrapper}>
                <div className={styles.tempSignInCard}>
                    <div className={styles.panelContent}>
                        <p className={styles.year}>HackaMined 2026</p>

                        <p className={styles.tagline}>
                            CODE • COMPETE • CONQUER
                        </p>

                        <div className={styles.formRegion}>
                            <h2>Sign In to HackaMined</h2>

                            {error && (
                                <div className="mb-4 text-red-500 bg-red-500/10 p-2 rounded text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <GoogleSignIn onGoogleSuccess={handleGoogleSuccess} />

                            <Link
                                href="/"
                                className={styles.disclaimer}
                                style={{
                                    textDecoration: 'none',
                                    fontStyle: 'normal',
                                    fontSize: '0.9rem',
                                    marginTop: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
