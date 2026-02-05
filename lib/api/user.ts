import apiClient from './client';
import { User, Team, RegistrationData } from '@/types';

/**
 * Complete individual registration
 */
export const registerIndividual = async (data: RegistrationData): Promise<{ user: User; team?: Team }> => {
    const response = await apiClient.post<{ status: string; data: { user: User; team?: Team } }>('/register/individual', data);
    return response.data.data;
};

/**
 * Get current user profile
 */
export const getUserProfile = async (): Promise<User> => {
    const response = await apiClient.get<{ status: string; data: { user: User } }>('/user/me');
    return response.data.data.user;
};

/**
 * Get user registration status
 */
export const getUserStatus = async (): Promise<{ status: string; teamId?: string; isTeamLeader: boolean }> => {
    const response = await apiClient.get<{ status: string; data: any }>('/user/status');
    return response.data.data;
};

