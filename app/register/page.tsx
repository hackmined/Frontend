"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/authStore';
import { RegistrationStatus, RegistrationData } from '@/types';
import { registerIndividual, getUserProfile } from '@/lib/api/user';
import { loginWithGoogle } from '@/lib/api/auth';
import { getErrorMessage } from '@/lib/utils/errors';
import GoogleSignIn from '@/components/auth/GoogleSignIn';
import RegistrationForm from '@/components/forms/RegistrationForm';
import Starfield from '@/components/ui/Starfield/Starfield';
import styles from './register.module.scss';

// Registration closed flag - set to false to close registrations
const REGISTRATION_ENABLED = true;

export default function RegisterPage() {
    const router = useRouter();
    const { user, isAuthenticated, checkAuth, login, updateUser } = useAuthStore();
    const [googleCredential, setGoogleCredential] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkAuth();

        // If already authenticated and registered, go to dashboard
        if (isAuthenticated && user?.registrationStatus === RegistrationStatus.REGISTERED) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, user]);

    const handleGoogleSuccess = async (credential: string) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Check if registration is enabled
            if (!REGISTRATION_ENABLED) {
                setError('Registrations are currently closed.');
                setIsSubmitting(false);
                return;
            }

            // Authenticate with Google to get user data
            const authResponse = await loginWithGoogle(credential);

            // Store the JWT token in auth store
            login(authResponse.data.token, authResponse.data.user);

            // Check registration status
            if (authResponse.data.user.registrationStatus === RegistrationStatus.REGISTERED) {
                // User is already registered, redirect to dashboard
                router.push('/dashboard');
            } else {
                // User needs to complete registration, store credential and show form
                setGoogleCredential(credential);
                setShowForm(true);
            }
        } catch (err) {
            console.error('Google authentication error:', err);
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRegistrationSubmit = async (data: RegistrationData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Complete registration with full form data (user is already authenticated)
            const registrationResponse = await registerIndividual(data);

            // Update user with complete registration data
            updateUser(registrationResponse.user);

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (err) {
            console.error('Registration error:', err);
            setError(getErrorMessage(err));
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show registration form if we have Google credential or if user is authenticated but not registered
    if (showForm || (isAuthenticated && user?.registrationStatus === RegistrationStatus.PENDING)) {
        return (
            <main className={`${styles.pageContainer} ${styles.centerContent}`}>
                <Starfield />

                <div className={styles.loginWrapper}>
                    <div className={styles.tempSignInCard}>
                        <div className={styles.panelContent}>
                            <RegistrationForm
                                onSubmit={handleRegistrationSubmit}
                                loading={isSubmitting}
                                error={error}
                            />
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Show registration closed message if registrations are disabled
    if (!REGISTRATION_ENABLED) {
        return (
            <main className={`${styles.pageContainer} ${styles.centerContent}`}>
                <Starfield />

                <div className={styles.loginWrapper}>
                    <div className={styles.tempSignInCard}>
                        <div className={styles.panelContent}>
                            <p className={styles.year}>HACKaMINeD 2026</p>

                            <p className={styles.tagline}>
                                CODE • COMPETE • CONQUER
                            </p>

                            <div className={styles.formRegion}>
                                <h2>Registration Closed</h2>
                                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                    Thank you for your interest! Registrations for HACKaMINeD 2026 are now closed.
                                </p>

                                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                    <p style={{ marginBottom: '1rem', fontSize: '1rem', color: '#94a3b8' }}>
                                        Already registered?
                                    </p>
                                    <Link
                                        href="/login"
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.75rem 2rem',
                                            backgroundColor: '#f1f5f9',
                                            color: '#1f2937',
                                            textDecoration: 'none',
                                            borderRadius: '0.375rem',
                                            fontWeight: '600',
                                            transition: 'background-color 0.2s',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                                    >
                                        Sign In to Dashboard
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    // Show Google Sign-In by default
    return (
        <main className={`${styles.pageContainer} ${styles.centerContent}`}>
            <Starfield />

            <div className={styles.loginWrapper}>
                <div className={styles.tempSignInCard}>
                    <div className={styles.panelContent}>
                        <p className={styles.year}>HACKaMINeD 2026</p>

                        <p className={styles.tagline}>
                            CODE • COMPETE • CONQUER
                        </p>

                        <div className={styles.formRegion}>
                            <h2>Register for the Hackathon</h2>

                            <GoogleSignIn onGoogleSuccess={handleGoogleSuccess} />

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
