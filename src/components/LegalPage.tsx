import React from 'react';
import { ArrowLeft, ShieldCheck, FileText, Globe } from 'lucide-react';

interface LegalPageProps {
  onBack: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#fff7dd] text-[#131522] py-16 px-4 sm:px-6 md:px-12 bg-notebook-grid">
      <div className="max-w-4xl mx-auto bg-[#fffdf7] border border-[#323A72]/20 rounded-2xl p-6 sm:p-10 md:p-14 shadow-xl relative">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono lowercase bg-[#323A72] text-[#fff7dd] px-4 py-2 rounded hover:bg-[#131522] transition-colors cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4 text-[#29E3BE]" />
          <span>← back to website</span>
        </button>

        <div className="border-b border-[#323A72]/20 pb-6 mb-8">
          <h1 className="font-serif text-3xl sm:text-5xl font-bold lowercase tracking-tight text-[#131522]">
            legal mentions
          </h1>
          <p className="font-handwriting text-xl sm:text-2xl text-[#323A72] mt-1">
            * orikawa laurentin — legal notice & terms
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#131522]/85 font-sans leading-relaxed">
          
          {/* 1. Website Publisher */}
          <section className="space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#131522] lowercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#29E3BE]" />
              <span>1. Website Publisher & Direction</span>
            </h2>
            <p>
              This website is published and managed by <strong>orion laurentin</strong>, operating under the studio name <strong>orikawa laurentin</strong>.
            </p>
            <ul className="list-disc list-inside space-y-1 font-mono text-xs text-[#323A72]">
              <li>Activity: Independent audiovisual production, motion design & sound design</li>
              <li>Location: Paris, France / Working remotely worldwide</li>
              <li>Contact: <a href="mailto:contact@laurentinriviere.com" className="underline hover:text-[#29E3BE]">contact@laurentinriviere.com</a></li>
              <li>Director of Publication: orion laurentin</li>
            </ul>
          </section>

          {/* 2. Hosting */}
          <section className="space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#131522] lowercase flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#FFF951]" />
              <span>2. Hosting Provider</span>
            </h2>
            <p>
              The website is hosted by <strong>Vercel Inc.</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 font-mono text-xs text-[#323A72]">
              <li>Company: Vercel Inc.</li>
              <li>Address: 440 N Barranca Ave #4133, Covina, CA 91723, United States</li>
              <li>Website: <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#29E3BE]">https://vercel.com</a></li>
            </ul>
          </section>

          {/* 3. Intellectual Property */}
          <section className="space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#131522] lowercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E019D7]" />
              <span>3. Intellectual Property Rights</span>
            </h2>
            <p>
              All original visual assets, 3D renderings, animations, sound design compositions, musical stingers, trademarks, brand motifs (including the 3-layer triangular chevron wave), code snippets, and written text presented on this website are the intellectual property of <strong>orion laurentin / orikawa laurentin</strong>, unless specified otherwise (such as third-party client logos displayed for demonstration purposes).
            </p>
            <p>
              Any total or partial reproduction, representation, modification, publication, or transmission of these elements without prior written authorization is strictly prohibited.
            </p>
          </section>

          {/* 4. Personal Data & Privacy */}
          <section className="space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#131522] lowercase">
              4. Privacy & Data Protection
            </h2>
            <p>
              Any information sent through the contact form (name, email, studio name, message) is collected solely for the purpose of communicating regarding potential projects.
            </p>
            <p>
              Your data is never sold, shared, or transferred to third parties. In accordance with the General Data Protection Regulation (GDPR), you hold the right to access, rectify, or request the deletion of your personal data at any time by sending an email to <a href="mailto:contact@laurentinriviere.com" className="underline hover:text-[#29E3BE]">contact@laurentinriviere.com</a>.
            </p>
          </section>

          {/* 5. Cookies & Tracking */}
          <section className="space-y-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#131522] lowercase">
              5. Cookies & Local Storage
            </h2>
            <p>
              This website does not use invasive advertising trackers or third-party marketing cookies.
            </p>
          </section>

        </div>

        {/* Bottom Back Button */}
        <div className="mt-12 pt-6 border-t border-[#323A72]/20 flex justify-between items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono lowercase bg-[#323A72] text-[#fff7dd] px-5 py-2.5 rounded hover:bg-[#131522] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#29E3BE]" />
            <span>return to main website</span>
          </button>

          <span className="text-xs font-mono text-[#323A72]/70 lowercase">
            © {new Date().getFullYear()} orikawa laurentin
          </span>
        </div>

      </div>
    </div>
  );
};
