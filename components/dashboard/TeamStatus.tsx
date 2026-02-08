"use client";

import { useState } from 'react';
import { Team, User, isPopulatedUser, getUserId, Invitation } from '@/types';
import { removeMember } from '@/lib/api/team';
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
    // We can filter out unpopulated members if needed, but assuming they are populated based on usagecontext

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

    return (
        <div className={styles.container}>
            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}

            {(members as User[]).map((member) => {
                const leaderId = getUserId(team.leaderId);
                const isMemberLeader = member.id === leaderId;
                const isCurrentUser = member.id === userId;
                const canRemove = isLeader && !isMemberLeader;

                return (
                    <div
                        key={member.id}
                        className={styles.memberCard}
                    >
                        <div className={styles.memberInfo}>
                            {/* Uncomment if profile pictures are working */}
                            {/* <div className={styles.imageContainer}>
                                {member.profilePicture ? (
                                    <img
                                        src={member.profilePicture}
                                        alt={member.fullName}
                                    />
                                ) : (
                                    member.fullName.charAt(0).toUpperCase()
                                )}
                            </div> */}

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
                            backgroundColor: '#e5e7eb', color: '#6b7280', fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontWeight: 600, fontFamily: 'var(--font-gaegu)'
                        }}>
                            Pending
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
