import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "slideIn" | "fadeIn" | "scaleIn" | "slideUp";
}

export function ScrollAnimation({
  children,
  delay = 0,
  className = "",
  variant = "slideUp",
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants: Record<string, any> = {
    slideIn: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    },
  };

  const selected = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={selected.initial}
      animate={isInView ? selected.animate : selected.initial}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, x: -30 }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
