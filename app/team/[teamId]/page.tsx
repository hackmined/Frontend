"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import { getTeam } from '@/lib/api/team';
import { Team, User } from '@/types';
import { getErrorMessage } from '@/lib/utils/errors';
import TeamCard from '@/components/team/TeamCard';
import MemberList from '@/components/team/MemberList';
import InviteForm from '@/components/team/InviteForm';

export default function TeamManagementPage() {
    const router = useRouter();
    const params = useParams();
    const teamId = params.teamId as string;
    const { isAuthenticated, checkAuth, user } = useAuthStore();
    const [team, setTeam] = useState<Team | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isLeader = team && user && team.leaderId === user.id;
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
                <div className="text-white text-xl">Loading team...</div>
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
        <main className="min-h-screen bg-black py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="text-gray-400 hover:text-white transition-colors mb-4"
                    >
                        ← Back to Dashboard
                    </button>
                    <h1 className="text-4xl font-bold text-white mb-2">Team Management</h1>
                    {!canEdit && (
                        <div className="bg-yellow-500/10 border border-yellow-500 text-yellow-400 px-4 py-2 rounded-lg text-sm mt-4">
                            ⚠️ Team editing is locked. The deadline has passed or the team is locked.
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Team Info */}
                    <TeamCard team={team} />

                    {/* Member List */}
                    {team.members.length > 0 && typeof team.members[0] !== 'string' && (
                        <MemberList
                            members={team.members as User[]}
                            leaderId={typeof team.leaderId === 'string' ? team.leaderId : team.leaderId.id}
                            isUserLeader={!!isLeader}
                            canEdit={canEdit}
                            onMemberRemoved={loadTeamData}
                        />
                    )}

                    {/* Invite Form (Leader Only) */}
                    {isLeader && canEdit && team.members.length < 4 && (
                        <InviteForm onInviteSuccess={loadTeamData} />
                    )}

                    {/* Team Full Message */}
                    {team.members.length >= 4 && (
                        <div className="bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-lg text-center">
                            ✓ Your team is complete with 4 members!
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
