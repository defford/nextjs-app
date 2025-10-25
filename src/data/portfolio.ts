export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface PersonalInfo {
  greeting: string;
  name: string;
  title: string;
  bio: string;
  longBio: string;
  email: string;
  location: string;
  resumeUrl?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    X?: string;
  };
}

export const personalInfo: PersonalInfo = {
  greeting: "Hey, I'm Daniel!",
  name: "Daniel Efford",
  title: "Software Engineer, AI Enthusiast, Chess Coach",
  bio: "Practical and efficient problem solver. Always eager to help others and take on a new challenge.",
  longBio: "I love building solutions for my wife's problems, as well as my own. I'm constantly learning new things and trying out the latest tools and tech. If I'm not building, I'm coaching kids to play chess or learning a new skill.",
  email: "defford@gmail.com",
  location: "Grand Falls-Windsor, NL",
  resumeUrl: "/resume.pdf",
  socialLinks: {
    github: "https://github.com/defford",
    linkedin: "https://linkedin.com/in/defford",
    X: "https://x.com/defford"
  }
};

export const projects: Project[] = [
  {
    id: "chess-club-website",
    title: "Chess Club Website",
    description: "A chess club website that manages members, organizes tournmants, and provides resources for the club to learn to play chess.",
    longDescription: "I created a chess club website that manages members, organizes tournmants, and provides resources for the club to learn to play chess. I used NextJS and Vercel to build a fast and responsive chess club management system.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Google Sheets API", "Redis Cache", "Vercel"],
    imageUrl: "/chess-club-website.png",
    liveUrl: "https://cnlscc.com",
    githubUrl: "https://github.com/defford/chess-club-website",
    featured: false
  },

];

export const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", level: "advanced" },
  { name: "Next.js", category: "frontend", level: "advanced" },
  { name: "TypeScript", category: "frontend", level: "advanced" },
  { name: "Vue.js", category: "frontend", level: "intermediate" },
  { name: "Tailwind CSS", category: "frontend", level: "advanced" },
  { name: "Shadcn UI", category: "frontend", level: "advanced" },
  
  // Backend
  { name: "Node.js", category: "backend", level: "advanced" },
  { name: "Express.js", category: "backend", level: "advanced" },
  { name: "Python", category: "backend", level: "intermediate" },
  { name: "PostgreSQL", category: "backend", level: "advanced" },
  { name: "MongoDB", category: "backend", level: "intermediate" },
  { name: "GraphQL", category: "backend", level: "intermediate" },
  
  // Tools
  { name: "Git", category: "tools", level: "advanced" },
  { name: "Docker", category: "tools", level: "intermediate" },
  { name: "AWS", category: "tools", level: "intermediate" },
  { name: "Vercel", category: "tools", level: "advanced" },
  { name: "Jest", category: "tools", level: "intermediate" },
  { name: "GCP", category: "tools", level: "advanced" },
];
