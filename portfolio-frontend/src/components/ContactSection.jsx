import React, { useState } from 'react';
import { Mail, Phone, Send, Check, AlertCircle, MapPin, Sparkles, MessageSquare, Clock } from 'lucide-react';
import API from '../utils/api';
import { GithubIcon, LinkedInIcon } from './Icons';

export default function ContactSection({ about }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const email = about?.email || 'akbarhusain@example.com';
  const phone = about?.phone || '+91 9876543210';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    try {
      await API.post('/contact', formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus({
        loading: false,
        success: false,
        error: 'Failed to send message. Please try again or reach out directly via email.'
      });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] sunset-glow-amber blur-3xl opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono mb-3">
            <Mail size={13} />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">Extraordinary</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Have a project in mind, seeking a senior full-stack engineer, or want to discuss system architecture? Send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Hub */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Direct Contact Details</h3>
                <p className="text-slate-400 text-sm">
                  I typically respond within a few hours. Feel free to connect across any channel.
                </p>
              </div>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3.5 truncate">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="truncate">
                      <p className="text-[11px] text-slate-400 font-mono uppercase">Email Address</p>
                      <p className="text-xs sm:text-sm font-semibold text-white truncate">{email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 transition shrink-0 ml-2"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={16} className="text-emerald-400" /> : <Mail size={16} />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono uppercase">Phone / WhatsApp</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">{phone}</p>
                  </div>
                </div>

                {/* Location Item */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-mono uppercase">Location</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">Global Remote / Hybrid</p>
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-300">
                  Actively Interviewing for Engineering Positions
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 relative shadow-2xl">
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Send a Direct Message</h3>
                  <p className="text-xs text-slate-400 font-mono">Delivered directly to the custom CMS inbox</p>
                </div>
              </div>

              {/* Form Feedback Alerts */}
              {status.success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                  <Check size={18} className="shrink-0" />
                  <span>Your message has been sent successfully! I will get back to you shortly.</span>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{status.error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                      Your Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-900/90 border border-white/15 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                      Email Address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="w-full bg-slate-900/90 border border-white/15 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                    Message Details <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, position details, or questions..."
                    className="w-full bg-slate-900/90 border border-white/15 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 text-sm outline-none transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.loading ? (
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send size={16} className="stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
