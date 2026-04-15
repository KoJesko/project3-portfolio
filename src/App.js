import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Pride from './components/Pride';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const THEMES = ['dark', 'light', 'sunset'];
const EASTER_EGG_KEY = '236';
const EASTER_EGG_VIDEO = 'https://www.youtube.com/embed/VS97-X0CjZ4?autoplay=1';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [videoKey, setVideoKey] = useState(0);
  const typedKeysRef = useRef('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isTypingInInput =
        target instanceof HTMLElement &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (isTypingInInput) {
        return;
      }

      if (!/^\d$/.test(event.key)) {
        return;
      }

      typedKeysRef.current = (typedKeysRef.current + event.key).slice(-EASTER_EGG_KEY.length);

      if (typedKeysRef.current === EASTER_EGG_KEY) {
        setVideoKey((value) => value + 1);
        setShowEasterEgg(true);

        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const message = new SpeechSynthesisUtterance('rec ban');
          message.rate = 0.95;
          window.speechSynthesis.speak(message);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleThemeToggle = () => {
    const index = THEMES.indexOf(theme);
    const nextTheme = THEMES[(index + 1) % THEMES.length];
    setTheme(nextTheme);
  };

  return (
    <div className="App app-shell">
      <Navbar theme={theme} onToggleTheme={handleThemeToggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Pride />
        <Contact />
      </main>
      <Footer />

      {showEasterEgg && (
        <div className="egg-overlay" role="dialog" aria-modal="true" aria-label="Easter egg video">
          <div className="egg-player-wrap">
            <button
              type="button"
              className="egg-close"
              onClick={() => setShowEasterEgg(false)}
              aria-label="Close easter egg"
            >
              Close
            </button>
            <iframe
              key={videoKey}
              className="egg-player"
              src={EASTER_EGG_VIDEO}
              title="Easter egg"
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
