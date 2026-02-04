import apiClient from './client';
import { AuthResponse } from '@/types';
import { setToken } from '../auth/token';

/**
 * Login with Google ID token
 */
export const loginWithGoogle = async (idToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/google', {
        idToken,
    });

    // Store JWT token
    if (response.data.token) {
        setToken(response.data.token);
    }

    return response.data;
};
