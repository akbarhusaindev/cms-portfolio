import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import BlogModal from './BlogModal';

export default function BlogSection({ blogs = [] }) {
  const [selectedBlog, setSelectedBlog] = useState(null);

  if (!blogs || blogs.length === 0) {
    return null; // Only render when blogs exist in CMS
  }

  return (
    <section id="blog" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <BookOpen size={13} />
            <span>ARTICLES & INSIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineering <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Blog & Notes</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Thoughts, tutorials, and architectural insights on modern software engineering.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog) => {
            const wordCount = blog.content ? blog.content.split(/\s+/).length : 120;
            const readTime = Math.ceil(wordCount / 200);

            return (
              <article
                key={blog.id}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                {/* Subtle top glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-colors"></div>

                <div>
                  {/* Meta Bar */}
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 mb-4">
                    {blog.publishedDate && (
                      <span className="flex items-center gap-1.5 text-amber-400">
                        <Calendar size={13} /> {blog.publishedDate}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} /> {readTime} min read
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-4 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-300/80 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.content}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400 group-hover:text-amber-300 transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="text-[11px] font-mono text-slate-400">Article #{blog.id}</span>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Interactive Blog Reader Modal */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </section>
  );
}
