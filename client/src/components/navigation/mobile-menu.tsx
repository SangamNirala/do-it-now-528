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
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-t border-primary/30 relative z-50 cursor-pointer bg-gradient-to-b from-card to-background/95"
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <motion.div 
          className="px-6 py-4 space-y-2 backdrop-blur-lg" 
          role="menubar"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ delay: isOpen ? 0.1 : 0, duration: 0.3 }}
        >
          {navItems.map((item, index) => (
            <motion.button
              key={item}
              type="button"
              onClick={() => onNavigate(item.toLowerCase())}
              whileHover={{ x: 8, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isOpen ? 1 : 0, 
                x: isOpen ? 0 : -20 
              }}
              transition={{ 
                delay: isOpen ? index * 0.06 : 0,
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              className={`block w-full text-left py-3.5 px-5 rounded-lg font-medium transition-all duration-300 cursor-pointer text-base sm:text-lg ${
                activeSection === item.toLowerCase()
                  ? "text-primary bg-gradient-to-r from-primary/20 to-purple-500/10 border border-primary/30 font-semibold shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-primary/12 hover:to-purple-500/10 hover:border hover:border-primary/20"
              }`}
              data-testid={`nav-link-mobile-${item.toLowerCase()}`}
              role="menuitem"
              aria-current={activeSection === item.toLowerCase() ? "page" : undefined}
              aria-label={`Navigate to ${item}`}
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
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
