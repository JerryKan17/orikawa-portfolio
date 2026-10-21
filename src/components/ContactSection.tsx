import React, { useState } from 'react';
import { Send, Mail, MapPin, CheckCircle, FileText, Globe } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ContactSectionProps {
  onOpenLegal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenLegal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'product-video',
    otherTopic: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer id="contact" className="w-full bg-[#131522] text-[#fff7dd] pt-16 md:pt-24 pb-12 relative overflow-hidden z-10 border-t-2 md:border-t-4 border-[#323A72]">

      {/* Background blueprint grid spanning full resolution */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#29E3BE 1px, transparent 1px), linear-gradient(90deg, #29E3BE 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* FULL WIDTH / FULL RESOLUTION CONTAINER */}
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 2xl:px-36 relative z-10">

        {/* TOP CONTACT HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 lg:gap-16 mb-14 md:mb-20">

          <ScrollReveal className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div>
              <span className="text-xs font-mono lowercase tracking-widest text-[#29E3BE] block mb-1 font-semibold">
                04 // contact
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight text-white lowercase">
                discuss a project.
              </h2>
            </div>

            <div className="font-handwriting text-2xl sm:text-3xl text-[#29E3BE]">
              * Bringing clarity and rhythm to your vision.
            </div>

            <p className="text-sm sm:text-base text-white/80 font-sans font-light leading-relaxed">
              Whether you are preparing an upcoming plugin launch, an interface walkthrough, or a brand film for your audio technology, feel free to reach out to start the conversation.
            </p>

            {/* Direct contact info */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-3 text-white/90">
                <Mail className="w-4 h-4 text-[#29E3BE]" />
                <a href="mailto:contact@laurentinriviere.com" className="hover:text-[#29E3BE] underline transition-colors lowercase">
                  contact@laurentinriviere.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <MapPin className="w-4 h-4 text-[#29E3BE]" />
                <span>France / Remote worldwide</span>
              </div>
            </div>

            {/* Warm Handwritten Sign-Off Card */}
            <div className="bg-white/5 border border-white/10 p-5 sm:p-6 rounded-xl backdrop-blur-xs relative mt-4 shadow-sm">
              <span className="font-handwriting text-lg sm:text-2xl text-[#fff7dd] block leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                "Thank you for taking the time to explore this notebook. Great work begins with a simple conversation."
              </span>
              <span className="font-serif italic text-base sm:text-lg text-[#29E3BE] block mt-2.5 lowercase">
                — orion laurentin
              </span>
            </div>
          </ScrollReveal>

          {/* Form spanning responsive column */}
          <ScrollReveal delay={150} className="lg:col-span-7">
            <div className="bg-white/5 p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl border border-white/10 backdrop-blur-xs relative shadow-2xl">

              {submitted ? (
                <div className="text-center py-12 sm:py-16 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#29E3BE]/20 text-[#29E3BE] flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white lowercase">
                    message received!
                  </h3>
                  <p className="text-sm sm:text-base text-white/80 max-w-md mx-auto font-sans leading-relaxed">
                    Thank you. orion laurentin will review your note and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-3 px-6 py-2.5 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors cursor-pointer lowercase"
                  >
                    send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono lowercase tracking-wider text-[#29E3BE] block font-semibold">
                        01_your name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Alex, Sarah..."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border-b border-white/20 focus:border-[#29E3BE] py-2 px-1 text-sm text-white outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono lowercase tracking-wider text-[#29E3BE] block font-semibold">
                        02_email address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border-b border-white/20 focus:border-[#29E3BE] py-2 px-1 text-sm text-white outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Studio / Brand */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono lowercase tracking-wider text-white/80 block">
                        03_company / studio name (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Spectral Audio, Independent..."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white/5 border-b border-white/20 focus:border-[#29E3BE] py-2 px-1 text-sm text-white outline-none transition-colors"
                      />
                    </div>

                    {/* Service Selection strictly motion design & filmmaking (no 3D) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono lowercase tracking-wider text-white/80 block">
                        04_project scope
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#131522] border-b border-white/20 focus:border-[#29E3BE] py-2 px-1 text-sm text-white outline-none transition-colors cursor-pointer"
                      >
                        <option value="product-video">Product Video & Motion Design</option>
                        <option value="walkthrough">Software Walkthrough & Tutorial</option>
                        <option value="filmmaking">Brand Film & Documentary</option>
                        <option value="other">Other (custom request)</option>
                      </select>
                    </div>
                  </div>

                  {/* If "other" is selected */}
                  {formData.service === 'other' && (
                    <div className="space-y-1.5 animate-fade-in">
                      <label className="text-xs font-mono lowercase tracking-wider text-[#29E3BE] block">
                        specify topic:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. visual identity, live visuals, consulting..."
                        value={formData.otherTopic}
                        onChange={(e) => setFormData({ ...formData, otherTopic: e.target.value })}
                        className="w-full bg-white/5 border-b border-[#29E3BE] py-2 px-1 text-sm text-white outline-none"
                      />
                    </div>
                  )}

                  {/* Project Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono lowercase tracking-wider text-[#E019D7] block font-semibold">
                      05_your message
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell me about your project, timeline, or any questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/5 border-b border-white/20 focus:border-[#E019D7] py-2 px-1 text-sm text-white outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 sm:pt-4 flex items-center justify-between">
                    <span className="font-handwriting text-base sm:text-lg text-white/60">
                      * reply within 24h
                    </span>

                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#29E3BE] text-[#131522] font-mono font-bold text-xs sm:text-sm lowercase tracking-wider px-7 sm:px-9 py-3 sm:py-3.5 rounded hover:bg-[#fff7dd] transition-colors cursor-pointer shadow-md"
                    >
                      <span>send message</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </ScrollReveal>

        </div>

        {/* BOTTOM SITEMAP, LEGAL & CREDITS */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/60">

          <div className="flex items-center gap-3">
            <span className="text-white font-serif font-bold text-base lowercase">orikawa laurentin</span>
            <span>© {new Date().getFullYear()} orion laurentin.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => setShowSitemap(!showSitemap)}
              className="hover:text-[#29E3BE] flex items-center gap-1 transition-colors cursor-pointer lowercase"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>sitemap</span>
            </button>

            {/* Triggers full legal page on dedicated view */}
            <button
              onClick={onOpenLegal}
              className="hover:text-[#29E3BE] flex items-center gap-1 transition-colors cursor-pointer lowercase"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>legal notice</span>
            </button>
          </div>

        </div>

        {/* SITEMAP MODAL */}
        {showSitemap && (
          <div className="mt-6 p-5 sm:p-6 bg-white/5 border border-white/10 rounded-xl text-xs font-mono">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-[#29E3BE] font-bold lowercase">
                [sitemap]
              </h4>
              <button
                onClick={() => setShowSitemap(false)}
                className="text-white/50 hover:text-white cursor-pointer lowercase"
              >
                [close ×]
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono lowercase">
              <a href="#" className="hover:text-[#29E3BE] p-2.5 bg-white/5 rounded">00. hero & showreel</a>
              <a href="#works" className="hover:text-[#29E3BE] p-2.5 bg-white/5 rounded">01. works</a>
              <a href="#process" className="hover:text-[#29E3BE] p-2.5 bg-white/5 rounded">02. process (t0v)</a>
              <a href="#about" className="hover:text-[#29E3BE] p-2.5 bg-white/5 rounded">03. about us</a>
            </div>
          </div>
        )}

      </div>

    </footer>
  );
};
