import React, { useMemo, useState } from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';

const skillCategories = [
  {
    title: 'Operating Systems & Environments',
    tags: ['Linux', 'Windows', 'Systems'],
    items: ['Advanced Linux configuration and system administration (CachyOS, Ubuntu)', 'Windows 11'],
  },
  {
    title: 'Programming & Logic',
    tags: ['Python', 'Java', 'PHP', 'Coding'],
    items: ['Python', 'Java', 'PHP'],
  },
  {
    title: 'Hardware Architecture',
    tags: ['Hardware', 'PC Build', 'Diagnostics'],
    items: [
      'Custom PC assembly and configuration',
      'AMD Ryzen 7 9700X, RTX 5070 Ti, Samsung 990 Evo Plus SSDs',
      'Hardware repair and diagnostics',
    ],
  },
  {
    title: 'Logistics & Spatial Planning',
    tags: ['Logistics', 'Planning', 'Traffic'],
    items: ['Traffic pattern analysis', 'Civil road design intuition', 'Logistics management'],
  },
  {
    title: 'Audio/Visual Configuration',
    tags: ['Audio', 'Visual', 'Integration'],
    items: [
      'Complex hardware setups',
      'Quadraphonic audio routing',
      'High-end sim racing peripheral integration',
    ],
  },
];

function Skills({ searchTerm }) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = useMemo(() => {
    const tagSet = new Set();
    skillCategories.forEach((category) => {
      category.tags.forEach((tag) => tagSet.add(tag));
    });
    return ['All', ...Array.from(tagSet)];
  }, []);

  const highlightText = (text, search) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? `<mark>${part}</mark>` : part
    ).join('');
  };

  const combinedSearch = searchTerm || query;
  const filteredSkills = useMemo(() => {
    const normalizedQuery = combinedSearch.trim().toLowerCase();

    return skillCategories.filter((category) => {
      const matchesTag = activeTag === 'All' || category.tags.includes(activeTag);
      const matchesText =
        normalizedQuery.length === 0 ||
        category.title.toLowerCase().includes(normalizedQuery) ||
        category.items.some((item) => item.toLowerCase().includes(normalizedQuery));

      return matchesTag && matchesText;
    });
  }, [activeTag, combinedSearch]);

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeader title="The Arsenal" subtitle="Skills" />
        <div className="filter-toolbar" aria-label="Skill filters">
          <input
            className="filter-input"
            type="search"
            placeholder="Search skills (Linux, Java, hardware...)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="tag-row">
            {tags.map((tag) => (
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
        <div className="skills-grid">
          {filteredSkills.map((category) => (
            <Card key={category.title} title={highlightText(category.title, combinedSearch)} className="interactive-card">
              <ul className="skill-list">
                {category.items.map((item) => (
                  <li key={item} dangerouslySetInnerHTML={{ __html: highlightText(item, combinedSearch) }} />
                ))}
              </ul>
              <div className="skill-tag-list" aria-label="Category tags">
                {category.tags.map((tag) => (
                  <span key={`${category.title}-${tag}`} className="mini-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
        {filteredSkills.length === 0 && (
          <p className="filter-empty">No skills match your current filter.</p>
        )}
      </div>
    </section>
  );
}

export default Skills;
