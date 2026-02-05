import apiClient from './client';
import { AuthResponse } from '@/types';
import { setToken } from '../auth/token';

/**
 * Login with Google ID token
 */
export const loginWithGoogle = async (idToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/google', {
        credential: idToken,
    });

    // Store JWT token (response has nested data)
    if (response.data.data.token) {
        setToken(response.data.data.token);
    }

    return response.data;
};

