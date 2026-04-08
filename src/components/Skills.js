import React from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';

const skillCategories = [
  {
    title: 'Operating Systems & Environments',
    items: ['Advanced Linux configuration and system administration (CachyOS, Ubuntu)', 'Windows 11'],
  },
  {
    title: 'Programming & Logic',
    items: ['Python', 'Java', 'PHP'],
  },
  {
    title: 'Hardware Architecture',
    items: [
      'Custom PC assembly and configuration',
      'AMD Ryzen 7 9700X, RTX 5070 Ti, Samsung 990 Evo Plus SSDs',
      'Hardware repair and diagnostics',
    ],
  },
  {
    title: 'Logistics & Spatial Planning',
    items: ['Traffic pattern analysis', 'Civil road design intuition', 'Logistics management'],
  },
  {
    title: 'Audio/Visual Configuration',
    items: [
      'Complex hardware setups',
      'Quadraphonic audio routing',
      'High-end sim racing peripheral integration',
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeader title="The Arsenal" subtitle="Skills" />
        <div className="skills-grid">
          {skillCategories.map((category) => (
            <Card key={category.title} title={category.title}>
              <ul className="skill-list">
                {category.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
