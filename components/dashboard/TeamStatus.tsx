"use client";

import { useState } from 'react';
import { Team, User, isPopulatedUser, getUserId, Invitation } from '@/types';
import { removeMember, cancelInvitation } from '@/lib/api/team';
import styles from './TeamStatus.module.scss';

interface TeamStatusProps {
    team: Team;
    invitations?: Invitation[];
    isLeader: boolean;
    userId: string;
    onMemberRemoved?: () => void;
}

export default function TeamStatus({ team, invitations = [], isLeader, userId, onMemberRemoved }: TeamStatusProps) {
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Handle populated members array
    const members = team.members;

    const handleRemoveMember = async (memberId: string, memberName: string) => {
        if (!confirm(`Are you sure you want to remove ${memberName} from the team?`)) {
            return;
        }

        setRemovingId(memberId);
        setError(null);

        try {
            await removeMember(memberId);
            if (onMemberRemoved) {
                onMemberRemoved();
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to remove member');
        } finally {
            setRemovingId(null);
        }
    };

    const handleCancelInvitation = async (invitationId: string, email: string) => {
        if (!confirm(`Are you sure you want to cancel the invitation for ${email}?`)) {
            return;
        }

        setRemovingId(invitationId);
        setError(null);

        try {
            await cancelInvitation(invitationId);
            if (onMemberRemoved) {
                onMemberRemoved();
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to cancel invitation');
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div className={styles.container}>
            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}

            {(members as Array<string | User>).filter(isPopulatedUser).map((member) => {
                const leaderId = getUserId(team.leaderId);
                const isMemberLeader = member.id === leaderId;
                const canRemove = isLeader && !isMemberLeader;

                return (
                    <div
                        key={member._id || member.id}
                        className={styles.memberCard}
                    >
                        <div className={styles.memberInfo}>
                            <div className={styles.details}>
                                <span className={styles.name}>
                                    {member.fullName}
                                </span>
                                <span className={styles.email}>
                                    {member.email}
                                </span>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            {isMemberLeader && (
                                <span className={styles.leaderBadge}>
                                    Leader
                                </span>
                            )}

                            {canRemove && (
                                <button
                                    onClick={() => handleRemoveMember(member.id, member.fullName)}
                                    disabled={!!removingId}
                                    className={styles.removeButton}
                                >
                                    {removingId === member.id ? 'Removing...' : 'Remove'}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Pending Invitations */}
            {invitations && invitations.map((invite) => (
                <div
                    key={invite.id || invite._id}
                    className={`${styles.memberCard}`}
                    style={{ opacity: 0.7, borderStyle: 'dashed' }}
                >
                    <div className={styles.memberInfo}>
                        <div className={styles.details}>
                            <span className={styles.name}>
                                {invite.email}
                            </span>
                            <span className={styles.email}>
                                Invitation Sent
                            </span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <span className={styles.pendingBadge} style={{
                            backgroundColor: '#e5e7eb', color: '#6b7280', fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontWeight: 600, fontFamily: 'var(--font-gaegu)', marginRight: '0.5rem'
                        }}>
                            Pending
                        </span>

                        {isLeader && (
                            <button
                                onClick={() => handleCancelInvitation((invite.id || invite._id || ''), invite.email || '')}
                                disabled={!!removingId}
                                className={styles.removeButton}
                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
                            >
                                {removingId === (invite.id || invite._id) ? 'Removing...' : 'Remove'}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
