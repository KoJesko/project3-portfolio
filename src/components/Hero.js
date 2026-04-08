import React from 'react';
import Button from './Button';

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hi, I'm</p>
        <h1 className="hero-name">Ari Kotler</h1>
        <p className="hero-tagline">
          Computer Science Senior &bull; FOSS Advocate &bull; Builder
        </p>
        <div className="hero-buttons">
          <Button href="#contact">Get in Touch</Button>
          <Button href="#projects" variant="outline">View Projects</Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
