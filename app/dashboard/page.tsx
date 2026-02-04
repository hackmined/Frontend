"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { getUserProfile } from '@/lib/api/user';
import { getTeam } from '@/lib/api/team';
import { getMyInvitations } from '@/lib/api/invitations';
import { User, Team, Invitation } from '@/types';
import { getErrorMessage } from '@/lib/utils/errors';
import UserProfile from '@/components/dashboard/UserProfile';
import TeamStatus from '@/components/dashboard/TeamStatus';

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

            // Fetch team if user has one
            if (userProfile.teamId) {
                const teamData = await getTeam(userProfile.teamId);
                setTeam(teamData);
            }

            // Fetch invitations
            const userInvitations = await getMyInvitations();
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
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading dashboard...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-red-400 text-xl">{error}</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <main className="min-h-screen bg-black py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Dashboard
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Welcome to HACKAMINED 2026
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* User Profile */}
                    <div>
                        <UserProfile user={user} />
                    </div>

                    {/* Team Status */}
                    <div>
                        <TeamStatus team={team} isLeader={user.isTeamLeader} />
                    </div>
                </div>

                {/* Invitations */}
                {invitations.length > 0 && (
                    <div className="mt-8">
                        <div className="bg-black/50 border border-white/20 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Pending Invitations ({invitations.length})
                            </h3>
                            <div className="space-y-3">
                                {invitations.map((inv) => (
                                    <div
                                        key={inv._id}
                                        className="flex items-center justify-between bg-white/5 p-4 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-white font-medium">
                                                Team: {inv.team?.name || 'Unknown'}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                Status: {inv.status}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
