"use client";

import { useState, FormEvent } from "react";
import styles from "./RegistrationForm.module.scss";
import { RegistrationData } from "@/types";
import { validateRegistrationData, ValidationErrors } from "@/lib/utils/validation";

type Step = 1 | 2 | 3 | 4;

interface Props {
    onSubmit: (data: RegistrationData) => Promise<void>;
    loading: boolean;
    error: string | null;
}

export default function RegistrationForm({ onSubmit, loading, error }: Props) {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState<Partial<RegistrationData>>({
        country: "India",
    });
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [whatsappSame, setWhatsappSame] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === "phoneNumber" && whatsappSame
                ? { whatsappNumber: value }
                : {}),
        }));

        if (validationErrors[name]) {
            const clone = { ...validationErrors };
            delete clone[name];

            // Also clear whatsappNumber error if phone number is updated and whatsappSame is true
            if (name === "phoneNumber" && whatsappSame && clone.whatsappNumber) {
                delete clone.whatsappNumber;
            }

            setValidationErrors(clone);
        }
    };

    const validateStep = (): boolean => {
        const required: (keyof RegistrationData)[][] = [
            ["fullName", "phoneNumber", "whatsappNumber"],
            ["college", "degree", "branch", "graduationYear"],
            ["city", "state", "country"],
            [],
        ];

        const errors: ValidationErrors = {};
        required[currentStep - 1].forEach(field => {
            if (!formData[field]) {
                errors[field] = "Required";
            }
        });

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const next = () => validateStep() && setCurrentStep(s => (s + 1) as Step);
    const prev = () => setCurrentStep(s => (s - 1) as Step);

    const submit = async (e?: FormEvent) => {
        e?.preventDefault();
        const errors = validateRegistrationData(formData);
        if (Object.keys(errors).length) {
            setValidationErrors(errors);
            return;
        }
        await onSubmit(formData as RegistrationData);
    };

    const deviceInput = (
        name: keyof RegistrationData,
        label: string,
        type = "text",
        required = true
    ) => (
        <div
            className={`${styles.inputGroup} ${validationErrors[name] ? styles.errorLine : ""
                }`}
        >
            <span className={styles.deviceLabel}>
                {label} {required && <span className={styles.required}>*</span>}
            </span>

            <div className={styles.valueWrapper}>
                <input
                    name={name}
                    type={type}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    className={styles.deviceInput}
                />
                {validationErrors[name] && (
                    <p className={styles.fieldError}>{validationErrors[name]}</p>
                )}
            </div>


        </div>
    );

    return (
        <div className={styles.formContainer}>
            <div className={styles.headerZone}>
                <h2 className={styles.title}>
                    {["Personal Information", "Education", "Location", "Social Profiles"][currentStep - 1]}
                </h2>
                <p className={styles.subtitle}>Step {currentStep} of 4</p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form className={styles.formBody} onSubmit={submit}>
                {currentStep === 1 && (
                    <>
                        {deviceInput("fullName", "Full Name")}
                        {deviceInput("phoneNumber", "Phone Number", "tel")}

                        <div className={styles.choiceLine}>
                            <span className={styles.deviceLabel}>WhatsApp Number Same as Phone Number</span>
                            <div className={styles.choiceGroup}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setWhatsappSame(true);
                                        // Copy phone number to whatsapp if phone exists
                                        if (formData.phoneNumber) {
                                            setFormData(prev => ({ ...prev, whatsappNumber: formData.phoneNumber }));
                                            // Clear whatsapp validation error
                                            if (validationErrors.whatsappNumber) {
                                                const clone = { ...validationErrors };
                                                delete clone.whatsappNumber;
                                                setValidationErrors(clone);
                                            }
                                        }
                                    }}
                                    className={`${styles.choice} ${whatsappSame ? styles.active : ""}`}
                                >
                                    YES
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setWhatsappSame(false)}
                                    className={`${styles.choice} ${!whatsappSame ? styles.active : ""}`}
                                >
                                    NO
                                </button>
                            </div>
                        </div>

                        {!whatsappSame &&
                            deviceInput("whatsappNumber", "WhatsApp Number", "tel")}
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        {deviceInput("college", "College")}
                        {deviceInput("degree", "Degree")}
                        {deviceInput("branch", "Branch")}
                        {deviceInput("graduationYear", "Graduation Year", "number")}
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        {deviceInput("city", "City")}
                        {deviceInput("state", "State")}
                        {deviceInput("country", "Country")}
                    </>
                )}

                {currentStep === 4 && (
                    <>
                        {deviceInput("githubUrl", "GitHub", "url", false)}
                        {deviceInput("linkedinUrl", "LinkedIn", "url", false)}
                        {deviceInput("portfolioUrl", "Portfolio", "url", false)}
                    </>
                )}
            </form>

            <div className={styles.footerZone}>
                {currentStep > 1 ? (
                    <button className={styles.navButton} onClick={prev}>
                        ← Previous
                    </button>
                ) : (
                    <span />
                )}

                {currentStep < 4 ? (
                    <button className={styles.navButton} onClick={next}>
                        Next →
                    </button>
                ) : (
                    <button
                        className={styles.submitButton}
                        disabled={loading}
                        onClick={() => submit()}
                    >
                        {loading ? "Submitting..." : "Complete Registration"}
                    </button>
                )}
            </div>

            <div className={styles.progressIndicator}>
                {[1, 2, 3, 4].map(step => (
                    <div
                        key={step}
                        className={`${styles.progressDot} ${step <= currentStep ? styles.active : ""
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
