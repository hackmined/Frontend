
"use client";

import { useState } from 'react';
import { inviteMember } from '@/lib/api/team';
import styles from './TeamCreationModal.module.scss'; // Reusing styles for consistency

interface InviteMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function InviteMemberModal({ isOpen, onClose, onSuccess }: InviteMemberModalProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await inviteMember(email);
            setEmail('');
            onSuccess();
            onClose();
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to send invitation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>

                <h2 className={styles.title}>Invite Team Member</h2>
                <p className={styles.subtitle}>
                    Enter the email address of the person you want to invite.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="friend@example.com"
                            required
                            className={styles.input}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm mt-2 mb-4 bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Invitation'}
                    </button>
                </form>
            </div>
        </div>
    );
}
