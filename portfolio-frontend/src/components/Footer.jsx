import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { GithubIcon, LinkedInIcon } from './Icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#060911] text-slate-400 text-xs font-mono py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-black text-sm">
              AH
            </div>
            <div>
              <p className="font-bold text-white text-sm">Akbar Husain</p>
              <p className="text-[11px] text-slate-400">Full-Stack Software Engineer</p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs">
            <a href="#about" className="hover:text-amber-300 transition">About</a>
            <a href="#terminal" className="hover:text-amber-300 transition">Terminal</a>
            <a href="#skills" className="hover:text-amber-300 transition">Skills</a>
            <a href="#projects" className="hover:text-amber-300 transition">Projects</a>
            <a href="#experience" className="hover:text-amber-300 transition">Experience</a>
            <a href="#blog" className="hover:text-amber-300 transition">Blog</a>
            <a href="#contact" className="hover:text-amber-300 transition">Contact</a>
          </div>

          {/* Scroll To Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-white/10 hover:border-amber-500/30 transition shadow-lg flex items-center gap-2"
            aria-label="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} Akbar Husain. Built with Java Spring Boot 4, React 19 & Tailwind CSS.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CMS Engine Connected</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
