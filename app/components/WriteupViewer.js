"use client";

import { useEffect, useState } from "react";

export default function WriteupViewer({ writeups }) {
  const [selected, setSelected] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visibleWriteups = showAll ? writeups : writeups.slice(0, 2);

  useEffect(() => {
    function closeWithEscape(event) {
      if (event.key === "Escape") setSelected(null);
    }

    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  return (
    <>
      <div className="writeup-grid">
        {writeups.length > 0 ? (
          visibleWriteups.map((item, index) => (
            <button
              className="writeup"
              key={item.id}
              type="button"
              onClick={() => setSelected(item)}
            >
              <span className="card-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>
                PDF Write-up
                {item.published_at ? ` · ${item.published_at}` : ""}
              </p>
              <span className="status">Open Writeup ↗</span>
            </button>
          ))
        ) : (
          <p className="storage-note">Belum ada write-up yang dipublikasikan.</p>
        )}
      </div>
      {writeups.length > 2 && (
            <button
            className="see-more-button"
            type="button"
            onClick={() => setShowAll(!showAll)}
            >
            {showAll
                ? "See Less"
                : `See More`}
            </button>
        )}

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
                <p>WRITE-UP / PDF</p>
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