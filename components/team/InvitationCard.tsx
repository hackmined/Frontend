"use client";

import { useState } from 'react';
import styles from './InvitationCard.module.scss';
import { Invitation } from '@/types';

interface Props {
    invitation: Invitation;
    onAccept: (invitationId: string) => Promise<void>;
    onReject: (invitationId: string) => Promise<void>;
}

export default function InvitationCard({ invitation, onAccept, onReject }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAccept = async () => {
        setIsProcessing(true);
        setError(null);

        try {
            await onAccept(invitation.id);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to accept invitation');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReject = async () => {
        if (!confirm('Are you sure you want to reject this invitation?')) {
            return;
        }

        setIsProcessing(true);
        setError(null);

        try {
            await onReject(invitation.id);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to reject invitation');
        } finally {
            setIsProcessing(false);
        }
    };

    const teamName = typeof invitation.teamId === 'string'
        ? 'Team'
        : invitation.teamId.name || 'Unknown Team';

    const inviterName = typeof invitation.invitedBy === 'string'
        ? 'Someone'
        : invitation.invitedBy?.fullName || 'Someone';

    return (
        <div className={styles.invitationCard} style={{ flexWrap: 'wrap' }}>
            <div className={styles.details}>
                <span className={styles.teamName}>{teamName}</span>
                <span className={styles.inviter}>(from {inviterName})</span>
            </div>

            <div className={styles.actions}>
                <button
                    className={`${styles.button}`}
                    onClick={handleAccept}
                    disabled={isProcessing}
                >
                    {isProcessing ? '...' : 'ACCEPT'}
                </button>
                <button
                    className={`${styles.button} ${styles.rejectButton}`}
                    onClick={handleReject}
                    disabled={isProcessing}
                >
                    REJECT
                </button>
            </div>

            {error && (
                <div className={styles.error}>{error}</div>
            )}
        </div>
    );
}
