"use client";

import { useState } from 'react';
import { User } from '@/types';
import { removeMember } from '@/lib/api/team';
import { getErrorMessage, isDeadlineError } from '@/lib/utils/errors';

interface MemberListProps {
    members: User[];
    leaderId: string;
    isUserLeader: boolean;
    canEdit: boolean;
    onMemberRemoved?: () => void;
}

export default function MemberList({ members, leaderId, isUserLeader, canEdit, onMemberRemoved }: MemberListProps) {
    const [removing, setRemoving] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRemove = async (memberId: string) => {
        if (!confirm('Are you sure you want to remove this member from the team?')) {
            return;
        }

        setRemoving(memberId);
        setError(null);

        try {
            await removeMember(memberId);

            if (onMemberRemoved) {
                onMemberRemoved();
            }
        } catch (err) {
            console.error('Remove Member Error:', err);

            if (isDeadlineError(err)) {
                setError('Cannot remove members. The team edit deadline has passed.');
            } else {
                setError(getErrorMessage(err));
            }
        } finally {
            setRemoving(null);
        }
    };

    return (
        <div className="bg-black/50 border border-white/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
                Team Members ({members.length}/4)
            </h3>

            {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-3">
                {members.map((member) => (
                    <div
                        key={member._id}
                        className="flex items-center justify-between bg-white/5 p-4 rounded-lg"
                    >
                        <div className="flex items-center gap-3 flex-1">
                            {member.profilePicture && (
                                <img
                                    src={member.profilePicture}
                                    alt={member.fullName}
                                    className="w-10 h-10 rounded-full"
                                />
                            )}
                            <div className="flex-1">
                                <p className="text-white font-medium">{member.fullName}</p>
                                <p className="text-gray-400 text-sm">{member.email}</p>
                            </div>
                            {member._id === leaderId && (
                                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-semibold">
                                    Leader
                                </span>
                            )}
                        </div>

                        {isUserLeader && member._id !== leaderId && canEdit && (
                            <button
                                onClick={() => handleRemove(member._id)}
                                disabled={removing === member._id}
                                className="ml-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 px-3 py-1 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {removing === member._id ? 'Removing...' : 'Remove'}
                            </button>
                        )}
                    </div>
                ))}

                {members.length === 0 && (
                    <p className="text-gray-400 text-center py-4">No members yet</p>
                )}
            </div>
        </div>
    );
}
