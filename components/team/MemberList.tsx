"use client";

import { useState } from 'react';
import { User } from '@/types';
import { removeMember } from '@/lib/api/team';
import { getErrorMessage, isDeadlineError } from '@/lib/utils/errors';
import styles from '@/styles/shared-page.module.scss';

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
        <div className={styles.billboardCard}>
            <div className={styles.border}></div>
            <div className={styles.content}>
                <h3 className={styles.cardHeader}>
                    Team Members ({members.length}/5)
                </h3>

                {error && (
                    <div className={styles.errorBanner}>
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className="relative">
                                    {member.profilePicture ? (
                                        <img
                                            src={member.profilePicture}
                                            alt={member.fullName}
                                            className="w-12 h-12 rounded-full border border-white/20"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/20">
                                            <span className="text-xl font-bold text-gray-400">
                                                {member.fullName.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-white font-medium text-lg">{member.fullName}</p>
                                        {member.id === leaderId && (
                                            <span className="bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded text-xs font-bold border border-yellow-500/30">
                                                LEADER
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm font-mono">{member.email}</p>
                                </div>
                            </div>

                            {isUserLeader && member.id !== leaderId && canEdit && (
                                <button
                                    onClick={() => handleRemove(member.id)}
                                    disabled={removing === member.id}
                                    className="ml-4 bg-red-600/10 hover:bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm transition-all border border-red-500/20 hover:border-red-500/50"
                                >
                                    {removing === member.id ? 'Removing...' : 'Remove'}
                                </button>
                            )}
                        </div>
                    ))}

                    {members.length === 0 && (
                        <p className="text-gray-400 text-center py-8 italic">No members yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}
