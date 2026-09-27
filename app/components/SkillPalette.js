"use client";

import { useState } from "react";

const skills = [
  {
    name: "Reverse Engineering",
    short: "Reverse Eng.",
    description: "Breaking down binaries to understand software behaviour and hidden logic.",
  },
  {
    name: "Threat Modelling",
    short: "Threat Model",
    description: "Finding attack paths, risks, and security priorities before issues grow.",
  },
  {
    name: "Python",
    short: "Python",
    description: "Building automation scripts, security tools, and practical prototypes.",
  },
  {
    name: "C Programming",
    short: "C",
    description: "Understanding low-level programming, memory, and system behaviour.",
  },
  {
    name: "Assembly Analysis",
    short: "Assembly",
    description: "Tracing instructions to analyse binary logic at machine level.",
  },
  {
    name: "CTF Challenge Design",
    short: "CTF Design",
    description: "Creating challenges that teach analytical and offensive security thinking.",
  },
  {
    name: "Database Querying",
    short: "Database",
    description: "Retrieving and organising structured data for useful analysis.",
  },
  {
    name: "CSS",
    short: "CSS",
    description: "Creating responsive interfaces that make technical work easy to explore.",
  },
];

const colors = [
  "#d5ff43",
  "#a8db3c",
  "#74b53d",
  "#438142",
  "#285d3b",
  "#347548",
  "#579b4e",
  "#8ecb42",
];

function point(radius, angle) {
  const center = 250;

  const round = (number) => Math.round(number * 100) / 100;

  return {
    x: round(center + radius * Math.cos(angle)),
    y: round(center + radius * Math.sin(angle)),
  };
}

function getSegmentPath(index) {
  const total = skills.length;
  const start = (index * Math.PI * 2) / total - Math.PI / 2 + 0.025;
  const end = ((index + 1) * Math.PI * 2) / total - Math.PI / 2 - 0.025;

  const outerStart = point(228, start);
  const outerEnd = point(228, end);
  const innerStart = point(98, start);
  const innerEnd = point(98, end);

  return `
    M ${outerStart.x} ${outerStart.y}
    A 228 228 0 0 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A 98 98 0 0 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
}

export default function SkillPalette() {
  const [activeSkill, setActiveSkill] = useState(null);
  const active = activeSkill === null ? null : skills[activeSkill];

  return (
    <div className="skill-wheel-layout">
      <div className="skill-wheel">
        <svg
          viewBox="0 0 500 500"
          role="group"
          aria-label="Skills palette"
          onMouseLeave={() => setActiveSkill(null)}
        >
          {skills.map((skill, index) => {
            const angle =
              ((index + 0.5) * Math.PI * 2) / skills.length - Math.PI / 2;

            const labelPosition = point(162, angle);
            const isActive = activeSkill === index;
            const lift = isActive ? 13 : 0;

            return (
              <g
                className={`skill-wedge ${isActive ? "active" : ""}`}
                key={skill.name}
                role="button"
                tabIndex={0}
                style={{
                  "--lift-x": `${Math.cos(angle) * lift}px`,
                  "--lift-y": `${Math.sin(angle) * lift}px`,
                }}
                onMouseEnter={() => setActiveSkill(index)}
                onFocus={() => setActiveSkill(index)}
                onBlur={() => setActiveSkill(null)}
                onClick={() => setActiveSkill(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setActiveSkill(index);
                  }
                }}
              >
                <path
                  d={getSegmentPath(index)}
                  style={{ fill: colors[index] }}
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
          <span>HOVER TO</span>
          <strong>EXPLORE</strong>
        </div>
      </div>

      <aside
        className={`skill-wheel-copy ${active ? "is-visible" : ""}`}
        aria-live="polite"
      >
        {active && (
          <>
            <span>CAPABILITY 0{activeSkill + 1}</span>
            <h3>{active.name}</h3>
            <p>{active.description}</p>
          </>
        )}
      </aside>
    </div>
  );
}