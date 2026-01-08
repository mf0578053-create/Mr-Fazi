
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

    // IntersectionObserver set up to trigger when the expertise section is in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExpertiseActive(entry.isIntersecting);
      },
      { 
        threshold: 0.2, // Triggers earlier for a smoother transition
        rootMargin: "0px 0px -10% 0px" // Adjusted to trigger as it enters from bottom
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

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section - ALIGNED TO LEFT & MOVED HIGHER */}
        <section className="pt-12 pb-16 md:pt-20 md:pb-28 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 bg-[#2563EB] rounded-full animate-pulse"></span>
            Accepting Bespoke Commissions
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8 max-w-5xl leading-[1.05] text-[#111827]">
            Crafting <span className="italic gradient-text">Meaningful</span> Digital Experiences with <span className="underline decoration-[#2563EB]/20">Precision</span>.
          </h1>
          <p className="text-xl text-[#6B7280] max-w-2xl mb-10 leading-relaxed">
            I am <span className="font-bold text-[#111827]">Mr Fazi</span>, a seasoned Multi-Disciplinary Designer focusing on UI/UX excellence and sophisticated Graphic Narratives. I transform complex ideas into elegant, user-centric realities.
          </p>
          <div className="flex flex-wrap justify-start gap-4">
            <a href="#work" className="bg-[#2563EB] hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-blue-200">
              Explore Portfolio <ArrowUpRight className="w-5 h-5" />
            </a>
            <a href="#expertise" className="soft-ui hover:bg-gray-200 px-10 py-5 rounded-2xl font-bold transition-all text-[#111827] border border-gray-200">
              Capabilities
            </a>
          </div>
        </section>

        {/* Expertise Section - Color Changes to Royal Blue on Scroll */}
        <section id="expertise" ref={expertiseRef} className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[650px]">
            {/* Box 1: Design Ethos */}
            <div className={`md:col-span-2 md:row-span-2 p-10 rounded-[40px] flex flex-col justify-between group overflow-hidden relative shadow-2xl transition-all duration-700 ease-out transform ${
              isExpertiseActive 
                ? "bg-[#2563EB] shadow-blue-400/30 scale-[1.02]" 
                : "bg-white border border-gray-100 shadow-gray-200/40"
            }`}>
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                <Layers className={`w-56 h-56 -rotate-12 transition-colors duration-700 ${isExpertiseActive ? "text-white" : "text-gray-400"}`} />
              </div>
              <div className="relative z-10">
                <h3 className={`text-4xl font-bold mb-6 transition-colors duration-700 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`}>Design Ethos</h3>
                <p className={`text-lg max-w-md transition-colors duration-700 leading-relaxed ${isExpertiseActive ? "text-blue-100" : "text-[#6B7280]"}`}>My philosophy is rooted in clarity, accessibility, and high-fidelity aesthetics. I believe every design should empower the user while telling a brand's unique story.</p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-12 relative z-10">
                {SERVICES.slice(0, 4).map((s, i) => (
                  <div key={i} className="flex flex-col gap-3 group/item">
                    <div className={`transition-all duration-700 transform group-hover/item:scale-110 ${isExpertiseActive ? "text-white" : "text-[#2563EB]"}`}>{s.icon}</div>
                    <span className={`font-bold transition-colors duration-700 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`}>{s.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: Technical Skillset */}
            <div className={`md:col-span-2 p-10 rounded-[40px] flex flex-col justify-between shadow-2xl transition-all duration-700 ease-out delay-75 transform ${
              isExpertiseActive 
                ? "bg-[#1E40AF] shadow-blue-900/20 scale-[1.01]" 
                : "bg-white border border-gray-100 shadow-gray-200/40"
            }`}>
              <div className="relative z-10">
                <h3 className={`text-2xl font-bold mb-3 transition-colors duration-700 ${isExpertiseActive ? "text-white" : "text-[#111827]"}`}>Technical Skillset</h3>
                <p className={`text-sm transition-colors duration-700 ${isExpertiseActive ? "text-blue-200" : "text-[#6B7280]"}`}>Expert proficiency in industry-standard tools for creating flawless assets.</p>
              </div>
              <SkillChart onDark={isExpertiseActive} />
            </div>

            {/* Box 3: Metrics 1 */}
            <div className={`p-10 rounded-[40px] flex flex-col items-center justify-center text-center shadow-xl transition-all duration-700 ease-out delay-150 transform ${
              isExpertiseActive 
                ? "bg-[#2563EB] shadow-blue-500/30 scale-[1.05]" 
                : "bg-white border border-gray-100 shadow-gray-200/40"
            }`}>
              <span className={`text-6xl font-serif font-bold mb-3 transition-colors duration-700 ${isExpertiseActive ? "text-white" : "text-[#2563EB]"}`}>8+</span>
              <span className={`text-xs uppercase tracking-[0.2em] font-black transition-colors duration-700 ${isExpertiseActive ? "text-blue-100" : "text-[#6B7280]"}`}>Years of Mastery</span>
            </div>

            {/* Box 4: Metrics 2 */}
            <div className={`p-10 rounded-[40px] flex flex-col items-center justify-center text-center shadow-xl transition-all duration-700 ease-out delay-200 transform ${
              isExpertiseActive 
                ? "bg-[#0F172A] shadow-black/20 scale-[1.05]" 
                : "bg-white border border-gray-100 shadow-gray-200/40"
            }`}>
              <span className={`text-6xl font-serif font-bold mb-3 transition-colors duration-700 ${isExpertiseActive ? "text-white" : "text-indigo-600"}`}>120+</span>
              <span className={`text-xs uppercase tracking-[0.2em] font-black transition-colors duration-700 ${isExpertiseActive ? "text-gray-400" : "text-[#6B7280]"}`}>Global Successes</span>
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <section id="work" className="py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-5xl font-serif font-bold mb-4 text-[#111827]">Selected Works</h2>
              <p className="text-[#6B7280] text-lg">A portfolio of strategic design solutions for startups and global enterprises.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-[48px] aspect-[4/3] bg-gray-100 border border-gray-100 mb-8 shadow-sm">
                  <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="flex items-start justify-between px-2">
                  <div>
                    <h4 className="text-2xl font-bold mb-2 group-hover:text-[#2563EB] transition-colors text-[#111827]">{project.title}</h4>
                    <p className="text-[#6B7280] text-sm font-medium tracking-wide uppercase">{project.category}</p>
                  </div>
                  <div className="w-14 h-14 soft-ui rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-transparent transition-all shadow-sm">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-20">
          <div className="bg-[#2563EB] rounded-[64px] p-12 md:p-32 text-center relative overflow-hidden shadow-2xl shadow-blue-200/50">
            <h2 className="text-5xl md:text-8xl font-serif font-bold mb-8 text-white">Let’s define the <span className="italic underline decoration-white/20">Future.</span></h2>
            <p className="text-xl text-blue-100 mb-16 max-w-2xl mx-auto leading-relaxed">
              I am currently available for high-impact collaborations. If you are looking for design that moves the needle, reach out.
            </p>
            <div className="flex flex-col items-center gap-8">
              <a href="mailto:hello@mrfazi.design" className="text-3xl md:text-5xl font-bold text-white hover:text-blue-200 transition-colors flex items-center gap-6 group">
                hello@mrfazi.design <Mail className="w-10 h-10 group-hover:translate-x-3 transition-transform" />
              </a>
              <div className="flex gap-8 mt-12">
                {[Twitter, Linkedin, Github].map((Icon, idx) => (
                  <a key={idx} href="#" className="p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl hover:bg-white/20 transition-all text-white scale-110">
                    <Icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-[#6B7280] text-sm">
          <div className="flex items-center gap-4">
            <span className="font-serif font-bold text-xl text-[#111827]">F.</span>
            <p>© 2025 Mr Fazi. All rights reserved.</p>
          </div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-[#111827] transition-colors">Styleguide</a>
            <a href="#" className="hover:text-[#111827] transition-colors">Philosophy</a>
          </div>
        </div>
      </footer>

      <AIAssistant />
    </div>
  );
};

export default App;
