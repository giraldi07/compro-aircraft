export type Theme = 'light' | 'dark' | 'system';

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

export interface Customer {
  id: number;
  name: string;
  logo: string;
  testimonial?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}