"use client";

import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

interface GoogleSignInProps {
    onGoogleSuccess: (credential: string) => void;
}

export default function GoogleSignIn({ onGoogleSuccess }: GoogleSignInProps) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        setLoading(true);
        setError(null);

        try {
            const idToken = credentialResponse.credential;
            if (!idToken) {
                throw new Error('No credential received from Google');
            }

            // Pass the credential to parent component
            onGoogleSuccess(idToken);
        } catch (err) {
            console.error('Google Sign-In Error:', err);
            setError('Failed to process Google Sign-In. Please try again.');
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
                        Processing...
                    </div>
                )}
            </div>
        </GoogleOAuthProvider>
    );
}
