"use client";

import { useState, useEffect } from 'react';
import styles from './InvitationCard.module.scss';
import InvitationCard from './InvitationCard';
import { Invitation } from '@/types';
import { getMyInvitations, acceptInvitation as acceptInvitationAPI, rejectInvitation as rejectInvitationAPI } from '@/lib/api/invitations';

interface Props {
    onInvitationAccepted?: (team: any) => void;
}

export default function InvitationsList({ onInvitationAccepted }: Props) {
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvitations = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getMyInvitations();
            setInvitations(data);
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Failed to load invitations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, []);

    const handleAccept = async (invitationId: string) => {
        const invitation = invitations.find(inv => inv.id === invitationId);

        if (!invitation) return;

        const result = await acceptInvitationAPI(invitation.id);

        // Remove from list
        setInvitations(prev => prev.filter(inv => inv.id !== invitation.id));

        // Notify parent
        if (onInvitationAccepted) {
            onInvitationAccepted(result.team);
        }
    };

    const handleReject = async (invitationId: string) => {
        await rejectInvitationAPI(invitationId);

        // Remove from list
        setInvitations(prev => prev.filter(inv => inv.id !== invitationId));
    };

    if (loading) {
        return (
            <div className={styles.loading}>
                Loading invitations...
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                {error}
            </div>
        );
    }

    if (invitations.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📬</div>
                <p className={styles.emptyText}>No pending invitations</p>
            </div>
        );
    }

    return (
        <div>
            {invitations.map(invitation => (
                <InvitationCard
                    key={invitation.id}
                    invitation={invitation}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            ))}
        </div>
    );
}
