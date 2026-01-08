
export interface Project {
  id: string;
  title: string;
  category: 'UI/UX' | 'Graphic Design' | 'Branding';
  imageUrl: string;
  description: string;
  tools: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Tool' | 'Hard Skill' | 'Process';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
