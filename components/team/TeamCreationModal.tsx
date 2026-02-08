"use client";

import { useState, FormEvent } from 'react';
import styles from './TeamCreationModal.module.scss';
import { Team } from '@/types';
import { createTeam } from '@/lib/api/team';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (team: Team) => void;
}

export default function TeamCreationModal({ isOpen, onClose, onSuccess }: Props) {
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

        if (teamName.length > 50) {
            setError('Team name must be less than 50 characters');
            return;
        }

        setIsSubmitting(true);

        try {
            const team = await createTeam(teamName.trim(), description.trim() || undefined);
            onSuccess(team);
            onClose();
            // Reset form
            setTeamName('');
            setDescription('');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to create team');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setTeamName('');
            setDescription('');
            setError(null);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={handleClose}>
            <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.title}>Create Team</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.modalBody}>
                        {error && (
                            <div className={styles.errorMessage}>{error}</div>
                        )}

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                Team Name <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                placeholder="Enter team name"
                                maxLength={50}
                                disabled={isSubmitting}
                                autoFocus
                            />
                            <div className={styles.charCount}>
                                {teamName.length}/50
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
                    </div>

                    <div className={styles.modalFooter}>
                        <button
                            type="button"
                            className={`${styles.button} ${styles.cancelButton}`}
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${styles.button} ${styles.createButton}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Team'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
