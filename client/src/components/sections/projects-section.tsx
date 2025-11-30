import { Code2 } from "lucide-react";
import { StaggeredContainer, SectionHeading } from "@/components/animations/scroll-animations";
import { ProjectCard } from "./project-card";
import { projects } from "./projects-data";

export function ProjectsSection() {
  return (
    <section id="projects" className="pt-16 spacing-premium bg-background section-pattern-default relative" data-testid="section-projects" role="region" aria-label="Featured projects section">
      <div className="section-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        {/* Section Heading */}
        <SectionHeading className="flex flex-col items-center justify-center gap-3 mb-12">
          <Code2 className="h-8 w-8 text-primary" />
          <h2 className="gradient-text-heading">Featured Projects</h2>
          <div className="w-16 gradient-underline-animated" />
        </SectionHeading>

        {/* Projects Grid */}
        <StaggeredContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </StaggeredContainer>
      </div>
    </section>
  );
}
