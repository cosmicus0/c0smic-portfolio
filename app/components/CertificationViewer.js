"use client";

import { useEffect, useState } from "react";

export default function CertificationViewer({ certifications }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    function closeWithEscape(event) {
      if (event.key === "Escape") setSelected(null);
    }

    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  return (
    <>
      <div className="certification-grid">
        {certifications.map((item, index) => {
          const canOpenCertificate =
            item.status === "done" && item.fileUrl;

          return (
            <article
                key={item.id}
                className={`certification-card ${item.fileUrl ? "clickable-card" : ""}`}
                role={item.fileUrl ? "button" : undefined}
                tabIndex={item.fileUrl ? 0 : undefined}
                onClick={() => item.fileUrl && setSelected(item)}
                onKeyDown={(event) => {
                  if (item.fileUrl && (event.key === "Enter" || event.key === " ")) {
                    setSelected(item);
                  }
                }}
              >
              <div className="certification-top">
                <span className="card-number">0{index + 1}</span>
                <span className={`cert-status ${item.status}`}>
                  {item.status === "done" ? "DONE" : "DOING"}
                </span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.issuer}</p>

              {canOpenCertificate ? (
                <button
                    className="certificate-button"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelected(item);
                    }}
                  >
                    See Certification ↗
                </button>
              ) : (
                <span className="certificate-progress">
                  progress 70%
                </span>
              )}
            </article>
          );
        })}
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
            aria-label={`Sertifikat ${selected.title}`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="pdf-modal-header">
              <div>
                <p>CERTIFICATION / PDF</p>
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