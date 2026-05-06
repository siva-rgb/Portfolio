export interface Profile {
  id: number;
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  resume_url: string;
  photo_url: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  location: string;
  gpa: string;
  start_date: string;
  end_date: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  sort_order: number;
  bullets: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  image_url: string;
  featured: boolean;
  sort_order: number;
}

export interface Skill {
  id: number;
  category: string;
  name: string;
  proficiency: number;
  sort_order: number;
}

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credential_id: string;
  url: string;
}

export interface Publication {
  id: number;
  title: string;
  publisher: string;
  date: string;
  url: string;
}

export interface AnalyticsSummary {
  total_visits: number;
  unique_visitors: number;
  new_visitors_period: number;
  returning_percent: number;
}

export interface DailyCount {
  date: string;
  visits: number;
}

export interface NamedCount {
  name: string;
  count: number;
}

export interface GeoRow {
  country: string;
  city: string;
  count: number;
}

export interface DeviceRow {
  browser: string;
  device: string;
  os: string;
  count: number;
}
