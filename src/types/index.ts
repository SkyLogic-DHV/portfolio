export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  image?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  tags: string;
  featured: boolean;
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
