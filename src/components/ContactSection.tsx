import React, { useState } from 'react';
import { Send, Mail, MapPin, CheckCircle, Sparkles, FileText, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEngine';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'dsp-launch',
    budget: '$5k-$10k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playMusicalStinger(4);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#29E3BE', '#FFF951', '#E019D7', '#fff7dd'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <footer id="contact" className="bg-[#131522] text-[#fff7dd] pt-24 pb-12 relative overflow-hidden z-10 border-t-4 border-[#323A72]">
      
      {/* Blueprint grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#29E3BE 1px, transparent 1px), linear-gradient(90deg, #29E3BE 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* TOP CONTACT HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#29E3BE]">
              <Sparkles className="w-3.5 h-3.5 text-[#29E3BE]" />
              <span>[05] // TRANSMISSION & INQUIRY</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight leading-none text-white">
              Initialize a Project.
            </h2>

            <div className="font-handwriting text-3xl text-[#29E3BE]">
              * Let's build your next release ecosystem.
            </div>

            <p className="text-sm sm:text-base text-white/75 font-sans font-light leading-relaxed">
              Whether you are preparing the launch of a flagship audio plugin, looking for high-end 3D UI modeling, or requiring custom sonic branding, we are ready to bring clarity to your vision.
            </p>

            {/* Direct contact badges */}
            <div className="space-y-3 pt-2 text-xs font-mono">
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-4 h-4 text-[#29E3BE]" />
                <a href="mailto:contact@orikawa.studio" className="hover:text-[#29E3BE] underline transition-colors">
                  contact@orikawa.studio
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-4 h-4 text-[#FFF951]" />
                <span>Paris / Remote Worldwide • UTC+1 / CET</span>
              </div>
            </div>

            {/* Warm Handwritten Sign-Off Card */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-lg backdrop-blur-sm relative mt-6">
              <span className="font-handwriting text-xl text-[#fff7dd] block leading-snug">
                "Thank you for spending time inside this notebook. Every sound wave starts with a single vibration; let's create something resonant together."
              </span>
              <span className="font-serif italic text-base text-[#29E3BE] block mt-3">
                — Orion Laurentin
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/5 p-8 md:p-10 rounded-2xl border border-white/10 backdrop-blur-md relative shadow-2xl">
              
              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#29E3BE]/20 text-[#29E3BE] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white">
                    Transmission Received.
                  </h3>
                  <p className="text-sm text-white/80 max-w-md mx-auto font-sans">
                    Thank you! Orion will personally review your project scope and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-widest text-[#29E3BE] block">
                        01_Your Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Orion or Studio Lead"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border-b border-white/20 focus:border-[#29E3BE] py-2 px-1 text-sm text-white outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-widest text-[#29E3BE] block">
                        02_Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="audio@studio.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border-b border-white/20 focus:border-[#29E3BE] py-2 px-1 text-sm text-white outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* DSP / Company Name */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-widest text-[#FFF951] block">
                        03_DSP Studio or Audio Brand
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Spectral Audio / Independent"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white/5 border-b border-white/20 focus:border-[#FFF951] py-2 px-1 text-sm text-white outline-none transition-colors"
                      />
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase tracking-widest text-[#FFF951] block">
                        04_Service Focus
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#131522] border-b border-white/20 focus:border-[#FFF951] py-2 px-1 text-xs text-white outline-none transition-colors"
                      >
                        <option value="dsp-launch">DSP Plugin 3D Teaser & Launch Kit</option>
                        <option value="walkthrough">Cinematic DAW Walkthrough</option>
                        <option value="sound-design">Bespoke Sound Design & Musical Stinger</option>
                        <option value="web-interactive">Interactive Web Assets & 3D WebGL</option>
                        <option value="other">Filmmaking & Special Projects</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Scope */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase tracking-widest text-[#E019D7] block">
                      05_Project Scope & Vision
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about the algorithm, release goals, target timeline, or what you'd like to achieve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border-b border-white/20 focus:border-[#E019D7] py-2 px-1 text-sm text-white outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-handwriting text-base text-white/50">
                      * 0-spam guarantee
                    </span>

                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#29E3BE] text-[#131522] font-mono font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded hover:bg-[#FFF951] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <span>Send Transmission</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* BOTTOM SITEMAP, LEGAL & CREDITS */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-white/60">
          
          <div className="flex items-center gap-4">
            <span className="text-white font-serif font-bold text-lg">orikawa</span>
            <span>© {new Date().getFullYear()} Orion Laurentin. All rights reserved.</span>
          </div>

          {/* Legal Mentions & Sitemap interactive triggers */}
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => {
                setShowSitemap(!showSitemap);
                setShowLegal(false);
                soundEngine.playTapeClick(750, 0.02);
              }}
              className="hover:text-[#29E3BE] flex items-center gap-1 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website Plan / Sitemap</span>
            </button>

            <button
              onClick={() => {
                setShowLegal(!showLegal);
                setShowSitemap(false);
                soundEngine.playTapeClick(750, 0.02);
              }}
              className="hover:text-[#29E3BE] flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Legal Mentions</span>
            </button>
          </div>

        </div>

        {/* SITEMAP MODAL DRAWER */}
        {showSitemap && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#29E3BE] font-bold">
                [SITEMAP & WEBSITE PLAN]
              </h4>
              <button
                onClick={() => setShowSitemap(false)}
                className="text-xs font-mono text-white/50 hover:text-white"
              >
                [CLOSE ×]
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-xs font-mono">
              <a href="#" className="hover:text-[#29E3BE] p-2 bg-white/5 rounded">01. Hero & VU Meter</a>
              <a href="#works" className="hover:text-[#29E3BE] p-2 bg-white/5 rounded">02. Selected Works (Dossier)</a>
              <a href="#services" className="hover:text-[#29E3BE] p-2 bg-white/5 rounded">03. T0V Formula & Process</a>
              <a href="#sound-lab" className="hover:text-[#29E3BE] p-2 bg-white/5 rounded">04. Sound Lab & Synthesizer</a>
              <a href="#about" className="hover:text-[#29E3BE] p-2 bg-white/5 rounded">05. About Orion Laurentin</a>
            </div>
          </div>
        )}

        {/* LEGAL MENTIONS MODAL DRAWER */}
        {showLegal && (
          <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl animate-fade-in space-y-3 text-xs font-mono text-white/80">
            <div className="flex justify-between items-center">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#FFF951] font-bold">
                [LEGAL MENTIONS // MENTIONS LÉGALES]
              </h4>
              <button
                onClick={() => setShowLegal(false)}
                className="text-xs font-mono text-white/50 hover:text-white"
              >
                [CLOSE ×]
              </button>
            </div>
            <p>
              <strong>Owner & Publisher:</strong> Studio Orikawa — Laurentin Orion. Independent Audiovisual & Sound Design Studio.
            </p>
            <p>
              <strong>Intellectual Property:</strong> All trademarks, DSP concept visualizations, 3D assets, sounds, and motion reels displayed on this site are protected by copyright laws.
            </p>
            <p>
              <strong>Hosting:</strong> Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723.
            </p>
          </div>
        )}

      </div>

    </footer>
  );
};
