import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Code2, FileCode, Globe, Database, Brain, Layers, Cpu, Eye, Rocket, Network, Zap, Container, Server, GitBranch, Cloud } from "lucide-react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const skillIcons: Record<string, LucideIcon> = {
  Python: FileCode,
  "HTML/CSS": Globe,
  JavaScript: Code2,
  SQL: Database,
  TensorFlow: Brain,
  Keras: Layers,
  PyTorch: Cpu,
  "Scikit-learn": Brain,
  NLP: Brain,
  "Computer Vision": Eye,
  MLOps: Rocket,
  LangChain: Network,
  MLflow: Zap,
  DVC: Database,
  Docker: Container,
  Jenkins: Server,
  Git: GitBranch,
  GCP: Cloud,
  "Cloud Run": Rocket,
  Streamlit: Globe,
  Flask: Server,
  FastAPI: Zap,
};

const skillsByTier = {
  Expert: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "Flask"],
  Intermediate: ["JavaScript", "HTML/CSS", "Docker", "GCP", "NLP", "LangChain"],
  Familiar: ["FastAPI", "Streamlit", "Keras", "Jenkins", "Scikit-learn", "DVC"],
};

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

export function SkillsSection() {
  return (
    <section id="skills" className="pt-16 py-20 md:py-28 bg-card" data-testid="section-skills">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">Technical Skills</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skillsByTier).map(([tier, skills], tierIndex) => {
            const tierColors = {
              Expert: "from-yellow-500 to-orange-600",
              Intermediate: "from-blue-500 to-purple-600",
              Familiar: "from-green-500 to-teal-600",
            };
            const starCount = {
              Expert: 5,
              Intermediate: 3,
              Familiar: 2,
            };

            return (
              <AnimatedSection key={tier}>
                <Card className="p-6 h-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl" data-testid={`card-skill-tier-${tierIndex}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${tierColors[tier as keyof typeof tierColors]}`}>
                      <span className="text-sm font-bold text-white">{tier}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < starCount[tier as keyof typeof starCount] ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => {
                      const SkillIcon = skillIcons[skill] || Code2;
                      return (
                        <Badge key={skill} variant="secondary" className="font-mono text-xs flex items-center gap-1.5">
                          <SkillIcon className="h-3 w-3" />
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
