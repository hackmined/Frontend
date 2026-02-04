"use client";

import { useState, FormEvent } from 'react';
import { RegistrationData } from '@/types';
import { validateRegistrationData, ValidationErrors } from '@/lib/utils/validation';

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

    const inputClassName = "w-full px-4 py-3 bg-black/50 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors";
    const labelClassName = "block text-sm font-medium text-gray-300 mb-2";
    const errorClassName = "text-red-400 text-sm mt-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>

                <div>
                    <label htmlFor="fullName" className={labelClassName}>Full Name *</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName || ''}
                        onChange={handleChange}
                        className={inputClassName}
                        placeholder="John Doe"
                    />
                    {validationErrors.fullName && <p className={errorClassName}>{validationErrors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phoneNumber" className={labelClassName}>Phone Number *</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber || ''}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="+91 1234567890"
                        />
                        {validationErrors.phoneNumber && <p className={errorClassName}>{validationErrors.phoneNumber}</p>}
                    </div>

                    <div>
                        <label htmlFor="whatsappNumber" className={labelClassName}>WhatsApp Number *</label>
                        <input
                            type="tel"
                            id="whatsappNumber"
                            name="whatsappNumber"
                            value={formData.whatsappNumber || ''}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="+91 1234567890"
                        />
                        {validationErrors.whatsappNumber && <p className={errorClassName}>{validationErrors.whatsappNumber}</p>}
                    </div>
                </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Education</h3>

                <div>
                    <label htmlFor="college" className={labelClassName}>College / University *</label>
                    <input
                        type="text"
                        id="college"
                        name="college"
                        value={formData.college || ''}
                        onChange={handleChange}
                        className={inputClassName}
                        placeholder="IIT Bombay"
                    />
                    {validationErrors.college && <p className={errorClassName}>{validationErrors.college}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="degree" className={labelClassName}>Degree *</label>
                        <input
                            type="text"
                            id="degree"
                            name="degree"
                            value={formData.degree || ''}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="B.Tech"
                        />
                        {validationErrors.degree && <p className={errorClassName}>{validationErrors.degree}</p>}
                    </div>

                    <div>
                        <label htmlFor="branch" className={labelClassName}>Branch *</label>
                        <input
                            type="text"
                            id="branch"
                            name="branch"
                            value={formData.branch || ''}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="Computer Science"
                        />
                        {validationErrors.branch && <p className={errorClassName}>{validationErrors.branch}</p>}
                    </div>

                    <div>
                        <label htmlFor="graduationYear" className={labelClassName}>Graduation Year *</label>
                        <input
                            type="number"
                            id="graduationYear"
                            name="graduationYear"
                            value={formData.graduationYear || ''}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="2026"
                            min="2020"
                            max="2030"
                        />
                        {validationErrors.graduationYear && <p className={errorClassName}>{validationErrors.graduationYear}</p>}
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Location</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="city" className={labelClassName}>City *</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city || ''}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="Mumbai"
                        />
                        {validationErrors.city && <p className={errorClassName}>{validationErrors.city}</p>}
                    </div>

                    <div>
                        <label htmlFor="state" className={labelClassName}>State *</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state || ''}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="Maharashtra"
                        />
                        {validationErrors.state && <p className={errorClassName}>{validationErrors.state}</p>}
                    </div>

                    <div>
                        <label htmlFor="country" className={labelClassName}>Country *</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={formData.country || 'India'}
                            onChange={handleChange}
                            className={inputClassName}
                            placeholder="India"
                        />
                        {validationErrors.country && <p className={errorClassName}>{validationErrors.country}</p>}
                    </div>
                </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white mb-4">Social Profiles</h3>

                <div>
                    <label htmlFor="githubUrl" className={labelClassName}>GitHub Profile URL</label>
                    <input
                        type="url"
                        id="githubUrl"
                        name="githubUrl"
                        value={formData.githubUrl || ''}
                        onChange={handleChange}
                        className={inputClassName}
                        placeholder="https://github.com/username"
                    />
                    {validationErrors.githubUrl && <p className={errorClassName}>{validationErrors.githubUrl}</p>}
                </div>

                <div>
                    <label htmlFor="linkedinUrl" className={labelClassName}>LinkedIn Profile URL</label>
                    <input
                        type="url"
                        id="linkedinUrl"
                        name="linkedinUrl"
                        value={formData.linkedinUrl || ''}
                        onChange={handleChange}
                        className={inputClassName}
                        placeholder="https://linkedin.com/in/username"
                    />
                    {validationErrors.linkedinUrl && <p className={errorClassName}>{validationErrors.linkedinUrl}</p>}
                </div>

                <div>
                    <label htmlFor="portfolioUrl" className={labelClassName}>Portfolio Website URL (Optional)</label>
                    <input
                        type="url"
                        id="portfolioUrl"
                        name="portfolioUrl"
                        value={formData.portfolioUrl || ''}
                        onChange={handleChange}
                        className={inputClassName}
                        placeholder="https://yourportfolio.com"
                    />
                    {validationErrors.portfolioUrl && <p className={errorClassName}>{validationErrors.portfolioUrl}</p>}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
                {loading ? 'Submitting...' : 'Complete Registration'}
            </button>
        </form>
    );
}
