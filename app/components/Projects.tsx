"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    title: "Neighbourly",
    tagline: "AWS-powered community platform for residents to share requests, manage parking, and explore amenities.",
    description: "Community-driven app on AWS that lets residents share requests, manage parking, and explore amenities. Engineered zero-downtime deployment pipeline with CloudFormation, EC2, and Auto Scaling Groups with real-time notifications via SNS and Lambda.",
    technologies: ["AWS", "CloudFormation", "EC2", "RDS", "S3", "DynamoDB", "Lambda", "Flask", "Python"],
    github: "https://github.com/krishnatejnk/Neighbourly",
    link: null,
    type: "Cloud",
  },
  {
    title: "DALSys",
    tagline: "Serverless e-bike management system with multi-factor auth and IoT-driven real-time notifications.",
    description: "Serverless backend microservices using AWS Lambda and RESTful APIs to manage user authentication, e-bike operations, and notifications. Secure multi-factor authentication and message-driven workflows (SNS/SQS) with React frontend on AWS Fargate.",
    technologies: ["Python", "FastAPI", "Node.js", "React", "MQTT", "AWS IoT Core", "Lambda", "API Gateway", "ECS"],
    github: "https://github.com/krishnatejnk/CSCI-5410",
    link: null,
    type: "Microservices",
  },
  {
    title: "Clinical Notes Summarization",
    tagline: "RAG pipeline on SageMaker that turns raw clinical notes into concise, context-rich summaries for doctors.",
    description: "RAG system for clinical notes using Flan-T5 and FAISS on AWS SageMaker, enabling doctors to access concise context-rich summaries. Automated multi-region disaster recovery with S3, KMS, and IAM, handling 10,000+ daily requests.",
    technologies: ["AWS SageMaker", "FAISS", "Flan T5", "Lambda", "API Gateway", "S3", "Python", "RDS"],
    github: null,
    link: null,
    type: "ML / RAG",
  },
  {
    title: "Disaster Recovery for Healthcare",
    tagline: "Multi-region AWS architecture with automated failover ensuring healthcare system resilience.",
    description: "Multi-region disaster recovery architecture on AWS for healthcare systems. S3 replication, RDS Multi-AZ, automated failover with Lambda and Route 53, CloudWatch monitoring and IAM/KMS security.",
    technologies: ["AWS CloudFormation", "EC2", "RDS", "S3", "DynamoDB", "Lambda", "Route 53", "IAM", "KMS"],
    github: null,
    link: null,
    type: "Infrastructure",
  },
  {
    title: "Attention-Guided CT Segmentation",
    tagline: "Compared CBAM, AAGS, and SegFormer models against UNet baselines, achieving a 7% Dice score improvement.",
    description: "Implemented and compared attention-guided segmentation models (UNetCBAM, AAGS, SegFormer) against traditional UNet baselines on chest CT scans, improving Dice score by 7%. Engineered reproducible data preprocessing pipeline with React/Next.js visualization.",
    technologies: ["PyTorch", "SegFormer", "UNetCBAM", "AAGS", "NumPy", "Scikit-learn", "React", "Next.js"],
    github: null,
    link: null,
    type: "Deep Learning",
  },
  {
    title: "Text Classification with Transformers",
    tagline: "Fine-tuned BERT and DistilBERT for sentiment analysis, reaching 92% accuracy with attention visualization.",
    description: "Fine-tuned BERT and DistilBERT for sentiment analysis on IMDb reviews, reaching 92% accuracy. Applied tokenization, embeddings, and attention visualization for model explainability.",
    technologies: ["Hugging Face Transformers", "BERT", "DistilBERT", "PyTorch", "Pandas", "Scikit-learn"],
    github: null,
    link: null,
    type: "NLP",
  },
  {
    title: "GameDeck",
    tagline: "MERN stack game discovery app with custom lists, JWT auth, and 500k+ titles via the RAWG API.",
    description: "Built the Custom Game Lists feature end-to-end across a MERN stack, designing 7 RESTful API endpoints with JWT-based ownership enforcement and a React SPA frontend with modal-driven create/edit flows and zero full-page refreshes. Engineered a MongoDB schema with embedded GameEntry subdocuments and integrated the RAWG API (500,000+ titles) with duplicate prevention, enabling users to search and manage game collections with real-time UI updates. Designed low-fidelity wireframes in Figma for mobile and desktop viewports, iterating on task flows and empty states prior to implementation across a 6-person team using GitLab for version control.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB Atlas", "JWT", "RAWG API", "Figma"],
    github: "https://github.com/krishnatejnk/CSCI4177_group6-Project",
    link: "https://gametime-csci4177.netlify.app/",
    type: "Web",
  },
  {
    title: "This Portfolio",
    tagline: "Personal portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    description: "Portfolio built with Next.js and TypeScript, featuring Framer Motion animations and contact form integration via Resend API.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend API"],
    github: "https://github.com/krishnatejnk/portfolio-site",
    link: null,
    type: "Web",
  },
];

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedProject(index);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  return (
    <section id="projects" ref={ref} className="py-24 px-6 lg:px-8 bg-white dark:bg-neutral-950 border-t border-stone-100 dark:border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-amber-500 dark:text-amber-400 text-xs tracking-widest uppercase mb-3 font-medium">Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Things I&apos;ve built.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onClick={() => openModal(index)}
              className="group text-left border border-stone-200 dark:border-neutral-800 rounded-xl p-6 hover:border-stone-400 dark:hover:border-neutral-600 transition-colors bg-white dark:bg-neutral-950 hover:bg-stone-50 dark:hover:bg-neutral-900"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs text-amber-500 dark:text-amber-400 font-medium">{project.type}</span>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-neutral-300 dark:text-neutral-700 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                    aria-label="GitHub"
                  >
                    <GitHubIcon />
                  </a>
                )}
              </div>
              <h3 className="text-neutral-900 dark:text-neutral-100 font-semibold text-lg mb-2 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-neutral-500 dark:text-neutral-500 text-sm leading-relaxed mb-4">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="text-xs px-2 py-0.5 border border-stone-200 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 rounded">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-xs text-neutral-300 dark:text-neutral-700">+{project.technologies.length - 4}</span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-amber-500 dark:text-amber-400 text-xs font-medium uppercase tracking-wider mb-2">
                      {projects[selectedProject].type}
                    </p>
                    <h3 className="text-neutral-900 dark:text-neutral-100 font-bold text-2xl">
                      {projects[selectedProject].title}
                    </h3>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors ml-4 text-2xl leading-none"
                  >
                    &times;
                  </button>
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                  {projects[selectedProject].description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[selectedProject].technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 border border-stone-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-500 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {projects[selectedProject].link && (
                    <a
                      href={projects[selectedProject].link!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium bg-amber-500 dark:bg-amber-400 text-white dark:text-neutral-950 px-4 py-2 rounded hover:bg-amber-400 dark:hover:bg-amber-300 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {projects[selectedProject].github && (
                    <a
                      href={projects[selectedProject].github!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 border border-stone-200 dark:border-neutral-700 px-4 py-2 rounded hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                    >
                      <GitHubIcon />
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
