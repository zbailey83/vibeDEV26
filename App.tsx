
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { 
  Terminal, 
  ChevronDown, 
  Github, 
  Twitter, 
  Linkedin,
  Activity,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { Roadmap } from './components/Roadmap';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const App: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(".hero-tag", { opacity: 0, y: 20, duration: 1 })
        .from(".hero-title", { 
          opacity: 0, 
          scale: 0.9, 
          duration: 1.2, 
          ease: "expo.out" 
        }, "-=0.5")
        .from(".hero-subtitle", { 
          opacity: 0, 
          x: -30, 
          duration: 1, 
          ease: "power2.out" 
        }, "-=0.8");

      // Floating Grid Animation
      gsap.to(".grid-bg", {
        backgroundPosition: "0 100px",
        duration: 20,
        repeat: -1,
        ease: "none"
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-cyan-400 selection:text-black">
      {/* Background FX */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none"></div>
      
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Terminal className="text-white w-6 h-6" />
          </div>
          <span className="font-heading font-black text-2xl tracking-tighter">VIBE<span className="text-pink-500">DEV</span></span>
        </div>
        
        <div className="hidden lg:flex items-center gap-10 font-mono text-[11px] tracking-widest uppercase text-gray-500">
          <a href="#roadmap" className="hover:text-cyan-400 transition-colors">// Roadmap</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">// Manifest</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">// Modules</a>
          <button className="px-6 py-2 bg-white text-black font-bold rounded-sm hover:bg-pink-500 hover:text-white transition-all transform hover:-translate-y-0.5">
            INITIATE
          </button>
        </div>
      </nav>

      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 text-center">
          <div className="hero-tag inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/5 rounded-full mb-8">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-gray-400">System Online: v2.0.16</span>
          </div>

          <h1 className="hero-title font-heading text-7xl md:text-9xl font-black mb-8 tracking-tighter leading-none italic">
            UPGRADE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 neon-glow-cyan">YOUR REALITY.</span>
          </h1>

          <p className="hero-subtitle max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12">
            The definitive course for developers who refuse to settle for the default. 
            Master the stack, control the vibe, build the future.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-pink-500 transition-colors">
                 <Layers className="w-6 h-6 text-gray-500 group-hover:text-pink-500" />
               </div>
               <span className="text-[9px] font-mono text-gray-600 group-hover:text-gray-300">MODULAR</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                 <ShieldCheck className="w-6 h-6 text-gray-500 group-hover:text-cyan-400" />
               </div>
               <span className="text-[9px] font-mono text-gray-600 group-hover:text-gray-300">SECURE</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-cyan-400"></div>
          <ChevronDown className="w-5 h-5 text-cyan-400" />
        </div>
      </section>

      <section id="roadmap" className="relative pb-40">
        <div className="container mx-auto px-6 pt-40 mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
             <div>
               <span className="text-pink-500 font-mono text-xs tracking-widest uppercase mb-4 block">// Curriculum Path</span>
               <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tighter">THE MISSION<br/>PARAMETERS.</h2>
             </div>
             <p className="max-w-md text-gray-500 text-sm leading-relaxed mb-2 italic border-l-2 border-cyan-400/30 pl-6">
               Four critical stages of development. No fluff, no filler. Only the tools required to dominate the modern web landscape.
             </p>
          </div>
        </div>
        
        <Roadmap />
      </section>

      <footer className="py-24 border-t border-white/5 bg-black">
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="text-pink-500 w-8 h-8" />
              <span className="font-heading font-black text-3xl tracking-tighter">VIBE<span className="text-pink-500">DEV</span></span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm mb-8 leading-relaxed font-light">
              We don't just teach code. We teach the philosophy of digital architecture. Join the 2016 collective and redefine your potential.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center hover:bg-white hover:text-black transition-all"><Github size={18}/></a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center hover:bg-white hover:text-black transition-all"><Twitter size={18}/></a>
              <a href="#" className="w-10 h-10 border border-white/10 rounded flex items-center justify-center hover:bg-white hover:text-black transition-all"><Linkedin size={18}/></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest text-white mb-6 uppercase">Navigation</h4>
            <ul className="space-y-4 text-xs font-mono text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">// HOME</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">// ROADMAP</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">// ARCHIVE</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">// LOGIN</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest text-white mb-6 uppercase">Contact</h4>
            <ul className="space-y-4 text-xs font-mono text-gray-500">
              <li><a href="mailto:hq@vibedev.io" className="hover:text-pink-500 transition-colors">// HQ@VIBEDEV.IO</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">// DISCORD_CHANNEL</a></li>
              <li><a href="#" className="hover:text-pink-500 transition-colors">// TEL_ENCRYPTED</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-white/5 text-center">
          <span className="text-[10px] font-mono text-gray-700 tracking-[0.5em] uppercase">VIBE DEV 2016 © DISTRIBUTED UNDER NEON-LICENSE-01</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
