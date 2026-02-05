"use client";

import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useState } from 'react';
import { loginWithGoogle } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/stores/authStore';
import { getErrorMessage } from '@/lib/utils/errors';
import { RegistrationStatus } from '@/types';
import { useRouter } from 'next/navigation';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

export default function GoogleSignIn() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuthStore();

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        setLoading(true);
        setError(null);

        try {
            const idToken = credentialResponse.credential;
            if (!idToken) {
                throw new Error('No credential received from Google');
            }

            // Call backend auth endpoint
            const response = await loginWithGoogle(idToken);

            // Update auth store with complete user data from API
            login(response.data.token, response.data.user);

            // Redirect based on registration status
            if (response.data.user.registrationStatus === RegistrationStatus.PENDING) {
                router.push('/register');
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            console.error('Google Sign-In Error:', err);
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleError = () => {
        setError('Google Sign-In failed. Please try again.');
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div className="flex flex-col items-center gap-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <div className={loading ? 'opacity-50 pointer-events-none' : ''}>
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        theme="filled_black"
                        size="large"
                        text="signin_with"
                        shape="rectangular"
                    />
                </div>

                {loading && (
                    <div className="text-sm text-gray-400">
                        Signing you in...
                    </div>
                )}
            </div>
        </GoogleOAuthProvider>
    );
}
