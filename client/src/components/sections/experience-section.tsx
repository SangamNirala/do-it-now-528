import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/utils/animated-section";
import { ExperienceCard } from "./experience-card";
import { experiences } from "./experience-data";

export function ExperienceSection() {
  const [hoveredDotIndex, setHoveredDotIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const scrollToExperience = (index: number) => {
    const element = document.getElementById(`experience-${index}`);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleDotHover = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setHoveredDotIndex(index);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 60,
      left: rect.left + window.scrollX,
    });
  };

  return (
    <section id="experience" className="pt-16 spacing-premium bg-card section-pattern-default relative" data-testid="section-experience">
      <div className="section-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        {/* Section Heading */}
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center gap-3 mb-12">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="gradient-text-heading">Experience</h2>
            <div className="w-16 gradient-underline-animated" />
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-0.5"
            style={{ willChange: "background-position" }}
          />

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredDotIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="fixed glass-enhanced border border-primary/40 rounded-lg p-3 shadow-xl z-50 pointer-events-none"
                style={{
                  top: `${tooltipPosition.top}px`,
                  left: `${tooltipPosition.left - 80}px`,
                  minWidth: "200px",
                }}
                data-testid={`tooltip-experience-${hoveredDotIndex}`}
              >
                <p className="font-bold text-primary text-sm">{experiences[hoveredDotIndex].company}</p>
                <p className="text-xs text-muted-foreground">{experiences[hoveredDotIndex].role}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  {experiences[hoveredDotIndex].period}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {experiences[hoveredDotIndex].location}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={index}
              experience={exp}
              index={index}
              onTimelineNodeHover={(e) => handleDotHover(e, index)}
              onTimelineNodeLeave={() => setHoveredDotIndex(null)}
              onTimelineNodeClick={() => scrollToExperience(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
