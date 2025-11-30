import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  navItems: string[];
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function MobileMenu({ isOpen, navItems, activeSection, onNavigate }: MobileMenuProps) {
  return (
    <>
      {/* Mobile menu container */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-t border-primary/30 relative z-50 cursor-pointer bg-gradient-to-b from-card to-background/95"
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="px-6 py-4 space-y-2 backdrop-blur-lg" role="menubar">
          {navItems.map((item) => (
            <motion.button
              key={item}
              type="button"
              onClick={() => onNavigate(item.toLowerCase())}
              whileHover={{ x: 6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`block w-full text-left py-3.5 px-5 rounded-lg font-medium transition-all duration-300 cursor-pointer text-base sm:text-lg ${
                activeSection === item.toLowerCase()
                  ? "text-primary bg-primary/15 border border-primary/30 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:border hover:border-primary/20"
              }`}
              data-testid={`nav-link-mobile-${item.toLowerCase()}`}
              role="menuitem"
              aria-current={activeSection === item.toLowerCase() ? "page" : undefined}
              aria-label={`Navigate to ${item}`}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onNavigate("")}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden pointer-events-auto"
            style={{ top: "auto", bottom: 0, zIndex: 30, willChange: "opacity" }}
            data-testid="mobile-menu-backdrop"
          />
        )}
      </AnimatePresence>
    </>
  );
}
