import React, { useEffect, useState, useMemo } from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';
import Button from './Button';

function RepoModal({ repo, isOpen, onClose }) {
  if (!isOpen || !repo) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <h2>{repo.name}</h2>
        <p className="modal-description">{repo.description || 'No description provided'}</p>
        <div className="modal-stats">
          <div className="stat">
            <span className="stat-label">Stars:</span>
            <span className="stat-value">{repo.stargazers_count}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Watchers:</span>
            <span className="stat-value">{repo.watchers_count}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Issues:</span>
            <span className="stat-value">{repo.open_issues_count}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Language:</span>
            <span className="stat-value">{repo.language || 'Not specified'}</span>
          </div>
        </div>
        <div className="modal-actions">
          <Button href={repo.html_url} target="_blank" variant="primary">
            View on GitHub
          </Button>
          {repo.homepage && (
            <Button href={repo.homepage} target="_blank" variant="outline">
              Visit Site
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function GitHubRepos({ searchTerm }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoSearchTerm, setRepoSearchTerm] = useState('');
  const [repoLanguageFilter, setRepoLanguageFilter] = useState('All');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=12&type=public', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepos(data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
        setError(null);
      } catch (err) {
        setError(err.message);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const allLanguages = useMemo(() => {
    const languages = new Set();
    repos.forEach((repo) => {
      if (repo.language) languages.add(repo.language);
    });
    return ['All', ...Array.from(languages).sort()];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    const normalizedSearch = repoSearchTerm.toLowerCase().trim();
    return repos.filter((repo) => {
      const matchesLanguage = repoLanguageFilter === 'All' || repo.language === repoLanguageFilter;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        repo.name.toLowerCase().includes(normalizedSearch) ||
        (repo.description && repo.description.toLowerCase().includes(normalizedSearch));
      return matchesLanguage && matchesSearch;
    });
  }, [repos, repoSearchTerm, repoLanguageFilter]);

  const globalSearchMatch = useMemo(() => {
    if (!searchTerm.trim()) return filteredRepos;
    const term = searchTerm.toLowerCase();
    return filteredRepos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(term) ||
        (repo.description && repo.description.toLowerCase().includes(term)) ||
        (repo.language && repo.language.toLowerCase().includes(term))
    );
  }, [filteredRepos, searchTerm]);

  return (
    <section id="github-repos" className="section github-repos">
      <div className="container">
        <SectionHeader title="Public Repositories" subtitle="GitHub Projects" />

        {error && (
          <div className="error-message">
            <p>Unable to load repositories. Please try again later.</p>
          </div>
        )}

        {!error && (
          <>
            <div className="filter-toolbar" aria-label="Repository filters">
              <input
                className="filter-input"
                type="search"
                placeholder="Search repos by name or description"
                value={repoSearchTerm}
                onChange={(e) => setRepoSearchTerm(e.target.value)}
              />
              <div className="tag-row">
                {allLanguages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className={`tag-chip ${repoLanguageFilter === lang ? 'active' : ''}`}
                    onClick={() => setRepoLanguageFilter(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="loading-message">
                <p>Loading repositories...</p>
              </div>
            ) : globalSearchMatch.length > 0 ? (
              <div className="projects-grid">
                {globalSearchMatch.map((repo) => (
                  <Card
                    key={repo.id}
                    title={repo.name}
                    subtitle={repo.language || 'Multi-language'}
                    className="interactive-card repo-card"
                  >
                    <p className="repo-description">{repo.description || 'No description'}</p>
                    <div className="repo-stats">
                      <span className="repo-stat">⭐ {repo.stargazers_count}</span>
                      <span className="repo-stat">👁 {repo.watchers_count}</span>
                      <span className="repo-stat">⚠️ {repo.open_issues_count}</span>
                    </div>
                    <div className="repo-actions">
                      <Button href={repo.html_url} target="_blank" variant="outline">
                        View on GitHub
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setSelectedRepo(repo)}
                        variant="outline"
                      >
                        Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="filter-empty">No repositories match your filters.</p>
            )}
          </>
        )}
      </div>

      <RepoModal repo={selectedRepo} isOpen={!!selectedRepo} onClose={() => setSelectedRepo(null)} />
    </section>
  );
}

export default GitHubRepos;
