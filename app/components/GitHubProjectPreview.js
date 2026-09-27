"use client";

import { useEffect, useState } from "react";

const featuredRepos = [
  {
    owner: "cosmicus0",
    repo: "CTF-Challenge-Flux-Capacitor-REV-",
    label: "REVERSE ENGINEERING · CTF",
  },
  {
    owner: "cosmicus0",
    repo: "petButtler",
    label: "PERSONAL PROJECT",
  },
];

function formatNumber(number) {
  return new Intl.NumberFormat("en").format(number || 0);
}

export default function GitHubProjectPreview() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRepos() {
      const data = await Promise.all(
        featuredRepos.map(async (project) => {
          const response = await fetch(
            `https://api.github.com/repos/${project.owner}/${project.repo}`
          );

          if (!response.ok) return null;

          const repo = await response.json();
          return { ...repo, label: project.label };
        })
      );

      setRepos(data.filter(Boolean));
      setLoading(false);
    }

    loadRepos();
  }, []);

  if (loading) {
    return <p className="storage-note">Memuat repository GitHub...</p>;
  }

  return (
    <div className="repo-preview-list">
      {repos.map((repo, index) => (
        <a
          className="repo-preview"
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          key={repo.id}
        >
          <div className="repo-preview-meta">
            <span className="repo-badge">⌘ FEATURED PROJECT</span>
            <span>{repo.label} · {new Date(repo.updated_at).getFullYear()}</span>
          </div>

          <div className="repo-preview-screen">
            <div>
              <span className="card-number">0{index + 1}</span>
              <h3>{repo.full_name}</h3>
              <p>{repo.description || "Open repository on GitHub to explore the project."}</p>
            </div>

            <div className="github-mark">⌘</div>

            <div className="repo-stats">
              <div>
                <strong>{repo.language || "Code"}</strong>
                <span>Primary language</span>
              </div>
              <div>
                <strong>{formatNumber(repo.open_issues_count)}</strong>
                <span>Issues</span>
              </div>
              <div>
                <strong>{formatNumber(repo.stargazers_count)}</strong>
                <span>Stars</span>
              </div>
              <div>
                <strong>{formatNumber(repo.forks_count)}</strong>
                <span>Forks</span>
              </div>
            </div>
          </div>

          <div className="repo-color-strip">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </a>
      ))}
    </div>
  );
}