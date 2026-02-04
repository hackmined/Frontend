import { AxiosError } from 'axios';
import { ApiError } from '@/types';

/**
 * Parse API error and return user-friendly message
 */
export const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
        const apiError = error.response?.data as ApiError;

        // Check for specific error messages from backend
        if (apiError?.message) {
            return apiError.message;
        }

        // Handle HTTP status codes
        const status = error.response?.status;
        switch (status) {
            case 400:
                return 'Invalid request. Please check your input.';
            case 401:
                return 'Please sign in to continue.';
            case 403:
                return 'You do not have permission to perform this action. The deadline may have passed.';
            case 404:
                return 'Resource not found.';
            case 429:
                return 'Too many requests. Please wait a moment and try again.';
            case 500:
            case 502:
            case 503:
            case 504:
                return 'Server error. Please try again later.';
            default:
                if (error.code === 'ECONNABORTED') {
                    return 'Request timeout. Please check your connection.';
                }
                if (error.code === 'ERR_NETWORK') {
                    return 'Network error. Please check your internet connection.';
                }
                return 'An unexpected error occurred. Please try again.';
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unknown error occurred.';
};

/**
 * Check if error is a deadline error
 */
export const isDeadlineError = (error: unknown): boolean => {
    if (error instanceof AxiosError) {
        const message = error.response?.data?.message || '';
        return message.toLowerCase().includes('deadline') || error.response?.status === 403;
    }
    return false;
};

/**
 * Check if error is a rate limit error
 */
export const isRateLimitError = (error: unknown): boolean => {
    if (error instanceof AxiosError) {
        return error.response?.status === 429;
    }
    return false;
};

/**
 * Check if error is an auth error
 */
export const isAuthError = (error: unknown): boolean => {
    if (error instanceof AxiosError) {
        return error.response?.status === 401;
    }
    return false;
};
