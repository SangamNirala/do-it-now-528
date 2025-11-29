import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Brain, Rocket } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";

const projects = [
  {
    title: "Face Detection System",
    description: "Real-time face recognition and gender classification system using computer vision techniques with SVM classifier and Flask web deployment.",
    tech: ["OpenCV", "SVM", "Flask", "PCA", "GridSearchCV"],
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

export function ProjectsSection() {
  return (
    <section id="projects" className="pt-16 py-20 md:py-28 bg-background" data-testid="section-projects">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-12">
            <Code2 className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Projects</h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index}>
              <Card className="h-full p-0 overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl" data-testid={`card-project-${index}`}>
                <div className={`aspect-video rounded-t-lg bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon className="h-16 w-16 text-white/90 drop-shadow-lg" />
                  </div>

                  {/* Project Metrics */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <p className="text-xs font-semibold text-gray-900">{project.metrics.label}</p>
                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                      {project.metrics.accuracy}
                    </p>
                  </motion.div>

                  {/* Tech Stack */}
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded text-xs text-white/90 font-mono">
                        {tech}
                      </span>
                    ))}
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

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${index}`}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1 shrink-0 flex-shrink-0">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="outline" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
