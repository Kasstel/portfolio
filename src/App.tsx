import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CrtOverlay } from './components/crt/CrtOverlay';
import { BootScreen } from './components/boot/BootScreen';
import { Topbar } from './components/layout/Topbar';
import { Hero } from './pages/Hero';
import { Projects } from './pages/Projects';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import styles from './App.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    if (!booting) {
      // Refresh ScrollTrigger after boot completes and content reveals
      const timer = setTimeout(() => ScrollTrigger.refresh(true), 100);
      return () => clearTimeout(timer);
    }
  }, [booting]);

  return (
    <>
      <CrtOverlay />

      {booting && <BootScreen onComplete={() => setBooting(false)} />}

      <div className={`${styles.app} ${booting ? styles.booting : styles.revealed}`}>
        <Topbar />
        <main>
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <footer className={styles.foot}>
          <span>LUNEV.N // PORTFOLIO · 2026</span>
          <span>BUILT WITH ВНИМАНИЕМ AND CAFFEINE</span>
          <span>END OF PORTFOLIO ▓</span>
        </footer>
      </div>
    </>
  );
}
