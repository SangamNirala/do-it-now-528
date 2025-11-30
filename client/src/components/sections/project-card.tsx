import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code2, Rocket, Zap } from "lucide-react";
import { StaggeredItem } from "@/components/animations/scroll-animations";
import { StaggeredText } from "@/components/animations/staggered-text";
import { AnimatedMetric } from "./animated-metric";
import type { Project } from "./projects-data";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  return (
    <StaggeredItem>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsTouched(!isTouched)}
        whileHover={{
          scale: 1.08,
          rotateZ: 2,
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.3)"
        }}
        transition={{
          default: { duration: 0.5, delay: index * 0.1 },
          scale: { type: "spring", stiffness: 300, damping: 25 },
          rotateZ: { type: "spring", stiffness: 300, damping: 25 },
          boxShadow: { type: "spring", stiffness: 300, damping: 25 }
        }}
        className="glass-enhanced gradient-border-animated card-depth-3 p-0 overflow-hidden group rounded-lg card-3d-hover hover-depth flex flex-col magnetic-hover"
        data-testid={`card-project-${index}`}
      >
        {/* Header Section with Gradient Background */}
        <div className={`aspect-video rounded-t-lg bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Icon */}
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

          {/* Animated Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
            style={{ willChange: "transform, opacity" }}
          >
            <AnimatedMetric value={project.metrics.accuracy} label={project.metrics.label} />
          </motion.div>

          {/* Tech Stack */}
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

          {/* Hover/Touch Overlay with Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered || isTouched ? 1 : 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 glass-overlay bg-black/60 flex items-center justify-center gap-4 flex-col"
            style={{ willChange: "opacity" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button
                size="sm"
                onClick={() => window.open(project.github, "_blank")}
                className="bg-white text-black hover:bg-gray-200 font-semibold transition-all duration-300 button-icon-animated button-ripple"
                data-testid={`button-view-code-${index}`}
              >
                <motion.span
                  className="icon-slide"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Code2 className="mr-2 h-4 w-4 inline" />
                </motion.span>
                View Code
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Button
                size="sm"
                onClick={() => window.open(project.demo, "_blank")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300 button-icon-animated button-ripple"
                data-testid={`button-live-demo-${index}`}
              >
                <motion.span
                  className="icon-slide"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Rocket className="mr-2 h-4 w-4 inline" />
                </motion.span>
                Live Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-lg">{project.title}</div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${index}`}>
            <StaggeredText text={project.title} delay={0.05} />
          </h3>
          <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

          {/* Highlights */}
          <ul className="space-y-2 mb-4 flex-1">
            {project.highlights.map((highlight, i) => (
              <li key={i} className="text-xs text-muted-foreground flex gap-2">
                <span className="text-primary mt-1 shrink-0 flex-shrink-0">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Tech Badges */}
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
    </StaggeredItem>
  );
}
