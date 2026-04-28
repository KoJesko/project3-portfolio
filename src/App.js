import React, { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubRepos from './components/GitHubRepos';
import BillTracker from './components/BillTracker';
import Pride from './components/Pride';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const THEMES = ['sunset', 'dark', 'light'];
const EASTER_EGG_KEY = '236';
const EASTER_EGG_VIDEO_ID = 'VS97-X0CjZ4';

function loadYTApi() {
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (document.getElementById('yt-iframe-api')) {
    return new Promise((resolve) => { window.onYouTubeIframeAPIReady = resolve; });
  }
  return new Promise((resolve) => {
    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    window.onYouTubeIframeAPIReady = resolve;
    document.head.appendChild(tag);
  });
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'sunset');
  const typedKeysRef = useRef('');
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const playEasterEgg = useCallback(async () => {
    await loadYTApi();

    // Destroy previous player if it exists
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    // Ensure the hidden container has a fresh div for the player
    if (containerRef.current) {
      containerRef.current.innerHTML = '<div id="egg-yt-player"></div>';
    }

    playerRef.current = new window.YT.Player('egg-yt-player', {
      videoId: EASTER_EGG_VIDEO_ID,
      playerVars: { autoplay: 1, controls: 0 },
      events: {
        onStateChange: (e) => {
          // YT.PlayerState.ENDED === 0
          if (e.data === 0) {
            if ('speechSynthesis' in window) {
              window.speechSynthesis.cancel();
              const msg = new SpeechSynthesisUtterance('rec ban');
              msg.rate = 0.95;
              window.speechSynthesis.speak(msg);
            }
            if (playerRef.current) {
              playerRef.current.destroy();
              playerRef.current = null;
            }
          }
        },
      },
    });
  }, []);

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
        playEasterEgg();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [playEasterEgg]);

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
        <GitHubRepos />
        <BillTracker />
        <Pride />
        <Contact />
      </main>
      <Footer />

      {/* Hidden container for YouTube audio-only player */}
      <div
        ref={containerRef}
        style={{ position: 'fixed', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
      >
        <div id="egg-yt-player" />
      </div>
    </div>
  );
}

export default App;
