import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Brain, Rocket, Zap, Github, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { StaggerList } from "@/components/animations/stagger-list";

const projects = [
  {
    title: "Face Detection System",
    description: "Real-time face recognition and gender classification system using computer vision techniques with SVM classifier and Flask web deployment.",
    tech: ["OpenCV", "SVM", "Flask", "PCA", "GridSearchCV"],
    techCategories: { "Computer Vision": "ml", "Frameworks": "framework", "Deployment": "tools" },
    category: "ML/AI",
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    icon: Brain,
    metrics: {
      accuracy: "96.5%",
      label: "Model Accuracy",
    },
    github: "https://github.com/sangamnirala/face-detection",
    demo: "https://face-detection-demo.replit.dev",
    highlights: [
      "Built real-time face recognition and gender classification using computer vision",
      "Performed EDA and preprocessing with face detection, grayscale conversion, normalization, and PCA",
      "Trained and optimized SVM classifier using GridSearchCV for accurate predictions",
      "Deployed as Flask web app for instant image classification",
    ],
  },
  {
    title: "PDF Chatbot",
    description: "Multilingual chatbot using RAG with Gemini AI to query scanned/digital PDFs via Streamlit with hybrid retrieval and chat memory.",
    tech: ["RAG", "Gemini AI", "ChromaDB", "LangChain", "Streamlit"],
    techCategories: { "RAG": "tools", "AI/LLM": "framework", "Streaming": "tools" },
    category: "Full-Stack AI",
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    icon: Code2,
    metrics: {
      accuracy: "92.4%",
      label: "Retrieval Accuracy",
    },
    github: "https://github.com/sangamnirala/pdf-chatbot",
    demo: "https://pdf-chatbot-demo.replit.dev",
    highlights: [
      "Built multilingual chatbot using RAG with Gemini AI for PDF queries",
      "Extracted and chunked text using OCR, PyPDF2, and LangChain with ChromaDB embeddings",
      "Enabled hybrid retrieval with semantic search, keyword match, and re-ranking",
      "Added chat memory for multi-turn conversations using LangChain BufferMemory",
    ],
  },
];

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedMetric({ value, label }: { value: string; label: string }) {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const numericValue = parseFloat(value);
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = (numericValue * progress).toFixed(1);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animate();
  }, [isInView, value]);

  return (
    <div ref={ref}>
      <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{label}</p>
      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
        {displayValue}{value.includes("%") ? "%" : ""}
      </p>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="pt-16 spacing-premium bg-background section-pattern-default relative" data-testid="section-projects" role="region" aria-label="Featured projects section">
      <div className="section-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center gap-3 mb-12">
            <Code2 className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-card card-depth-3 p-0 overflow-hidden group transition-all duration-300 transform hover:scale-105 rounded-lg card-3d-hover hover-depth flex flex-col"
                data-testid={`card-project-${index}`}
              >
                <div className={`aspect-video rounded-t-lg bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon className="h-16 w-16 text-white/90 drop-shadow-lg" />
                  </div>

                  {/* Category Tag */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className={`absolute top-3 left-3 category-badge ${project.category.includes("AI") ? "category-badge-ai" : "category-badge-ml"}`}
                  >
                    <Zap className="h-3 w-3" />
                    {project.category}
                  </motion.div>

                  {/* Project Metrics - Animated */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <AnimatedMetric value={project.metrics.accuracy} label={project.metrics.label} />
                  </motion.div>

                  {/* Tech Stack with Colors */}
                  <div className="absolute top-14 left-3 flex gap-2 flex-wrap">
                    {project.tech.slice(0, 3).map((tech, i) => {
                      const badgeClass = i === 0 ? "tech-badge-ml" : i === 1 ? "tech-badge-framework" : "tech-badge-tools";
                      return (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className={`tech-badge ${badgeClass} px-2 py-1 rounded text-xs font-mono`}
                        >
                          {tech}
                        </motion.span>
                      );
                    })}
                  </div>

                  {/* Hover Overlay with Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 glass-overlay bg-black/60 flex items-center justify-center gap-4 flex-col"
                    style={{ willChange: "opacity" }}
                  >
                    <Button
                      size="sm"
                      onClick={() => window.open(project.github, "_blank")}
                      className="bg-white text-black hover:bg-gray-200 font-semibold transition-all duration-300 transform hover:scale-110"
                      data-testid={`button-view-code-${index}`}
                    >
                      <Code2 className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(project.demo, "_blank")}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300 transform hover:scale-110"
                      data-testid={`button-live-demo-${index}`}
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-lg">{project.title}</div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${index}`}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

                  <ul className="space-y-2 mb-4 flex-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1 shrink-0 flex-shrink-0">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, i) => {
                      const badgeClass = i % 3 === 0 ? "tech-badge-ml" : i % 3 === 1 ? "tech-badge-framework" : "tech-badge-tools";
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <Badge className={`tech-badge ${badgeClass} font-mono text-xs`}>
                            {tech}
                          </Badge>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
