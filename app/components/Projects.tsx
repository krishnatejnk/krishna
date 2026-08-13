"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

type Category = "ai" | "fullstack";

type Project = {
  title: string;
  tagline: string;
  description: string[];
  technologies: string[];
  github: string | null;
  link: string | null;
  type: string;
  category: Category;
};

const projects: Project[] = [
  // ── AI / Machine Learning ──────────────────────────────────────────
  {
    title: "Multi-Agent Data Ops for Content Teams",
    tagline: "5-agent LangGraph pipeline that researches, writes, fact-checks, and grades content — live with full run-by-run observability.",
    description: [
      "Architected a 5-agent content generation pipeline (Researcher, Writer, Fact-Checker, Style-Polisher, Grader) using LangGraph's stateful graph orchestration, implementing a conditional retry edge that routes failed fact-checks back to the Writer to improve output accuracy without manual intervention.",
      "Engineered a quota-aware LLM routing layer across the Gemini API, distributing calls across multiple Flash-tier models to maximize free-tier throughput, and built distinct retry/backoff handling for rate-limited versus quota-exhausted errors to fail fast rather than stall on unrecoverable retries.",
      "Built a full-stack observability layer with a Next.js timeline and metrics dashboard backed by Supabase (Postgres, RLS), logging per-agent inputs, outputs, and metadata (model, token usage, latency) for every pipeline run.",
      "Deployed via Vercel (frontend/API proxy) and Render (agent service) for a fully live, production-style multi-agent system.",
    ],
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS", "Recharts", "Python", "FastAPI", "LangGraph", "Google Gemini API", "Supabase", "Vercel", "Render"],
    github: null,
    link: "https://multi-agent-content-ops-ten.vercel.app",
    type: "Agentic AI",
    category: "ai",
  },
  {
    title: "Clinical Notes Summarization",
    tagline: "RAG pipeline on SageMaker that turns raw clinical notes into concise, context-rich summaries for doctors.",
    description: [
      "Built a Retrieval Augmented Generation pipeline using Flan-T5 and FAISS on AWS SageMaker, processing 10,000 synthetic clinical notes to generate concise, context-rich summaries that reduced clinician review time.",
      "Designed ETL and evaluation pipelines tracking ROUGE-L and coverage metrics, achieving a +0.07 ROUGE-L improvement through iterative fine-tuning and boosting summary validation throughput by 2x.",
      "Surfaced model quality insights via QuickSight dashboards, giving clinicians and researchers real-time visibility into summarization performance and model drift.",
      "Served via serverless Lambda + API Gateway routing, handling 10,000+ daily requests in a compliance-critical environment.",
    ],
    technologies: ["AWS SageMaker", "FAISS", "Flan-T5", "Lambda", "API Gateway", "S3", "Python", "CloudWatch", "ROUGE-L"],
    github: null,
    link: null,
    type: "ML / RAG",
    category: "ai",
  },
  {
    title: "Vessel Detection Pipeline",
    tagline: "Computer vision pipeline across 24 ocean buoys — automated labeling, depth-model calibration, and a production handoff to MarineLabs.",
    description: [
      "Built a vision-based vessel detection pipeline on AWS SageMaker processing 126,792 buoy camera images across 24 ocean buoys, achieving 0.8388 test mAP@50 on completely unseen buoy locations by fine-tuning Faster R-CNN ResNet50-FPN on Grounding DINO auto-generated annotations.",
      "Eliminated manual annotation overhead for 9,565 bounding boxes across 7,380 images by designing an automated labeling pipeline using Grounding DINO with AIS-matched ground truth, cutting weeks of annotation work to zero hours.",
      "Identified and documented a 27x systematic underestimation in Apple's Depth Pro model for maritime scenes by calibrating against 5,582 AIS ground truth points, saving future teams from deploying terrestrial-trained depth models in open-water applications.",
      "Delivered a production-ready pipeline to MarineLabs by shipping 65 documented notebooks, 3 model checkpoints, and a two-tier repository structure.",
    ],
    technologies: ["Python", "AWS SageMaker", "Faster R-CNN (ResNet50-FPN)", "Grounding DINO", "AIS Data Fusion", "Depth Anything V2", "Apple Depth Pro"],
    github: "https://github.com/DeepSenseCA/Krishna_MarineLabs",
    link: null,
    type: "Computer Vision",
    category: "ai",
  },
  {
    title: "Attention-Guided CT Segmentation",
    tagline: "Compared CBAM, AAGS, and SegFormer models against UNet baselines, achieving a 7% Dice score improvement.",
    description: [
      "Implemented and benchmarked attention-guided segmentation models (UNet-CBAM, AAGS, SegFormer) against a traditional UNet baseline on chest CT datasets, improving Dice score by 7% and enhancing reliability for clinical use cases.",
      "Engineered a reproducible preprocessing and augmentation pipeline that reduced test accuracy variance across multiple imaging datasets, ensuring model generalizability and scalability.",
      "Conducted quantitative and qualitative evaluations with visualized segmentation outputs, producing interpretable results to support adoption by both research and clinical stakeholders.",
    ],
    technologies: ["PyTorch", "UNet", "CBAM", "SegFormer", "AAGS", "scikit-learn", "NumPy", "Matplotlib"],
    github: null,
    link: null,
    type: "Deep Learning",
    category: "ai",
  },
  {
    title: "Text Classification with Transformers",
    tagline: "Fine-tuned BERT and DistilBERT for sentiment analysis, reaching 92% accuracy with attention visualization.",
    description: [
      "Fine-tuned pre-trained Transformer architectures (BERT, DistilBERT) for sentiment analysis on IMDb reviews, achieving 92% accuracy and demonstrating production-ready NLP for real-world text classification.",
      "Applied tokenization, embeddings, and attention visualization to interpret model outputs, improving prediction explainability and enabling adoption by non-technical stakeholders.",
      "Designed an end-to-end pipeline covering preprocessing, fine-tuning, evaluation, and error analysis with a focus on reproducibility, scalability, and deployment readiness.",
    ],
    technologies: ["Hugging Face Transformers", "BERT", "DistilBERT", "PyTorch", "Pandas", "Scikit-learn"],
    github: null,
    link: null,
    type: "NLP",
    category: "ai",
  },
  {
    title: "Drift-Aware Retraining Pipeline",
    tagline: "Prometheus/Grafana monitoring for embedding drift and refusal-rate signals, triggering automated re-indexing before quality degrades.",
    description: [
      "Built a drift-aware monitoring pipeline using Prometheus and Grafana to track embedding drift, refusal rate, and accuracy signals for a production-style LLM system, triggering automated re-indexing and retraining workflows when thresholds were breached.",
      "Implemented embedding drift detection using centroid-distance and clustering analysis (scikit-learn PCA and KMeans) against a pgvector-backed Supabase store, flagging distribution shifts across incoming query data before they degraded response quality.",
      "Configured Grafana dashboards and alerting for real-time visibility into refusal rate, toxicity flags, and accuracy trends, cutting time-to-detect on model staleness.",
    ],
    technologies: ["Python", "Prometheus", "Grafana", "Supabase (pgvector)", "scikit-learn (PCA, KMeans)", "OpenAI / Embedding APIs"],
    github: null,
    link: null,
    type: "MLOps",
    category: "ai",
  },
  {
    title: "Model Router with Budgets",
    tagline: "Cost-aware router that classifies query difficulty and dynamically splits traffic between GPT-3.5 and GPT-4 under a budget ceiling.",
    description: [
      "Built a cost-aware model router that classified incoming queries by estimated difficulty and dynamically routed requests between GPT-3.5 and GPT-4, reducing reliance on the higher-cost model for straightforward queries.",
      "Implemented budget-tracking logic to monitor cumulative API usage against free-tier quotas, throttling routing to the higher-cost model as usage approached rate limits to avoid service interruption.",
      "Logged routing decisions, estimated difficulty score, and model selection per query, enabling later analysis of cost versus response-quality trade-offs across the two tiers.",
    ],
    technologies: ["Python", "Node.js", "OpenAI GPT-3.5", "OpenAI GPT-4", "Cost / Budget Tracking"],
    github: null,
    link: null,
    type: "LLM Infra",
    category: "ai",
  },

  // ── Full-Stack Engineering ─────────────────────────────────────────
  {
    title: "Neighbourly",
    tagline: "Full-stack community platform with real-time resident requests, parking management, and zero-downtime AWS deployments.",
    description: [
      "Built a full-stack community platform with React (Tailwind + Redux) and Spring Boot, supporting real-time user interactions across resident requests, parking management, and local amenity discovery.",
      "Designed RESTful APIs and PostgreSQL schemas, and deployed the backend with Docker on EC2 using GitHub Actions CI/CD for automated, zero-downtime releases.",
      "Provisioned AWS infrastructure via CloudFormation (EC2, RDS, DynamoDB, Lambda, S3) for repeatable, automated deployments, with SNS/Lambda event pipelines for asynchronous notification workflows.",
      "Integrated S3 + CloudFront for low-latency asset delivery and enforced IAM, KMS, and CloudWatch monitoring for secure, audit-ready operations.",
    ],
    technologies: ["Java (Spring Boot)", "React", "Tailwind", "Redux", "PostgreSQL", "Docker", "AWS (EC2, S3, CloudFront, IAM, KMS, CloudWatch)", "GitHub Actions", "CloudFormation", "DynamoDB", "Lambda"],
    github: "https://github.com/krishnatejnk/Neighbourly",
    link: null,
    type: "Full Stack / Cloud",
    category: "fullstack",
  },
  {
    title: "DALSys",
    tagline: "Serverless, multi-cloud e-bike management system spanning AWS and GCP with MFA auth and real-time IoT events.",
    description: [
      "Developed FastAPI microservices for e-bike controls, MFA login, and real-time event workflows using SQS/SNS, deployed via Lambda + API Gateway with a containerized UI on ECS Fargate.",
      "Built a React frontend integrated with backend APIs for real-time operational control, with automated CI/CD pipelines via GitHub Actions for continuous deployment.",
      "Implemented MQTT-based IoT event handling with AWS IoT Core for reliable device-to-cloud communication across a distributed system.",
      "Extended the pipeline cross-cloud with Terraform-managed infrastructure and GCP Cloud Run, enabling multi-cloud event orchestration with minimal operational overhead.",
    ],
    technologies: ["Python (FastAPI)", "Node.js", "React", "MQTT", "AWS IoT Core", "ECS Fargate", "Lambda", "API Gateway", "GCP (Cloud Run, NL API)", "Terraform", "GitHub Actions"],
    github: "https://github.com/krishnatejnk/CSCI-5410",
    link: null,
    type: "Full Stack / Multi-Cloud",
    category: "fullstack",
  },
  {
    title: "GameDeck",
    tagline: "MERN stack game discovery app with custom lists, JWT auth, and 500k+ titles via the RAWG API.",
    description: [
      "Built the Custom Game Lists feature end-to-end across a MERN stack, designing 7 RESTful API endpoints with JWT-based ownership enforcement and a React SPA frontend with modal-driven create/edit flows and zero full-page refreshes.",
      "Engineered a MongoDB schema with embedded GameEntry subdocuments and integrated the RAWG API (500,000+ titles) with duplicate prevention, enabling users to search and manage game collections with real-time UI updates.",
      "Designed low-fidelity wireframes in Figma for mobile and desktop viewports, iterating on task flows and empty states prior to implementation across a 6-person team using GitLab for version control.",
    ],
    technologies: ["React", "Node.js", "Express.js", "MongoDB Atlas", "JWT", "RAWG API", "Figma"],
    github: "https://github.com/krishnatejnk/CSCI4177_group6-Project",
    link: "https://gametime-csci4177.netlify.app/",
    type: "Full Stack",
    category: "fullstack",
  },
  {
    title: "Disaster Recovery for Healthcare",
    tagline: "Multi-region AWS architecture with automated failover ensuring HIPAA-aligned healthcare system resilience.",
    description: [
      "Built a multi-region disaster recovery architecture for healthcare applications using CloudFormation IaC, provisioning RDS Multi-AZ, S3 cross-region replication, and Auto Scaling Groups to ensure continuous availability of critical patient data.",
      "Automated failover using Lambda and Route 53 health checks, cutting recovery time and ensuring near-zero downtime, with CloudWatch alarms for proactive issue detection and HIPAA-aligned compliance monitoring.",
      "Hardened security with IAM least-privilege policies and KMS encryption at rest and in transit, with CloudFormation-managed templates enabling future teams to roll out updates without manual configuration risk.",
    ],
    technologies: ["AWS CloudFormation", "EC2", "RDS Multi-AZ", "S3", "DynamoDB", "Lambda", "Route 53", "Auto Scaling", "SNS", "IAM", "KMS"],
    github: null,
    link: null,
    type: "Cloud Infrastructure",
    category: "fullstack",
  },
  {
    title: "Field Service Request Automation",
    tagline: "Canvas Power App automating field service intake and routing with Power Automate approvals and Azure DevOps releases.",
    description: [
      "Built a canvas Power App for field service request intake and routing, cutting manual request handling time and reducing routing errors for the operations team.",
      "Integrated Power Automate flows with SharePoint lists to drive multi-step approval workflows end-to-end.",
      "Set up Azure DevOps pipelines for release management, standardizing deployments across environments.",
    ],
    technologies: ["Power Apps (Canvas)", "Power Automate", "SharePoint", "Azure DevOps", "Azure App Service", "REST APIs"],
    github: null,
    link: null,
    type: "Low-Code / Azure",
    category: "fullstack",
  },
  {
    title: "This Portfolio",
    tagline: "Personal portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
    description: [
      "Portfolio built with Next.js and TypeScript, featuring Framer Motion animations and contact form integration via Resend API.",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend API"],
    github: "https://github.com/krishnatejnk/portfolio-site",
    link: null,
    type: "Web",
    category: "fullstack",
  },
];

const categoryMeta: Record<Category, {
  label: string;
  blurb: string;
  panelBg: string;
  panelBorder: string;
  heading: string;
  tag: string;
  cardHover: string;
  accentBg: string;
  accentBgHover: string;
}> = {
  ai: {
    label: "AI & Machine Learning",
    blurb: "Computer vision, NLP, agentic pipelines, and MLOps.",
    panelBg: "bg-amber-50/70 dark:bg-amber-400/[0.03]",
    panelBorder: "border-amber-200/70 dark:border-amber-900/40",
    heading: "text-amber-600 dark:text-amber-400",
    tag: "text-amber-600 dark:text-amber-400",
    cardHover: "hover:border-amber-300 dark:hover:border-amber-700",
    accentBg: "bg-amber-500 dark:bg-amber-400",
    accentBgHover: "hover:bg-amber-400 dark:hover:bg-amber-300",
  },
  fullstack: {
    label: "Full-Stack Engineering",
    blurb: "Web apps, distributed systems, and cloud infrastructure.",
    panelBg: "bg-sky-50/70 dark:bg-sky-400/[0.03]",
    panelBorder: "border-sky-200/70 dark:border-sky-900/40",
    heading: "text-sky-600 dark:text-sky-400",
    tag: "text-sky-600 dark:text-sky-400",
    cardHover: "hover:border-sky-300 dark:hover:border-sky-700",
    accentBg: "bg-sky-500 dark:bg-sky-400",
    accentBgHover: "hover:bg-sky-400 dark:hover:bg-sky-300",
  },
};

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

  const groups: { category: Category; items: { project: Project; index: number }[] }[] = (
    ["ai", "fullstack"] as Category[]
  ).map((category) => ({
    category,
    items: projects
      .map((project, index) => ({ project, index }))
      .filter(({ project }) => project.category === category),
  }));

  const active = selectedProject !== null ? projects[selectedProject] : null;
  const activeMeta = active ? categoryMeta[active.category] : null;

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

        <div className="space-y-12">
          {groups.map(({ category, items }) => {
            const meta = categoryMeta[category];
            return (
              <div
                key={category}
                className={`rounded-2xl border ${meta.panelBorder} ${meta.panelBg} p-5 md:p-8`}
              >
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
                  <h3 className={`text-lg font-bold tracking-tight ${meta.heading}`}>{meta.label}</h3>
                  <span className="text-xs text-neutral-400 dark:text-neutral-600">{meta.blurb}</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(({ project, index }) => (
                    <motion.button
                      key={project.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      onClick={() => openModal(index)}
                      className={`group text-left border border-stone-200 dark:border-neutral-800 rounded-xl p-6 transition-colors bg-white dark:bg-neutral-950 hover:bg-stone-50 dark:hover:bg-neutral-900 ${meta.cardHover}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className={`text-xs font-medium ${meta.tag}`}>{project.type}</span>
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
                      <h3 className={`text-neutral-900 dark:text-neutral-100 font-semibold text-lg mb-2 transition-colors ${meta.heading.replace("text-", "group-hover:text-")}`}>
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
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && activeMeta && (
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
                    <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${activeMeta.tag}`}>
                      {active.type}
                    </p>
                    <h3 className="text-neutral-900 dark:text-neutral-100 font-bold text-2xl">
                      {active.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors ml-4 text-2xl leading-none"
                  >
                    &times;
                  </button>
                </div>
                <ul className="space-y-3 mb-6">
                  {active.description.map((point, i) => (
                    <li key={i} className="flex gap-3 text-neutral-500 dark:text-neutral-400 leading-relaxed text-sm">
                      <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${activeMeta.accentBg}`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mb-6">
                  {active.technologies.map((tech) => (
                    <span key={tech} className="text-xs px-2.5 py-1 border border-stone-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-500 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                  {active.link && (
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 text-sm font-medium text-white dark:text-neutral-950 px-4 py-2 rounded transition-colors ${activeMeta.accentBg} ${activeMeta.accentBgHover}`}
                    >
                      Live Demo
                    </a>
                  )}
                  {active.github && (
                    <a
                      href={active.github}
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
