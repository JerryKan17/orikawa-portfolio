import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NotebookShowcase } from './components/NotebookShowcase';
import { T0VProcess } from './components/T0VProcess';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { LegalPage } from './components/LegalPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'legal'>('home');

  useEffect(() => {
    // Listen for #legal in URL hash
    const handleHash = () => {
      if (window.location.hash === '#legal') {
        setCurrentPage('legal');
        window.scrollTo(0, 0);
      } else if (currentPage === 'legal') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    if (window.location.hash === '#legal') {
      setCurrentPage('legal');
    }

    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentPage]);

  const openLegal = () => {
    setCurrentPage('legal');
    window.location.hash = 'legal';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeLegal = () => {
    setCurrentPage('home');
    window.history.pushState(null, '', ' ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'legal') {
    return <LegalPage onBack={closeLegal} />;
  }

  return (
    <div className="min-h-screen bg-[#fff7dd] text-[#131522] selection:bg-[#29E3BE] selection:text-[#131522] relative overflow-x-hidden">
      
      {/* Paper grain and tactile organic texture overlay */}
      <div className="paper-grain-overlay" aria-hidden="true" />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <NotebookShowcase />
        <T0VProcess />
        <AboutSection />
      </main>

      {/* Contact & Footer */}
      <ContactSection onOpenLegal={openLegal} />

    </div>
  );
}
