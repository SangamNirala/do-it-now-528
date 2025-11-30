import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Trophy, Briefcase } from "lucide-react";
import { SectionHeading, StaggeredContainer, StaggeredItem } from "@/components/animations/scroll-animations";

const honors = [
  {
    title: "Winner (Rank 1)",
    event: "Case Presentation Competition – StemFusion (STEMExpedition)",
    description: "Secured first place in a competitive case presentation, demonstrating analytical and presentation skills.",
    icon: Trophy,
    borderColor: "border-l-yellow-500",
    badgeColor: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  },
  {
    title: "Marketing Head",
    event: "Technovanza - VJTI's Flagship Tech Fest",
    description: "Led marketing strategy and outreach efforts, increasing event visibility and sponsor engagement.",
    icon: Briefcase,
    borderColor: "border-l-blue-500",
    badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
];

export function HonorsSection() {
  return (
    <section id="honors" className="spacing-premium bg-card section-pattern-subtle relative" data-testid="section-honors">
      <div className="section-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <SectionHeading className="flex flex-col items-center justify-center gap-3 mb-12">
          <Trophy className="h-8 w-8 text-primary" />
          <h2 className="gradient-text-heading">Honors & Achievements</h2>
          <div className="w-16 gradient-underline-animated" />
        </SectionHeading>

        <StaggeredContainer className="grid md:grid-cols-2 gap-6">
          {honors.map((honor, index) => (
            <StaggeredItem key={index}>
                <Card
                  className={`glass-dark gradient-border card-depth-2 p-6 h-full honor-card card-colored-border border-l-4 ${honor.borderColor} cursor-pointer hover-elevate`}
                  data-testid={`card-honor-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className={`honor-badge-icon ${honor.badgeColor}`}
                      animate={{ 
                        y: [0, -8, 0],
                        x: [0, 2, -2, 0]
                      }}
                      transition={{ duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <motion.span
                        className="block"
                      >
                        <honor.icon className="h-6 w-6 trophy-icon-animate" />
                      </motion.span>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{honor.title}</h3>
                      <p className="text-primary font-medium text-sm mb-2">{honor.event}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{honor.description}</p>
                    </div>
                  </div>
                </Card>
            </StaggeredItem>
          ))}
        </StaggeredContainer>
      </div>
    </section>
  );
}
