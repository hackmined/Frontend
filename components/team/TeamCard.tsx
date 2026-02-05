"use client";

import { useState } from 'react';
import { Team, getUserId } from '@/types';
import { updateTeam } from '@/lib/api/team';
import { getErrorMessage } from '@/lib/utils/errors';
import { validateTeamName } from '@/lib/utils/validation';

interface TeamCardProps {
    team: Team;
    isLeader?: boolean;
    canEdit?: boolean;
    onTeamUpdated?: () => void;
}

export default function TeamCard({ team, isLeader = false, canEdit = false, onTeamUpdated }: TeamCardProps) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(team.name);
    const [description, setDescription] = useState(team.description || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSave = async () => {
        setError(null);

        // Validate team name
        const validationError = validateTeamName(name);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            await updateTeam(team.id, { name, description: description || undefined });
            setEditing(false);
            if (onTeamUpdated) {
                onTeamUpdated();
            }
        } catch (err) {
            console.error('Update Team Error:', err);
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setName(team.name);
        setDescription(team.description || '');
        setError(null);
        setEditing(false);
    };

    const leaderId = typeof team.leaderId === 'string' ? team.leaderId : team.leaderId?.id;

    return (
        <div className="bg-black/50 border border-white/20 rounded-lg p-6">
            {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                {editing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-2xl font-bold text-white bg-black/50 border border-white/20 rounded px-3 py-1 focus:outline-none focus:border-red-500"
                        placeholder="Team name"
                        disabled={loading}
                    />
                ) : (
                    <h2 className="text-2xl font-bold text-white">{team.name}</h2>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${team.status === 'OPEN'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                    }`}>
                    {team.status}
                </span>
            </div>

            {editing ? (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description (optional)
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded text-white placeholder-gray-500 focus:outline-none focus:border-red-500 resize-none"
                        rows={3}
                        placeholder="Describe your team..."
                        disabled={loading}
                    />
                </div>
            ) : (
                team.description && (
                    <p className="text-gray-400 text-sm mb-4">{team.description}</p>
                )
            )}

            <div className="text-gray-400 text-sm space-y-1">
                <p>Members: {team.members.length}/4</p>
                {team.lockDate && (
                    <p>
                        Locked: {new Date(team.lockDate).toLocaleDateString()}
                    </p>
                )}
            </div>

            {isLeader && canEdit && (
                <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                    {editing ? (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Edit Team Details
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
