"use client";

import GoogleSignIn from '@/components/auth/GoogleSignIn';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        HACKAMINED 2026
                    </h1>
                    <p className="text-gray-400 text-lg">
                        The Ultimate 24-Hour Hackathon Experience
                    </p>
                </div>

                <div className="bg-black/50 border border-white/20 rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Sign In to Register
                    </h2>

                    <GoogleSignIn />

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <Link
                            href="/"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mt-8">
                    By signing in, you agree to our terms and conditions
                </p>
            </div>
        </main>
    );
}
