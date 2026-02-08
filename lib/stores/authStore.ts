import { create } from 'zustand';
import { User, Team } from '@/types';
import { setToken as saveToken, removeToken, isAuthenticated as checkAuth } from '../auth/token';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    login: (token: string, user: Partial<User>) => void;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
    updateUserTeam: (teamId: string | Team, isLeader: boolean) => void;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) => set({ user, isAuthenticated: !!user }),

    login: (token, userData) => {
        saveToken(token);
        set({
            user: userData as User,
            isAuthenticated: true,
            isLoading: false,
        });
    },

    logout: () => {
        removeToken();
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });
        // Redirect to home
        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }
    },

    updateUser: (userData) => {
        set((state) => ({
            user: state.user ? { ...state.user, ...userData } : null,
        }));
    },

    updateUserTeam: (teamId, isLeader) => {
        set((state) => ({
            user: state.user ? { ...state.user, teamId, isTeamLeader: isLeader } : null,
        }));
    },

    checkAuth: () => {
        const authenticated = checkAuth();
        set({ isAuthenticated: authenticated, isLoading: false });
    },
}));
