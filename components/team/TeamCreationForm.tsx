"use client";

import { useState, FormEvent } from 'react';
import styles from './TeamCreationModal.module.scss';
import { Team } from '@/types';
import { createTeam } from '@/lib/api/team';

interface Props {
    onSuccess: (team: Team) => void;
    onCancel?: () => void;
}

export default function TeamCreationForm({ onSuccess, onCancel }: Props) {
    const [teamName, setTeamName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!teamName.trim()) {
            setError('Team name is required');
            return;
        }

        if (teamName.trim().length < 3) {
            setError('Team name must be at least 3 characters');
            return;
        }

        if (teamName.length > 25) {
            setError('Team name must be less than 25 characters');
            return;
        }

        setIsSubmitting(true);

        try {
            const team = await createTeam(teamName.trim(), description.trim() || undefined);
            onSuccess(team);
            // Reset form
            setTeamName('');
            setDescription('');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to create team');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.inlineForm}>
            {error && (
                <div className={styles.errorMessage}>{error}</div>
            )}

            <div className={styles.inputGroup}>
                <label className={styles.label}>
                    Team Name <span className={styles.required}>*</span>
                </label>
                <div className={styles.valueWrapper}>
                    <input
                        type="text"
                        className={styles.input}
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter team name"
                        maxLength={25}
                        disabled={isSubmitting}
                        autoFocus
                    />
                </div>

            </div>

            <div className={styles.inputGroup}>
                <label className={styles.label}>
                    Description (Optional)
                </label>
                <textarea
                    className={styles.textarea}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter team description"
                    maxLength={200}
                    disabled={isSubmitting}
                />
                <div className={styles.charCount}>
                    {description.length}/200
                </div>
            </div>

            <div className={styles.modalFooter} style={{ padding: '1rem 0 0 0', justifyContent: 'flex-start', gap: '0rem' }}>
                <button
                    type="submit"
                    className={`${styles.button} ${styles.createButton}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Creating...' : 'Create Team'}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        className={`${styles.button} ${styles.cancelButton}`}
                        onClick={onCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
