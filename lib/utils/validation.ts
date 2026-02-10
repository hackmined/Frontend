import { RegistrationData } from '@/types';

export interface ValidationErrors {
    [key: string]: string;
}

/**
 * Validate registration form data
 */
export const validateRegistrationData = (data: Partial<RegistrationData>): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Required fields
    if (!data.fullName?.trim()) {
        errors.fullName = 'Full name is required';
    }

    if (!data.phoneNumber?.trim()) {
        errors.phoneNumber = 'Phone number is required';
    } else if (!isValidPhoneNumber(data.phoneNumber)) {
        errors.phoneNumber = 'Invalid phone number (10 digits required)';
    }

    if (!data.whatsappNumber?.trim()) {
        errors.whatsappNumber = 'WhatsApp number is required';
    } else if (!isValidPhoneNumber(data.whatsappNumber)) {
        errors.whatsappNumber = 'Invalid WhatsApp number (10 digits required)';
    }

    if (!data.college?.trim()) {
        errors.college = 'College is required';
    }

    if (!data.degree?.trim()) {
        errors.degree = 'Degree is required';
    }

    if (!data.branch?.trim()) {
        errors.branch = 'Branch is required';
    }

    if (!data.graduationYear) {
        errors.graduationYear = 'Graduation year is required';
    } else if (data.graduationYear < 2020 || data.graduationYear > 2030) {
        errors.graduationYear = 'Graduation year must be between 2020 and 2030';
    }

    if (!data.city?.trim()) {
        errors.city = 'City is required';
    }

    if (!data.state?.trim()) {
        errors.state = 'State is required';
    }

    if (!data.country?.trim()) {
        errors.country = 'Country is required';
    }

    // Optional URL validation
    if (data.githubUrl && !isValidUrl(data.githubUrl)) {
        errors.githubUrl = 'Invalid GitHub URL';
    }

    if (data.linkedinUrl && !isValidUrl(data.linkedinUrl)) {
        errors.linkedinUrl = 'Invalid LinkedIn URL';
    }

    if (data.portfolioUrl && !isValidUrl(data.portfolioUrl)) {
        errors.portfolioUrl = 'Invalid portfolio URL';
    }

    return errors;
};

/**
 * Validate team name
 */
export const validateTeamName = (name: string): string | null => {
    if (!name.trim()) {
        return 'Team name is required';
    }
    if (name.trim().length < 3) {
        return 'Team name must be at least 3 characters';
    }
    return null;
};

/**
 * Validate email
 */
export const validateEmail = (email: string): string | null => {
    if (!email.trim()) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Invalid email address';
    }
    return null;
};

/**
 * Validate ONLY specific fields
 */
export const validateFields = (data: Partial<RegistrationData>, fields: (keyof RegistrationData)[]): ValidationErrors => {
    const allErrors = validateRegistrationData(data);
    const filteredErrors: ValidationErrors = {};

    fields.forEach(field => {
        if (allErrors[field]) {
            filteredErrors[field] = allErrors[field];
        }
    });

    return filteredErrors;
};

/**
 * Validate phone number (Indian format)
 * Accepts: 10 digits starting with 6-9
 */
const isValidPhoneNumber = (phone: string): boolean => {
    // Remove spaces, hyphens, and parentheses
    const cleaned = phone.replace(/[\s\-()]/g, '');

    // Check for valid Indian phone number patterns (after stripping +91 or 0)
    // Must be 10 digits starting with [6-9]
    const phoneRegex = /^(\+91|0)?([6-9]\d{9})$/;

    return phoneRegex.test(cleaned);
};

/**
 * Check if string is valid URL
 */
const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};
