import { motion } from "framer-motion";

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  glitch?: boolean;
  perspective?: boolean;
}

export function StaggeredText({
  text,
  className = "",
  delay = 0,
  glitch = false,
  perspective = false,
}: StaggeredTextProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const glitchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
      animation: "glitch-text 0.3s ease-in-out",
    },
  };

  const perspectiveVariants = {
    hidden: { opacity: 0, rotateX: 45, y: 30 },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const selectedVariants = glitch
    ? glitchVariants
    : perspective
      ? perspectiveVariants
      : itemVariants;

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={selectedVariants}
          className={perspective ? "inline-block" : ""}
          style={perspective ? { perspective: "1000px" } : {}}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "top" | "bottom";
}

export function RevealText({
  text,
  className = "",
  delay = 0,
  direction = "left",
}: RevealTextProps) {
  const directionMap = {
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    top: { x: 0, y: -50 },
    bottom: { x: 0, y: 50 },
  };

  const start = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...start, filter: "blur(10px)" }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {text}
    </motion.div>
  );
}
