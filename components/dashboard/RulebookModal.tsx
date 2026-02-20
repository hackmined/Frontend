"use client";

import styles from './RulebookModal.module.scss';

interface RulebookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RulebookModal({ isOpen, onClose }: RulebookModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h2>HACKaMINeD 2026 Rulebook</h2>
                    </div>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                
                <div className={styles.content}>
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <h3>General Rules</h3>
                        </div>
                        <div className={styles.subsection}>
                            <h4>1. Team Composition</h4>
                            <ul>
                                <li>Each team must have <strong>2-5 members</strong></li>
                                <li>All team members must be registered on the platform</li>
                                <li>Teams cannot be modified after the registration deadline</li>
                            </ul>
                        </div>
                        <div className={styles.subsection}>
                            <h4>2. Eligibility</h4>
                            <ul>
                                <li>Open to all college students with valid student ID</li>
                                <li>Nirma University students must register using their official Nirma email</li>
                            </ul>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                                <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <h3>Venue & Logistics</h3>
                        </div>
                        <div className={styles.subsection}>
                            <h4>3. Workspace</h4>
                            <ul>
                                <li>Workspaces and charging sockets will be provided at the venue</li>
                                <li>Each team will be assigned a dedicated workspace</li>
                                <li>Please keep your workspace clean and organized</li>
                            </ul>
                        </div>
                        <div className={styles.subsection}>
                            <h4>4. Campus Access Hours</h4>
                            <div className={styles.warningBox}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 9V13M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div>
                                    <p><strong>IMPORTANT:</strong> Participants are only allowed on campus until <strong>6:00 PM</strong></p>
                                    <ul>
                                        <li>After 6 PM, participants must leave the campus premises</li>
                                        <li>Re-entry will be permitted the next morning as per the schedule</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.subsection}>
                            <h4>5. Accommodation & Logistics</h4>
                            <div className={styles.warningBox}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.29 3.86L1.82 18C1.64537 18.3024 1.55296 18.6453 1.55199 18.9945C1.55101 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7239C2.83871 20.9011 3.18082 20.9962 3.53 21H20.47C20.8192 20.9962 21.1613 20.9011 21.4623 20.7239C21.7633 20.5467 22.0126 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.447 18.6453 22.3546 18.3024 22.18 18L13.71 3.86C13.5317 3.56611 13.2807 3.32312 12.9812 3.15448C12.6817 2.98585 12.3437 2.89725 12 2.89725C11.6563 2.89725 11.3183 2.98585 11.0188 3.15448C10.7193 3.32312 10.4683 3.56611 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 9V13M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div>
                                    <p><strong>IMPORTANT:</strong> Participants must arrange their own:</p>
                                    <ul>
                                        <li>Accommodation (hotels, hostels, or other lodging)</li>
                                        <li>Transportation to and from the venue</li>
                                        <li>Meals outside the provided refreshments</li>
                                    </ul>
                                    <p className={styles.warningNote}>The organizing committee will NOT provide overnight accommodation.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M2 10H22M7 15H7.01M12 15H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <h3>Registration & Team Formation</h3>
                        </div>
                        <div className={styles.subsection}>
                            <h4>6. How to Register</h4>
                            <ul>
                                <li>Sign in with your Google account on the registration page</li>
                                <li>Complete the registration form with all required details</li>
                                <li>Confirm your offline attendance for the hackathon</li>
                            </ul>
                        </div>
                        <div className={styles.subsection}>
                            <h4>7. How to Create a Team</h4>
                            <ul>
                                <li>Go to <strong>Dashboard → Team Dashboard</strong></li>
                                <li>Click <strong>"Create Team"</strong> and enter your team name</li>
                                <li>You will become the Team Leader</li>
                            </ul>
                        </div>
                        <div className={styles.subsection}>
                            <h4>8. How to Invite Team Members</h4>
                            <ul>
                                <li>As a Team Leader, click <strong>"Invite Member"</strong></li>
                                <li>Enter the email address of the person you want to invite</li>
                            </ul>
                            <div className={styles.infoBox}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p><strong>IMPORTANT:</strong> Invitations appear on the website, NOT via email. The invited person must log in and check their <strong>"Join Team"</strong> section to see pending invitations.</p>
                            </div>
                        </div>
                        <div className={styles.subsection}>
                            <h4>9. How to Join a Team</h4>
                            <ul>
                                <li>Go to <strong>Dashboard → Team Dashboard → Join Team</strong></li>
                                <li>You will see all pending invitations sent to you</li>
                                <li>Click <strong>"Accept"</strong> to join a team or <strong>"Reject"</strong> to decline</li>
                                <li>Once you accept an invitation, all other pending invitations are automatically cancelled</li>
                            </ul>
                        </div>
                    </section>
                </div>

                <div className={styles.footer}>
                    <button className={styles.closeBtn} onClick={onClose}>Got it!</button>
                </div>
            </div>
        </div>
    );
}
