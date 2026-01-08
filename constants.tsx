
import React from 'react';
import { Project, Skill } from './types';
import { Layout, Palette, PenTool, Globe, Smartphone, Zap } from 'lucide-react';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Lumina Fintech Dashboard',
    category: 'UI/UX',
    imageUrl: 'https://picsum.photos/seed/fintech/1200/800',
    description: 'A comprehensive wealth management platform focusing on clarity and data visualization.',
    tools: ['Figma', 'React', 'D3.js']
  },
  {
    id: '2',
    title: 'Vanguard Brand Identity',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/brand/1200/800',
    description: 'Reimagining modern security with a bold, minimalist visual language.',
    tools: ['Illustrator', 'Photoshop', 'Indesign']
  },
  {
    id: '3',
    title: 'Zenith E-Commerce App',
    category: 'UI/UX',
    imageUrl: 'https://picsum.photos/seed/shop/1200/800',
    description: 'A frictionless shopping experience with integrated AR product previews.',
    tools: ['Figma', 'Protopie', 'After Effects']
  },
  {
    id: '4',
    title: 'Hyperion Poster Series',
    category: 'Graphic Design',
    imageUrl: 'https://picsum.photos/seed/art/1200/800',
    description: 'A series of conceptual posters exploring the intersection of brutalism and digital art.',
    tools: ['Photoshop', 'Cinema 4D']
  }
];

export const SKILLS: Skill[] = [
  { name: 'Figma', level: 95, category: 'Tool' },
  { name: 'Adobe XD', level: 85, category: 'Tool' },
  { name: 'Photoshop', level: 90, category: 'Tool' },
  { name: 'Illustrator', level: 92, category: 'Tool' },
  { name: 'UI Design', level: 98, category: 'Hard Skill' },
  { name: 'UX Research', level: 80, category: 'Hard Skill' },
  { name: 'Prototyping', level: 90, category: 'Hard Skill' },
  { name: 'Design Systems', level: 85, category: 'Process' },
  { name: 'Wireframing', level: 95, category: 'Process' },
];

export const SERVICES = [
  { icon: <Layout className="w-6 h-6" />, title: 'UI/UX Design', desc: 'Crafting intuitive digital experiences that convert.' },
  { icon: <Palette className="w-6 h-6" />, title: 'Brand Identity', desc: 'Building memorable visual languages for startups.' },
  { icon: <PenTool className="w-6 h-6" />, title: 'Graphic Design', desc: 'Creative assets that tell a story across platforms.' },
  { icon: <Smartphone className="w-6 h-6" />, title: 'Mobile First', desc: 'Responsive designs optimized for touch interaction.' },
  { icon: <Globe className="w-6 h-6" />, title: 'Web Design', desc: 'Modern landing pages with cutting-edge layouts.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Interaction Design', desc: 'Bringing interfaces to life with smooth animations.' }
];
