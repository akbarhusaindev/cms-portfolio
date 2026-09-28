import React from 'react';
import { Calendar, Building2, CheckCircle2 } from 'lucide-react';

export default function ExperienceSection({ experiences = [] }) {
  if (!experiences || experiences.length === 0) {
    return null; // Only render when experiences exist in CMS
  }

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Calendar size={13} />
            <span>CAREER MILESTONES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Work Experience & <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            A track record of engineering scalable digital products and collaborating with distributed teams.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-amber-500/20 space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id || index} className="relative group">
              
              {/* Timeline Radiant Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#090d16] border-2 border-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-125 transition-transform duration-300">
                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
              </div>

              {/* Experience Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 transform group-hover:-translate-y-1 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mt-0.5">
                      <Building2 size={15} />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {exp.duration && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-white/10 text-xs font-mono w-fit">
                      <Calendar size={12} className="text-amber-400" />
                      {exp.duration}
                    </span>
                  )}
                </div>

                <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed mt-4">
                  {exp.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>Verified CMS Record</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
