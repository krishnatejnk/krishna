"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const education = [
  {
    degree: "Master of Applied Computer Science",
    institution: "Dalhousie University",
    location: "Halifax, NS, Canada",
    period: "Sep 2024 - Apr 2026",
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
    period: "Sep 2018 - Sep 2022",
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="education" ref={ref} className="py-24 px-6 lg:px-8 bg-white dark:bg-neutral-950 border-t border-stone-100 dark:border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-amber-500 dark:text-amber-400 text-xs tracking-widest uppercase mb-3 font-medium">Education</p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Academic background.</h2>
        </motion.div>

        <div>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-stone-200 dark:border-neutral-800 py-10 grid md:grid-cols-[220px,1fr] gap-6 md:gap-12"
            >
              <div className="pt-1">
                <p className="text-neutral-400 dark:text-neutral-500 text-sm">{edu.period}</p>
                <p className="text-neutral-300 dark:text-neutral-600 text-xs mt-1">{edu.location}</p>
                <p className="text-amber-500 dark:text-amber-400 text-xs mt-3 font-medium">GPA: {edu.gpa}</p>
              </div>
              <div>
                <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold text-xl mb-1">{edu.degree}</h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-6">{edu.institution}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((course) => (
                    <span key={course} className="text-xs px-2.5 py-1 border border-stone-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-500 rounded">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-stone-200 dark:border-neutral-800" />
        </div>
      </div>
    </section>
  );
}
