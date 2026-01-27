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
