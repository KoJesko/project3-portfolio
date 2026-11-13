import React from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';

const roles = [
  {
    title: 'Graduate Student Assistant',
    org: "Pace University, Seidenberg School of CS & IS",
    dates: 'Aug 2026 – Present',
  },
  {
    title: 'SSUR Research Mentor',
    org: 'Pace University',
    dates: 'Jul 2026 – Present',
    description: 'Onboarding students onto the intentioned.tech project.',
  },
];

function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeader title="Experience" subtitle="Where I Work" />
        <div className="pride-grid">
          {roles.map((role) => (
            <Card
              key={role.title}
              title={role.title}
              subtitle={`${role.org} · ${role.dates}`}
              className="interactive-card"
            >
              {role.description && <p>{role.description}</p>}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
