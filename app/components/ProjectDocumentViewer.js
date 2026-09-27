"use client";

import { useState } from "react";

export default function ProjectDocumentViewer({ documents }) {
  const [selected, setSelected] = useState(null);

  if (documents.length === 0) return null;

  return (
    <>
      <p className="project-document-label">PROJECT DOCUMENTS</p>

      <div className="project-document-grid">
        {documents.map((document, index) => (
          <button
            className="project-document-card"
            type="button"
            key={document.id}
            onClick={() => setSelected(document)}
          >
            <span className="card-number">0{index + 1}</span>

            <div>
              <p className="project-document-type">PROJECT DOCUMENT · PDF</p>
              <h3>{document.title}</h3>
            </div>

            <span className="project-document-link">
              View project file ↗
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="pdf-modal-backdrop"
          role="presentation"
          onMouseDown={() => setSelected(null)}
        >
          <section
            className="pdf-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`PDF ${selected.title}`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="pdf-modal-header">
              <div>
                <p>PROJECT DOCUMENT / PDF</p>
                <h3>{selected.title}</h3>
              </div>

              <div className="pdf-modal-actions">
                <a href={`${selected.fileUrl}?download`} download>
                  Download ↓
                </a>
                <a href={selected.fileUrl} target="_blank" rel="noreferrer">
                  New tab ↗
                </a>
                <button type="button" onClick={() => setSelected(null)}>
                  ×
                </button>
              </div>
            </header>

            <iframe
              className="pdf-frame"
              src={selected.fileUrl}
              title={selected.title}
            />
          </section>
        </div>
      )}
    </>
  );
}