import React from 'react';
import { Briefcase, ExternalLink, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectsSection({ projects = [] }) {
  const sanitizeUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://localhost:8080http://') || url.startsWith('http://localhost:8080https://')) {
      return url.replace('http://localhost:8080', '');
    }
    return url;
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Briefcase size={13} />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Engineering Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            A selection of production-grade systems, APIs, and client applications built with modern stacks.
          </p>
        </div>

        {/* Projects Grid or Empty State */}
        {projects.length === 0 ? (
          <div className="text-center py-16 px-6 glass-panel rounded-3xl border border-white/10 max-w-lg mx-auto">
            <Briefcase className="mx-auto text-amber-400 mb-4 opacity-80" size={36} />
            <h3 className="text-lg font-bold text-white mb-1">No Projects Added Yet</h3>
            <p className="text-slate-400 text-sm">
              Add your projects, technologies, and demo links from the CMS Admin Panel to showcase them here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((proj) => {
              const techList = proj.technologies 
                ? proj.technologies.split(',').map(t => t.trim()).filter(Boolean)
                : [];
              const imageUrl = sanitizeUrl(proj.imageUrl);

              return (
                <div
                  key={proj.id}
                  className="glass-panel rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden group shadow-2xl shadow-black/40"
                >
                  {/* Project Visual Banner */}
                  <div className="relative aspect-video w-full bg-slate-950 overflow-hidden border-b border-white/10">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-[#0a0f1d] to-[#0d1629] relative">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                        
                        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <Code2 size={32} />
                        </div>
                        <span className="font-mono text-xs text-amber-300/80 bg-slate-900/90 px-3 py-1 rounded-full border border-amber-500/20">
                          Full-Stack Application
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      {/* Tech Badges */}
                      {techList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {techList.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                        {proj.title}
                      </h3>

                      <p className="text-slate-300/90 text-sm leading-relaxed mb-6">
                        {proj.description}
                      </p>
                    </div>

                    {/* Links and Actions */}
                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-white/10 hover:border-amber-500/40 transition"
                          >
                            <GithubIcon size={15} />
                            <span>Source Code</span>
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-semibold border border-amber-500/30 transition"
                          >
                            <ExternalLink size={15} />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>

                      <span className="text-xs font-mono text-slate-400">Project #{proj.id}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
