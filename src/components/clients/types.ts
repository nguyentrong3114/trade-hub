export interface Product {
  name: string;
  description: string;
  category: string;
  image?: string;
}

export interface Leader {
  name: string;
  position: string;
  avatar?: string;
  linkedin?: string;
}

export interface Achievement {
  title: string;
  year: string;
  description: string;
}

export interface Testimonial {
  author: string;
  company: string;
  content: string;
  avatar?: string;
}

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote";
  salary?: string;
  experience: string;
  postedDate: string;
  deadline?: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  isHot?: boolean;
  isUrgent?: boolean;
}

export interface ClientDetail {
  id: number;
  name: string;
  slogan?: string;
  description: string;
  logo: string;
  coverImage?: string;
  category: string;
  rank: string;
  overview: string;
  mission?: string;
  vision?: string;
  coreValues?: string[];
  foundedYear: number;
  employeeCount: string;
  location: string;
  address: string;
  email: string;
  phone: string;
  website?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  products: Product[];
  leaders: Leader[];
  achievements: Achievement[];
  testimonials: Testimonial[];
  gallery?: string[];
  certifications?: string[];
}

// Helper function
export function getRankColor(rank: string): string {
  switch (rank) {
    case "Platinum":
      return "bg-gradient-to-r from-gray-700 to-gray-900 text-white";
    case "Gold":
      return "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white";
    case "Silver":
      return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
    case "Bronze":
      return "bg-gradient-to-r from-orange-600 to-orange-700 text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

