import apiClient from './client';
import { ApiResponse, Team } from '@/types';

/**
 * Create a new team
 */
export const createTeam = async (name: string, description?: string): Promise<Team> => {
    const response = await apiClient.post<{ status: string; data: { team: Team } }>('/team/create', { name, description });
    return response.data.data.team;
};

/**
 * Get team details by ID
 */
export const getTeam = async (teamId: string): Promise<Team> => {
    const response = await apiClient.get<{ status: string; data: { team: Team } }>(`/team/${teamId}`);
    return response.data.data.team;
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

