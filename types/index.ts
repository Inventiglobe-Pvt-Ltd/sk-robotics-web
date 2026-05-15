export interface ProgramData {
  id: string;
  icon: string;
  badge: string;
  title: string;
  description: string;
  tags: string[];
  features: string[];
  equipment: string;
  image: string;
  link: string;
}

export interface TestimonialData {
  quote: string;
  name: string;
  role: string;
  school: string;
  initials: string;
  featured?: boolean;
}

export interface StepData {
  number: number;
  icon: string;
  title: string;
  body: string;
}

export interface FeatureData {
  icon: string;
  title: string;
  body: string;
}

export interface ValueData {
  icon: string;
  title: string;
  body: string;
}

export interface FAQData {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  schoolName: string;
  phone: string;
  email?: string;
  location: string;
  totalStudents?: number;
  classesServed?: string;
  programs: string[];
  message?: string;
  heardFrom?: string;
}

export interface StatData {
  value: number;
  suffix: string;
  label: string;
}
