
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ChevronDown, 
  Layers,
  User,
  Compass,
  Target,
  Clock,
  Briefcase,
  Monitor,
  Cpu,
  Terminal,
  Sparkles,
  Send,
  MapPin,
  Phone
} from 'lucide-react';
import { PROJECTS, SERVICES, SKILLS } from './constants';
import AIAssistant from './components/AIAssistant';
import SkillChart from './components/SkillChart';

const IntroLoader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 1000); // Wait for exit animation
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden ${isExiting ? 'loader-exit' : ''}`}>
      <h1 className="absolute text-[25vw] font-bold text-white/[0.03] select-none tracking-tighter leading-none pointer-events-none">
        HELLO
      </h1>
      <div className="relative z-10 text-center animate-reveal px-6">
        <h2 className="font-script text-6xl md:text-9xl text-white drop-shadow-2xl">
          Faizan Akram
        </h2>
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="w-12 h-[1px] bg-blue-500/50"></div>
          <p className="text-white/40 uppercase tracking-[0.4em] text-[8px] md:text-[10px] font-medium">Creative Designer</p>
        </div>
      </div>
      <div className="absolute bottom-10 left-6 md:left-10 text-white/10 text-[10px] md:text-xs font-mono">
        <p>UI/UX PORTFOLIO</p>
        <p>© 2025</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sections = ['about', 'work', 'skills', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [loading]);

  if (loading) {
    return <IntroLoader onComplete={() => setLoading(false)} />;
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('home');
  };

  return (
    <div className="min-h-screen relative selection:bg-blue-500/10 transition-colors duration-700 content-reveal overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-50/40 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-50/40 blur-[100px] rounded-full"></div>
      </div>

      {/* FIXED GLASSMORPHIC NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pointer-events-none transition-all duration-500 py-3 md:py-6">
        <nav 
          className={`pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isScrolled 
              ? "max-w-3xl md:max-w-5xl w-[92%] rounded-[2rem] md:rounded-full bg-white/75 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] py-2 px-6 md:px-10" 
              : "w-[95%] max-w-[1400px] rounded-[1.5rem] md:rounded-[2.5rem] bg-[#2563EB] py-3 md:py-4 px-6 md:px-10 shadow-lg"
          }`}
        >
          <div className="flex items-center justify-between h-10 md:h-12">
            <button 
              onClick={scrollToTop}
              className={`flex items-center gap-2 font-serif text-xl md:text-2xl font-bold tracking-tighter transition-colors duration-500 hover:opacity-80 ${isScrolled ? "text-[#111827]" : "text-white"}`}
            >
              <span className={`w-8 h-8 md:w-10 md:h-10 rounded-[0.75rem] md:rounded-xl flex items-center justify-center transition-all duration-500 text-sm md:text-base font-sans ${isScrolled ? "bg-[#2563EB] text-white" : "bg-white text-[#2563EB] shadow-md"}`}>F</span>
              <span className="tracking-tight">Faizan Akram</span>
            </button>
            
            <div className={`hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-black transition-colors duration-500 ${isScrolled ? "text-[#4B5563]" : "text-white/90"}`}>
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, 'about')}
                className={`relative group transition-colors duration-300 ${activeSection === 'about' ? (isScrolled ? 'text-[#2563EB]' : 'text-white underline underline-offset-8') : 'hover:text-[#2563EB]'}`}
              >
                About
              </a>
              <a 
                href="#work" 
                onClick={(e) => scrollToSection(e, 'work')}
                className={`relative group transition-colors duration-300 ${activeSection === 'work' ? (isScrolled ? 'text-[#2563EB]' : 'text-white underline underline-offset-8') : 'hover:text-[#2563EB]'}`}
              >
                Projects
              </a>
              <a 
                href="#skills" 
                onClick={(e) => scrollToSection(e, 'skills')}
                className={`relative group transition-colors duration-300 ${activeSection === 'skills' ? (isScrolled ? 'text-[#2563EB]' : 'text-white underline underline-offset-8') : 'hover:text-[#2563EB]'}`}
              >
                Skills
              </a>
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className={`px-8 py-3 rounded-full transition-all duration-500 font-black shadow-sm ${
                  isScrolled 
                    ? "bg-[#2563EB] text-white hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5" 
                    : "bg-white text-[#2563EB] hover:scale-105 active:scale-95"
                } ${activeSection === 'contact' ? 'ring-2 ring-offset-2 ring-[#2563EB]/20' : ''}`}
              >
                CONTACT
              </a>
            </div>

            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={`md:hidden p-2 rounded-xl transition-all ${isScrolled ? "text-[#111827] bg-gray-100" : "text-white bg-white/10"}`}>
              <Mail size={20} />
            </a>
          </div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32">
        {/* Hero Section */}
        <section id="home" className="pt-8 pb-16 md:pt-16 md:pb-24 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-[10px] md:text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full animate-pulse"></span>
            Available for Design Projects
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.8rem] font-serif font-bold tracking-tight mb-6 md:mb-8 max-w-4xl leading-[1.1] text-[#111827]">
            Crafting <span className="italic gradient-text">Meaningful</span> Digital Experiences with <span className="underline decoration-[#2563EB]/20">Precision</span>.
          </h1>
          <p className="text-base md:text-lg text-[#6B7280] max-w-2xl mb-10 leading-relaxed">
            I am <span className="font-bold text-[#111827]">Faizan Akram</span>, a Multi-Disciplinary Designer specializing in UI/UX excellence. I bridge the gap between human needs and aesthetic function with a refined, modern touch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="bg-[#2563EB] hover:bg-blue-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 group">
              Explore Portfolio <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="bg-white border border-gray-200 hover:bg-gray-50 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold transition-all text-[#111827] flex items-center justify-center shadow-sm hover:shadow-md">
              About Me
            </a>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="py-12 md:py-20 scroll-mt-32">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:min-h-[600px]">
            {/* Box 1: My Journey */}
            <div 
              className={`md:col-span-2 md:row-span-2 p-6 md:p-10 rounded-3xl md:rounded-[3rem] flex flex-col justify-between group overflow-hidden relative shadow-xl md:shadow-2xl transition-all duration-500 ease-in-out transform cursor-default hover:-translate-y-3 hover:scale-[1.01] bg-white hover:bg-[#2563EB] border border-gray-100 hover:border-[#2563EB]`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-all duration-500 hidden md:block group-hover:scale-110 group-hover:-rotate-6">
                <User className={`w-56 h-56 -rotate-12 text-gray-400 group-hover:text-white`} />
              </div>
              <div className="relative z-10">
                <h3 className={`text-2xl md:text-4xl font-bold mb-4 md:mb-6 transition-colors duration-500 text-[#111827] group-hover:text-white`}>My Journey</h3>
                <p className={`text-sm md:text-lg max-w-md mb-6 transition-colors duration-500 leading-relaxed text-[#6B7280] group-hover:text-white/90`}>
                  As a designer, I don't just move pixels; I architect emotions. My journey began with a simple curiosity about how visual harmony affects human behavior. Today, I translate complex problems into elegant, user-centric solutions.
                </p>
                <div className={`text-xs md:text-sm font-medium transition-colors duration-500 text-[#4B5563] group-hover:text-white/80`}>
                  I believe that every brand has a soul, and my job is to make that soul visible through strategic design and empathetic research.
                </div>
              </div>
              <div className="flex gap-4 mt-8 relative z-10">
                <div className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-500 group-hover:scale-105 bg-blue-50 text-[#2563EB] group-hover:bg-white/20 group-hover:text-white`}>Creative Mind</div>
                <div className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-500 group-hover:scale-105 group-hover:delay-75 bg-blue-50 text-[#2563EB] group-hover:bg-white/20 group-hover:text-white`}>Strategic Soul</div>
              </div>
            </div>

            {/* Box 2: Vision & Philosophy */}
            <div 
              className={`md:col-span-2 p-6 md:p-10 rounded-3xl md:rounded-[3rem] flex flex-col justify-start shadow-xl transition-all duration-500 ease-in-out transform cursor-default group hover:-translate-y-3 hover:scale-[1.02] bg-white hover:bg-[#2563EB] border border-gray-100 hover:border-[#2563EB]`}
            >
              <div className="relative z-10 flex flex-col items-start h-full">
                <div className={`mb-6 p-3 rounded-full border-2 transition-all duration-500 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 border-[#2563EB]/10 text-[#2563EB] bg-blue-50 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/40`}>
                  <Layers size={28} />
                </div>
                <h3 className={`text-xl md:text-3xl font-bold mb-4 transition-colors duration-500 text-[#111827] group-hover:text-white`}>Vision & Philosophy</h3>
                <p className={`text-xs md:text-lg transition-colors duration-500 leading-relaxed text-[#6B7280] group-hover:text-white/90`}>
                  Design is the silent ambassador of your brand. I focus on accessibility and modern aesthetics to ensure your digital footprint is both beautiful and inclusive.
                </p>
              </div>
            </div>

            {/* Box 3: Experience */}
            <div 
              className={`p-6 md:p-10 rounded-3xl md:rounded-[3rem] flex flex-col items-center justify-center text-center shadow-lg transition-all duration-500 ease-in-out transform cursor-default group hover:-translate-y-3 hover:scale-[1.05] bg-white hover:bg-[#2563EB] border border-gray-100 hover:border-[#2563EB]`}
            >
              <div className={`mb-2 transition-all duration-500 group-hover:scale-125 group-hover:animate-pulse text-[#2563EB] group-hover:text-white`}>
                <Clock size={24} />
              </div>
              <span className={`text-xl md:text-2xl font-bold transition-colors duration-500 text-[#111827] group-hover:text-white`}>2+ Years</span>
              <span className={`text-[8px] md:text-xs uppercase tracking-[0.15em] font-black transition-colors duration-500 text-[#6B7280] group-hover:text-white/80`}>Exp Mastery</span>
            </div>

            {/* Box 4: Current Focus */}
            <div 
              className={`p-6 md:p-10 rounded-3xl md:rounded-[3rem] flex flex-col items-center justify-center text-center shadow-lg transition-all duration-500 ease-in-out transform cursor-default group hover:-translate-y-3 hover:scale-[1.05] bg-white hover:bg-[#2563EB] border border-gray-100 hover:border-[#2563EB]`}
            >
              <div className={`mb-2 transition-all duration-500 group-hover:scale-125 text-[#2563EB] group-hover:text-white`}>
                <Target size={24} />
              </div>
              <span className={`text-xl md:text-2xl font-bold transition-colors duration-500 text-[#111827] group-hover:text-white`}>UX Focus</span>
              <span className={`text-[8px] md:text-xs uppercase tracking-[0.15em] font-black transition-colors duration-500 text-[#6B7280] group-hover:text-white/80`}>User Centricity</span>
            </div>
          </div>
        </section>

        {/* Selected Works Section */}
        <section id="work" className="py-20 md:py-32 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-[#2563EB]"></div>
                <span className="text-[#2563EB] text-xs font-black uppercase tracking-[0.3em]">Portfolio Showcase</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#111827] leading-tight">Selected <span className="italic gradient-text">Artifacts</span></h2>
              <p className="mt-4 text-[#6B7280] text-lg leading-relaxed">
                A curated selection of digital products and visual systems designed to solve real-world challenges with aesthetic precision.
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3 text-sm font-bold text-gray-400">
              <span className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#111827]">04</span>
              <span>PROJECTS TOTAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12">
            {PROJECTS.map((project, index) => {
              const isLarge = index === 1 || index === 2;
              const colSpan = isLarge ? "md:col-span-7" : "md:col-span-5";
              
              return (
                <div key={project.id} className={`${colSpan} group relative`}>
                  <div className="block outline-none cursor-pointer">
                    <div className="relative aspect-[4/5] md:aspect-auto md:h-[500px] lg:h-[600px] overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-xl group-hover:shadow-2xl transition-all duration-700 bg-gray-100 border border-white">
                      <div className="absolute top-8 left-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        0{index + 1}
                      </div>
                      
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                      />
                      
                      <div className="absolute inset-0 bg-[#111827]/40 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[2px] flex flex-col justify-end p-8 md:p-12">
                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-white/70 text-xs md:text-sm font-medium mb-4 line-clamp-2 max-w-xs">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tools.slice(0, 3).map(tool => (
                              <span key={tool} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] text-white font-bold uppercase tracking-wider">{tool}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 pointer-events-none">
                        <div className="w-24 h-24 rounded-full bg-white text-[#2563EB] flex items-center justify-center font-bold text-xs uppercase tracking-tighter shadow-2xl">
                          View Case
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex items-start justify-between px-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest">{project.category}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">2024</span>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors duration-300 tracking-tight">{project.title}</h4>
                      </div>
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm">
                        <ArrowUpRight className="w-6 h-6 group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SKILLS & SERVICES SECTION - #2563eb Background */}
        <section id="skills" className="py-24 md:py-32 -mx-4 md:-mx-8 px-4 md:px-32 bg-[#2563EB] rounded-[3rem] md:rounded-[5rem] text-white relative overflow-hidden shadow-2xl shadow-blue-300/20 scroll-mt-28">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-200 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-8 h-[2px] bg-white"></div>
                  <span className="text-blue-100 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Services & Mastery</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight mb-8">
                  Core <span className="italic opacity-80 underline decoration-white/20">Competencies.</span>
                </h2>
                <p className="text-blue-50 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-light">
                  Bridging the gap between UI/UX strategy and Graphic excellence. I deliver full-spectrum design solutions that resonate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {/* UI/UX Design Card */}
                <div className="p-8 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.03] group cursor-pointer overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#2563EB] opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#2563EB] flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500 shadow-lg">
                    <Monitor size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 transition-colors duration-500 group-hover:text-[#2563EB]">UI/UX Design</h4>
                  <p className="text-sm text-blue-100/80 leading-relaxed transition-colors duration-500 group-hover:text-[#2563EB]/80">
                    User-centric interfaces focusing on usability, accessibility, and modern aesthetics.
                  </p>
                </div>

                {/* Graphic Systems Card */}
                <div className="p-8 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.03] group cursor-pointer overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#2563EB] opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#2563EB] flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500 shadow-lg">
                    <Cpu size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-3 transition-colors duration-500 group-hover:text-[#2563EB]">Graphic Systems</h4>
                  <p className="text-sm text-blue-100/80 leading-relaxed transition-colors duration-500 group-hover:text-[#2563EB]/80">
                    Comprehensive visual languages, branding, and conceptual graphic art.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 text-white/50 flex items-center gap-3">
                   Mastered Tooling <span className="flex-1 h-[1px] bg-white/10"></span>
                </h5>
                <div className="flex flex-wrap gap-4">
                  {SKILLS.filter(s => s.category === 'Tool').map(skill => (
                    <div key={skill.name} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/20 transition-all cursor-default">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full group-hover:bg-white/10 transition-all duration-1000"></div>
              <div className="bg-white/5 backdrop-blur-xl rounded-[4rem] border border-white/20 p-8 md:p-16 aspect-square flex flex-col items-center justify-center relative shadow-2xl">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                  <Sparkles size={20} className="text-white/60 animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40">Visualizing Expertise</span>
                </div>
                <SkillChart onDark={true} />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION - Immediately after Skills */}
        <section id="contact" className="py-24 md:py-32 scroll-mt-28">
          <div className="bg-[#f9fafb] rounded-[3rem] md:rounded-[5rem] p-8 md:p-24 relative overflow-hidden shadow-2xl border border-gray-100">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/20 to-transparent"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Column 1: Info & Context */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 mb-6">
                    <div className="w-8 h-[2px] bg-[#2563EB]"></div>
                    <span className="text-[#2563EB] text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Connect & Collaborate</span>
                  </div>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 text-[#111827] leading-tight">
                    Start a <span className="italic gradient-text">Conversation.</span>
                  </h2>
                  <p className="text-lg text-[#6B7280] max-w-md leading-relaxed mb-12">
                    Whether you have a groundbreaking idea or just want to say hi, my digital door is always open. Let’s build something that matters.
                  </p>

                  <div className="space-y-8 mb-16">
                    <a href="mailto:mf0578053@gmail.com" className="flex items-center gap-6 group hover:translate-x-3 transition-transform duration-500">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Me</p>
                        <p className="text-xl font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">mf0578053@gmail.com</p>
                      </div>
                    </a>
                    
                    <div className="flex items-center gap-6 group hover:translate-x-3 transition-transform duration-500">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-500">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Base Location</p>
                        <p className="text-xl font-bold text-[#111827] transition-colors group-hover:text-[#2563EB]">Faisalabad, Pakistan</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {[
                    { Icon: Twitter, url: "https://twitter.com" },
                    { Icon: Linkedin, url: "https://linkedin.com" },
                    { Icon: Github, url: "https://github.com" }
                  ].map(({ Icon, url }, idx) => (
                    <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="p-5 bg-white border border-gray-100 rounded-3xl hover:bg-[#2563EB] hover:text-white transition-all duration-500 text-[#111827] hover:scale-110 active:scale-95 shadow-sm hover:shadow-blue-200">
                      <Icon size={24} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Column 2: Minimalist Form */}
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-50 flex flex-col justify-center">
                <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <input 
                        type="text" 
                        id="name" 
                        placeholder=" " 
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-[#111827] focus:outline-none focus:border-[#2563EB] peer transition-all"
                      />
                      <label 
                        htmlFor="name" 
                        className="absolute left-0 top-3 text-gray-400 text-sm transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-[#2563EB] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
                      >
                        FULL NAME
                      </label>
                    </div>
                    <div className="relative group">
                      <input 
                        type="email" 
                        id="email" 
                        placeholder=" " 
                        className="w-full bg-transparent border-b border-gray-200 py-3 text-[#111827] focus:outline-none focus:border-[#2563EB] peer transition-all"
                      />
                      <label 
                        htmlFor="email" 
                        className="absolute left-0 top-3 text-gray-400 text-sm transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-[#2563EB] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
                      >
                        EMAIL ADDRESS
                      </label>
                    </div>
                  </div>

                  <div className="relative group">
                    <input 
                      type="text" 
                      id="subject" 
                      placeholder=" " 
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-[#111827] focus:outline-none focus:border-[#2563EB] peer transition-all"
                    />
                    <label 
                      htmlFor="subject" 
                      className="absolute left-0 top-3 text-gray-400 text-sm transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-[#2563EB] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      SUBJECT
                    </label>
                  </div>

                  <div className="relative group">
                    <textarea 
                      id="message" 
                      placeholder=" " 
                      rows={4}
                      className="w-full bg-transparent border-b border-gray-200 py-3 text-[#111827] focus:outline-none focus:border-[#2563EB] peer transition-all resize-none"
                    />
                    <label 
                      htmlFor="message" 
                      className="absolute left-0 top-3 text-gray-400 text-sm transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-[#2563EB] peer-focus:text-xs peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
                    >
                      TELL ME ABOUT YOUR PROJECT
                    </label>
                  </div>

                  <button className="w-full py-6 rounded-[2rem] bg-[#2563EB] text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all duration-500 hover:bg-white hover:text-[#2563EB] hover:shadow-2xl hover:scale-[1.02] border border-[#2563EB] group overflow-hidden relative">
                    <span className="relative z-10">Send Message</span>
                    <Send size={16} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100 mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[#6B7280] text-xs md:text-sm">
          <button onClick={scrollToTop} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="font-serif font-bold text-lg md:text-xl text-[#111827]">F.</span>
            <p>© 2025 Faizan Akram. Creative Excellence.</p>
          </button>
          <div className="flex gap-6 md:gap-10 font-bold uppercase tracking-widest text-[10px]">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-[#2563EB] transition-colors">Philosophy</a>
            <a href="#work" onClick={(e) => scrollToSection(e, 'work')} className="hover:text-[#2563EB] transition-colors">Process</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-[#2563EB] transition-colors">Inquire</a>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
