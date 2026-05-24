export type ResourceCategory = 'Sensory' | 'Communication' | 'Fine Motor Skills' | 'Behavior';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'interactive' | 'package';
  price: number; // in cents (e.g., 499 for $4.99)
  category: ResourceCategory;
  mockSecureUrl?: string; // secure asset link, gated on the server
  content?: string; // core contents (HTML instructions, SVG schemas, or guidance)
}

export type UserRole = 'parent' | 'educator' | 'admin';

export interface UserProfile {
  userId: string;
  email: string;
  role: UserRole;
  unlockedResourceIds: string[];
}
