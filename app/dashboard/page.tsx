"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { getUserProfile } from '@/lib/api/user';
import { getTeam } from '@/lib/api/team';
import { getUserInvitations } from '@/lib/api/invitations';
import { User, Team, Invitation } from '@/types';
import { getErrorMessage } from '@/lib/utils/errors';
import UserProfile from '@/components/dashboard/UserProfile';
import TeamStatus from '@/components/dashboard/TeamStatus';
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';
import Starfield from '@/components/ui/Starfield/Starfield';
import styles from '@/styles/shared-page.module.scss';

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated, checkAuth } = useAuthStore();
    const [user, setUser] = useState<User | null>(null);
    const [team, setTeam] = useState<Team | null>(null);
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkAuth();

        if (!isAuthenticated) {
            router.push('/');
            return;
        }

        loadDashboardData();
    }, [isAuthenticated, router, checkAuth]);

    const loadDashboardData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch user profile
            const userProfile = await getUserProfile();
            setUser(userProfile);

            // Fetch team if user has one (teamId can be string or Team object)
            if (userProfile.teamId) {
                const teamId = typeof userProfile.teamId === 'string'
                    ? userProfile.teamId
                    : (userProfile.teamId as any)._id || userProfile.teamId.id;
                const teamData = await getTeam(teamId);
                setTeam(teamData);
            }

            // Fetch invitations
            const userInvitations = await getUserInvitations();
            setInvitations(userInvitations);
        } catch (err) {
            console.error('Dashboard Error:', err);
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <Starfield />
                <div style={{
                    position: 'relative',
                    zIndex: 10,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <LoadingSpinner size="lg" text="Loading dashboard..." />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.pageContainer}>
                <Starfield />
                <div className={styles.contentWrapper}>
                    <div className={styles.errorBanner}>
                        <p>{error}</p>
                        <button
                            onClick={loadDashboardData}
                            className={styles.secondaryButton}
                            style={{ marginTop: '1rem', width: 'auto', padding: '0.5rem 1.5rem' }}
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main className={styles.pageContainer}>
            <Starfield />

            <div className={styles.contentWrapper}>
                <div className={styles.pageHeader}>
                    <h1>Dashboard</h1>
                    <p className={styles.subtitle}>Welcome back, {user.fullName}!</p>
                </div>

                <div className={styles.gridTwo}>
                    {/* User Profile Card */}
                    <div className={styles.billboardCard}>
                        <div className={styles.border}></div>
                        <div className={styles.content}>
                            <UserProfile user={user} />
                        </div>
                    </div>

                    {/* Team Status Card */}
                    <div className={styles.billboardCard}>
                        <div className={styles.border}></div>
                        <div className={styles.content}>
                            <TeamStatus
                                team={team}
                                isLeader={user.isTeamLeader}
                                userId={user.id}
                                onTeamLeft={loadDashboardData}
                            />
                        </div>
                    </div>
                </div>

                {/* Invitations Section */}
                {invitations.length > 0 && (
                    <div className={styles.billboardCard}>
                        <div className={styles.border}></div>
                        <div className={styles.content}>
                            <h3 className={styles.cardHeader}>Pending Invitations</h3>
                            <div style={{ color: '#d1d5db' }}>
                                <p>You have {invitations.length} pending team invitation{invitations.length > 1 ? 's' : ''}.</p>
                                <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                                    Complete your registration to accept invitations.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
