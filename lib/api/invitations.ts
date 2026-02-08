import apiClient from './client';
import { ApiResponse, Invitation } from '@/types';

/**
 * Get user's pending invitations
 */
export const getMyInvitations = async (): Promise<Invitation[]> => {
    const response = await apiClient.get<{ status: string; data: { invitations: Invitation[] } }>('/invitations');
    return response.data.data.invitations;
};

/**
 * Accept a team invitation
 */
export const acceptInvitation = async (invitationId: string): Promise<{ team: any; invitation: Invitation }> => {
    const response = await apiClient.post<{ status: string; data: { team: any; invitation: Invitation } }>(`/invitations/${invitationId}/accept`);
    return response.data.data;
};

/**
 * Reject a team invitation
 */
export const rejectInvitation = async (invitationId: string): Promise<{ invitation: Invitation }> => {
    const response = await apiClient.post<{ status: string; data: { invitation: Invitation } }>(`/invitations/${invitationId}/reject`);
    return response.data.data;
};
