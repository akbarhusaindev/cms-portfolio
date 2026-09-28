import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Mail, Check, Sparkles, Terminal, Code, Layers, ShieldCheck, Zap } from 'lucide-react';
import { GithubIcon, LinkedInIcon } from './Icons';

export default function Hero({ about, onOpenTerminal }) {
  const [copied, setCopied] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    "Full-Stack Software Engineer",
    "Java & Spring Boot Architect",
    "Modern React 19 Specialist",
    "Distributed Systems Developer",
    "Custom CMS & API Creator"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    const emailToCopy = about?.email || 'akbarhusain@example.com';
    navigator.clipboard.writeText(emailToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Image source fallback & sanitization
  const rawImage = about?.profileImage;
  const cleanProfileImage = rawImage && (rawImage.startsWith('http://localhost:8080http://') || rawImage.startsWith('http://localhost:8080https://'))
    ? rawImage.replace('http://localhost:8080', '')
    : rawImage;
  const profileSrc = cleanProfileImage || '/profile.jpg';

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient Sunset Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sunset-glow-amber pointer-events-none blur-3xl opacity-60"></div>
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] sunset-glow-violet pointer-events-none blur-3xl opacity-50"></div>
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] sunset-glow-rose pointer-events-none blur-3xl opacity-40"></div>

      {/* Subtle Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-medium mb-6 backdrop-blur-md shadow-inner shadow-amber-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for Full-Time Roles & Consulting</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] mb-6">
              Engineering <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Resilient & Scalable</span> Digital Platforms
            </h1>

            {/* Dynamic Role Banner */}
            <div className="flex items-center gap-3 mb-6 h-8">
              <span className="text-sm sm:text-base font-mono text-slate-400">Specializing in:</span>
              <span className="text-sm sm:text-base font-mono font-semibold text-amber-300 bg-slate-900/80 px-3 py-1 rounded-md border border-amber-500/20 transition-all duration-300">
                {roles[roleIndex]}
              </span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed mb-8 max-w-2xl font-normal">
              {about?.bio || 
                "Passionate Full-Stack Developer bridging robust backend enterprise architectures in Java & Spring Boot with hyper-responsive, interactive user interfaces in React. Dedicated to clean code, microservices, and seamless user experiences."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </a>

              {about?.resumeUrl ? (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-semibold border border-white/15 hover:border-amber-500/40 transition-all duration-300 shadow-lg shadow-black/30"
                >
                  <Download size={16} />
                  <span>Resume / CV</span>
                </a>
              ) : (
                <a
                  href="#contact"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white text-sm font-semibold border border-white/15 hover:border-amber-500/40 transition-all duration-300 shadow-lg shadow-black/30"
                >
                  <Mail size={16} />
                  <span>Contact Me</span>
                </a>
              )}

              {/* Quick Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="relative inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-amber-300 text-xs font-mono border border-white/10 hover:border-amber-500/30 transition-all duration-200"
                title="Click to copy email address"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-300">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail size={14} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Tech Stack Pills Banner */}
            <div className="pt-6 border-t border-white/10 w-full">
              <span className="text-xs uppercase tracking-wider font-mono text-slate-400 block mb-3">
                Core Technologies & Tools
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {['Java 21', 'Spring Boot 4', 'React 19', 'PostgreSQL', 'Tailwind CSS', 'Docker', 'REST API', 'Vite'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/60 border border-white/10 hover:border-amber-500/40 hover:text-amber-300 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Profile Presentation (Using the Sunset Photo) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Outer Radiant Glow Rings */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-600 rounded-3xl blur-xl opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
              
              {/* Main Card Frame */}
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#090d16]/95 p-3 border border-amber-500/30 shadow-2xl backdrop-blur-2xl">
                
                {/* Image Container with Custom Masking & Sunset Tone */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-950">
                  <img
                    src={profileSrc}
                    alt="Akbar Husain - Full Stack Developer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay for seamless integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent opacity-80"></div>

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-semibold shadow-lg">
                    <Zap size={14} className="text-amber-400 fill-amber-400" />
                    <span>Spring Boot & React Pro</span>
                  </div>

                  {/* Bottom Information Bar */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/15 shadow-xl">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-white text-base">Akbar Husain</h3>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mb-3 line-clamp-1">
                      Full-Stack Engineer & System Architect
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-slate-400 font-mono">
                      <span>📍 Open to Relocation / Remote</span>
                      <span className="text-amber-400">100% Production Ready</span>
                    </div>
                  </div>
                </div>

                {/* Floating Micro Badge - Left */}
                <div className="absolute -left-6 top-1/3 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 text-white text-xs font-semibold shadow-2xl shadow-black/50 animate-float">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <Code size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Backend Engine</p>
                    <p className="text-xs font-bold text-amber-300">Java + Spring REST</p>
                  </div>
                </div>

                {/* Floating Micro Badge - Right */}
                <div className="absolute -right-6 bottom-1/4 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-indigo-500/30 text-white text-xs font-semibold shadow-2xl shadow-black/50" style={{ animation: 'float 6s ease-in-out infinite 1s' }}>
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <ShieldCheck size={15} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Architecture</p>
                    <p className="text-xs font-bold text-indigo-300">JWT & PostgreSQL</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
