"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { createTeam } from '@/lib/api/team';
import { validateTeamName } from '@/lib/utils/validation';
import { getErrorMessage, isDeadlineError } from '@/lib/utils/errors';
import { useEffect } from 'react';

export default function CreateTeamPage() {
    const router = useRouter();
    const { isAuthenticated, checkAuth } = useAuthStore();
    const [teamName, setTeamName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkAuth();

        if (!isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router, checkAuth]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validate team name
        const validationError = validateTeamName(teamName);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            const team = await createTeam(teamName);

            // Redirect to team page
            router.push(`/team/${team.id}`);
        } catch (err) {
            console.error('Create Team Error:', err);

            if (isDeadlineError(err)) {
                setError('Cannot create team. The team creation deadline has passed.');
            } else {
                setError(getErrorMessage(err));
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <main className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-4">Create Your Team</h1>
                    <p className="text-gray-400">
                        Choose a unique name for your hackathon team
                    </p>
                </div>

                <div className="bg-black/50 border border-white/20 rounded-lg p-8">
                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="teamName"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Team Name *
                            </label>
                            <input
                                type="text"
                                id="teamName"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                                placeholder="Enter team name (min 3 characters)"
                                disabled={loading}
                            />
                            <p className="text-gray-500 text-sm mt-2">
                                Team name must be at least 3 characters long
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Team...' : 'Create Team'}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push('/dashboard')}
                            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
