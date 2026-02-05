import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../auth/token';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined in environment variables');
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds (matches backend maxDuration)
});

// Request interceptor - attach JWT token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        // Handle different error scenarios
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to home
                    removeToken();
                    if (typeof window !== 'undefined') {
                        window.location.href = '/';
                    }
                    break;
                case 403:
                    // Forbidden - permission denied or deadline passed
                    console.error('Permission denied:', error.response.data);
                    break;
                case 429:
                    // Rate limit exceeded
                    console.error('Rate limit exceeded. Please try again later.');
                    break;
                case 500:
                case 502:
                case 503:
                case 504:
                    // Server errors
                    console.error('Server error. Please try again later.');
                    break;
            }
        } else if (error.request) {
            // Network error - no response received
            console.error('Network error. Please check your connection.');
        } else {
            console.error('Request error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
