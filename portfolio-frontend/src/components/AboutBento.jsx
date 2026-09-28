import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Globe, Check, Copy, Shield, Cpu, Code, Sparkles, Download, Layers } from 'lucide-react';
import { GithubIcon, LinkedInIcon } from './Icons';

export default function AboutBento({ about }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = about?.email || 'akbarhusain@example.com';
  const phone = about?.phone || '+91 9876543210';

  const copyText = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <User size={13} />
            <span>BACKGROUND & IDENTITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            About <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Akbar Husain</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Passionate software engineer driven by solving complex engineering challenges and creating seamless digital solutions.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Item 1: The Core Bio (7 cols) */}
          <div className="md:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 sunset-glow-amber opacity-40 pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Full-Stack Craftsmanship</h3>
                  <p className="text-xs text-slate-400 font-mono">End-to-End Enterprise Development</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  {about?.bio ||
                    "I am a passionate Full-Stack Software Engineer with expertise in building scalable, production-grade web systems. My core strength lies in designing robust Java Spring Boot backend microservices, high-throughput REST APIs, and combining them with fluid, accessible frontend interfaces in React."}
                </p>
                <p className="text-slate-400 text-sm">
                  Whether architecting a custom headless CMS from the ground up, implementing secure token-based JWT authentication, or optimizing PostgreSQL queries, I focus on performance, maintainability, and clean code principles.
                </p>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10 text-center">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-xl sm:text-2xl font-black text-amber-400">100%</span>
                <p className="text-[11px] text-slate-400 uppercase font-mono mt-0.5">Code Quality</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-xl sm:text-2xl font-black text-orange-400">&lt;10ms</span>
                <p className="text-[11px] text-slate-400 uppercase font-mono mt-0.5">API Latency</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                <span className="text-xl sm:text-2xl font-black text-indigo-400">Custom</span>
                <p className="text-[11px] text-slate-400 uppercase font-mono mt-0.5">CMS Engine</p>
              </div>
            </div>
          </div>

          {/* Bento Item 2: Quick Connect & Location (5 cols) */}
          <div className="md:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl relative flex flex-col justify-between border border-white/10 hover:border-amber-500/30 transition-all duration-300">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Direct Connect</h3>
                  <p className="text-xs text-slate-400 font-mono">Let's discuss opportunities</p>
                </div>
              </div>

              {/* Copyable Contact Items */}
              <div className="space-y-3">
                {/* Email Item */}
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 flex items-center justify-between group">
                  <div className="flex items-center gap-3 truncate">
                    <Mail size={16} className="text-amber-400 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-200 truncate font-mono">{email}</span>
                  </div>
                  <button
                    onClick={() => copyText(email, 'email')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 transition shrink-0 ml-2"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 flex items-center justify-between group">
                  <div className="flex items-center gap-3 truncate">
                    <Phone size={16} className="text-orange-400 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-200 truncate font-mono">{phone}</span>
                  </div>
                  <button
                    onClick={() => copyText(phone, 'phone')}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-orange-500/20 text-slate-400 hover:text-orange-300 transition shrink-0 ml-2"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                {/* Location Item */}
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 flex items-center gap-3">
                  <MapPin size={16} className="text-rose-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-200 font-mono">Worldwide Remote / Hybrid</span>
                </div>
              </div>
            </div>

            {/* Social & Resume Buttons */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
              {about?.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 transition"
                >
                  <Download size={14} />
                  <span>Resume</span>
                </a>
              )}
              <a
                href="#contact"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition"
              >
                <span>Send Message</span>
              </a>
            </div>
          </div>

          {/* Bento Item 3: Core Architecture Principles (6 cols) */}
          <div className="md:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">System Architecture Principles</h3>
                <p className="text-xs text-slate-400 font-mono">Engineered for resilience</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <h4 className="font-semibold text-xs sm:text-sm text-amber-300 mb-1">Clean Spring Boot APIs</h4>
                <p className="text-xs text-slate-400">RESTful standards, DTO patterns, global exception handlers, and JPA repositories.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <h4 className="font-semibold text-xs sm:text-sm text-indigo-300 mb-1">State & UI Reactivity</h4>
                <p className="text-xs text-slate-400">Optimistic UI updates, seamless async state, and mobile-first responsive design.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <h4 className="font-semibold text-xs sm:text-sm text-emerald-300 mb-1">Secure Auth & JWT</h4>
                <p className="text-xs text-slate-400">Role-based access control, cryptographic tokens, and encrypted sessions.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <h4 className="font-semibold text-xs sm:text-sm text-rose-300 mb-1">PostgreSQL Database</h4>
                <p className="text-xs text-slate-400">Normalized relational schemas, indexed queries, and automated migration scripts.</p>
              </div>
            </div>
          </div>

          {/* Bento Item 4: Full Stack Technology Stack (6 cols) */}
          <div className="md:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Modern Tech Ecosystem</h3>
                  <p className="text-xs text-slate-400 font-mono">Tools powering this portfolio</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-amber-400 font-bold block mb-1">BACKEND</span>
                  <p className="text-slate-300">Java 21 • Spring Boot 4</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Spring Security, JWT, JPA</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-indigo-400 font-bold block mb-1">FRONTEND</span>
                  <p className="text-slate-300">React 19 • Vite 8</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Tailwind CSS v4, Lucide</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-emerald-400 font-bold block mb-1">DATABASE</span>
                  <p className="text-slate-300">PostgreSQL 16</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Relational ORM & Pool</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10">
                  <span className="text-rose-400 font-bold block mb-1">CMS ADMIN</span>
                  <p className="text-slate-300">Custom Built Panel</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Full CRUD & File Uploads</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Status: Synchronized with Spring Backend</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
