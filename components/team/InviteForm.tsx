"use client";

import { useState, FormEvent } from 'react';
import { inviteMember } from '@/lib/api/team';
import styles from './TeamCreationModal.module.scss';

interface InviteFormProps {
    onInviteSuccess?: () => void;
    onCancel?: () => void;
}

export default function InviteForm({ onInviteSuccess, onCancel }: InviteFormProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!email.trim()) {
            setError('Email is required');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await inviteMember(email.trim());
            setEmail('');
            if (onInviteSuccess) {
                onInviteSuccess();
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to send invitation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.inlineForm}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h2 className={styles.title} style={{ fontSize: '2rem' }}>Invite Team Member</h2>
                    <p className={styles.subtitle} style={{ fontSize: '1.1rem' }}>
                        Enter the email address of the person you want to invite.
                    </p>
                </div>
                {onCancel && (
                    <button
                        onClick={onCancel}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '2rem',
                            cursor: 'pointer',
                            color: '#64748b',
                            lineHeight: 1,
                            padding: '0 0.5rem'
                        }}
                    >
                        ×
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                {error && (
                    <div className={styles.errorMessage}>{error}</div>
                )}

                <div className={styles.inputGroup} style={{ gridTemplateColumns: '150px 1fr' }}>
                    <label className={styles.label}>Email Address</label>
                    <div className={styles.valueWrapper}>
                        <input
                            type="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="friend@example.com"
                            required
                            disabled={loading}
                            autoFocus
                        />
                    </div>
                </div>

                <div className={styles.modalFooter} style={{ padding: '1rem 0 0 0', justifyContent: 'flex-start', gap: '1rem' }}>
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.createButton}`}
                        disabled={loading}
                        style={{ transform: 'none' }} // Ensure no weird transforms
                    >
                        {loading ? 'Sending...' : 'Send Invitation'}
                    </button>

                    {onCancel && (
                        <button
                            type="button"
                            className={`${styles.button} ${styles.cancelButton}`}
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
