"use client";

import { useState, FormEvent } from 'react';
import { inviteMember } from '@/lib/api/team';
import { validateEmail } from '@/lib/utils/validation';
import { getErrorMessage, isRateLimitError } from '@/lib/utils/errors';

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
        <div className="bg-black/50 border border-white/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Invite Team Member</h3>

            {error && (
                <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="mb-4 bg-green-500/10 border border-green-500 text-green-400 px-4 py-2 rounded-lg text-sm">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="teammate@email.com"
                    className="flex-1 px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                    {loading ? 'Sending...' : 'Invite'}
                </button>
            </form>
        </div>
    );
}
