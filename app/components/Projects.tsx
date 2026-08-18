"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

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

const columns: { category: Category; label: string; items: Project[] }[] = [
  { category: "ai", label: "AI & machine learning", items: projects.filter((p) => p.category === "ai") },
  { category: "fullstack", label: "Full-stack engineering", items: projects.filter((p) => p.category === "fullstack") },
];

const GitHubIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedProject(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="relative z-[1] pt-24 sm:pt-32 md:pt-[140px]">
      <div data-node="1" className="absolute left-[86%] top-[168px] hidden h-3 w-3 rounded-full border-2 border-dsg-accent bg-dsg-charcoal md:block" />

      <Reveal className="flex flex-col gap-3.5 pb-14">
        <div className="font-mono text-xs uppercase tracking-[0.18em] text-dsg-ink-4">01 — My work</div>
        <h2 className="text-4xl font-medium tracking-[-0.02em] text-white">Projects</h2>
      </Reveal>

      <Reveal className="grid gap-10 md:grid-cols-2 md:gap-14">
        {columns.map((col) => (
          <div key={col.category} className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 pb-4">
              <span className="h-[7px] w-[7px] rounded-full bg-dsg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-dsg-ink">{col.label}</span>
            </div>
            {col.items.map((project) => (
              <button
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className="flex flex-col gap-2.5 border-t border-dsg-hairline py-6 pr-4 text-left transition-all duration-200 ease-out hover:bg-dsg-hover hover:pl-3.5"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-dsg-accent">{project.type}</div>
                <div className="text-xl font-medium leading-tight text-white">{project.title}</div>
                <div className="text-sm leading-relaxed text-dsg-ink-2">{project.tagline}</div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="border border-dsg-chip px-2 py-1 font-mono text-[11px] text-dsg-ink-3">
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="font-mono text-[11px] text-dsg-ink-5">+{project.technologies.length - 4}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        ))}
      </Reveal>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-40 bg-dsg-overlay"
            />
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-40 flex items-center justify-center p-6 md:p-12"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[82vh] w-full max-w-[720px] overflow-y-auto border border-dsg-chip bg-dsg-panel p-6 md:p-12"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute right-[22px] top-5 font-mono text-xs uppercase tracking-[0.14em] text-dsg-ink-3 transition-colors hover:text-white"
                >
                  Close ✕
                </button>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-dsg-accent">{selectedProject.type}</div>
                    <h3 className="max-w-[540px] text-[28px] font-medium leading-tight tracking-[-0.02em] text-white md:text-[34px]">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <p className="text-base leading-relaxed text-dsg-ink-2 md:text-[17px] md:leading-[1.65]">
                    {selectedProject.tagline}
                  </p>

                  <div className="flex flex-col gap-3.5 border-t border-dsg-hairline pt-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-dsg-ink-4">What it does</div>
                    {selectedProject.description.map((point, i) => (
                      <div key={i} className="grid grid-cols-[16px,1fr] items-start gap-3">
                        <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-dsg-accent" />
                        <div className="text-[15px] leading-relaxed text-dsg-ink md:text-base">{point}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 border-t border-dsg-hairline pt-5">
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-dsg-ink-4">Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((t) => (
                        <span key={t} className="border border-dsg-chip px-2.5 py-[5px] font-mono text-[11px] text-dsg-ink-3">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {selectedProject.link && (
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border border-dsg-accent bg-dsg-accent px-[22px] py-[13px] font-mono text-xs uppercase tracking-[0.14em] text-white transition-colors hover:bg-transparent hover:text-dsg-accent"
                      >
                        Live demo
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-dsg-line px-[22px] py-[13px] font-mono text-xs uppercase tracking-[0.14em] text-dsg-ink transition-colors hover:border-dsg-ink"
                      >
                        <GitHubIcon />
                        View on GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
