import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, MapPin, X } from "lucide-react";
import { AnimatedSection } from "@/components/utils/animated-section";
import { ExperienceCard } from "./experience-card";
import { experiences } from "./experience-data";

export function ExperienceSection() {
  const [hoveredDotIndex, setHoveredDotIndex] = useState<number | null>(null);
  const [touchedDotIndex, setTouchedDotIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
    if (!isMobile) {
      setHoveredDotIndex(index);
      const rect = e.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + window.scrollY - 60,
        left: rect.left + window.scrollX,
      });
    }
  };

  const handleDotTouch = (e: React.TouchEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    setTouchedDotIndex(touchedDotIndex === index ? null : index);
    const rect = e.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const tooltipWidth = 220;
    const padding = 16;
    
    // Center tooltip on viewport, with bounds checking
    let left = rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(padding, Math.min(left, viewportWidth - tooltipWidth - padding));
    
    setTooltipPosition({
      top: rect.top + window.scrollY - 100,
      left: left,
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
            {(hoveredDotIndex !== null || touchedDotIndex !== null) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="fixed glass-enhanced border border-primary/40 rounded-lg p-4 shadow-xl z-50 pointer-events-auto"
                style={{
                  top: `${tooltipPosition.top}px`,
                  left: `${tooltipPosition.left}px`,
                  minWidth: "220px",
                  maxWidth: "90vw",
                }}
                data-testid={`tooltip-experience-${hoveredDotIndex ?? touchedDotIndex}`}
              >
                {touchedDotIndex !== null && (
                  <button
                    onClick={() => setTouchedDotIndex(null)}
                    className="absolute top-2 right-2 p-1 hover:bg-primary/20 rounded-md transition-colors"
                    aria-label="Close tooltip"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <p className="font-bold text-primary text-sm">{experiences[hoveredDotIndex ?? touchedDotIndex!].company}</p>
                <p className="text-xs text-muted-foreground">{experiences[hoveredDotIndex ?? touchedDotIndex!].role}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  {experiences[hoveredDotIndex ?? touchedDotIndex!].period}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {experiences[hoveredDotIndex ?? touchedDotIndex!].location}
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
              onTimelineNodeTouch={(e) => handleDotTouch(e, index)}
              onTimelineNodeClick={() => scrollToExperience(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
