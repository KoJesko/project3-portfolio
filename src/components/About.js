import React, { useState } from 'react';
import SectionHeader from './SectionHeader';

const aboutPanels = [
  {
    title: 'Background',
    content:
      'I am a Computer Science Senior at Pace University and a hardline advocate for Free and Open-Source Software (FOSS) and the Right to Repair. I fix my own devices, build custom rigs from the ground up, and configure my environments exactly how I want them.',
  },
  {
    title: 'How I Build',
    content:
      'I value the traditional fundamentals of engineering, but I constantly look for optimizations that move systems forward. My workflow is practical and direct: understand constraints, reduce noise, and ship reliable solutions.',
  },
  {
    title: 'Outside The Terminal',
    content:
      'When I am not writing code or tuning Linux, I am usually gaming or playing electric bass. Across projects and communities, I am known as KoJesko.',
  },
];

function About({ searchTerm }) {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const highlightText = (text, search) => {
    if (!search.trim()) return text;
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const splitRegex = new RegExp(`(${escaped})`, 'gi');
    const matchRegex = new RegExp(`^${escaped}$`, 'i');
    return text.split(splitRegex).map((part) =>
      matchRegex.test(part) ? `<mark>${part}</mark>` : part
    ).join('');
  };

  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeader title="About Me" subtitle="The Unfiltered Version" />
        <div className="accordion" role="presentation">
          {aboutPanels.map((panel, index) => {
            const isOpen = openIndex === index;
            const matchesSearch = !searchTerm.trim() || panel.title.toLowerCase().includes(searchTerm.toLowerCase()) || panel.content.toLowerCase().includes(searchTerm.toLowerCase());

            if (searchTerm.trim() && !matchesSearch) return null;

            return (
              <div key={panel.title} className={`accordion-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="accordion-trigger"
                  onClick={() => handleToggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`about-panel-${index}`}
                >
                  <span dangerouslySetInnerHTML={{ __html: highlightText(panel.title, searchTerm) }} />
                  <span className="accordion-symbol">{isOpen ? '−' : '+'}</span>
                </button>
                <div
                  id={`about-panel-${index}`}
                  className="accordion-panel"
                  hidden={!isOpen}
                >
                  <p dangerouslySetInnerHTML={{ __html: highlightText(panel.content, searchTerm) }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default About;
