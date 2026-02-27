"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { getUserProfile } from "@/lib/api/user";
import { getTeam, deleteTeam } from "@/lib/api/team";
import { User, Team } from "@/types";

import TeamStatus from "@/components/dashboard/TeamStatus";
import TeamCreationModal from "@/components/team/TeamCreationModal";
import TeamCreationForm from "@/components/team/TeamCreationForm";
import InviteForm from "@/components/team/InviteForm";
import InvitationsList from "@/components/team/InvitationsList";
import Starfield from "@/components/ui/Starfield/Starfield";
import RulebookModal from "@/components/dashboard/RulebookModal";
import TeamFlowGuide from "@/components/dashboard/TeamFlowGuide";

import styles from "./dashboard.module.scss";

type DashboardView = "individual" | "team";

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated, checkAuth } = useAuthStore();

    const [user, setUser] = useState<User | null>(null);
    const [team, setTeam] = useState<Team | null>(null);
    const [teamInvitations, setTeamInvitations] = useState<any[]>([]);
    const [currentView, setCurrentView] = useState<DashboardView>("individual");
    const [teamAction, setTeamAction] = useState<'create' | 'join'>('create');
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
    const [isInviting, setIsInviting] = useState(false);
    const [showRulebook, setShowRulebook] = useState(false);
    const [showTeamGuide, setShowTeamGuide] = useState(false);
    const [isDeletingTeam, setIsDeletingTeam] = useState(false);

    useEffect(() => {
        checkAuth();
        if (!isAuthenticated) {
            router.push("/");
            return;
        }
        loadData();
    }, [isAuthenticated]);

    const loadData = async () => {
        try {
            const profile = await getUserProfile();
            setUser(profile);

            // Redirect to registration if user hasn't completed registration
            if (profile.registrationStatus === 'PENDING') {
                router.push('/register');
                return;
            }

            if (profile.teamId) {
                try {
                    const teamId = typeof profile.teamId === 'string'
                        ? profile.teamId
                        : profile.teamId.id;
                    const { team: teamData, invitations } = await getTeam(teamId);
                    setTeam(teamData);
                    setTeamInvitations(invitations || []);
                } catch (teamError) {
                    console.error('Failed to load team data:', teamError);
                    // User can still see their profile even if team fails to load
                }
            }
        } catch (error) {
            console.error('Failed to load user data:', error);
        }
    };

    const handleTeamCreated = (newTeam: Team) => {
        setTeam(newTeam);
        loadData(); // Refresh user data to update teamId
    };

    const handleInviteSuccess = () => {
        // Just refresh data to show new member if they were added instantly
        // or to ensure consistency
        if (team) {
            const teamId = typeof team.id === 'string' ? team.id : team._id;
            if (teamId) {
                getTeam(teamId).then(({ team: updatedTeam, invitations }) => {
                    setTeam(updatedTeam);
                    setTeamInvitations(invitations || []);
                });
            }
        }
    };

    const handleInvitationAccepted = (joinedTeam: Team) => {
        setTeam(joinedTeam);
        loadData(); // Refresh user data
    };

    const handleMemberRemoved = () => {
        if (team) {
            // Refresh team data
            const teamId = team.id || team._id || '';
            if (teamId) {
                getTeam(teamId).then(({ team: updatedTeam, invitations }) => {
                    setTeam(updatedTeam);
                    setTeamInvitations(invitations || []);
                });
            }
        }
    };

    const handleDeleteTeam = async () => {
        if (!confirm('Are you sure you want to delete the team? This cannot be undone. All members will be removed from the team.')) return;
        setIsDeletingTeam(true);
        try {
            await deleteTeam();
            setTeam(null);
            setTeamInvitations([]);
            setTeamAction('create');
            await loadData(); // refresh user state (clears teamId & isTeamLeader)
        } catch (error) {
            console.error('Failed to delete team:', error);
            alert('Failed to delete team. Please try again.');
        } finally {
            setIsDeletingTeam(false);
        }
    };

    if (!user) return null;

    return (
        <main className={styles.pageContainer}>
            <Starfield />

            <div className={styles.loginWrapper}>
                <div className={styles.tempMainPanel}>
                    <div className={styles.panelContent}>

                        {/* ================= PROFILE VIEW ================= */}
                        {currentView === "individual" && (
                            <div className={styles.profileLayout}>
                                <div className={styles.headerZone}>
                                    <h1 className={styles.title}>
                                        Your Profile
                                    </h1>
                                    <p className={styles.subtitle}>
                                        Welcome back, {user.fullName}!
                                    </p>
                                </div>

                                <div className={styles.bodyZone}>
                                    <div className={styles.avatarZone}>
                                        <div className={styles.avatar}>
                                            {user.profilePicture ? (
                                                <img
                                                    src={user.profilePicture}
                                                    alt={`Profile picture of ${user.fullName}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '14px'
                                                    }}
                                                />
                                            ) : (
                                                user.fullName.charAt(0)
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.infoZone}>
                                        <div className={styles.infoItem}>
                                            <span className={styles.label}>
                                                Name : <span className={styles.value}>{user.fullName} </span>
                                            </span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <span className={styles.label}>
                                                Email : <span className={styles.value}>
                                                    {user.email}
                                                </span>
                                            </span>
                                        </div>

                                        <div className={styles.infoItem}>
                                            <span className={styles.label}>
                                                College : <span className={styles.value}>
                                                    {user.college}
                                                </span>
                                            </span>
                                        </div>

                                        {user.branch && (
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>
                                                    Branch : <span className={styles.value}>
                                                        {user.branch}
                                                    </span>
                                                </span>
                                            </div>
                                        )}

                                        <div className={styles.infoItem}>
                                            <span className={styles.label}>
                                                Graduation : <span className={styles.value}>
                                                    {user.graduationYear}
                                                </span>
                                            </span>
                                        </div>

                                        {user.whatsappNumber && (
                                            <div className={styles.infoItem}>
                                                <span className={styles.label}>
                                                    Phone No : <span className={styles.value}>
                                                        {user.whatsappNumber}
                                                    </span>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.footerZone}>
                                    <button
                                        className={styles.navButton}
                                        onClick={() =>
                                            setCurrentView("team")
                                        }
                                    >
                                        Team Dashboard →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ================= TEAM VIEW ================= */}
                        {currentView === "team" && (
                            <div className={styles.teamLayout}>
                                {/* Top Action Buttons */}
                                <div className={styles.topActions}>
                                    <button
                                        className={styles.rulebookButton}
                                        onClick={() => setShowRulebook(true)}
                                    >
                                        Rulebook 📖
                                    </button>
                                    <button
                                        className={styles.guideButton}
                                        onClick={() => setShowTeamGuide(true)}
                                    >
                                        How Teams Work 🔧
                                    </button>
                                </div>

                                <div className={styles.headerZone}>
                                    <h1 className={styles.title}>
                                        Team Dashboard
                                    </h1>
                                    {!team && (
                                        <p className={styles.subtitle}>
                                            You're not in a team yet
                                        </p>
                                    )}
                                </div>

                                {team ? (
                                    <div className={styles.teamBody}>
                                        <div className={styles.teamMeta}>
                                            <div className={styles.teamMetaItem}>
                                                <span className={styles.label}>
                                                    Team Name
                                                </span>
                                                <span className={styles.value}>
                                                    {team.name}
                                                </span>
                                            </div>

                                            <div className={styles.teamMetaItem}>
                                                <span className={styles.label}>
                                                    Team Code
                                                </span>
                                                <span className={styles.value}>
                                                    {team.teamCode || 'N/A'}
                                                </span>
                                            </div>

                                            <div className={styles.teamMetaItem}>
                                                <span className={styles.label}>
                                                    Members
                                                </span>
                                                <span className={styles.value}>
                                                    {team.members.length} / 5
                                                </span>
                                            </div>

                                            {user.isTeamLeader && !isInviting && (team.members.length + (teamInvitations?.length || 0)) < 5 && (
                                                <div className={styles.inviteButtonContainer}>
                                                    <button
                                                        onClick={() => setIsInviting(true)}
                                                        className={styles.inviteButton}
                                                    >
                                                        Invite Member
                                                    </button>
                                                </div>
                                            )}

                                            {user.isTeamLeader && (
                                                <div className={styles.inviteButtonContainer}>
                                                    <button
                                                        onClick={handleDeleteTeam}
                                                        className={styles.deleteTeamButton}
                                                        disabled={isDeletingTeam}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="3 6 5 6 21 6"/>
                                                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                                            <path d="M10 11v6M14 11v6"/>
                                                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                                        </svg>
                                                        {isDeletingTeam ? 'Deleting...' : 'Delete Team'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Online-Only Participation Notice */}
                                        <div style={{
                                            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.12), rgba(245, 158, 11, 0.08))',
                                            border: '1px solid rgba(251, 191, 36, 0.35)',
                                            borderRadius: '12px',
                                            padding: '1rem 1.25rem',
                                            marginBottom: '1rem',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.75rem',
                                        }}>
                                            <span style={{ fontSize: '1.25rem', lineHeight: 1, flexShrink: 0 }}>📢</span>
                                            <div>
                                                <p style={{ color: '#fbbf24', fontWeight: 700, margin: '0 0 0.25rem', fontSize: '0.9rem', letterSpacing: '0.02em' }}>
                                                    Important Notice — Online Participation Only
                                                </p>
                                                <p style={{ color: '#e5e7eb', margin: 0, fontSize: '0.82rem', lineHeight: 1.5 }}>
                                                    Due to an overwhelming number of registrations, all new participants will be participating
                                                    <strong style={{ color: '#fde68a' }}> online only</strong>. Offline attendance confirmations are no longer applicable for new registrants.
                                                </p>
                                            </div>
                                        </div>

                                        <div className={styles.teamStatusBox}>
                                            {isInviting ? (
                                                <InviteForm
                                                    onInviteSuccess={() => {
                                                        setIsInviting(false);
                                                        handleInviteSuccess();
                                                    }}
                                                    onCancel={() => setIsInviting(false)}
                                                />
                                            ) : (
                                                <TeamStatus
                                                    team={team}
                                                    invitations={teamInvitations}
                                                    userId={user.id}
                                                    isLeader={user.isTeamLeader}
                                                    onMemberRemoved={handleMemberRemoved}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className={styles.bodyZone} style={{ alignItems: 'flex-start', paddingTop: '1rem' }}>
                                        <div className={styles.infoZone} style={{ width: '100%', alignItems: 'center' }}>
                                            <div className={styles.infoItem} style={{ flexDirection: 'row', gap: '1rem', width: '100%', justifyContent: 'center' }}>
                                                <button
                                                    onClick={() => setTeamAction('create')}
                                                    className={styles.createTeamButton}
                                                    style={{
                                                        marginTop: 0,
                                                        width: '180px',
                                                        backgroundColor: teamAction === 'create' ? '#f1f5f9' : 'transparent',
                                                        color: teamAction === 'create' ? '#1f2937' : '#f1f5f9',
                                                        border: '2px solid #f1f5f9'
                                                    }}
                                                >
                                                    Create Team
                                                </button>

                                                <button
                                                    onClick={() => setTeamAction('join')}
                                                    className={styles.createTeamButton}
                                                    style={{
                                                        marginTop: 0,
                                                        width: '180px',
                                                        backgroundColor: teamAction === 'join' ? '#f1f5f9' : 'transparent',
                                                        color: teamAction === 'join' ? '#1f2937' : '#f1f5f9',
                                                        border: '2px solid #f1f5f9'
                                                    }}
                                                >
                                                    Join Team
                                                </button>
                                            </div>

                                            <div style={{ width: '100%', maxWidth: '500px', marginTop: '2rem' }}>
                                                {teamAction === 'create' && (
                                                    <TeamCreationForm
                                                        onSuccess={handleTeamCreated}
                                                    />
                                                )}

                                                {teamAction === 'join' && (
                                                    <InvitationsList onInvitationAccepted={handleInvitationAccepted} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className={styles.footerZone}>
                                    <button
                                        className={styles.navButton}
                                        onClick={() =>
                                            setCurrentView("individual")
                                        }
                                    >
                                        ← My Profile
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            <TeamCreationModal
                isOpen={showCreateTeamModal}
                onClose={() => setShowCreateTeamModal(false)}
                onSuccess={handleTeamCreated}
            />

            {/* Rulebook Modal */}
            <RulebookModal
                isOpen={showRulebook}
                onClose={() => setShowRulebook(false)}
            />

            {/* Team Flow Guide Modal */}
            <TeamFlowGuide
                isOpen={showTeamGuide}
                onClose={() => setShowTeamGuide(false)}
            />
        </main>
    );
}
