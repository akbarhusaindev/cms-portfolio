import React, { useState } from 'react';
import { Code, Server, Database, Cloud, Layout, CheckCircle2, Sparkles } from 'lucide-react';

export default function SkillsSection({ skills = [] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories directly from CMS skills, normalized case-insensitively
  const categoryMap = new Map();
  skills.forEach(s => {
    if (s.category && s.category.trim()) {
      const trimmed = s.category.trim();
      const lower = trimmed.toLowerCase();
      if (!categoryMap.has(lower)) {
        categoryMap.set(lower, trimmed);
      }
    }
  });

  const categories = ['All', ...Array.from(categoryMap.values())];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category && s.category.trim().toLowerCase() === activeCategory.trim().toLowerCase());

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'backend':
      case 'sde':
        return <Server size={18} className="text-amber-400" />;
      case 'frontend':
      case 'ui':
        return <Layout size={18} className="text-indigo-400" />;
      case 'database':
      case 'db':
        return <Database size={18} className="text-emerald-400" />;
      case 'devops & tools':
      case 'devops':
      case 'tools':
        return <Cloud size={18} className="text-rose-400" />;
      default:
        return <Code size={18} className="text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Code size={13} />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Core Skills & <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Verified skills and technologies managed dynamically via the CMS.
          </p>
        </div>

        {/* Category Filters (only shown if categories exist) */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-white/10 hover:border-amber-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Skills Grid or Empty State */}
        {skills.length === 0 ? (
          <div className="text-center py-16 px-6 glass-panel rounded-3xl border border-white/10 max-w-lg mx-auto">
            <Code className="mx-auto text-amber-400 mb-4 opacity-80" size={36} />
            <h3 className="text-lg font-bold text-white mb-1">No Skills Added Yet</h3>
            <p className="text-slate-400 text-sm">
              Add your technical skills and proficiency levels from the CMS Admin Panel to display them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill.id || skill.name}
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden"
              >
                {/* Top ambient glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl group-hover:bg-amber-500/15 transition-all duration-300"></div>

                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-white/10 group-hover:border-amber-500/30 transition-colors">
                    {getCategoryIcon(skill.category)}
                  </div>
                  {skill.proficiency && (
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300/90 border border-amber-500/20">
                      {skill.proficiency}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
                  {skill.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  {skill.category || 'Engineering'}
                </p>

                {/* Verified Indicator */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>Production Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
