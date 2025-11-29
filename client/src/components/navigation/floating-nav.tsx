import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

interface Section {
  id: string;
  title: string;
}

interface FloatingNavProps {
  sections: Section[];
  activeSection: string;
}

export function FloatingNav({ sections, activeSection }: FloatingNavProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { scrollY: scrollYMotion } = useScroll();

  useEffect(() => {
    return scrollYMotion.onChange((latest) => {
      setScrollY(latest);
      setIsMinimized(latest > 300);
    });
  }, [scrollYMotion]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeSectionTitle = sections.find((s) => s.id === activeSection)?.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed right-3 sm:right-4 md:right-6 lg:right-8 bottom-20 sm:bottom-24 md:bottom-32 lg:bottom-8 z-30 flex flex-col gap-2 sm:gap-3"
      data-testid="floating-nav"
    >
      {/* Minimized State */}
      {isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-card/95 backdrop-blur-xl border border-primary/30 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="text-xs font-semibold text-muted-foreground text-center mb-1 hidden sm:block">
            {activeSectionTitle}
          </div>
          <div className="flex flex-col gap-1 sm:gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={scrollToTop}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full cursor-pointer hover:bg-primary/20 hover:border-primary/50"
              data-testid="button-scroll-top"
              title="Back to top"
            >
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Expanded State */}
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="bg-card/95 backdrop-blur-xl border border-primary/30 rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-shadow w-40 sm:w-48 space-y-1 sm:space-y-2"
        >
          <div className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 line-clamp-1">
            Quick Nav
          </div>
          <div className="space-y-0.5 sm:space-y-1 max-h-40 sm:max-h-48 overflow-y-auto">
            {sections.slice(0, 5).map((section) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ x: 3 }}
                className={`w-full text-left px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer truncate ${
                  activeSection === section.id
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:border hover:border-primary/20"
                }`}
                data-testid={`floating-nav-link-${section.id}`}
                title={section.title}
              >
                {section.title}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
