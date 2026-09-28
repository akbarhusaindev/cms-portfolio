import React from 'react';
import { Quote, Star } from 'lucide-react';

export default function TestimonialsSection({ testimonials = [] }) {
  if (!testimonials || testimonials.length === 0) {
    return null; // Only render when testimonials exist in CMS
  }

  return (
    <section id="testimonials" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Quote size={13} />
            <span>CLIENT ENDORSEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            What Clients & <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Teams Say</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Feedback from engineering leaders and collaborators on completed projects.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group shadow-xl relative"
            >
              <div>
                {/* Stars and Quote Mark */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={28} className="text-amber-500/20 group-hover:text-amber-500/40 transition-colors" />
                </div>

                {/* Feedback Quote */}
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed italic mb-6">
                  "{t.feedback}"
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-5 border-t border-white/10 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-slate-950 font-bold text-sm shadow-md">
                  {t.clientName?.charAt(0) || 'C'}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base">{t.clientName}</h4>
                  {t.designation && (
                    <p className="text-xs font-mono text-amber-400/90">{t.designation}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
