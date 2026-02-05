"use client";

import { Team, User } from '@/types';
import Link from 'next/link';

interface TeamStatusProps {
    team: Team | null;
    isLeader: boolean;
}

export default function TeamStatus({ team, isLeader }: TeamStatusProps) {
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

    return (
        <div className="bg-black/50 border border-white/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">Team: {team.name}</h3>
                {isLeader && (
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                        Leader
                    </span>
                )}
            </div>

            <div className="space-y-3">
                <div>
                    <p className="text-gray-500 text-sm">Members ({team.members.length}/4)</p>
                    <div className="mt-2 space-y-2">
                        {(team.members as User[]).map((member) => (
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
                                {member.id === (typeof team.leaderId === 'string' ? team.leaderId : team.leaderId.id) && (
                                    <span className="text-yellow-400 text-xs">Leader</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <p className="text-gray-500 text-sm">Status</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${team.status === 'OPEN'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                        }`}>
                        {team.status}
                    </span>
                </div>
            </div>

            <Link
                href={`/team/${team.id}`}
                className="block mt-6 text-center bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
                Manage Team
            </Link>
        </div>
    );
}
