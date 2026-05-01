"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillGroups = [
  {
    category: "Machine Learning & AI",
    skills: [
      "PyTorch", "Faster R-CNN", "Grounding DINO", "SAM2", "YOLOv11",
      "scikit-learn", "Albumentations", "AWS SageMaker",
      "Hugging Face Transformers", "BERT / DistilBERT", "FAISS", "Flan-T5",
    ],
  },
  {
    category: "Languages & Frameworks",
    skills: [
      "Python", "Java", "JavaScript", "TypeScript", "Scala",
      "Spring Boot", "Spring MVC", "FastAPI", "React", "Next.js", "Go",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "AWS (EC2, Lambda, S3, SageMaker)", "AWS CloudFormation",
      "Docker", "Kubernetes", "Jenkins", "GitHub Actions",
      "GCP (Pub/Sub, GKE)", "CloudWatch", "IAM / KMS",
    ],
  },
  {
    category: "Data & Messaging",
    skills: [
      "PostgreSQL", "MongoDB", "MySQL", "Redis",
      "Apache Kafka", "Apache Flume", "DynamoDB", "RDS",
    ],
  },
  {
    category: "Practices",
    skills: [
      "Microservices Architecture", "REST API Design", "ETL Pipelines",
      "Test-Driven Development", "Agile / Scrum",
      "Computer Vision", "Object Detection", "RAG Systems",
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" ref={ref} className="py-24 px-6 lg:px-8 bg-white dark:bg-neutral-950 border-t border-stone-100 dark:border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-amber-500 dark:text-amber-400 text-xs tracking-widest uppercase mb-3 font-medium">Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">What I work with.</h2>
        </motion.div>

        <div>
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
              className="border-t border-stone-200 dark:border-neutral-800 py-8 grid md:grid-cols-[220px,1fr] gap-6 md:gap-12 items-start"
            >
              <p className="text-neutral-400 dark:text-neutral-500 text-sm pt-1">{group.category}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 border border-stone-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 rounded hover:border-amber-400 dark:hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-stone-200 dark:border-neutral-800" />
        </div>
      </div>
    </section>
  );
}
