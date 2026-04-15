import React, { useEffect, useRef, useState } from 'react';

function Footer() {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const idleTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY.current && currentY > 120);
      lastScrollY.current = currentY;

      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setHidden(true), 3000);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    idleTimer.current = setTimeout(() => setHidden(true), 3000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(idleTimer.current);
    };
  }, []);

  return (
    <footer
      className={`footer sticky-footer ${hidden ? 'hidden' : ''}`}
      onMouseEnter={() => { clearTimeout(idleTimer.current); setHidden(false); }}
      onMouseLeave={() => { idleTimer.current = setTimeout(() => setHidden(true), 2000); }}
    >
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Ari Kotler. Built with React.</p>
        <a className="footer-top" href="#hero">Back to top</a>
      </div>
    </footer>
  );
}

export default Footer;
