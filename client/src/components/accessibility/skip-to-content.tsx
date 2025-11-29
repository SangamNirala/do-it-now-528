import { motion } from "framer-motion";

export function SkipToContent() {
  const handleSkip = () => {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.a
      href="#main-content"
      onClick={(e) => {
        e.preventDefault();
        handleSkip();
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      data-testid="skip-to-content"
      aria-label="Skip to main content"
    >
      Skip to main content
    </motion.a>
  );
}
