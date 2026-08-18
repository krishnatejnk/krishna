"use client";

import Reveal from "./Reveal";

const education = [
  {
    degree: "Master of Applied Computer Science",
    institution: "Dalhousie University",
    location: "Halifax, NS, Canada",
    period: "Sep 2024 – Apr 2026",
    gpa: "3.46 / 4.0",
    courses: [
      "Cloud Computing & Distributed Systems",
      "Machine Learning & Artificial Intelligence",
      "Software Engineering Practices",
      "Database Systems",
      "Advanced Algorithms",
      "Web Services & APIs",
    ],
  },
  {
    degree: "Bachelor of Computer Science Engineering",
    institution: "MVJ College of Engineering",
    location: "Bangalore, KA, India",
    period: "Sep 2018 – Sep 2022",
    gpa: "8.7 / 10.0",
    courses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "Computer Networks",
      "Operating Systems",
      "Object-Oriented Programming",
      "Machine Learning",
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="relative z-[1] pt-24 sm:pt-32 md:pt-[140px]">
      <div data-node="1" className="absolute left-[92%] top-[168px] hidden h-3 w-3 rounded-full border-2 border-dsg-accent bg-dsg-charcoal md:block" />

      <Reveal className="flex flex-col gap-3.5 pb-14">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-dsg-ink-4">03 — Academic background</div>
        <h2 className="text-4xl font-medium tracking-[-0.02em] text-white">Education</h2>
      </Reveal>

      <Reveal>
        {education.map((edu) => (
          <div
            key={edu.institution}
            className="grid gap-4 border-t border-dsg-hairline py-8 md:grid-cols-[220px,1fr] md:gap-12"
          >
            <div>
              <div className="font-mono text-sm text-dsg-ink-4">{edu.period}</div>
              <div className="mt-1 font-mono text-xs text-dsg-ink-5">{edu.location}</div>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-dsg-accent">GPA {edu.gpa}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-xl font-medium text-white">{edu.degree}</div>
                <div className="mt-1 text-sm text-dsg-ink-2">{edu.institution}</div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {edu.courses.map((c) => (
                  <span key={c} className="border border-dsg-chip px-2.5 py-1 font-mono text-[11px] text-dsg-ink-3">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-dsg-hairline" />
      </Reveal>
    </section>
  );
}
