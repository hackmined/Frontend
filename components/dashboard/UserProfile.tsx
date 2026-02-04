"use client";

import { User } from '@/types';

interface UserProfileProps {
    user: User;
}

export default function UserProfile({ user }: UserProfileProps) {
    return (
        <div className="bg-black/50 border border-white/20 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-4">
                {user.profilePicture && (
                    <img
                        src={user.profilePicture}
                        alt={user.fullName}
                        className="w-16 h-16 rounded-full"
                    />
                )}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white">{user.fullName}</h2>
                    <p className="text-gray-400">{user.email}</p>
                    <div className="mt-2">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${user.registrationStatus === 'REGISTERED'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {user.registrationStatus}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                {user.college && (
                    <div>
                        <p className="text-gray-500 text-sm">College</p>
                        <p className="text-white">{user.college}</p>
                    </div>
                )}
                {user.degree && (
                    <div>
                        <p className="text-gray-500 text-sm">Degree</p>
                        <p className="text-white">{user.degree} - {user.branch}</p>
                    </div>
                )}
                {user.graduationYear && (
                    <div>
                        <p className="text-gray-500 text-sm">Graduation Year</p>
                        <p className="text-white">{user.graduationYear}</p>
                    </div>
                )}
                {user.city && (
                    <div>
                        <p className="text-gray-500 text-sm">Location</p>
                        <p className="text-white">{user.city}, {user.state}, {user.country}</p>
                    </div>
                )}
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/10">
                {user.githubUrl && (
                    <a
                        href={user.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        GitHub
                    </a>
                )}
                {user.linkedinUrl && (
                    <a
                        href={user.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        LinkedIn
                    </a>
                )}
                {user.portfolioUrl && (
                    <a
                        href={user.portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        Portfolio
                    </a>
                )}
            </div>
        </div>
    );
}
