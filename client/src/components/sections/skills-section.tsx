import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/utils/animated-section";
import { StaggeredText } from "@/components/animations/staggered-text";
import { skillIcons, skillsByTier, tierConfig, StarIcon } from "./skills-data";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="pt-16 spacing-section-lg bg-card section-pattern-subtle relative"
      data-testid="section-skills"
      role="region"
      aria-label="Technical skills section"
    >
      <div className="content-max-width mx-auto section-spacing-horizontal">
        {/* Section Heading */}
        <AnimatedSection>
          <motion.h2 
            className="gradient-text-heading mb-12 text-center inline-block w-full cursor-pointer"
            onHoverStart={(event) => {
              const target = event.currentTarget;
              target.style.animation = "glitch-text 0.3s ease-in-out";
            }}
          >
            <StaggeredText text="Technical Skills" delay={0.1} />
          </motion.h2>
        </AnimatedSection>

        {/* Skills Grid by Tier */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skillsByTier).map(([tier, skills], tierIndex) => {
            const config = tierConfig[tier as keyof typeof tierConfig];

            return (
              <AnimatedSection key={tier}>
                <Card
                  className="glass-animated gradient-border card-depth-2 p-6 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  data-testid={`card-skill-tier-${tierIndex}`}
                >
                  {/* Tier Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className={`p-3 rounded-lg bg-gradient-to-br ${config.color} transform-gpu`}
                      whileHover={{
                        rotateX: 360,
                        rotateY: 20,
                        scale: 1.05
                      }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                      style={{ perspective: "1000px" }}
                    >
                      <span className="text-sm font-bold text-white">{tier}</span>
                    </motion.div>
                    <div className="flex gap-1">
                      {Array.from({ length: config.stars }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {skills.map((skill) => {
                      const SkillIcon = skillIcons[skill];
                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          {SkillIcon && (
                            <motion.div
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                              className="icon-hover-rotate"
                            >
                              <SkillIcon className="h-5 w-5 text-primary flex-shrink-0" />
                            </motion.div>
                          )}
                          <motion.span 
                            className="text-sm font-medium text-foreground text-underline-hover"
                            whileHover={{ color: "#7c3aed" }}
                          >
                            {skill}
                          </motion.span>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Tech Badge - 3D Rotating */}
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      rotateY: 360,
                      rotateX: 10,
                      y: -4
                    }}
                    transition={{ type: "spring", stiffness: 300, duration: 0.8 }}
                    style={{ perspective: "1000px" }}
                  >
                    <Badge
                      variant="secondary"
                      className={`mt-6 bg-gradient-to-r ${config.color} text-white border-0 skill-badge-hover cursor-pointer inline-block transform-gpu`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {skills.length} Skills
                    </Badge>
                  </motion.div>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Skills Summary */}
        <AnimatedSection className="mt-16 text-center">
          <div className="bg-card/50 border border-primary/20 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Specializing In
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {skillsByTier.Expert.map((skill) => (
                <Badge
                  key={skill}
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
