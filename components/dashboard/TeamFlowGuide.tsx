"use client";

import styles from './TeamFlowGuide.module.scss';

interface TeamFlowGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TeamFlowGuide({ isOpen, onClose }: TeamFlowGuideProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h2>How Teams Work</h2>
                    </div>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                
                <div className={styles.content}>
                    <div className={styles.step}>
                        <div className={styles.stepIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                        <div className={styles.stepContent}>
                            <div className={styles.stepNumber}>Step 1</div>
                            <h4>Create or Join a Team</h4>
                            <p><strong>Create:</strong> Start a new team and become the leader.</p>
                            <p><strong>Join:</strong> Enter a team code to join an existing team.</p>
                        </div>
                    </div>

                    <div className={styles.connector}>
                        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0V40M12 40L8 36M12 40L16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <div className={styles.step}>
                        <div className={styles.stepIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M2 10H22M7 15H7.01M12 15H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <div className={styles.stepContent}>
                            <div className={styles.stepNumber}>Step 2</div>
                            <h4>Invite Team Members</h4>
                            <p>Team leaders can invite members by entering their email address.</p>
                            <div className={styles.importantNote}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span><strong>Important:</strong> Invitations appear on the website, NOT via email. Invited members must check their <strong>"Join Team"</strong> section.</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.connector}>
                        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0V40M12 40L8 36M12 40L16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <div className={styles.step}>
                        <div className={styles.stepIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className={styles.stepContent}>
                            <div className={styles.stepNumber}>Step 3</div>
                            <h4>Confirm Offline Attendance</h4>
                            <p>Team leaders must confirm whether the team will attend <strong>offline at Nirma University</strong>.</p>
                        </div>
                    </div>

                    <div className={styles.connector}>
                        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0V40M12 40L8 36M12 40L16 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <div className={styles.step}>
                        <div className={styles.stepIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="16" r="1" fill="currentColor"/>
                            </svg>
                        </div>
                        <div className={styles.stepContent}>
                            <div className={styles.stepNumber}>Step 4</div>
                            <h4>Team Lock & Submission</h4>
                            <p>Teams will be <strong>locked</strong> after the registration deadline. Get ready to submit your amazing project!</p>
                        </div>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.tip}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span><strong>Tip:</strong> Share your team code with friends!</span>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose}>Got it!</button>
                </div>
            </div>
        </div>
    );
}
