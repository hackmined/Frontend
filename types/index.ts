// TypeScript Types and Interfaces

export interface Track {
    id: string;
    icon: string;
    title: string;
    description: string;
    prize: string;
}

export interface TimelineEvent {
    id: string;
    number: string;
    title: string;
    date: string;
    description: string;
}

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export interface NavItem {
    label: string;
    href: string;
}

export interface SocialLink {
    platform: string;
    href: string;
    icon?: string;
}

// ============ BACKEND API TYPES ============

export enum RegistrationStatus {
    PENDING = 'PENDING',
    REGISTERED = 'REGISTERED'
}

export enum TeamStatus {
    OPEN = 'OPEN',
    LOCKED = 'LOCKED'
}

export enum InvitationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}

export interface User {
    _id: string;
    email: string;
    googleId: string;
    fullName: string;
    profilePicture?: string;
    phoneNumber?: string;
    whatsappNumber?: string;
    college?: string;
    degree?: string;
    branch?: string;
    graduationYear?: number;
    city?: string;
    state?: string;
    country?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    teamId?: string;
    isTeamLeader: boolean;
    registrationStatus: RegistrationStatus;
    createdAt: string;
    updatedAt: string;
}

export interface Team {
    _id: string;
    name: string;
    leaderId: string;
    members: User[];
    status: TeamStatus;
    lockDate?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Invitation {
    _id: string;
    email: string;
    teamId: string;
    team?: Team;
    status: InvitationStatus;
    createdAt: string;
    updatedAt: string;
}

export interface RegistrationData {
    fullName: string;
    phoneNumber: string;
    whatsappNumber: string;
    college: string;
    degree: string;
    branch: string;
    graduationYear: number;
    city: string;
    state: string;
    country: string;
    githubUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
}

export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
    error?: string;
}

export interface AuthResponse {
    status: 'success';
    token: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        profilePicture?: string;
        registrationStatus: RegistrationStatus;
        teamId?: string;
        isTeamLeader: boolean;
    };
}

export interface ApiError {
    status: 'error';
    message: string;
    error?: string;
}
