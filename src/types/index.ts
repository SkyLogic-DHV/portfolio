export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDesc: string;
  longDesc: string;
  thumbnail: string;
  gallery: string;
  techStack: string;
  githubUrl: string;
  demoUrl: string;
  year: string;
  duration: string;
  category: string;
  status: string;
  featured: boolean;
  highlight: string;
  projectType: string;
  challenge: string;
  solution: string;
  result: string;
  screenshots: string;
  videoDemo: string;
  seoImage: string;
  isActive: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface User {
  id: string;
  email: string;
  name?: string | null;
}

export interface AdminStats {
  totalProjects: number;
  featuredProjects: number;
}
