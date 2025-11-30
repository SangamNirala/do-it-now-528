import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X, Download } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { MobileMenu } from "./mobile-menu";

export function Navbar({ onGlossaryClick, onAIClick }: { onGlossaryClick: () => void; onAIClick: () => void }) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, x: 0 });
  const navRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "stats", "experience", "projects", "skills", "education", "honors"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update underline position when active section changes
  useEffect(() => {
    const activeRef = navRefs.current[activeSection];
    if (activeRef) {
      const { offsetLeft, offsetWidth } = activeRef;
      setUnderlineStyle({ width: offsetWidth, x: offsetLeft });
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    if (!id) {
      setMobileMenuOpen(false);
      return;
    }
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const navItems = ["About", "Experience", "Projects", "Skills", "Education"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border cursor-pointer" data-testid="navbar" role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection("home")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="logo-badge"
            data-testid="nav-logo"
            aria-label="Portfolio home"
          >
            <span className="logo-badge-text">SN</span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 relative" role="menubar">
            {/* Animated Underline */}
            <motion.div
              className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
              animate={{ width: underlineStyle.width, x: underlineStyle.x }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ originX: 0 }}
            />

            {navItems.map((item) => (
              <button
                key={item}
                ref={(el) => {
                  navRefs.current[item.toLowerCase()] = el;
                }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-colors duration-200 cursor-pointer relative py-2 ${
                  activeSection === item.toLowerCase() ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`nav-link-${item.toLowerCase()}`}
                role="menuitem"
                aria-current={activeSection === item.toLowerCase() ? "page" : undefined}
                aria-label={`Navigate to ${item}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* AI Button */}
            <motion.button
              onClick={onAIClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 hover:bg-primary/10 cursor-pointer hidden sm:block"
              aria-label="AI assistant"
              data-testid="button-ai"
            >
              AI
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-300 hover:bg-primary/10 cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              data-testid="button-theme-toggle"
              aria-pressed={theme === "dark"}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </motion.div>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden relative p-2.5 rounded-lg text-muted-foreground hover:text-foreground bg-primary/5 hover:bg-primary/15 transition-all duration-300 cursor-pointer border border-primary/20 hover:border-primary/40"
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              data-testid="button-hamburger"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </motion.button>

            {/* Resume Button */}
            <Button
              size="sm"
              onClick={() => window.open("/api/resume", "_blank")}
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 active:scale-95"
              data-testid="nav-button-resume"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Resume</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        navItems={navItems}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </nav>
  );
}
