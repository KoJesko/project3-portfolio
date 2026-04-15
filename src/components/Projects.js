import React, { useMemo, useState } from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';
import Button from './Button';

const projects = [
  {
    title: 'Intentioned',
    subtitle: 'intentioned.tech',
    link: 'https://intentioned.tech',
    tags: ['React', 'UI', 'Training', 'SaaS'],
    description:
      'A highly adaptable, logic-driven training platform. Designed and developed modular career training software built to simulate and grade any conversation. It is highly functional tool built to objectively assess and improve dialogue and professional interaction.',
  },
  {
    title: "Where's My Rig",
    subtitle: 'wheresmyrig.com',
    link: 'https://wheresmyrig.com',
    tags: ['React', 'Cloudflare', 'Game', 'Leaderboard'],
    description:
      '[ALPHA] A GeoGuessr-style game for truck simulator fans. Guess real in-game locations from Euro Truck Simulator 2 and American Truck Simulator screenshots. Built with React, Cloudflare Workers, D1, and R2 with community screenshot submissions and a competitive leaderboard.',
  },
  {
    title: 'TidalHudson',
    subtitle: 'UN Millennium Fellowship',
    link: null,
    tags: ['VR', '3D', 'Education', 'Environment'],
    description:
      'Engineered a 3D VR visualization demonstrating the exact mechanics of an estuary system. Built as a core contribution to the UN Millennium Fellowship to bridge the gap between complex environmental data and accessible visual learning.',
  },
];

function Projects() {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const allTags = useMemo(() => {
    const tagSet = new Set();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tagSet.add(tag));
    });
    return ['All', ...Array.from(tagSet)];
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesTag = activeTag === 'All' || project.tags.includes(activeTag);
      const matchesText =
        normalizedQuery.length === 0 ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.subtitle.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return matchesTag && matchesText;
    });
  }, [activeTag, query]);

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeader title="The Work" subtitle="Projects" />
        <div className="filter-toolbar" aria-label="Project filters">
          <input
            className="filter-input"
            type="search"
            placeholder="Search projects by title or technology"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="tag-row">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`tag-chip ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <Card
              key={project.title}
              title={project.title}
              subtitle={project.subtitle}
              className="interactive-card project-card"
            >
              <p>{project.description}</p>
              <div className="skill-tag-list" aria-label="Project tags">
                {project.tags.map((tag) => (
                  <span key={`${project.title}-${tag}`} className="mini-tag">
                    {tag}
                  </span>
                ))}
              </div>
              {project.link && (
                <Button href={project.link} variant="outline">
                  Visit Site
                </Button>
              )}
              <p className="hover-note">Hover card for lift effect</p>
            </Card>
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <p className="filter-empty">No projects match your current filter.</p>
        )}
      </div>
    </section>
  );
}

export default Projects;
