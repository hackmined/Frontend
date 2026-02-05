"use client";

import { useState, FormEvent } from 'react';
import { RegistrationData } from '@/types';
import { validateRegistrationData, ValidationErrors } from '@/lib/utils/validation';
import styles from './RegistrationForm.module.scss';
import { useRouter } from 'next/navigation';

interface RegistrationFormProps {
    onSubmit: (data: RegistrationData) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export default function RegistrationForm({ onSubmit, loading, error }: RegistrationFormProps) {
    const [formData, setFormData] = useState<Partial<RegistrationData>>({
        country: 'India', // Default value
    });
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear validation error for this field
        if (validationErrors[name]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Validate form
        const errors = validateRegistrationData(formData);
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        // Submit data
        await onSubmit(formData as RegistrationData);
    };

    const renderInput = (
        name: keyof RegistrationData,
        label: string,
        placeholder: string,
        type: string = 'text',
        required: boolean = true,
        extraProps: React.InputHTMLAttributes<HTMLInputElement> = {}
    ) => (
        <div className={styles.inputGroup}>
            <label htmlFor={name}>{label} {required && '*'}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                {...extraProps}
            />
            {validationErrors[name] && <p className={styles.fieldError}>{validationErrors[name]}</p>}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
            {error && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}

            {/* Personal Information */}
            <div className={styles.billboardSection}>
                <div className={styles.border}></div>

                <div className={styles.content}>
                    <h3>Personal Information</h3>

                    <div className={styles.fieldGroup}>
                        {renderInput('fullName', 'Full Name', 'John Doe')}
                        
                        <div className={styles.gridTwo}>
                            {renderInput('phoneNumber', 'Phone Number', '+91 1234567890', 'tel')}
                            {renderInput('whatsappNumber', 'WhatsApp Number', '+91 1234567890', 'tel')}
                        </div>
                    </div>
                </div>
            </div>

            {/* Education */}
            <div className={styles.billboardSection}>
                <div className={styles.border}></div>

                <div className={styles.content}>
                    <h3>Education</h3>

                    <div className={styles.fieldGroup}>
                        {renderInput('college', 'College / University', 'IIT Bombay')}

                        <div className={styles.gridThree}>
                            {renderInput('degree', 'Degree', 'B.Tech')}
                            {renderInput('branch', 'Branch', 'Computer Science')}
                            {renderInput('graduationYear', 'Graduation Year', '2026', 'number', true, { min: 2020, max: 2030 })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className={styles.billboardSection}>
                <div className={styles.border}></div>

                <div className={styles.content}>
                    <h3>Location</h3>

                    <div className={styles.gridThree}>
                        {renderInput('city', 'City', 'Mumbai')}
                        {renderInput('state', 'State', 'Maharashtra')}
                        {renderInput('country', 'Country', 'India')}
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className={styles.billboardSection}>
                <div className={styles.border}></div>

                <div className={styles.content}>
                    <h3>Social Profiles</h3>

                    <div className={styles.fieldGroup}>
                        {renderInput('githubUrl', 'GitHub Profile URL', 'https://github.com/username', 'url', false)}
                        {renderInput('linkedinUrl', 'LinkedIn Profile URL', 'https://linkedin.com/in/username', 'url', false)}
                        {renderInput('portfolioUrl', 'Portfolio Website URL', 'https://yourportfolio.com', 'url', false)}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className={styles.submitButtonContainer}>
                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Complete Registration'}
                </button>
                <div className={styles.glow}></div>
            </div>
        </form>
    );
}
