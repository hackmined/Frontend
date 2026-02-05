"use client";

import { useState } from 'react';
import { Team, User, isPopulatedUser, getUserId } from '@/types';
import Link from 'next/link';
import { removeMember } from '@/lib/api/team';
import { getErrorMessage } from '@/lib/utils/errors';
import { useRouter } from 'next/navigation';

interface TeamStatusProps {
    team: Team | null;
    isLeader: boolean;
    userId?: string;
    onTeamLeft?: () => void;
}

export default function TeamStatus({ team, isLeader, userId, onTeamLeft }: TeamStatusProps) {
    const router = useRouter();
    const [leaving, setLeaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLeaveTeam = async () => {
        if (!userId || !confirm('Are you sure you want to leave this team? You can join another team or create your own after leaving.')) {
            return;
        }

        setLeaving(true);
        setError(null);

        try {
            // Use removeMember API to remove self from team
            await removeMember(userId);

            // Refresh the page or notify parent
            if (onTeamLeft) {
                onTeamLeft();
            } else {
                router.refresh();
            }
        } catch (err) {
            console.error('Leave Team Error:', err);
            setError(getErrorMessage(err));
        } finally {
            setLeaving(false);
        }
    };

    if (!team) {
        return (
            <div className="bg-black/50 border border-white/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Team</h3>
                <p className="text-gray-400 mb-4">You are not currently in a team.</p>
                <Link
                    href="/team/create"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                    Create Team
                </Link>
            </div>
        );
    }

    // Handle populated members array
    const members = team.members;
    const hasPopulatedMembers = members.length > 0 && isPopulatedUser(members[0]);

    return (
        <div className="bg-black/50 border border-white/20 rounded-lg p-6">
            {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Team: {team.name}</h3>
                {isLeader && (
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                        Leader
                    </span>
                )}
            </div>

            {team.description && (
                <p className="text-gray-400 text-sm mb-4">{team.description}</p>
            )}

            <div className="space-y-3">
                <div>
                    <p className="text-gray-500 text-sm">Members ({team.members.length}/4)</p>
                    {hasPopulatedMembers && (
                        <div className="mt-2 space-y-2">
                            {(members as User[]).map((member) => {
                                const leaderId = getUserId(team.leaderId);
                                return (
                                    <div key={member.id} className="flex items-center gap-3">
                                        {member.profilePicture && (
                                            <img
                                                src={member.profilePicture}
                                                alt={member.fullName}
                                                className="w-8 h-8 rounded-full"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <p className="text-white text-sm">{member.fullName}</p>
                                            <p className="text-gray-500 text-xs">{member.email}</p>
                                        </div>
                                        {member.id === leaderId && (
                                            <span className="text-yellow-400 text-xs">Leader</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="pt-4 border-t border-white/10">
                    <p className="text-gray-500 text-sm">Status</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${team.status === 'OPEN'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                        }`}>
                        {team.status || 'OPEN'}
                    </span>
                </div>
            </div>

            <div className="mt-6 space-y-2">
                <Link
                    href={`/team/${team.id}`}
                    className="block text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                    {isLeader ? 'Manage Team' : 'View Team'}
                </Link>

                {!isLeader && userId && (
                    <button
                        onClick={handleLeaveTeam}
                        disabled={leaving}
                        className="w-full bg-red-600/20 hover:bg-red-600/30 disabled:bg-gray-600/20 text-red-400 font-semibold py-2 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
                    >
                        {leaving ? 'Leaving...' : 'Leave Team'}
                    </button>
                )}
            </div>
        </div>
    );
}
