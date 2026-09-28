import React, { useEffect } from 'react';
import { X, Calendar, Clock, BookOpen, Share2, Sparkles } from 'lucide-react';

export default function BlogModal({ blog, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!blog) return null;

  // Calculate approximate reading time
  const wordCount = blog.content ? blog.content.split(/\s+/).length : 100;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#090d16] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow & Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 bg-slate-900/60 relative">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                <Calendar size={12} /> {blog.publishedDate || 'Published Article'}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock size={12} /> {readTime} min read
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            {blog.title}
          </h2>
        </div>

        {/* Scrollable Article Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-300 text-base leading-relaxed scrollbar-thin">
          <div className="prose prose-invert max-w-none">
            {blog.content ? (
              blog.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-slate-300/90 leading-relaxed">
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-slate-400 italic">No content provided for this article.</p>
            )}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-slate-900/40 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Author: Akbar Husain • Software Engineer
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-md"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
}
