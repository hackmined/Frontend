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
    _id?: string;
    id: string;
    email: string;
    googleId?: string;
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
    teamId?: string | Team;
    isTeamLeader: boolean;
    registrationStatus: RegistrationStatus;
    createdAt: string;
    updatedAt?: string;
}

export interface Team {
    _id?: string;
    id: string;
    name: string;
    description?: string;
    leaderId: string | User;
    members: string[] | User[];
    status?: TeamStatus;
    lockDate?: string;
    teamCode?: string;
    willAttendOffline?: boolean | null;
    createdAt: string;
    updatedAt?: string;
}

export interface Invitation {
    _id?: string;
    id: string;
    email: string;
    teamId: string | Team;
    invitedBy?: string | User;
    status: InvitationStatus;
    createdAt: string;
    updatedAt?: string;
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
    status: 'success' | 'fail';
    data?: T;
    message?: string;
}

export interface AuthResponse {
    status: 'success';
    data: {
        token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            profilePicture?: string;
            registrationStatus: RegistrationStatus;
        };
    };
}

export interface ApiError {
    status: 'fail';
    message: string;
}

// ============ TYPE GUARDS ============

/**
 * Type guard to check if a User reference is populated
 */
export function isPopulatedUser(user: string | User): user is User {
    return typeof user === 'object' && user !== null && 'id' in user;
}

/**
 * Type guard to check if a Team reference is populated
 */
export function isPopulatedTeam(team: string | Team): team is Team {
    return typeof team === 'object' && team !== null && 'id' in team;
}

/**
 * Helper to safely get user ID from string or User object
 */
export function getUserId(user: string | User): string {
    return typeof user === 'string' ? user : user.id;
}

/**
 * Helper to safely get team ID from string or Team object
 */
export function getTeamId(team: string | Team): string {
    return typeof team === 'string' ? team : team.id;
}
