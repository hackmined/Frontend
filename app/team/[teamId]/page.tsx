"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { getTeam } from '@/lib/api/team';
import { Team, User, getUserId } from '@/types';
import { getErrorMessage } from '@/lib/utils/errors';
import TeamCard from '@/components/team/TeamCard';
import MemberList from '@/components/team/MemberList';
import InviteForm from '@/components/team/InviteForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner/LoadingSpinner';
import Starfield from '@/components/ui/Starfield/Starfield';
import styles from '@/styles/shared-page.module.scss';

export default function TeamManagementPage() {
    const router = useRouter();
    const params = useParams();
    const teamId = params.teamId as string;
    const { isAuthenticated, checkAuth, user } = useAuthStore();
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Safe leader check using helper function
    const isLeader = team && user && getUserId(team.leaderId) === user.id;
    const canEdit = team?.status === 'OPEN';

    useEffect(() => {
        checkAuth();

        if (!isAuthenticated) {
            router.push('/');
            return;
        }

        loadTeamData();
    }, [isAuthenticated, teamId, router, checkAuth]);

    const loadTeamData = async () => {
        setLoading(true);
        setError(null);

        try {
            const teamData = await getTeam(teamId);
            setTeam(teamData);
        } catch (err) {
            console.error('Team Load Error:', err);
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
                <LoadingSpinner size="lg" text="Loading team..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="text-red-400 text-xl mb-4">{error}</div>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!team) {
        return null;
    }

    return (
        <main className={styles.pageContainer}>
            <Starfield />

            <div className={styles.contentWrapper}>
                <div className={styles.pageHeader}>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="text-gray-400 hover:text-white transition-colors mb-4 flex items-center gap-2 mx-auto"
                        style={{ fontFamily: 'var(--font-gaegu)', fontSize: '1.1rem' }}
                    >
                        ← Back to Dashboard
                    </button>
                    <h1>Team Management</h1>

                    {!canEdit && (
                        <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-400 px-4 py-2 rounded-lg text-sm mt-4 inline-block">
                            ⚠️ Team editing is locked. The deadline has passed or the team is locked.
                        </div>
                    )}
                </div>

                <div className="space-y-8">
                    {/* Team Info */}
                    <TeamCard
                        team={team}
                        isLeader={!!isLeader}
                        canEdit={canEdit}
                        onTeamUpdated={loadTeamData}
                    />

                    {/* Member List */}
                    {team.members.length > 0 && typeof team.members[0] !== 'string' && (
                        <MemberList
                            members={team.members as User[]}
                            leaderId={getUserId(team.leaderId)}
                            isUserLeader={!!isLeader}
                            canEdit={canEdit}
                            onMemberRemoved={loadTeamData}
                        />
                    )}

                    {/* Invite Form (Leader Only) */}
                    {isLeader && canEdit && team.members.length < 4 && (
                        <div className={styles.billboardCard}>
                            <div className={styles.border}></div>
                            <div className={styles.content}>
                                <h3 className={styles.cardHeader}>Invite Team Member</h3>
                                <InviteForm onInviteSuccess={loadTeamData} />
                            </div>
                        </div>
                    )}

                    {/* Team Full Message */}
                    {team.members.length >= 4 && (
                        <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg text-center backdrop-blur-sm">
                            ✓ Your team is complete with 4 members!
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
