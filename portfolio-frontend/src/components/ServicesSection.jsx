import React from 'react';
import { Wrench, Sparkles } from 'lucide-react';

export default function ServicesSection({ services = [] }) {
  if (!services || services.length === 0) {
    return null; // Only render when services exist in CMS
  }

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Wrench size={13} />
            <span>SOLUTIONS & EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Services & <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Capabilities</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Tailored software engineering solutions built for speed, high scalability, and seamless user experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1.5 relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 group-hover:border-amber-500/30 flex items-center justify-center text-2xl mb-6 shadow-inner transition-colors">
                  {service.icon || '⚡'}
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-amber-400">
                  <Sparkles size={13} /> High Reliability
                </span>
                <span>Production Ready</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
