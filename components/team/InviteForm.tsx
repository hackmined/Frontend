"use client";

import { useState, FormEvent } from 'react';
import { inviteMember } from '@/lib/api/team';
import { validateEmail } from '@/lib/utils/validation';
import { getErrorMessage, isRateLimitError } from '@/lib/utils/errors';
import styles from '@/styles/shared-page.module.scss';

interface InviteFormProps {
    onInviteSuccess?: () => void;
}

export default function InviteForm({ onInviteSuccess }: InviteFormProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Validate email
        const validationError = validateEmail(email);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            await inviteMember(email);
            setSuccess(`Invitation sent to ${email}`);
            setEmail('');

            if (onInviteSuccess) {
                onInviteSuccess();
            }
        } catch (err) {
            console.error('Invite Error:', err);

            if (isRateLimitError(err)) {
                setError('Too many invitations. Please wait a moment and try again.');
            } else {
                setError(getErrorMessage(err));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error && (
                <div className={styles.errorBanner}>
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-6 bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded-xl font-medium">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-4">
                <div className="flex-1">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="teammate@email.com"
                        className={styles.inputField}
                        disabled={loading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.primaryButton}
                    style={{
                        width: 'auto',
                        padding: '0.75rem 2rem',
                        fontSize: '1rem',
                        height: 'fit-content'
                    }}
                >
                    {loading ? 'Sending...' : 'Invite'}
                </button>
            </form>
        </div>
    );
}
