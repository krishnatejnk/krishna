"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "15+", label: "Microservices Built" },
  { value: "10+", label: "Projects Completed" },
  { value: "20+", label: "Technologies" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" ref={ref} className="py-24 px-6 lg:px-8 bg-white dark:bg-neutral-950 border-t border-stone-100 dark:border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-amber-500 dark:text-amber-400 text-xs tracking-widest uppercase mb-3 font-medium">About</p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Who I am.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">
              ML Engineer and Software Developer with 2+ years of industry experience. Currently pursuing a Master of Applied Computer Science at Dalhousie University, working on computer vision, NLP, and cloud systems.
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
              My background spans two worlds: backend engineering at scale (microservices, data pipelines, financial systems) and applied ML (object detection, transformer fine-tuning, RAG systems). I like building things that work in production.
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Previously at Azuga Inc and Morgan Stanley, building Java/Spring microservices and ETL pipelines handling millions of records daily.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-px bg-stone-200 dark:bg-neutral-800 border border-stone-200 dark:border-neutral-800 rounded-xl overflow-hidden"
          >
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-neutral-950 p-8 text-center">
                <div className="text-3xl font-bold text-amber-500 dark:text-amber-400 mb-2 font-display">{stat.value}</div>
                <div className="text-sm text-neutral-400 dark:text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
