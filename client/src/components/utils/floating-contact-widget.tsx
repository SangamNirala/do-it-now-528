import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

export function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const contactMethods = [
    { icon: Mail, label: "Email", href: "mailto:srnirala_b22@et.vjti.ac.in", color: "from-blue-500 to-blue-600", testid: "float-email" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/sangamnirala", color: "from-blue-600 to-blue-700", testid: "float-linkedin" },
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40" data-testid="floating-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 space-y-3 mb-2"
            style={{ willChange: "transform, opacity" }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : "_self"}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : ""}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r ${method.color} text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap`}
                data-testid={method.testid}
                style={{ willChange: "transform" }}
              >
                <method.icon className="h-4 w-4" />
                {method.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Open contact options"
        data-testid="button-floating-contact"
        style={{ willChange: "transform" }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: "transform" }}
        >
          <Mail className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </div>
  );
}
