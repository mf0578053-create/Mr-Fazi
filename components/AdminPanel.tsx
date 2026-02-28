
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Zap, 
  Settings, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight,
  Menu
} from 'lucide-react';
import { PROJECTS as INITIAL_PROJECTS, SKILLS as INITIAL_SKILLS } from '../constants';
import { Project, Skill } from '../types';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'skills'>('dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load data from localStorage or constants
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio_projects');
    const savedSkills = localStorage.getItem('portfolio_skills');

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      setProjects(INITIAL_PROJECTS);
    }

    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    } else {
      setSkills(INITIAL_SKILLS);
    }
  }, []);

  const saveToStorage = (newProjects: Project[], newSkills: Skill[]) => {
    localStorage.setItem('portfolio_projects', JSON.stringify(newProjects));
    localStorage.setItem('portfolio_skills', JSON.stringify(newSkills));
    setProjects(newProjects);
    setSkills(newSkills);
  };

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Project',
      category: 'UI/UX',
      imageUrl: 'https://picsum.photos/seed/new/1200/800',
      description: 'Project description goes here...',
      tools: ['Figma']
    };
    const updated = [...projects, newProject];
    saveToStorage(updated, skills);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    saveToStorage(updated, skills);
  };

  const handleUpdateProject = (id: string, field: keyof Project, value: any) => {
    const updated = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    saveToStorage(updated, skills);
  };

  const handleAddSkill = () => {
    const newSkill: Skill = { name: 'New Skill', level: 80, category: 'Tool' };
    const updated = [...skills, newSkill];
    saveToStorage(projects, updated);
  };

  const handleDeleteSkill = (name: string) => {
    const updated = skills.filter(s => s.name !== name);
    saveToStorage(projects, updated);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex font-sans text-[#111827]">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#0a0a0a] text-white transition-all duration-300 flex flex-col fixed h-full z-50`}>
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-[#2563EB] flex items-center justify-center font-bold text-lg shrink-0">F</div>
          {isSidebarOpen && <span className="font-serif font-bold text-xl tracking-tight">Admin Panel</span>}
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-[#2563EB] text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <LayoutDashboard size={20} />
            {isSidebarOpen && <span className="font-bold text-sm uppercase tracking-widest">Dashboard</span>}
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-[#2563EB] text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <Briefcase size={20} />
            {isSidebarOpen && <span className="font-bold text-sm uppercase tracking-widest">Projects</span>}
          </button>
          <button 
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeTab === 'skills' ? 'bg-[#2563EB] text-white' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <Zap size={20} />
            {isSidebarOpen && <span className="font-bold text-sm uppercase tracking-widest">Skills</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center gap-4 p-4 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-bold text-sm uppercase tracking-widest">View Site</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8 md:p-12`}>
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#111827]">
              {activeTab === 'dashboard' && 'Welcome Back, Faizan'}
              {activeTab === 'projects' && 'Manage Projects'}
              {activeTab === 'skills' && 'Manage Skills'}
            </h1>
            <p className="text-[#6B7280] mt-2">
              {activeTab === 'dashboard' && 'Here is what is happening with your portfolio.'}
              {activeTab === 'projects' && 'Add, edit or remove projects from your showcase.'}
              {activeTab === 'skills' && 'Update your technical expertise and mastery levels.'}
            </p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all text-gray-500"
          >
            <Menu size={20} />
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                <Briefcase size={32} />
              </div>
              <span className="text-4xl font-bold text-[#111827]">{projects.length}</span>
              <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Total Projects</span>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl transition-all">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                <Zap size={32} />
              </div>
              <span className="text-4xl font-bold text-[#111827]">{skills.length}</span>
              <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mt-2">Skills Listed</span>
            </div>
            <div className="bg-[#2563EB] p-8 rounded-[2rem] shadow-lg shadow-blue-200 text-white flex flex-col items-center text-center group hover:scale-[1.02] transition-all cursor-pointer" onClick={() => setActiveTab('projects')}>
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Plus size={32} />
              </div>
              <span className="text-xl font-bold">Add New Content</span>
              <span className="text-xs font-black text-white/60 uppercase tracking-[0.2em] mt-2">Quick Action</span>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={handleAddProject}
                className="px-8 py-4 bg-[#2563EB] text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                <Plus size={20} /> Add Project
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 group hover:shadow-md transition-all">
                  <div className="w-full md:w-48 h-48 rounded-2xl overflow-hidden bg-gray-100 shrink-0 relative">
                    <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="p-2 bg-white rounded-full text-gray-800"><Edit3 size={16} /></button>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Project Title</label>
                        <input 
                          type="text" 
                          value={project.title} 
                          onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-[#2563EB] outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</label>
                        <input 
                          type="text" 
                          value={project.category} 
                          onChange={(e) => handleUpdateProject(project.id, 'category', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-[#2563EB] outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                      <textarea 
                        value={project.description} 
                        onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                        rows={2}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#2563EB] outline-none resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex md:flex-col justify-end gap-2">
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button className="p-4 bg-blue-50 text-[#2563EB] rounded-2xl hover:bg-[#2563EB] hover:text-white transition-all">
                      <Save size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={handleAddSkill}
                className="px-8 py-4 bg-[#2563EB] text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                <Plus size={20} /> Add Skill
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4 group hover:shadow-md transition-all">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                      <Zap size={20} />
                    </div>
                    <button 
                      onClick={() => handleDeleteSkill(skill.name)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Skill Name</label>
                    <input 
                      type="text" 
                      value={skill.name} 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold outline-none"
                      readOnly
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mastery Level</label>
                      <span className="text-xs font-bold text-[#2563EB]">{skill.level}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={skill.level} 
                      className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                      onChange={(e) => {
                        const updated = skills.map(s => s.name === skill.name ? { ...s, level: parseInt(e.target.value) } : s);
                        saveToStorage(projects, updated);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
