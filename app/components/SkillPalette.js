"use client";

import { useRef, useState } from "react";

// Satu warna per kategori. Semua cukup terang supaya teks gelap selalu terbaca.
const categories = {
  security: { label: "Security", color: "#d5ff43" },
  programming: { label: "Programming", color: "#8ecb42" },
  data: { label: "Data", color: "#4fb477" },
};

// Urutan = urutan searah jarum jam. Skill sekategori sengaja bersebelahan.
const skills = [
  {
    name: "Reverse Engineering",
    short: "Reverse Eng.",
    category: "security",
    description:
      "Breaking down binaries to understand software behaviour and hidden logic.",
    // TODO: sesuaikan dengan tools yang benar-benar kamu pakai
    tools: ["Ghidra", "IDA Free", "GDB", "pwndbg"],
  },
  {
    name: "Assembly Analysis",
    short: "Assembly",
    category: "security",
    description: "Tracing instructions to analyse binary logic at machine level.",
    tools: ["Ghidra", "IDA","objdump"],
    evidence: null,
  },
  {
    name: "CTF Challenge Design",
    short: "CTF Design",
    category: "security",
    description:
      "Creating challenges that teach analytical and offensive security thinking.",
    tools: ["Docker", "Python", "C"],
  },
  {
    name: "Threat Modelling",
    short: "Threat Model",
    category: "security",
    description:
      "Finding attack paths, risks, and security priorities before issues grow.",
    tools: ["STRIDE", "Attack trees"],
    evidence: null,
  },
  {
    name: "C Language",
    short: "C",
    category: "programming",
    description:
      "Understanding low-level programming, memory, and system behaviour.",
    tools: ["Coding"],
    evidence: null,
  },
  {
    name: "Python",
    short: "Python",
    category: "programming",
    description: "Building automation scripts, security tools, and practical prototypes.",
    tools: ["pwntools", "angr", "z3-solver"],
    evidence: null,
  },
  {
    name: "CSS",
    short: "CSS",
    category: "programming",
    description:
      "Creating responsive interfaces that make technical work easy to explore.",
    tools: ["Tailwind", "Flexbox / Grid"],
    evidence: null,
  },
  {
    name: "Database Querying",
    short: "Database",
    category: "data",
    description: "Retrieving and organising structured data for useful analysis.",
    tools: ["SQL Query", "DB Normalization"],
    evidence: null,
  },
];

const CENTER = 250;
const OUTER = 228;
const INNER = 98;
const GAP = 0.025;

function point(radius, angle) {
  const round = (n) => Math.round(n * 100) / 100;
  return {
    x: round(CENTER + radius * Math.cos(angle)),
    y: round(CENTER + radius * Math.sin(angle)),
  };
}

function getSegmentPath(index) {
  const total = skills.length;
  const start = (index * Math.PI * 2) / total - Math.PI / 2 + GAP;
  const end = ((index + 1) * Math.PI * 2) / total - Math.PI / 2 - GAP;

  const outerStart = point(OUTER, start);
  const outerEnd = point(OUTER, end);
  const innerStart = point(INNER, start);
  const innerEnd = point(INNER, end);

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${OUTER} ${OUTER} 0 0 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${INNER} ${INNER} 0 0 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
}

export default function SkillPalette() {
  // Selalu ada skill terpilih, jadi card di kanan tidak pernah kosong.
  const [activeIndex, setActiveIndex] = useState(0);
  const wedgeRefs = useRef([]);
  const active = skills[activeIndex];
  const activeCategory = categories[active.category];

  const select = (index) => setActiveIndex(index);

  const move = (from, step) => {
    const next = (from + step + skills.length) % skills.length;
    setActiveIndex(next);
    wedgeRefs.current[next]?.focus();
  };

  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        move(index, 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        move(index, -1);
        break;
      case "Home":
        event.preventDefault();
        move(0, 0);
        break;
      case "End":
        event.preventDefault();
        move(skills.length - 1, 0);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        select(index);
        break;
      default:
    }
  };

  return (
    <div className="skill-wheel-layout">
      <div className="skill-wheel-column">
        <div className="skill-wheel">
          <svg viewBox="0 0 500 500" role="radiogroup" aria-label="Skills palette">
            {skills.map((skill, index) => {
              const angle =
                ((index + 0.5) * Math.PI * 2) / skills.length - Math.PI / 2;
              const labelPosition = point(162, angle);
              const isActive = activeIndex === index;
              const lift = isActive ? 10 : 0;

              return (
                <g
                  className={`skill-wedge ${isActive ? "active" : ""}`}
                  key={skill.name}
                  ref={(el) => (wedgeRefs.current[index] = el)}
                  role="radio"
                  aria-checked={isActive}
                  aria-label={`${skill.name}, ${categories[skill.category].label}`}
                  tabIndex={isActive ? 0 : -1}
                  style={{
                    "--lift-x": `${Math.cos(angle) * lift}px`,
                    "--lift-y": `${Math.sin(angle) * lift}px`,
                  }}
                  onMouseEnter={() => select(index)}
                  onFocus={() => select(index)}
                  onClick={() => select(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  <path
                    d={getSegmentPath(index)}
                    style={{ fill: categories[skill.category].color }}
                  />
                  <text
                    x={labelPosition.x}
                    y={labelPosition.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {skill.short}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="skill-wheel-core" aria-hidden="true">
            <span className="hint-hover">HOVER TO</span>
            <span className="hint-tap">TAP TO</span>
            <strong>EXPLORE</strong>
          </div>
        </div>

        <ul className="skill-legend" aria-label="Skill categories">
          {Object.entries(categories).map(([key, { label, color }]) => (
            <li key={key}>
              <span className="skill-legend-swatch" style={{ background: color }} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <aside className="skill-wheel-copy is-visible" aria-live="polite">
        {/* key memaksa animasi fade ulang tiap ganti skill */}
        <div className="skill-card" key={active.name}>
          <span className="skill-card-category">
            <span
              className="skill-legend-swatch"
              style={{ background: activeCategory.color }}
            />
            {activeCategory.label}
          </span>

          <h3>{active.name}</h3>
          <p>{active.description}</p>

          {active.tools?.length > 0 && (
            <ul className="skill-tags" aria-label="Tools">
              {active.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          )}

          {active.evidence && (
            <p className="skill-evidence">{active.evidence}</p>
          )}
        </div>
      </aside>
    </div>
  );
}