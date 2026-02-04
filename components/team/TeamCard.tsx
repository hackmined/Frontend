"use client";

import { Team } from '@/types';

interface TeamCardProps {
    team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
    return (
        <div className="bg-black/50 border border-white/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{team.name}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${team.status === 'OPEN'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                    {team.status}
                </span>
            </div>

            <div className="text-gray-400 text-sm">
                <p>Members: {team.members.length}/4</p>
                {team.lockDate && (
                    <p className="mt-1">
                        Locked: {new Date(team.lockDate).toLocaleDateString()}
                    </p>
                )}
            </div>
        </div>
    );
}
