"use client";

import Reveal from "./Reveal";

const experiences = [
  {
    title: "ML Engineer Intern",
    company: "DeepSense / MarineLabs",
    location: "Halifax, NS, Canada",
    period: "Jan 2026 – Apr 2026",
    description: "Developed an end-to-end computer vision pipeline on AWS SageMaker (ml.g5.2xlarge, NVIDIA A10G) to detect vessels from buoy-mounted cameras across 24 operational buoys. Fine-tuned Faster R-CNN ResNet50 FPN on 9,565 annotated bounding boxes, achieving a test mAP@50 of 0.8388. Built a nearshore-specific model using hard negative mining — suppressing dock, building, and structure false positives — pushing val mAP@50 to 0.8780 (+0.138 over baseline). Implemented a bounding box area fraction classifier for distance estimation achieving 75.5% accuracy over 61,218 images, complementing AIS-based vessel tracking with vision-based detection for non-broadcasting vessels.",
    technologies: ["PyTorch", "Faster R-CNN", "AWS SageMaker", "Python", "Grounding DINO", "YOLOv11", "SAM2", "Computer Vision", "Albumentations"],
  },
  {
    title: "Software Engineer",
    company: "Azuga Inc",
    location: "Bangalore, KA, India",
    period: "Oct 2023 – May 2024",
    description: "Built and maintained a cloud-native framework of 15+ Spring Boot microservices with REST APIs, modernizing legacy components into modular pieces. Supercharged live data pipelines with Apache Kafka and Flume, boosting ingestion rates while caching and using query tuning to cut API response times. Reworked the Node Controller routing service to support rerouting, CRUD operations, and blazing-fast data retrieval.",
    technologies: ["Java", "Spring Boot", "Apache Kafka", "Apache Flume", "REST APIs", "Microservices"],
  },
  {
    title: "Software Engineer (Full Time Consultant)",
    company: "Morgan Stanley (Wiley mthree)",
    location: "Bangalore, KA, India",
    period: "Mar 2022 – Jun 2023",
    description: "Built and fine-tuned data processing services in Java (Spring MVC) and Scala, reliably handling ETL on time-sensitive financial data. Streamlined the conversion of millions of stock and bond records into highly customized JSON formats, cutting processing time. Orchestrated seamless large-scale data migrations from SQL to NoSQL with Apache Flume and Kafka, boosting analytics query performance.",
    technologies: ["Java", "Spring MVC", "Scala", "Apache Kafka", "Apache Flume", "ETL", "NoSQL"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-[1] pt-24 sm:pt-32 md:pt-[140px]">
      <div data-node="1" className="absolute left-[8%] top-[168px] hidden h-3 w-3 rounded-full border-2 border-dsg-accent bg-dsg-charcoal md:block" />

      <Reveal className="flex flex-col gap-3.5 pb-14">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-dsg-ink-4">02 — Where I&apos;ve worked</div>
        <h2 className="text-4xl font-medium tracking-[-0.02em] text-white">Experience</h2>
      </Reveal>

      <Reveal>
        {experiences.map((exp) => (
          <div
            key={exp.company}
            className="grid gap-4 border-t border-dsg-hairline py-8 md:grid-cols-[220px,1fr] md:gap-12"
          >
            <div>
              <div className="font-mono text-sm text-dsg-ink-4">{exp.period}</div>
              <div className="mt-1 font-mono text-xs text-dsg-ink-5">{exp.location}</div>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <div className="text-xl font-medium text-white">{exp.title}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-dsg-accent">{exp.company}</div>
              </div>
              <p className="text-[15px] leading-relaxed text-dsg-ink-2">{exp.description}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {exp.technologies.map((t) => (
                  <span key={t} className="border border-dsg-chip px-2.5 py-1 font-mono text-[11px] text-dsg-ink-3">
                    {t}
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
