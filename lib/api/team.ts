import apiClient from './client';
import { ApiResponse, Team } from '@/types';

/**
 * Create a new team
 */
export const createTeam = async (name: string): Promise<Team> => {
    const response = await apiClient.post<ApiResponse<Team>>('/team/create', { name });
    return response.data.data!;
};

/**
 * Get team details by ID
 */
export const getTeam = async (teamId: string): Promise<Team> => {
    const response = await apiClient.get<ApiResponse<Team>>(`/team/${teamId}`);
    return response.data.data!;
};

/**
 * Invite a member to the team
 */
export const inviteMember = async (email: string): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/team/invite', { email });
    return response.data;
};

/**
 * Remove a member from the team
 */
export const removeMember = async (memberId: string): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>('/team/remove-member', { memberId });
    return response.data;
};
