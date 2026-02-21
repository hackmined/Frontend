"use client";

import { useState } from 'react';
import { Team, getUserId } from '@/types';
import { updateTeam } from '@/lib/api/team';
import { getErrorMessage } from '@/lib/utils/errors';
import { validateTeamName } from '@/lib/utils/validation';
import styles from '@/styles/shared-page.module.scss';

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
        <div className={styles.billboardCard}>
            <div className={styles.border}></div>
            <div className={styles.content}>
                {error && (
                    <div className={styles.errorBanner}>
                        {error}
                    </div>
                )}

                <div className="flex items-center justify-between mb-6">
                    {editing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.inputField}
                            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                            placeholder="Team name"
                            disabled={loading}
                        />
                    ) : (
                        <h2 className={styles.cardHeader} style={{ marginBottom: 0 }}>{team.name}</h2>
                    )}
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${team.status === 'OPEN'
                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                        }`}>
                        {team.status}
                    </span>
                </div>

                {editing ? (
                    <div className={styles.formGroup}>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.inputField}
                            rows={3}
                            placeholder="Describe your team..."
                            disabled={loading}
                        />
                    </div>
                ) : (
                    team.description && (
                        <p className="text-gray-300 text-base mb-6 leading-relaxed">{team.description}</p>
                    )
                )}

                <div className="text-gray-400 text-sm space-y-2 mb-6 border-t border-white/10 pt-4">
                    <p className="flex items-center gap-2">
                        <span className="text-gray-500">Members:</span>
                        <span className="text-white font-mono">{team.members.length}/5</span>
                    </p>
                    {team.lockDate && (
                        <p className="flex items-center gap-2">
                            <span className="text-gray-500">Locked:</span>
                            <span className="text-white font-mono">{new Date(team.lockDate).toLocaleDateString()}</span>
                        </p>
                    )}
                </div>

                {isLeader && canEdit && (
                    <div className="flex gap-4">
                        {editing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className={styles.primaryButton}
                                    style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}

                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    onClick={handleCancel}
                                    disabled={loading}
                                    className={styles.secondaryButton}
                                    style={{ padding: '0.75rem 1.5rem', fontSize: '1rem' }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className={styles.secondaryButton}
                                style={{ width: '100%' }}
                            >
                                Edit Team Details
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
