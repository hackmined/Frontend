import React from 'react';
import styles from './Button.module.scss';
import { ButtonProps } from '@/types';

export default function Button({
    variant = 'primary',
    size = 'md',
    onClick,
    children,
    className = '',
    type = 'button'
}: ButtonProps) {
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
