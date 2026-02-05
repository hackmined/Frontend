"use client";

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
}

export default function LoadingSpinner({ size = 'md', text, className = '' }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div
                className={`${sizeClasses[size]} border-gray-600 border-t-red-500 rounded-full animate-spin`}
                role="status"
                aria-label="Loading"
            />
            {text && <p className="text-gray-400 text-sm">{text}</p>}
        </div>
    );
}
