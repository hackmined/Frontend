"use client";

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { createTeam } from '@/lib/api/team';
import { validateTeamName } from '@/lib/utils/validation';
import { getErrorMessage, isDeadlineError } from '@/lib/utils/errors';
import Starfield from '@/components/ui/Starfield/Starfield';
import styles from '@/styles/shared-page.module.scss';
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';

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
        <main className={styles.pageContainer}>
            <Starfield />

            <div className={styles.contentWrapper}>
                <div className={styles.pageHeader}>
                    <h1>Create Your Team</h1>
                    <p className={styles.subtitle}>
                        Choose a unique name for your hackathon team
                    </p>
                </div>

                <div className={styles.billboardCard} style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div className={styles.border}></div>
                    <div className={styles.content}>
                        {error && (
                            <div className={styles.errorBanner}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="teamName"
                                >
                                    Team Name *
                                </label>
                                <input
                                    type="text"
                                    id="teamName"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    className={styles.inputField}
                                    placeholder="Enter team name (min 3 characters)"
                                    disabled={loading}
                                />
                                <p className={styles.helperText}>
                                    Team name must be at least 3 characters long
                                </p>
                            </div>

                            <div className={styles.buttonsContainer}>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={styles.primaryButton}
                                >
                                    {loading ? 'Creating Team...' : 'Create Team'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => router.push('/dashboard')}
                                    className={styles.secondaryButton}
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
