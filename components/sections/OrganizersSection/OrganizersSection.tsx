"use client";
import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './OrganizersSection.module.scss';
import Starfield from '@/components/ui/Starfield/Starfield';
import { LinkedInIcon, GithubIcon, TwitterIcon } from '@/components/ui/Icons/Icons';

gsap.registerPlugin(ScrollTrigger);

interface Organizer {
    id: number;
    name: string;
    role: string;
    image: string;
    bio?: string;
    socials?: {
        linkedin?: string;
        github?: string;
        twitter?: string;
    }
}

interface OrganizerCategory {
    id: string;
    title: string;
    members: Organizer[];
}

const initialCategories: OrganizerCategory[] = [
    {
        id: 'faculty',
        title: 'Faculty',
        members: [
            {
                id: 1,
                name: "Dr. Vishal Parikh",
                role: "Faculty",
                image: "/TeamPhotos/Faculties/VP.jpg",
                bio: "",
                socials: { linkedin: "#" }
            },
            {
                id: 2,
                name: "Dr. Rupal Kapdi",
                role: "Faculty",
                image: "/TeamPhotos/Faculties/RK.jpg",
                bio: "",
                socials: { linkedin: "#" }
            },
            {
                id: 3,
                name: "Dr. Tejal Upadhyay",
                role: "Faculty",
                image: "/TeamPhotos/Faculties/TU.jpg",
                bio: "",
                socials: { linkedin: "#" }
            },
            {
                id: 4,
                name: "Dr. Tarjni Vyas",
                role: "Faculty",
                image: "/TeamPhotos/Faculties/TV.jpg",
                bio: "",
                socials: { linkedin: "#" }
            },
            {
                id: 5,
                name: "Dr. Sapan Mankad",
                role: "Faculty",
                image: "/TeamPhotos/Faculties/SM.jpg",
                bio: "",
                socials: { linkedin: "#" }
            },
            {
                id: 6,
                name: "Dr. Priyank Thakker",
                role: "Faculty",
                image: "/TeamPhotos/Faculties/PT.jpg",
                bio: "",
                socials: { linkedin: "#" }
            },
            {
                id: 7,
                name: "Mr. Ajay Patel",
                role: "Faculty",
                image: "/TeamPhotos/Faculties/AP.jpg",
                bio: "",
                socials: { linkedin: "#" }
            }
        ]
    },
    {
        id: 'organising-committee',
        title: 'Organising Committee',
        members: [
            {
                id: 11,
                name: "Karm Dave",
                role: "",
                image: "/TeamPhotos/Students/Karm.jpg",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 12,
                name: "Het Modi",
                role: "",
                image: "/avatar-placeholder.png",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 21,
                name: "Krisha Shastri",
                role: "",
                image: "/TeamPhotos/Students/Krisha.jpg",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 22,
                name: "Mihir Jain",
                role: "",
                image: "/avatar-placeholder.png",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 31,
                name: "Jyot Kikani",
                role: "",
                image: "/TeamPhotos/Students/Jyot.jpg",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 32,
                name: "Luv Patel",
                role: "",
                image: "/avatar-placeholder.png",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 33,
                name: "Rudra Moradiya",
                role: "",
                image: "/avatar-placeholder.png",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 34,
                name: "Hrushi Bhanvadiya",
                role: "",
                image: "/avatar-placeholder.png",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 401,
                name: "Hem Kastiya",
                role: "",
                image: "/TeamPhotos/Students/Hem.jpg",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 402,
                name: "Jay Gor",
                role: "",
                image: "/TeamPhotos/Students/Jay.jpg",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 403,
                name: "Chinmay Patel",
                role: "",
                image: "/avatar-placeholder.png",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            },
            {
                id: 404,
                name: "Ritika Parikh",
                role: "",
                image: "/avatar-placeholder.png",
                bio: "",
                socials: { linkedin: "#", github: "#" }
            }
        ]
    }

];

// Fisher-Yates Shuffle Algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

export default function OrganizersSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [categories, setCategories] = useState<OrganizerCategory[]>(initialCategories);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Shuffle members within each category on mount
        const shuffledCategories = initialCategories.map(cat => ({
            ...cat,
            // Only shuffle if there are more than 1 members to maintain layout stability for singletons
            members: cat.members.length > 1 ? shuffleArray(cat.members) : cat.members
        }));
        setCategories(shuffledCategories);
        setIsMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!isMounted) return;

        const ctx = gsap.context(() => {
            // Animate Main Title
            gsap.fromTo(`.${styles.title}`,
                { y: -50, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Iterate over each category section to apply animations
            categories.forEach((category) => {
                const triggerSelector = `#category-${category.id}`;

                // Animate Category Title
                gsap.fromTo(`${triggerSelector} .${styles.categoryTitle}`,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: triggerSelector,
                            start: "top 85%",
                        }
                    }
                );

                // Animate Cards within the category
                gsap.fromTo(`${triggerSelector} .${styles.card}`,
                    {
                        y: 50,
                        opacity: 0,
                        scale: 0.9,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "back.out(1.5)",
                        scrollTrigger: {
                            trigger: triggerSelector,
                            start: "top 80%",
                        }
                    }
                );
            });

            // Background subtle movement
            gsap.to(`.${styles.bgDecoration}`, {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [isMounted, categories]); // Re-run GSAP when categories (and thus DOM) updates

    if (!isMounted) {
        return <section ref={sectionRef} className={styles.section} style={{ minHeight: '100vh' }} />; // Prevent layout shift or flash of un-shuffled content
    }

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.bgDecoration} />
            <Starfield className={styles.starfield} />

            <h1 className={styles.title}>Meet the Team</h1>

            {categories.map((category) => (
                <div key={category.id} id={`category-${category.id}`} className={styles.categorySection}>
                    <h2 className={styles.categoryTitle}>{category.title}</h2>
                    <div className={styles.grid}>
                        {category.members.map((member) => (
                            <div key={member.id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        onError={(e) => {
                                            e.currentTarget.src = "https://ui-avatars.com/api/?name=" + member.name + "&background=random";
                                        }}
                                    />
                                </div>
                                <h3 className={styles.name}>{member.name}</h3>
                                <p className={styles.role}>{member.role}</p>
                                {member.bio && <p className={styles.bio}>{member.bio}</p>}

                                <div className={styles.socials}>
                                    {member.socials?.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>}
                                    {member.socials?.github && <a href={member.socials.github} target="_blank" rel="noopener noreferrer"><GithubIcon /></a>}
                                    {member.socials?.twitter && <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer"><TwitterIcon /></a>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
