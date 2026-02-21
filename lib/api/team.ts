import apiClient from './client';
import { ApiResponse, Team, Invitation } from '@/types';

/**
 * Create a new team
 */
export const createTeam = async (name: string, description?: string): Promise<Team> => {
    const response = await apiClient.post<{ status: string; data: Team }>('/team/create', { name, description });
    return response.data.data;
};

// ...

/**
 * Get team details by ID with invitations
 */
export const getTeam = async (teamId: string): Promise<{ team: Team; invitations: Invitation[] }> => {
    const response = await apiClient.get<{ status: string; data: { team: Team; invitations: Invitation[] } }>(`/team/${teamId}`);
    return response.data.data;
};

/**
 * Invite a member to the team
 */
export const inviteMember = async (email: string): Promise<any> => {
    const response = await apiClient.post<{ status: string; data: any }>('/team/invite', { email });
    return response.data.data;
};

/**
 * Update team details (leader only)
 */
export const updateTeam = async (teamId: string, data: { name?: string; description?: string }): Promise<Team> => {
    const response = await apiClient.patch<{ status: string; data: { team: Team } }>(`/team/${teamId}`, data);
    return response.data.data.team;
};

/**
 * Remove a member from the team
 */
export const removeMember = async (memberId: string): Promise<any> => {
    const response = await apiClient.post<{ status: string; data: any }>('/team/remove-member', { memberId });
    return response.data.data;
};

/**
 * Cancel a pending invitation
 */
export const cancelInvitation = async (invitationId: string): Promise<any> => {
    const response = await apiClient.delete<{ status: string; data: any }>(`/invitations/${invitationId}`);
    return response.data.data;
};

/**
 * Confirm offline attendance for the team (leader only)
 */
export const confirmOfflineAttendance = async (teamId: string, willAttend: boolean): Promise<Team> => {
    const response = await apiClient.post<{ status: string; data: { team: Team } }>(`/team/${teamId}/offline-attendance`, { willAttend });
    return response.data.data.team;
};

/**
 * Delete team (leader only)
 */
export const deleteTeam = async (): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ status: string; data: { message: string } }>('/team/delete');
    return response.data.data;
};
