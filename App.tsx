
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
  const [isExpertiseActive, setIsExpertiseActive] = useState(false);
  const expertiseRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExpertiseActive(entry.isIntersecting);
      },
      { 
        threshold: 0.4,
        rootMargin: "-15% 0px -15% 0px"
      }
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

  const ROYAL_BLUE = "#4169E1";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative selection:bg-blue-500/10 transition-colors duration-700 content-reveal overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-50/40 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-50/40 blur-[100px] rounded-full"></div>
      </div>

      {/* Floating Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pointer-events-none transition-all duration-500 py-3 md:py-6">
        <nav 
          className={`pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isScrolled 
              ? "max-w-3xl md:max-w-5xl w-[90%] rounded-[2.5rem] md:rounded-[4rem] bg-white/75 backdrop-blur-3xl border border-white/40 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] py-2 px-5 md:px-8" 
              : "w-[95%] max-w-[1400px] rounded-[1.5rem] md:rounded-[2.5rem] bg-[#2563EB] py-3 md:py-4 px-6 md:px-10 shadow-lg"
          }`}
        >
          <div className="flex items-center justify-between h-10 md:h-12">
            <button 
              onClick={scrollToTop}
              className={`flex items-center gap-2 font-serif text-xl md:text-2xl font-bold tracking-tighter transition-colors duration-500 hover:opacity-80 ${isScrolled ? "text-[#111827]" : "text-white"}`}
            >
              <span className={`w-8 h-8 md:w-10 md:h-10 rounded-[0.75rem] md:rounded-[1rem] flex items-center justify-center transition-all duration-500 text-sm md:text-base ${isScrolled ? "bg-[#2563EB] text-white" : "bg-white text-[#2563EB] shadow-md"}`}>F</span>
              <span className="tracking-tight">Faizan Akram</span>
            </button>
            
            <div className={`hidden md:flex items-center gap-10 text-sm font-semibold transition-colors duration-500 ${isScrolled ? "text-[#4B5563]" : "text-white/90"}`}>
              <a href="#work" className="hover:text-blue-500 transition-colors">Work</a>
              <a href="#expertise" className="hover:text-blue-500 transition-colors">Expertise</a>
              <a href="#contact" className={`px-7 py-2.5 rounded-full transition-all duration-500 font-bold ${isScrolled ? "bg-[#2563EB] text-white hover:shadow-xl hover:shadow-blue-500/30" : "bg-white text-[#2563EB] hover:scale-105 active:scale-95"}`}>Let's Talk</a>
            </div>

            <a href="#contact" className={`md:hidden p-2 rounded-xl transition-all ${isScrolled ? "text-[#111827] bg-gray-100" : "text-white bg-white/10"}`}>
              <Mail size={20} />
            </a>
          </div>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="pt-8 pb-16 md:pt-16 md:pb-24 flex flex-col items-start text-left">
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
            <a href="#work" className="bg-[#2563EB] hover:bg-blue-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200 group">
              Explore Portfolio <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a href="#expertise" className="bg-white border border-gray-200 hover:bg-gray-50 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold transition-all text-[#111827] flex items-center justify-center shadow-sm hover:shadow-md">
              My Expertise
            </a>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" ref={expertiseRef} className="py-12 md:py-20 scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:min-h-[600px]">
            {/* Box 1: Design Ethos */}
            <div 
              style={{ backgroundColor: isExpertiseActive ? ROYAL_BLUE : 'white' }}
              className={`md:col-span-2 md:row-span-2 p-6 md:p-10 rounded-3xl md:rounded-[3rem] flex flex-col justify-between group overflow-hidden relative shadow-xl md:shadow-2xl transition-all duration-700 ease-in-out transform ${
              !isExpertiseActive ? "border border-gray-100" : "shadow-blue-400/40 -translate-y-1 scale-[1.01]"
            }`}>
              <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity hidden md:block">
                <Layers className={`w-56 h-56 -rotate-12 ${isExpertiseActive ? "text-white" : "text-gray-400"}`} />
              </div>
              <div className="relative z-10">
                <h3 className={`text-2xl md:text-4xl font-bold mb-4 md:mb-6 transition-colors duration-500 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`}>Design Ethos</h3>
                <p className={`text-sm md:text-lg max-w-md transition-colors duration-500 leading-relaxed ${isExpertiseActive ? "text-blue-50" : "text-[#6B7280]"}`}>Rooted in clarity and accessibility, I create high-fidelity aesthetics that empower users and tell impactful brand stories.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 md:mt-12 relative z-10">
                {SERVICES.slice(0, 4).map((s, i) => (
                  <div key={i} className="flex flex-col gap-2 md:gap-3">
                    <div className={`scale-90 md:scale-100 transition-all duration-500 ${isExpertiseActive ? "text-white" : "text-[#2563EB]"}`}>{s.icon}</div>
                    <span className={`text-xs md:text-base font-bold transition-colors duration-500 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`}>{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: Technical Skillset */}
            <div 
              style={{ backgroundColor: isExpertiseActive ? ROYAL_BLUE : 'white' }}
              className={`md:col-span-2 p-6 md:p-10 rounded-3xl md:rounded-[3rem] flex flex-col justify-between shadow-xl transition-all duration-700 ease-in-out transform ${
              !isExpertiseActive ? "border border-gray-100" : "shadow-blue-400/40 -translate-y-1"
            }`}>
              <div className="relative z-10 mb-4">
                <h3 className={`text-xl md:text-2xl font-bold mb-1 md:mb-2 transition-colors duration-500 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`}>Technical Skillset</h3>
                <p className={`text-[10px] md:text-sm transition-colors duration-500 ${isExpertiseActive ? "text-blue-100" : "text-[#6B7280]"}`}>Proficiency in industry-standard tools.</p>
              </div>
              <SkillChart onDark={isExpertiseActive} />
            </div>

            {/* Box 3: Metrics 1 */}
            <div 
              style={{ backgroundColor: isExpertiseActive ? ROYAL_BLUE : 'white' }}
              className={`p-6 md:p-10 rounded-3xl md:rounded-[3rem] flex flex-col items-center justify-center text-center shadow-lg transition-all duration-700 ease-in-out transform ${
              !isExpertiseActive ? "border border-gray-100" : "shadow-blue-400/40 -translate-y-1"
            }`}>
              <span className={`text-4xl md:text-6xl font-serif font-bold mb-1 md:mb-2 transition-colors duration-500 ${isExpertiseActive ? "text-white" : "text-[#2563EB]"}`}>2+</span>
              <span className={`text-[8px] md:text-xs uppercase tracking-[0.15em] font-black transition-colors duration-500 ${isExpertiseActive ? "text-blue-50" : "text-[#6B7280]"}`}>Years Mastery</span>
            </div>

            {/* Box 4: Metrics 2 */}
            <div 
              style={{ backgroundColor: isExpertiseActive ? ROYAL_BLUE : 'white' }}
              className={`p-6 md:p-10 rounded-3xl md:rounded-[3rem] flex flex-col items-center justify-center text-center shadow-lg transition-all duration-700 ease-in-out transform ${
              !isExpertiseActive ? "border border-gray-100" : "shadow-blue-400/40 -translate-y-1"
            }`}>
              <span className={`text-4xl md:text-6xl font-serif font-bold mb-1 md:mb-2 transition-colors duration-500 ${isExpertiseActive ? "text-white" : "text-[#2563EB]"}`}>100+</span>
              <span className={`text-[8px] md:text-xs uppercase tracking-[0.15em] font-black transition-colors duration-500 ${isExpertiseActive ? "text-blue-50" : "text-[#6B7280]"}`}>Global Success</span>
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <section id="work" className="py-12 md:py-20 scroll-mt-28">
          <div className="mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-3 md:mb-4 text-[#111827]">Selected Works</h2>
            <p className="text-[#6B7280] text-base md:text-lg">Strategic design solutions for global brands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {PROJECTS.map((project) => (
              <a href="#contact" key={project.id} className="group cursor-pointer block">
                <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] aspect-[4/3] bg-gray-50 border border-gray-100 mb-6 md:mb-8 shadow-sm">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[#2563EB]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[4px]">
                    <div className="bg-white px-8 py-4 rounded-2xl text-[#2563EB] font-bold shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                      Let's Discuss <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start justify-between px-2">
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 group-hover:text-[#2563EB] transition-colors text-[#111827]">{project.title}</h4>
                    <p className="text-[#6B7280] text-[10px] md:text-xs font-semibold tracking-widest uppercase">{project.category}</p>
                  </div>
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-transparent transition-all shadow-md">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-12 md:py-20 scroll-mt-28">
          <div className="bg-[#2563EB] rounded-[3rem] md:rounded-[5rem] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-blue-200/40">
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 md:mb-8 text-white leading-tight">Let’s define the <span className="italic underline decoration-white/20">Future.</span></h2>
            <p className="text-base md:text-xl text-blue-100 mb-10 md:mb-16 max-w-xl mx-auto leading-relaxed">
              Available for high-impact collaborations. Reach out for design that moves the needle.
            </p>
            <div className="flex flex-col items-center gap-6 md:gap-8">
              <a href="mailto:hello@faizanakram.design" className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white hover:text-blue-200 transition-colors flex items-center gap-4 md:gap-6 group break-all px-4">
                hello@faizanakram.design <Mail className="w-6 h-6 md:w-10 md:h-10 group-hover:translate-x-2 transition-transform hidden sm:block" />
              </a>
              <div className="flex gap-4 md:gap-8 mt-6">
                {[
                  { Icon: Twitter, url: "https://twitter.com" },
                  { Icon: Linkedin, url: "https://linkedin.com" },
                  { Icon: Github, url: "https://github.com" }
                ].map(({ Icon, url }, idx) => (
                  <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="p-4 md:p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-3xl hover:bg-white/20 transition-all text-white hover:scale-110 active:scale-95 shadow-lg">
                    <Icon size={24} />
                  </a>
                ))}
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
            <a href="#expertise" className="hover:text-[#2563EB] transition-colors">Philosophy</a>
            <a href="#work" className="hover:text-[#2563EB] transition-colors">Process</a>
            <a href="#contact" className="hover:text-[#2563EB] transition-colors">Inquire</a>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
