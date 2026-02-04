"use client";

import { useState, FormEvent } from 'react';
import { RegistrationData } from '@/types';
import { validateRegistrationData, ValidationErrors } from '@/lib/utils/validation';
import styles from './RegistrationForm.module.scss';

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

    return (
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
            {error && (
                <div className={styles.errorMessage}>
                    {error}
                </div>
            )}

            {/* Personal Information */}
            <div className={styles.formSection}>
                <div className={styles.border}></div>

                <div className={styles.content}>
                    <h3>Personal Information</h3>

                    <div className={styles.fieldGroup}>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                            placeholder="John Doe"
                        />
                        {validationErrors.fullName && <p className={styles.fieldError}>{validationErrors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                                placeholder="+91 1234567890"
                            />
                            {validationErrors.phoneNumber && <p className={styles.fieldError}>{validationErrors.phoneNumber}</p>}
                        </div>

                        <div>
                            <label htmlFor="whatsappNumber" className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number *</label>
                            <input
                                type="tel"
                                id="whatsappNumber"
                                name="whatsappNumber"
                                value={formData.whatsappNumber || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                                placeholder="+91 1234567890"
                            />
                            {validationErrors.whatsappNumber && <p className={styles.fieldError}>{validationErrors.whatsappNumber}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Education */}
            <div className="billboard-section rounded-3xl p-8 relative" style={{
                backgroundImage: "url('/panel.svg')",
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%'
            }}>
                <div className="absolute inset-0 rounded-3xl border-4 border-[#2a2a2a] pointer-events-none" style={{
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.1), 0 0 0 6px #2a2a2a, 0 8px 25px rgba(0, 0, 0, 0.3)'
                }}></div>

                <div className="relative z-10 space-y-5">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-gaegu)' }}>Education</h3>

                    <div>
                        <label htmlFor="college" className="block text-sm font-semibold text-gray-700 mb-2">College / University *</label>
                        <input
                            type="text"
                            id="college"
                            name="college"
                            value={formData.college || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                            placeholder="IIT Bombay"
                        />
                        {validationErrors.college && <p className={styles.fieldError}>{validationErrors.college}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="degree" className="block text-sm font-semibold text-gray-700 mb-2">Degree *</label>
                            <input
                                type="text"
                                id="degree"
                                name="degree"
                                value={formData.degree || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                                placeholder="B.Tech"
                            />
                            {validationErrors.degree && <p className={styles.fieldError}>{validationErrors.degree}</p>}
                        </div>

                        <div>
                            <label htmlFor="branch" className="block text-sm font-semibold text-gray-700 mb-2">Branch *</label>
                            <input
                                type="text"
                                id="branch"
                                name="branch"
                                value={formData.branch || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                                placeholder="Computer Science"
                            />
                            {validationErrors.branch && <p className={styles.fieldError}>{validationErrors.branch}</p>}
                        </div>

                        <div>
                            <label htmlFor="graduationYear" className="block text-sm font-semibold text-gray-700 mb-2">Graduation Year *</label>
                            <input
                                type="number"
                                id="graduationYear"
                                name="graduationYear"
                                value={formData.graduationYear || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                                placeholder="2026"
                                min="2020"
                                max="2030"
                            />
                            {validationErrors.graduationYear && <p className={styles.fieldError}>{validationErrors.graduationYear}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="billboard-section rounded-3xl p-8 relative" style={{
                backgroundImage: "url('/panel.svg')",
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%'
            }}>
                <div className="absolute inset-0 rounded-3xl border-4 border-[#2a2a2a] pointer-events-none" style={{
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.1), 0 0 0 6px #2a2a2a, 0 8px 25px rgba(0, 0, 0, 0.3)'
                }}></div>

                <div className="relative z-10 space-y-5">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-gaegu)' }}>Location</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                                placeholder="Mumbai"
                            />
                            {validationErrors.city && <p className={styles.fieldError}>{validationErrors.city}</p>}
                        </div>

                        <div>
                            <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={formData.state || ''}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                                placeholder="Maharashtra"
                            />
                            {validationErrors.state && <p className={styles.fieldError}>{validationErrors.state}</p>}
                        </div>

                        <div>
                            <label htmlFor="country" className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={formData.country || 'India'}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                                placeholder="India"
                            />
                            {validationErrors.country && <p className={styles.fieldError}>{validationErrors.country}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="billboard-section rounded-3xl p-8 relative" style={{
                backgroundImage: "url('/panel.svg')",
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%'
            }}>
                <div className="absolute inset-0 rounded-3xl border-4 border-[#2a2a2a] pointer-events-none" style={{
                    boxShadow: '0 0 0 2px rgba(255,255,255,0.1), 0 0 0 6px #2a2a2a, 0 8px 25px rgba(0, 0, 0, 0.3)'
                }}></div>

                <div className="relative z-10 space-y-5">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-gaegu)' }}>Social Profiles</h3>

                    <div>
                        <label htmlFor="githubUrl" className="block text-sm font-semibold text-gray-700 mb-2">GitHub Profile URL</label>
                        <input
                            type="url"
                            id="githubUrl"
                            name="githubUrl"
                            value={formData.githubUrl || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                            placeholder="https://github.com/username"
                        />
                        {validationErrors.githubUrl && <p className={styles.fieldError}>{validationErrors.githubUrl}</p>}
                    </div>

                    <div>
                        <label htmlFor="linkedinUrl" className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile URL</label>
                        <input
                            type="url"
                            id="linkedinUrl"
                            name="linkedinUrl"
                            value={formData.linkedinUrl || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                            placeholder="https://linkedin.com/in/username"
                        />
                        {validationErrors.linkedinUrl && <p className={styles.fieldError}>{validationErrors.linkedinUrl}</p>}
                    </div>

                    <div>
                        <label htmlFor="portfolioUrl" className="block text-sm font-semibold text-gray-700 mb-2">Portfolio Website URL (Optional)</label>
                        <input
                            type="url"
                            id="portfolioUrl"
                            name="portfolioUrl"
                            value={formData.portfolioUrl || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#00f2ff] focus:shadow-[0_0_15px_rgba(0,242,255,0.2)] transition-all duration-300"
                            placeholder="https://yourportfolio.com"
                        />
                        {validationErrors.portfolioUrl && <p className={styles.fieldError}>{validationErrors.portfolioUrl}</p>}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="relative">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00f2ff] hover:bg-[#00d8e6] disabled:bg-gray-600 text-black font-bold py-5 px-8 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed text-lg tracking-wide uppercase transform hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,242,255,0.6)] disabled:transform-none disabled:shadow-none"
                    style={{ fontFamily: 'var(--font-gaegu)' }}
                >
                    {loading ? 'Submitting...' : 'Complete Registration'}
                </button>

                {/* Neon glow effect */}
                {!loading && (
                    <div className="absolute inset-0 bg-[#00f2ff] opacity-20 blur-2xl rounded-2xl pointer-events-none"></div>
                )}
            </div>
        </form>
    );
}
