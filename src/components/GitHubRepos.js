import React, { useEffect, useState, useMemo } from 'react';
import SectionHeader from './SectionHeader';
import Card from './Card';
import Button from './Button';

const README_SUMMARY_LENGTH = 300;

/**
 * Turns raw README markdown into a short plain-text blurb that can stand in for
 * a missing GitHub "About" description.
 *
 * Headings are dropped outright — the top one is almost always just the repo
 * name, which the card already shows. Badges and images go too, since a README
 * that opens with a row of shields.io links would otherwise render as URL soup.
 *
 * @param {string} markdown - Raw README contents.
 * @returns {string} Plain text, at most README_SUMMARY_LENGTH characters.
 */
function summarizeReadme(markdown) {
  const text = markdown
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .filter((line) => !/^\s*#/.test(line))
    .map((line) => line.replace(/^\s*(?:[>*\-+]+|\d+\.)\s*/, '').trim())
    .filter(Boolean)
    .join(' ')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length <= README_SUMMARY_LENGTH) return text;
  // Back up to a word boundary so the blurb never ends mid-word.
  const clipped = text.slice(0, README_SUMMARY_LENGTH);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`;
}

/** The best description we have for a repo: GitHub's own, else the README blurb. */
function describeRepo(repo) {
  return repo.description || repo.readmeSummary || '';
}

/**
 * Fetches a repo's README and derives a blurb from it. Resolves to null on any
 * failure — a missing README (404) or a rate-limit response (403) should just
 * leave the card without a description, never break the grid.
 */
async function fetchReadmeSummary(fullName) {
  try {
    const response = await fetch(`https://api.github.com/repos/${fullName}/readme`, {
      headers: { Accept: 'application/vnd.github.raw' },
    });
    if (!response.ok) return null;
    return summarizeReadme(await response.text()) || null;
  } catch {
    return null;
  }
}

function RepoModal({ repo, isOpen, onClose }) {
  if (!isOpen || !repo) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <h2>{repo.name}</h2>
        <p className="modal-description">{describeRepo(repo) || 'No description provided'}</p>
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

function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepoId, setSelectedRepoId] = useState(null);
  const [repoSearchTerm, setRepoSearchTerm] = useState('');
  const [repoLanguageFilter, setRepoLanguageFilter] = useState('All');

  useEffect(() => {
    let cancelled = false;

    // Repos without a GitHub "About" blurb borrow one from their README. This
    // runs after the grid is already on screen, so cards never wait on it.
    const hydrateDescriptions = async (repoList) => {
      const needsSummary = repoList.filter((repo) => !repo.description);
      const summaries = await Promise.all(
        needsSummary.map(async (repo) => [repo.id, await fetchReadmeSummary(repo.full_name)])
      );
      if (cancelled) return;
      const byId = new Map(summaries.filter(([, summary]) => summary));
      if (byId.size === 0) return;
      setRepos((current) =>
        current.map((repo) =>
          byId.has(repo.id) ? { ...repo, readmeSummary: byId.get(repo.id) } : repo
        )
      );
    };

    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/KoJesko/repos?sort=updated&per_page=12&type=public', {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        if (cancelled) return;
        const sorted = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(sorted);
        setError(null);
        setLoading(false);
        hydrateDescriptions(sorted);
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
        setRepos([]);
        setLoading(false);
      }
    };

    fetchRepos();

    return () => {
      cancelled = true;
    };
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
        describeRepo(repo).toLowerCase().includes(normalizedSearch);
      return matchesLanguage && matchesSearch;
    });
  }, [repos, repoSearchTerm, repoLanguageFilter]);

  // Looked up by id rather than held as a snapshot, so an open modal picks up a
  // README blurb that lands after the user clicked "Details".
  const selectedRepo = useMemo(
    () => repos.find((repo) => repo.id === selectedRepoId) || null,
    [repos, selectedRepoId]
  );

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
            ) : filteredRepos.length > 0 ? (
              <div className="projects-grid">
                {filteredRepos.map((repo) => (
                  <Card
                    key={repo.id}
                    title={repo.name}
                    subtitle={repo.language || 'Multi-language'}
                    className="interactive-card repo-card"
                  >
                    <p className="repo-description">{describeRepo(repo) || 'No description'}</p>
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
                        onClick={() => setSelectedRepoId(repo.id)}
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

      <RepoModal repo={selectedRepo} isOpen={!!selectedRepo} onClose={() => setSelectedRepoId(null)} />
    </section>
  );
}

export default GitHubRepos;
