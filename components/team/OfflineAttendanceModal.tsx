"use client";

import { useState } from 'react';
import styles from './OfflineAttendanceModal.module.scss';

interface OfflineAttendanceModalProps {
    currentStatus: boolean | null;
    teamName: string;
    onConfirm: (willAttend: boolean) => Promise<void>;
}

export default function OfflineAttendanceModal({ 
    currentStatus, 
    teamName,
    onConfirm 
}: OfflineAttendanceModalProps) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [rulebookAgreed, setRulebookAgreed] = useState(false);
    const [showRulebook, setShowRulebook] = useState(false);

    const handleChoiceClick = (willAttend: boolean) => {
        setSelectedChoice(willAttend);
        setShowConfirmation(true);
    };

    const handleConfirm = async () => {
        if (selectedChoice === null || !rulebookAgreed) return;
        
        setLoading(true);
        try {
            await onConfirm(selectedChoice);
            setShowConfirmation(false);
        } catch (error) {
            console.error('Failed to confirm attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setSelectedChoice(null);
        setRulebookAgreed(false);
    };

    const getStatusText = () => {
        if (currentStatus === null) {
            return 'Not Set';
        }
        return currentStatus ? 'Attending Offline' : 'Not Attending Offline';
    };

    const isConfirmed = currentStatus !== null;

    // If already confirmed, show compact view with just status (matching photo exactly)
    if (isConfirmed) {
        return (
            <div className={styles.containerCompact}>
                <span className={styles.label}>Offline Attendance:</span>
                <span className={styles.value}>{getStatusText()}</span>
            </div>
        );
    }

    // If not confirmed, show full form
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Offline Attendance Confirmation</h3>
                <p>As the team leader, please confirm whether your team will attend the hackathon offline at Nirma University.</p>
            </div>

            <div className={styles.currentStatus}>
                <span className={styles.label}>Current Status:</span>
                <span className={styles.statusValue}>{getStatusText()}</span>
            </div>

            <div className={styles.choiceSection}>
                <p className={styles.question}>Will your team attend HACKaMINeD 2026 offline?</p>
                
                <div className={styles.buttonGroup}>
                    <button
                        className={`${styles.choiceButton} ${styles.yesButton}`}
                        onClick={() => handleChoiceClick(true)}
                        disabled={loading}
                    >
                        Yes, We Will Attend
                    </button>
                    <button
                        className={`${styles.choiceButton} ${styles.noButton}`}
                        onClick={() => handleChoiceClick(false)}
                        disabled={loading}
                    >
                        No, We Will Not Attend
                    </button>
                </div>
            </div>

            {/* Rulebook Modal */}
            {showRulebook && (
                <div className={styles.rulebookOverlay} onClick={() => setShowRulebook(false)}>
                    <div className={styles.rulebookModal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.rulebookHeader}>
                            <h3>HACKaMINeD 2026 Rulebook</h3>
                            <button 
                                className={styles.closeRulebook} 
                                onClick={() => setShowRulebook(false)}
                                aria-label="Close rulebook"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                        <div className={styles.rulebookContent}>
                            <section className={styles.rulebookSection}>
                                <h4>General Rules</h4>
                                <div className={styles.subsection}>
                                    <h5>1. Team Composition</h5>
                                    <ul>
                                        <li>Each team must have <strong>2-4 members</strong></li>
                                        <li>All team members must be registered on the platform</li>
                                        <li>Teams cannot be modified after the registration deadline</li>
                                    </ul>
                                </div>
                                <div className={styles.subsection}>
                                    <h5>2. Eligibility</h5>
                                    <ul>
                                        <li>Open to all college students with valid student ID</li>
                                        <li>Nirma University students must register using their official Nirma email</li>
                                    </ul>
                                </div>
                            </section>

                            <section className={styles.rulebookSection}>
                                <h4>Venue & Logistics</h4>
                                <div className={styles.subsection}>
                                    <h5>3. Campus Access Hours</h5>
                                    <div className={styles.warningBox}>
                                        <p><strong>⚠️ IMPORTANT:</strong> Participants are only allowed on campus until <strong>6:00 PM</strong></p>
                                        <ul>
                                            <li>After 6 PM, participants must leave the campus premises</li>
                                            <li>Re-entry will be permitted the next morning as per the schedule</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.subsection}>
                                    <h5>4. Accommodation & Logistics</h5>
                                    <div className={styles.warningBox}>
                                        <p><strong>⚠️ IMPORTANT:</strong> Participants must arrange their own:</p>
                                        <ul>
                                            <li>Accommodation (hotels, hostels, or other lodging)</li>
                                            <li>Transportation to and from the venue</li>
                                            <li>Meals outside the provided refreshments</li>
                                        </ul>
                                        <p className={styles.warningNote}>The organizing committee will NOT provide overnight accommodation.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Popup */}
            {showConfirmation && (
                <div className={styles.overlay}>
                    <div className={styles.confirmationModal}>
                        <h4>Confirm Your Choice</h4>
                        <p>
                            You are confirming that <strong>{teamName}</strong> will{' '}
                            <strong>{selectedChoice ? 'attend' : 'not attend'}</strong> HACKaMINeD 2026 offline at Nirma University.
                        </p>
                        <p className={styles.warning}>
                            This decision is on behalf of your entire team.
                        </p>

                        {/* Rulebook Agreement */}
                        <div className={styles.rulebookAgreement}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    checked={rulebookAgreed}
                                    onChange={(e) => setRulebookAgreed(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                <span>
                                    I have read and agree to the{' '}
                                    <button
                                        type="button"
                                        className={styles.rulebookLink}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowRulebook(true);
                                        }}
                                    >
                                        HACKaMINeD 2026 Rulebook
                                    </button>
                                </span>
                            </label>
                        </div>

                        <div className={styles.confirmButtons}>
                            <button
                                className={styles.cancelButton}
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                className={`${styles.confirmButton} ${selectedChoice ? styles.confirmYes : styles.confirmNo}`}
                                onClick={handleConfirm}
                                disabled={loading || !rulebookAgreed}
                                title={!rulebookAgreed ? 'Please agree to the rulebook first' : ''}
                            >
                                {loading ? 'Confirming...' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
