"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { registerIndividual } from '@/lib/api/user';
import { getErrorMessage } from '@/lib/utils/errors';
import { RegistrationData, RegistrationStatus } from '@/types';
import RegistrationForm from '@/components/forms/RegistrationForm';
import GoogleSignIn from '@/components/auth/GoogleSignIn';
import styles from './register.module.scss';

import Starfield from '@/components/ui/Starfield/Starfield';

export default function RegisterPage() {
    const router = useRouter();
    const { user, isAuthenticated, checkAuth } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        // Check authentication on mount
        checkAuth();
        setIsCheckingAuth(false);

        // Redirect if already registered
        if (isAuthenticated && user?.registrationStatus === RegistrationStatus.REGISTERED) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, user, router, checkAuth]);

    const handleSubmit = async (data: RegistrationData) => {
        setLoading(true);
        setError(null);

        try {
            await registerIndividual(data);

            // Redirect to dashboard after successful registration
            router.push('/dashboard');
        } catch (err) {
            console.error('Registration Error:', err);
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    // Show loading state while checking auth
    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#05051a] via-[#0a0a2e] to-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    // Show Google Sign-In if not authenticated
    if (!isAuthenticated) {
        return (
            <main className={`${styles.pageContainer} ${styles.centerContent}`}>
                {/* Starfield Background */}
                <Starfield />

                <div className={styles.signInCard}>
                    <div className={styles.header}>
                        <h1>
                            HACKAMINED
                        </h1>
                        <p className={styles.subtitle}>
                            2 0 2 6
                        </p>
                        <p className={styles.description}>
                            The Ultimate 24-Hour Hackathon Experience
                        </p>
                    </div>

                    {/* Billboard-style Card */}
                    <div>
                        {/* Hand-drawn Border Effect */}
                        <div className={styles.border}></div>

                        <div className={styles.content}>
                            <h2>
                                Sign In to Register
                            </h2>
                            <p>
                                Join us for an exciting coding journey
                            </p>

                            <GoogleSignIn />

                            <p className={styles.disclaimer}>
                                Sign in with Google to complete your registration
                            </p>
                        </div>

                        {/* Billboard Stand */}
                        <div className={styles.stand}></div>
                    </div>
                </div>


            </main>
        );
    }

    // Show registration form if authenticated
    return (
        <main className={styles.pageContainer}>
            {/* Starfield Background */}
            <Starfield dimmed />

            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <h1>
                        Complete Your Registration
                    </h1>
                    <p className={styles.subtitle}>
                        Fill in your details to participate in HACKAMINED 2026
                    </p>
                </div>

                <RegistrationForm
                    onSubmit={handleSubmit}
                    loading={loading}
                    error={error}
                />
            </div>


        </main>
    );
}
