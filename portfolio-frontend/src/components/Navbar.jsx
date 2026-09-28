import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Terminal } from 'lucide-react';

export default function Navbar({ about }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Terminal', href: '#terminal' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-[#070b14]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 p-[2px] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-lg bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                  AH
                </span>
              </div>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#070b14] rounded-full">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-white group-hover:text-amber-300 transition-colors">
              Akbar Husain
            </span>
            <span className="text-[11px] font-mono text-amber-400/80 tracking-wider flex items-center gap-1">
              <Sparkles size={10} /> Full-Stack Engineer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-pill px-4 py-1.5 rounded-full border border-white/10 bg-slate-900/40 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-slate-300 hover:text-amber-300 rounded-full hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} className="stroke-[2.5]" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-xl bg-slate-800/80 text-slate-200 hover:text-white border border-white/10 hover:border-amber-500/40 transition"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#090d16]/95 backdrop-blur-2xl border-b border-white/10 mt-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-200 hover:text-amber-300 hover:bg-amber-500/10 transition"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
