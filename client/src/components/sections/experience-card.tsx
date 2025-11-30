import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle, Lightbulb, Target } from "lucide-react";
import { AnimatedSection } from "@/components/utils/animated-section";
import type { Experience } from "./experience-data";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  onTimelineNodeHover: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onTimelineNodeLeave: () => void;
  onTimelineNodeClick: () => void;
}

export function ExperienceCard({
  experience,
  index,
  onTimelineNodeHover,
  onTimelineNodeLeave,
  onTimelineNodeClick,
}: ExperienceCardProps) {
  return (
    <div id={`experience-${index}`}>
      <AnimatedSection className="relative mb-12 last:mb-0">
        <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
          {/* Spacer for timeline */}
          <div className="hidden md:block md:w-1/2" />

          {/* Timeline Node */}
          <motion.button
            onClick={onTimelineNodeClick}
            onMouseEnter={onTimelineNodeHover}
            onMouseLeave={onTimelineNodeLeave}
            className="timeline-node absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary via-blue-400 to-primary border-4 border-background -translate-x-1/2 z-10 cursor-pointer transition-all duration-300 hover:scale-150 hover:shadow-2xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
            data-testid={`timeline-dot-${index}`}
            type="button"
            aria-label={`Scroll to ${experience.company} experience`}
            style={{ willChange: "transform" }}
          />

          {/* Experience Card */}
          <Card
            className={`glass-dark gradient-border card-depth-2 ml-12 md:ml-0 md:w-1/2 p-6 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
              index % 2 === 0 ? "md:mr-8" : "md:ml-8"
            }`}
            data-testid={`card-experience-${index}`}
          >
            {/* Header with Logo */}
            <div className="flex items-start gap-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`company-logo company-logo-glow w-16 h-16 rounded-full bg-gradient-to-br ${experience.logoColor} flex items-center justify-center shrink-0 shadow-lg transition-all duration-300`}
              >
                <span className="text-xl font-bold text-white">{experience.logoInitials}</span>
              </motion.div>

              <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h3
                    className="text-2xl font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent"
                    data-testid={`text-company-${index}`}
                  >
                    {experience.company}
                  </h3>
                  <p className="text-lg text-primary font-bold tracking-tight mt-1">{experience.role}</p>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-muted-foreground">{experience.period}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 sm:justify-end">
                    <MapPin className="h-3 w-3" />
                    {experience.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <ul className="space-y-3 mb-4">
              {experience.achievements.map((achievement, i) => {
                const icons = [CheckCircle, Lightbulb, Target];
                const Icon = icons[i % icons.length];
                return (
                  <motion.li
                    key={i}
                    className="text-sm text-muted-foreground flex gap-3 items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                );
              })}
            </ul>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {experience.tech.map((tech, i) => (
                <Badge key={i} variant="secondary" className="font-mono text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </AnimatedSection>
    </div>
  );
}
