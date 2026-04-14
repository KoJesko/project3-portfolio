import React from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';
import Button from './Button';

const projects = [
  {
    title: 'Intentioned',
    subtitle: 'intentioned.tech',
    link: 'https://intentioned.tech',
    description:
      'A highly adaptable, logic-driven training platform. Designed and developed modular career training software built to simulate and grade any conversation. It is highly functional tool built to objectively assess and improve dialogue and professional interaction.',
  },
  {
    title: "Where's My Rig",
    subtitle: 'wheresmyrig.com',
    link: 'https://wheresmyrig.com',
    description:
      'A GeoGuessr-style game for truck simulator fans. Guess real in-game locations from Euro Truck Simulator 2 and American Truck Simulator screenshots. Built with React, Cloudflare Workers, D1, and R2 with community screenshot submissions and a competitive leaderboard.',
  },
  {
    title: 'TidalHudson',
    subtitle: 'UN Millennium Fellowship',
    link: null,
    description:
      'Engineered a 3D VR visualization demonstrating the exact mechanics of an estuary system. Built as a core contribution to the UN Millennium Fellowship to bridge the gap between complex environmental data and accessible visual learning.',
  },
];

function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeader title="The Work" subtitle="Projects" />
        <div className="projects-grid">
          {projects.map((project) => (
            <Card key={project.title} title={project.title} subtitle={project.subtitle}>
              <p>{project.description}</p>
              {project.link && (
                <Button href={project.link} variant="outline">
                  Visit Site
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
