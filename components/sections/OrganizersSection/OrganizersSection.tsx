"use client";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./OrganizersSection.module.scss";
import Starfield from "@/components/ui/Starfield/Starfield";
import {
  LinkedInIcon,
  GithubIcon,
  TwitterIcon,
} from "@/components/ui/Icons/Icons";

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
  };
}

interface OrganizerCategory {
  id: string;
  title: string;
  members: Organizer[];
}

const initialCategories: OrganizerCategory[] = [
  {
    id: "faculty",
    title: "Faculty",
    members: [
      {
        id: 1,
        name: "Dr. Vishal Parikh",
        role: "Faculty",
        image: "/TeamPhotos/Faculties/VP.jpg",
        bio: "",
        socials: { linkedin: "#" },
      },
      {
        id: 2,
        name: "Dr. Rupal Kapdi",
        role: "Faculty",
        image: "/TeamPhotos/Faculties/RK.jpg",
        bio: "",
        socials: { linkedin: "#" },
      },
      {
        id: 3,
        name: "Dr. Tejal Upadhyay",
        role: "Faculty",
        image: "/TeamPhotos/Faculties/TU.jpg",
        bio: "",
        socials: { linkedin: "#" },
      },
      {
        id: 4,
        name: "Dr. Tarjni Vyas",
        role: "Faculty",
        image: "/TeamPhotos/Faculties/TV.jpg",
        bio: "",
        socials: { linkedin: "#" },
      },
      {
        id: 5,
        name: "Dr. Sapan Mankad",
        role: "Faculty",
        image: "/TeamPhotos/Faculties/SM.jpg",
        bio: "",
        socials: { linkedin: "#" },
      },
      {
        id: 6,
        name: "Dr. Priyank Thakker",
        role: "Faculty",
        image: "/TeamPhotos/Faculties/PT.jpg",
        bio: "",
        socials: { linkedin: "#" },
      },
      {
        id: 7,
        name: "Mr. Ajay Patel",
        role: "Faculty",
        image: "/TeamPhotos/Faculties/AP.jpg",
        bio: "",
        socials: { linkedin: "#" },
      },
    ],
  },
  {
    id: "organising-committee",
    title: "Organising Committee",
    members: [
      {
        id: 1,
        name: "Karm Dave",
        role: "",
        image: "/TeamPhotos/Students/Karm.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/karm-dave-0475a1275",
          github: "#",
        },
      },
      {
        id: 2,
        name: "Krisha Shastri",
        role: "",
        image: "/TeamPhotos/Students/Krisha.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/krisha-shastri-5a259a284",
          github: "#",
        },
      },
      {
        id: 3,
        name: "Jyot Kikani",
        role: "",
        image: "/TeamPhotos/Students/Jyot.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/jyot-kikani",
          github: "https://github.com/Jyot-Kikani",
        },
      },
      {
        id: 4,
        name: "Hem Kastiya",
        role: "",
        image: "/TeamPhotos/Students/Hem.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/hem-kastiya",
          github: "#",
        },
      },
      {
        id: 5,
        name: "Jay Gor",
        role: "",
        image: "/TeamPhotos/Students/Jay.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/gor-jay/",
          github: "#",
        },
      },
      {
        id: 6,
        name: "Mainak Hindocha",
        role: "",
        image: "/TeamPhotos/Students/Mainak.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/mainak-hindocha-515600319/",
          github: "#",
        },
      },
      {
        id: 7,
        name: "Harsh Shah",
        role: "",
        image: "/TeamPhotos/Students/Harsh_M.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/harsh-mehul-shah",
          github: "#",
        },
      },
      {
        id: 8,
        name: "Hitesh Thacker",
        role: "",
        image: "/TeamPhotos/Students/Hitesh.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/hitesh-thacker-b22682284/",
          github: "#",
        },
      },
      {
        id: 9,
        name: "Diya Gupta",
        role: "",
        image: "/TeamPhotos/Students/Diya.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/diya-gupta-47a67b284",
          github: "#",
        },
      },
      {
        id: 10,
        name: "Het Modi",
        role: "",
        image: "/TeamPhotos/Students/Het.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/het-a-modi",
          github: "https://github.com/say-het/",
        },
      },
      {
        id: 11,
        name: "Mihir Jan",
        role: "",
        image: "/TeamPhotos/Students/Mihir.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/mihir-jan-935693275/",
          github: "https://github.com/mihir1816",
        },
      },
      {
        id: 12,
        name: "Luv Patel",
        role: "",
        image: "/TeamPhotos/Students/Luv.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/luvv/",
          github: "https://github.com/luvp21",
        },
      },
      {
        id: 13,
        name: "Nand Koradiya",
        role: "",
        image: "/TeamPhotos/Students/Nand.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/nand-koradiya-455618281/",
          github: "https://github.com/nsk724",
        },
      },
      {
        id: 14,
        name: "Parth Shah",
        role: "",
        image: "/TeamPhotos/Students/Parth.jpg",
        bio: "",
        socials: {
          linkedin:
            "https://www.linkedin.com/in/parth108?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
          github: "https://github.com/parth10-05",
        },
      },
      {
        id: 15,
        name: "Aryan Vadhadiya",
        role: "",
        image: "/TeamPhotos/Students/Aryan_V.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/aryan-vadhadiya-4608b7320/",
          github: "https://github.com/AryanVadhadiya",
        },
      },
      {
        id: 16,
        name: "Hrushi Bhanvadiya",
        role: "",
        image: "/TeamPhotos/Students/Hrushi.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/hrushi-bhanvadiya-081818280/",
          github: "https://github.com/hrushi2501",
        },
      },
      {
        id: 17,
        name: "Chinmay Patel",
        role: "",
        image: "/TeamPhotos/Students/Chinmay.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/chinmay-patel07/",
          github: "https://github.com/chinmay1p",
        },
      },
      {
        id: 18,
        name: "Ritika Parekh",
        role: "",
        image: "/TeamPhotos/Students/Ritika.jpg",
        bio: "",
        socials: {
          linkedin: "https://in.linkedin.com/in/ritika-parekh-b0563a279",
          github: "https://github.com/sleuthsister",
        },
      },
      {
        id: 19,
        name: "Rudra Moradiya",
        role: "",
        image: "/TeamPhotos/Students/Rudra.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/rudra-moradiya-0a774034b/",
          github: "https://github.com/Rudra2712",
        },
      },
      {
        id: 20,
        name: "Heta Dave",
        role: "",
        image: "/TeamPhotos/Students/Heta.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/heta-dave-linked/",
          github: "https://github.com/heta-dave",
        },
      },
      {
        id: 21,
        name: "Param Desai",
        role: "",
        image: "/TeamPhotos/Students/Param.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/paramdesai7",
          github: "https://github.com/perom7",
        },
      },
      {
        id: 22,
        name: "Harsh Shah",
        role: "",
        image: "/TeamPhotos/Students/Harsh.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/harsh-shah-b670b5275/",
          github: "https://github.com/HarshS3",
        },
      },
      {
        id: 23,
        name: "Leena Shah",
        role: "",
        image: "/TeamPhotos/Students/Leena.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/fjiolla",
          github: "https://github.com/fjiolla",
        },
      },
      {
        id: 24,
        name: "Advait Pandya",
        role: "",
        image: "/TeamPhotos/Students/Advait.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/advait-pandya-315617284/",
          github: "https://github.com/Asterrage2209",
        },
      },
      {
        id: 25,
        name: "Aryan Dawra",
        role: "",
        image: "/TeamPhotos/Students/Aryan.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/aryan-dawra-0b7b0a28b/",
          github: "https://github.com/Furrina",
        },
      },
      {
        id: 26,
        name: "Poorvanshi Kochar",
        role: "",
        image: "/TeamPhotos/Students/Poorvanshi.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/poorvanshi-kochar-7b73a22a0/",
          github: "https://github.com/Poorvanshi1375",
        },
      },
      {
        id: 27,
        name: "Reyan Shah",
        role: "",
        image: "/TeamPhotos/Students/Reyan.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/reyan-shah-88aaa4284/",
          github: "https://github.com/Rey-J-Sh/",
        },
      },
      {
        id: 28,
        name: "Jaimin Parmar",
        role: "",
        image: "/TeamPhotos/Students/Jaimin.jpg",
        bio: "",
        socials: {
          linkedin: "https://www.linkedin.com/in/jaimin-parmar-a4a62a332/",
          github: "https://github.com/Jaimin2687",
        },
      }
    ],
  },
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
  const [categories, setCategories] =
    useState<OrganizerCategory[]>(initialCategories);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Shuffle members within each category on mount
    const shuffledCategories = initialCategories.map((cat) => ({
      ...cat,
      // Only shuffle if there are more than 1 members to maintain layout stability for singletons
      members: cat.members.length > 1 ? shuffleArray(cat.members) : cat.members,
    }));
    setCategories(shuffledCategories);
    setIsMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // Animate Main Title
      gsap.fromTo(
        `.${styles.title}`,
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
          },
        },
      );

      // Iterate over each category section to apply animations
      categories.forEach((category) => {
        const triggerSelector = `#category-${category.id}`;

        // Animate Category Title
        gsap.fromTo(
          `${triggerSelector} .${styles.categoryTitle}`,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: triggerSelector,
              start: "top 85%",
            },
          },
        );

        // Animate Cards within the category
        gsap.fromTo(
          `${triggerSelector} .${styles.card}`,
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
            },
          },
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
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMounted, categories]); // Re-run GSAP when categories (and thus DOM) updates

  if (!isMounted) {
    return (
      <section
        ref={sectionRef}
        className={styles.section}
        style={{ minHeight: "100vh" }}
      />
    ); // Prevent layout shift or flash of un-shuffled content
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.bgDecoration} />
      <Starfield className={styles.starfield} />

      <h1 className={styles.title}>Meet the Team</h1>

      {categories.map((category) => (
        <div
          key={category.id}
          id={`category-${category.id}`}
          className={styles.categorySection}
        >
          <h2 className={styles.categoryTitle}>{category.title}</h2>
          <div className={styles.grid}>
            {category.members.map((member) => (
              <div key={member.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://ui-avatars.com/api/?name=" +
                        member.name +
                        "&background=random";
                    }}
                  />
                </div>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                {member.bio && <p className={styles.bio}>{member.bio}</p>}

                <div className={styles.socials}>
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                  {member.socials?.github && (
                    <a
                      href={member.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a
                      href={member.socials.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterIcon />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
