export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  slug: string;
  author: string;
  whyMatters: string;
  tags: string[];
  readTime: string;
  stats: {
    views: number;
    shares: number;
  };
  publishedAt: string;
  lastUpdatedBy: string;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  role: 'Super Admin' | 'Editor' | 'Contributor';
  status: 'Active' | 'Inactive';
  avatar: string;
  joinedDate: string;
}

export interface Property {
  id: number;
  title: string;
  slug: string;
  description: string;
  cardImage: string;
  detailImage: string;
  category: string;
  features: string[];
  location: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  cardImage: string;
  detailImage: string;
  category: string;
  highlights: string[];
}
