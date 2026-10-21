import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NotebookShowcase } from './components/NotebookShowcase';
import { T0VProcess } from './components/T0VProcess';
import { SoundLabSection } from './components/SoundLabSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';

export default function App() {
  useEffect(() => {
    // Smooth unlock audio context on initial user click
    const handleFirstInteraction = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fff7dd] text-[#131522] selection:bg-[#29E3BE] selection:text-[#131522] relative overflow-x-hidden">
      
      {/* Background Organic Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.035] z-50 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <NotebookShowcase />
        <T0VProcess />
        <SoundLabSection />
        <AboutSection />
      </main>

      {/* Contact & Footer */}
      <ContactSection />

    </div>
  );
}
