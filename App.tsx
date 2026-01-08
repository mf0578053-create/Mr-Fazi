
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ChevronDown, 
  Layers
} from 'lucide-react';
import { PROJECTS, SERVICES } from './constants';
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
      {/* Background HELLO text */}
      <h1 className="absolute text-[20vw] font-bold text-white/[0.03] select-none tracking-tighter leading-none pointer-events-none">
        HELLO
      </h1>
      
      {/* Centered Signature */}
      <div className="relative z-10 text-center animate-reveal">
        <h2 className="font-script text-7xl md:text-9xl text-white drop-shadow-2xl">
          Mr Fazi
        </h2>
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="w-12 h-[1px] bg-blue-500/50"></div>
          <p className="text-white/40 uppercase tracking-[0.4em] text-[10px] font-medium">Creative Designer</p>
        </div>
      </div>

      {/* Subtle Particles or accent */}
      <div className="absolute bottom-10 left-10 text-white/10 text-xs font-mono">
        <p>UI/UX PORTFOLIO</p>
        <p>© 2025</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpertiseActive, setIsExpertiseActive] = useState(false);
  const expertiseRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExpertiseActive(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (expertiseRef.current) {
      observer.observe(expertiseRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (expertiseRef.current) observer.unobserve(expertiseRef.current);
    };
  }, []);

  if (loading) {
    return <IntroLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="min-h-screen relative selection:bg-blue-500/10 transition-colors duration-700 content-reveal">
      {/* Background Decor - Subtle for light theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-50/50 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50/50 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav 
        className={`sticky z-40 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "top-4 mx-4 md:mx-auto max-w-5xl rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-2xl py-2" 
            : "top-0 w-full bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#0891B2] py-4 shadow-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className={`flex items-center gap-2 font-serif text-2xl font-bold tracking-tighter transition-colors duration-300 ${isScrolled ? "text-[#111827]" : "text-white"}`}>
            <span className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${isScrolled ? "bg-[#2563EB] text-white" : "bg-white/20 backdrop-blur-md text-white border border-white/30"}`}>F</span>
            <span className="hidden sm:inline">Mr Fazi</span>
          </div>
          
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${isScrolled ? "text-[#6B7280]" : "text-white/80"}`}>
            <a href="#work" className={`transition-colors ${isScrolled ? "hover:text-[#2563EB]" : "hover:text-white"}`}>Work</a>
            <a href="#expertise" className={`transition-colors ${isScrolled ? "hover:text-[#2563EB]" : "hover:text-white"}`}>Expertise</a>
            <a href="#about" className={`transition-colors ${isScrolled ? "hover:text-[#2563EB]" : "hover:text-white"}`}>About</a>
            <a 
              href="#contact" 
              className={`px-6 py-2 rounded-full transition-all font-bold shadow-lg ${
                isScrolled 
                  ? "bg-[#2563EB] text-white hover:bg-blue-700 shadow-blue-200" 
                  : "bg-white text-[#2563EB] hover:bg-gray-100 shadow-black/10"
              }`}
            >
              Let's Talk
            </a>
          </div>

          <button className={`md:hidden p-2 transition-colors ${isScrolled ? "text-[#111827]" : "text-white"}`}>
            <ChevronDown />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Hero Section */}
        <section className="py-20 md:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse"></span>
            Ready for New Challenges
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8 max-w-4xl leading-[1.1] text-[#111827]">
            Weaving <span className="italic gradient-text">Creativity</span> into Functional <span className="underline decoration-[#2563EB]/20">Digital Systems</span>
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mb-12 leading-relaxed">
            I'm <span className="font-bold text-[#111827]">Mr Fazi</span>, a UI/UX & Graphic Designer dedicated to building high-fidelity experiences that don't just look pretty—they solve problems.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#work" className="bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
              View My Work <ArrowUpRight className="w-5 h-5" />
            </a>
            <a href="#expertise" className="soft-ui hover:bg-gray-200 px-8 py-4 rounded-2xl font-bold transition-all text-[#111827]">
              My Expertise
            </a>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" ref={expertiseRef} className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-auto md:h-[600px]">
            <div className={`md:col-span-2 md:row-span-2 p-8 rounded-[32px] flex flex-col justify-between group overflow-hidden relative shadow-xl transition-all duration-1000 ease-in-out ${
              isExpertiseActive ? "bg-[#2563EB] shadow-blue-200/50" : "bg-gray-50 border border-gray-100 shadow-gray-200/20"
            }`}>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Layers className={`w-48 h-48 -rotate-12 transition-colors duration-1000 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`} />
              </div>
              <div>
                <h3 className={`text-3xl font-bold mb-4 transition-colors duration-1000 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`}>Core Design Philosophy</h3>
                <p className={`max-w-md transition-colors duration-1000 ${isExpertiseActive ? "text-blue-100" : "text-[#6B7280]"}`}>My approach blends human-centered design with modern aesthetics. I believe every pixel should serve a purpose.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {SERVICES.slice(0, 4).map((s, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className={`transition-colors duration-1000 ${isExpertiseActive ? "text-white" : "text-[#2563EB]"}`}>{s.icon}</div>
                    <span className={`font-semibold transition-colors duration-1000 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`}>{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`md:col-span-2 p-8 rounded-[32px] flex flex-col justify-between shadow-xl transition-all duration-1000 ease-in-out delay-75 ${
              isExpertiseActive ? "bg-[#1E40AF] shadow-blue-900/10" : "bg-gray-50 border border-gray-100 shadow-gray-200/20"
            }`}>
              <div>
                <h3 className={`text-xl font-bold mb-2 transition-colors duration-1000 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`}>Technical Proficiency</h3>
                <p className={`text-sm transition-colors duration-1000 ${isExpertiseActive ? "text-blue-200" : "text-[#6B7280]"}`}>Balancing tools and artistry.</p>
              </div>
              <SkillChart onDark={isExpertiseActive} />
            </div>

            <div className={`p-8 rounded-[32px] flex flex-col items-center justify-center text-center shadow-lg transition-all duration-1000 ease-in-out delay-150 ${
              isExpertiseActive ? "bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] shadow-blue-200" : "bg-gray-50 border border-gray-100 shadow-gray-200/20"
            }`}>
              <span className={`text-5xl font-serif font-bold mb-2 transition-colors duration-1000 ${isExpertiseActive ? "text-white" : "text-[#2563EB]"}`}>8+</span>
              <span className={`text-xs uppercase tracking-widest font-bold transition-colors duration-1000 ${isExpertiseActive ? "text-blue-100" : "text-[#6B7280]"}`}>Years Experience</span>
            </div>

            <div className={`p-8 rounded-[32px] flex flex-col items-center justify-center text-center shadow-lg transition-all duration-1000 ease-in-out delay-200 ${
              isExpertiseActive ? "bg-[#111827] shadow-black/10" : "bg-gray-50 border border-gray-100 shadow-gray-200/20"
            }`}>
              <span className={`text-5xl font-serif font-bold mb-2 transition-colors duration-1000 ${isExpertiseActive ? "text-[#2563EB]" : "text-indigo-600"}`}>120+</span>
              <span className={`text-xs uppercase tracking-widest font-bold transition-colors duration-1000 ${isExpertiseActive ? "text-gray-400" : "text-[#6B7280]"}`}>Projects Done</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-serif font-bold mb-4 text-[#111827]">Selected Projects</h2>
              <p className="text-[#6B7280]">A curated showcase of design solutions.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[40px] aspect-[4/3] bg-gray-100 border border-gray-100 mb-6">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-2xl font-bold mb-1 group-hover:text-[#2563EB] transition-colors text-[#111827]">{project.title}</h4>
                    <p className="text-[#6B7280] text-sm">{project.category}</p>
                  </div>
                  <div className="w-12 h-12 soft-ui rounded-full flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-20">
          <div className="bg-[#2563EB] rounded-[48px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-200/50">
            <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-white">Ready to start a <span className="italic underline decoration-white/20">masterpiece?</span></h2>
            <p className="text-xl text-blue-100 mb-12 max-w-xl mx-auto">Contact me to discuss your next project.</p>
            <div className="flex flex-col items-center gap-6">
              <a href="mailto:hello@mrfazi.design" className="text-3xl md:text-4xl font-bold text-white hover:text-blue-100 transition-colors flex items-center gap-4 group">
                hello@mrfazi.design <Mail className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </a>
              <div className="flex gap-6 mt-8">
                {[Twitter, Linkedin, Github].map((Icon, idx) => (
                  <a key={idx} href="#" className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl hover:bg-white/20 transition-all text-white">
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[#6B7280] text-sm">
          <p>© 2025 Mr Fazi. Built with precision.</p>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
