import { useState, useEffect, useRef } from "react";
import { motion, useScroll } from "framer-motion";
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
  const { scrollYProgress } = useScroll();

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
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />
      
      <nav className="fixed top-0 left-0 right-0 z-40 navbar-glass cursor-pointer" data-testid="navbar" role="navigation" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between gap-6 h-12">
          {/* Logo Section */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection("home")}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="logo-badge flex-shrink-0"
              data-testid="nav-logo"
              aria-label="Portfolio home"
            >
              <span className="logo-badge-text">SN</span>
            </motion.button>

            {/* Visual Divider */}
            <div className="hidden md:block w-px h-6 bg-gradient-to-b from-primary/0 via-primary/20 to-primary/0" />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 relative" role="menubar">
              {/* Animated Active Pill Background */}
              <motion.div
                className="absolute inset-y-1 bg-gradient-to-r from-primary/20 to-purple-500/15 rounded-lg pointer-events-none"
                animate={{ width: underlineStyle.width, x: underlineStyle.x }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ originX: 0 }}
              />
              
              {/* Animated Underline */}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
                animate={{ width: underlineStyle.width, x: underlineStyle.x }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ originX: 0 }}
              />

            {navItems.map((item) => (
              <motion.button
                key={item}
                ref={(el) => {
                  navRefs.current[item.toLowerCase()] = el;
                }}
                onClick={() => scrollToSection(item.toLowerCase())}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`text-sm font-medium transition-all duration-200 cursor-pointer relative py-2.5 px-3 rounded-lg h-full flex items-center z-10 ${
                  activeSection === item.toLowerCase() 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-primary/25 hover:to-purple-500/20 hover:shadow-sm"
                }`}
                data-testid={`nav-link-${item.toLowerCase()}`}
                role="menuitem"
                aria-current={activeSection === item.toLowerCase() ? "page" : undefined}
                aria-label={`Navigate to ${item}`}
              >
                {item}
              </motion.button>
            ))}
            </div>
          </div>

          {/* Right Actions Group */}
          <div className="navbar-actions-section">
            {/* Visual Divider */}
            <div className="hidden md:block navbar-divider" />

            {/* Primary CTA Buttons Group */}
            <div className="navbar-primary-actions">
              {/* AI Button */}
              <motion.button
                onClick={onAIClick}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="ai-button relative z-10"
                aria-label="AI assistant"
                data-testid="button-ai"
              >
                <svg className="w-4 h-4 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
                <span className="relative z-10">AI Chat</span>
              </motion.button>

              {/* Resume Button */}
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Button
                  size="sm"
                  onClick={() => window.open("/api/resume", "_blank")}
                  className="resume-button text-white"
                  data-testid="nav-button-resume"
                >
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Resume</span>
                </Button>
              </motion.div>
            </div>

            {/* Utility Buttons Group (subtle, secondary) */}
            <div className="navbar-utility-buttons gap-2">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="utility-button"
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
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="md:hidden utility-button-mobile"
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
            </div>
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
    </>
  );
}
