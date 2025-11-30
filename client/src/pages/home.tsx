import { lazy, Suspense, useState } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { ProjectsSectionSkeleton, SkillsSectionSkeleton } from "@/components/skeleton-loader";
import { ContactForm } from "@/components/contact-form";
import { SocialProofCards } from "@/components/social-proof";
import { CustomCursor } from "@/components/custom-cursor";
import { FloatingNav } from "@/components/navigation/floating-nav";
import { GlossaryDialog } from "@/components/glossary/glossary-dialog";
import { AIChatDialog } from "@/components/ai-chat-dialog";
import { getWebsiteContent } from "@/lib/website-content";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { ScrollProgressBar } from "@/components/utils/scroll-progress-bar";
import { BackToTopButton } from "@/components/utils/back-to-top-button";
import { FloatingContactWidget } from "@/components/utils/floating-contact-widget";
import { StatsSection } from "@/components/sections/stats-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { HonorsSection } from "@/components/sections/honors-section";
import { CTASection } from "@/components/sections/cta-section";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navigation/navbar";

const ProjectsSection = lazy(() => import("@/components/sections/projects-section").then(m => ({ default: m.ProjectsSection })));
const SkillsSection = lazy(() => import("@/components/sections/skills-section").then(m => ({ default: m.SkillsSection })));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  );
}

export default function Home() {
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const sections = useScrollSpy(["home", "about", "stats", "experience", "projects", "skills", "education", "honors"]);

  return (
    <div className="min-h-screen bg-background cursor-glow relative">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar onGlossaryClick={() => setGlossaryOpen(true)} onAIClick={() => setAiChatOpen(true)} />
      <GlossaryDialog open={glossaryOpen} onOpenChange={setGlossaryOpen} />
      <AIChatDialog isOpen={aiChatOpen} onClose={() => setAiChatOpen(false)} websiteContent={getWebsiteContent()} />
      <FloatingNav sections={sections.map(s => ({ id: s, title: s.charAt(0).toUpperCase() + s.slice(1) }))} activeSection={sections[0] || "home"} />
      
      <main id="main-content" tabIndex={-1} role="main" className="focus:outline-none">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ExperienceSection />
        <Suspense fallback={<ProjectsSectionSkeleton />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SkillsSectionSkeleton />}>
          <SkillsSection />
        </Suspense>
        <EducationSection />
        <HonorsSection />
        <CTASection />
      </main>
      
      <Footer />
      <BackToTopButton />
      <FloatingContactWidget />
    </div>
  );
}
