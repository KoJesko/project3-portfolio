import React from 'react';
import SectionHeader from './SectionHeader';
import Button from './Button';

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:jansherremway@gmail.com',
    display: 'jansherremway@gmail.com',
    icon: '\u2709',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kojesko',
    display: 'linkedin.com/in/kojesko',
    icon: '\u{1F517}',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/KoJesko',
    display: 'github.com/KoJesko',
    icon: '\u{1F4BB}',
  },
];

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHeader title="Contact" subtitle="Let's connect" />
        <div className="contact-grid">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-icon">{link.icon}</span>
              <span className="contact-label">{link.label}</span>
              <span className="contact-display">{link.display}</span>
            </a>
          ))}
        </div>
        <div className="contact-cta">
          <Button href="mailto:jansherremway@gmail.com">Send Me an Email</Button>
        </div>
      </div>
    </section>
  );
}

export default Contact;
