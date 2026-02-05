import apiClient from './client';
import { ApiResponse, Invitation } from '@/types';

/**
 * Get user's pending invitations
 */
export const getMyInvitations = async (): Promise<Invitation[]> => {
    const response = await apiClient.get<ApiResponse<Invitation[]>>('/invitations');
    return response.data.data || [];
};

/**
 * Get user's invitations
 */
export const getUserInvitations = async (): Promise<Invitation[]> => {
    const response = await apiClient.get<{ status: string; data: { invitations: Invitation[] } }>('/invitations');
    return response.data.data.invitations;
};
