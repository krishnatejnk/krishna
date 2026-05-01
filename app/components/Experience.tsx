"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "ML Engineer Intern",
    company: "DeepSense / MarineLabs",
    location: "Halifax, NS, Canada",
    period: "Jan 2026 - Apr 2026",
    description: "Developed an end-to-end computer vision pipeline on AWS SageMaker (ml.g5.2xlarge, NVIDIA A10G) to detect vessels from buoy-mounted cameras across 24 operational buoys. Fine-tuned Faster R-CNN ResNet50 FPN on 9,565 annotated bounding boxes, achieving a test mAP@50 of 0.8388. Built a nearshore-specific model using hard negative mining - suppressing dock, building, and structure false positives - pushing val mAP@50 to 0.8780 (+0.138 over baseline). Implemented a bounding box area fraction classifier for distance estimation achieving 75.5% accuracy over 61,218 images, complementing AIS-based vessel tracking with vision-based detection for non-broadcasting vessels.",
    technologies: ["PyTorch", "Faster R-CNN", "AWS SageMaker", "Python", "Grounding DINO", "YOLOv11", "SAM2", "Computer Vision", "Albumentations"],
  },
  {
    title: "Software Engineer",
    company: "Azuga Inc",
    location: "Bangalore, KA, India",
    period: "Oct 2023 - May 2024",
    description: "Built and maintained a cloud-native framework of 15+ Spring Boot microservices with REST APIs, modernizing legacy components into modular pieces. Supercharged live data pipelines with Apache Kafka and Flume, boosting ingestion rates while caching and using query tuning to cut API response times. Reworked the Node Controller routing service to support rerouting, CRUD operations, and blazing-fast data retrieval.",
    technologies: ["Java", "Spring Boot", "Apache Kafka", "Apache Flume", "REST APIs", "Microservices"],
  },
  {
    title: "Software Engineer (Full Time Consultant)",
    company: "Morgan Stanley (Wiley mthree)",
    location: "Bangalore, KA, India",
    period: "Mar 2022 - Jun 2023",
    description: "Built and fine-tuned data processing services in Java (Spring MVC) and Scala, reliably handling ETL on time-sensitive financial data. Streamlined the conversion of millions of stock and bond records into highly customized JSON formats, cutting processing time. Orchestrated seamless large-scale data migrations from SQL to NoSQL with Apache Flume and Kafka, boosting analytics query performance.",
    technologies: ["Java", "Spring MVC", "Scala", "Apache Kafka", "Apache Flume", "ETL", "NoSQL"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" ref={ref} className="py-24 px-6 lg:px-8 bg-white dark:bg-neutral-950 border-t border-stone-100 dark:border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-amber-500 dark:text-amber-400 text-xs tracking-widest uppercase mb-3 font-medium">Experience</p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Where I&apos;ve worked.</h2>
        </motion.div>

        <div>
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-t border-stone-200 dark:border-neutral-800 py-10 grid md:grid-cols-[220px,1fr] gap-6 md:gap-12"
            >
              <div className="pt-1">
                <p className="text-neutral-400 dark:text-neutral-500 text-sm">{exp.period}</p>
                <p className="text-neutral-300 dark:text-neutral-600 text-xs mt-1">{exp.location}</p>
              </div>
              <div>
                <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold text-xl mb-1">{exp.title}</h3>
                <p className="text-amber-500 dark:text-amber-400 text-sm mb-5">{exp.company}</p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-6">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 border border-stone-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-500 rounded">
                      {tech}
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
