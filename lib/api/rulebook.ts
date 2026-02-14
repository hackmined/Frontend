import apiClient from './client';

/**
 * Get rulebook content
 */
export const getRulebook = async (): Promise<string> => {
    const response = await apiClient.get<{ status: string; data: { content: string } }>('/rulebook');
    return response.data.data.content;
};
