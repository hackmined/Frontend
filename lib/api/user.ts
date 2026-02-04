import apiClient from './client';
import { ApiResponse, User, RegistrationData } from '@/types';

/**
 * Complete individual registration
 */
export const registerIndividual = async (data: RegistrationData): Promise<ApiResponse<User>> => {
    const response = await apiClient.post<ApiResponse<User>>('/register/individual', data);
    return response.data;
};

/**
 * Get current user profile
 */
export const getUserProfile = async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/user/me');
    return response.data.data!;
};

/**
 * Get user registration status
 */
export const getUserStatus = async (): Promise<{ registrationStatus: string; teamId?: string }> => {
    const response = await apiClient.get<ApiResponse>('/user/status');
    return response.data.data!;
};
