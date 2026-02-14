"use client";

import styles from './NirmaStudentModal.module.scss';

interface NirmaStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (isNirmaStudent: boolean) => void;
}

export default function NirmaStudentModal({ isOpen, onClose, onConfirm }: NirmaStudentModalProps) {
    if (!isOpen) return null;

    const handleNirmaStudent = () => {
        onConfirm(true);
    };

    const handleNonNirmaStudent = () => {
        onConfirm(false);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <svg className={styles.headerIcon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5 2.73v-3.72L12 15l5-2.73v3.72z"/>
                    </svg>
                    <h2 className={styles.title}>Student Verification</h2>
                </div>
                
                <div className={styles.modalBody}>
                    <p className={styles.question}>Are you a Nirma University student?</p>
                    
                    <div className={styles.infoBox}>
                        <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        <div className={styles.infoText}>
                            <strong>For Nirma Students:</strong>
                            <p>You must use your official Nirma University email ID (@nirmauni.ac.in) to sign in.</p>
                        </div>
                    </div>

                    <div className={styles.infoBox}>
                        <svg className={styles.infoIcon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        <div className={styles.infoText}>
                            <strong>For Non-Nirma Students:</strong>
                            <p>You can use any Google email address to register.</p>
                        </div>
                    </div>

                    <div className={styles.buttonGroup}>
                        <button 
                            className={`${styles.choiceButton} ${styles.nirmaButton}`}
                            onClick={handleNirmaStudent}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                            </svg>
                            <span>Yes, I'm a Nirma Student</span>
                        </button>

                        <button 
                            className={`${styles.choiceButton} ${styles.nonNirmaButton}`}
                            onClick={handleNonNirmaStudent}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                            </svg>
                            <span>No, I'm from another institution</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
