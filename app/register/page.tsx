"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { RegistrationStatus, RegistrationData } from '@/types';
import { registerIndividual, getUserProfile } from '@/lib/api/user';
import { loginWithGoogle } from '@/lib/api/auth';
import { getErrorMessage } from '@/lib/utils/errors';
import GoogleSignIn from '@/components/auth/GoogleSignIn';
import NirmaStudentModal from '@/components/auth/NirmaStudentModal';
import RegistrationForm from '@/components/forms/RegistrationForm';
import Starfield from '@/components/ui/Starfield/Starfield';
import styles from './register.module.scss';

export default function RegisterPage() {
    const router = useRouter();
    const { user, isAuthenticated, checkAuth, login, updateUser } = useAuthStore();
    const [googleCredential, setGoogleCredential] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showNirmaModal, setShowNirmaModal] = useState(false);
    const [isNirmaStudent, setIsNirmaStudent] = useState<boolean | null>(null);
    const [showGoogleLogin, setShowGoogleLogin] = useState(false);

    useEffect(() => {
        checkAuth();

        // If already authenticated and registered, go to dashboard
        if (isAuthenticated && user?.registrationStatus === RegistrationStatus.REGISTERED) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, user]);

    const handleNirmaModalConfirm = (nirmaStudent: boolean) => {
        setIsNirmaStudent(nirmaStudent);
        setShowNirmaModal(false);
        setShowGoogleLogin(true);
    };

    const handleGoogleSuccess = async (credential: string) => {
        setIsSubmitting(true);
        setError(null);

        try {
            // Decode the JWT token to get email (basic decoding, not verification)
            const base64Url = credential.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const payload = JSON.parse(jsonPayload);
            const userEmail = payload.email;

            // Validate email based on Nirma student status
            if (isNirmaStudent && !userEmail.endsWith('@nirmauni.ac.in')) {
                setError('Nirma students must use their official Nirma University email (@nirmauni.ac.in)');
                setIsSubmitting(false);
                setShowGoogleLogin(false);
                setIsNirmaStudent(null);
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
            setShowGoogleLogin(false);
            setIsNirmaStudent(null);
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

                            {!showGoogleLogin ? (
                                <div className={styles.proceedSection}>
                                    <p className={styles.proceedText}>
                                        Click below to proceed with registration
                                    </p>
                                    <button 
                                        className={styles.proceedButton}
                                        onClick={() => setShowNirmaModal(true)}
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                        Proceed to Login
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <GoogleSignIn onGoogleSuccess={handleGoogleSuccess} />

                                    {isNirmaStudent && (
                                        <div className={styles.nirmaNotice}>
                                            <svg className={styles.nirmaIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                                            </svg>
                                            <p>Please use your official Nirma University email (@nirmauni.ac.in)</p>
                                        </div>
                                    )}

                                    <button 
                                        className={styles.backButton}
                                        onClick={() => {
                                            setShowGoogleLogin(false);
                                            setIsNirmaStudent(null);
                                            setError(null);
                                        }}
                                    >
                                        ← Back
                                    </button>
                                </>
                            )}

                            {error && (
                                <div className={styles.errorMessage}>
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <NirmaStudentModal
                isOpen={showNirmaModal}
                onClose={() => setShowNirmaModal(false)}
                onConfirm={handleNirmaModalConfirm}
            />
        </main>
    );
}
