import { motion } from "framer-motion";

interface StaggerListProps {
  items: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  staggerDelay?: number;
  containerDelay?: number;
}

export function StaggerList({
  items,
  className = "space-y-3",
  itemClassName = "",
  staggerDelay = 0.1,
  containerDelay = 0,
}: StaggerListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: containerDelay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, y: 10 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {items.map((item, idx) => (
        <motion.div key={idx} variants={itemVariants} className={itemClassName}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
