"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { registerIndividual } from '@/lib/api/user';
import { getErrorMessage } from '@/lib/utils/errors';
import { RegistrationData, RegistrationStatus } from '@/types';
import RegistrationForm from '@/components/forms/RegistrationForm';

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

        // Redirect if not authenticated
        if (!isAuthenticated) {
            router.push('/');
            return;
        }

        // Redirect if already registered
        if (user?.registrationStatus === RegistrationStatus.REGISTERED) {
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
    if (isCheckingAuth || !isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Complete Your Registration
                    </h1>
                    <p className="text-gray-400 text-lg">
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
