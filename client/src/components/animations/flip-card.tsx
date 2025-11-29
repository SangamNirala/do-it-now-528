import { motion } from "framer-motion";
import { useState } from "react";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className = "" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Front */}
      <motion.div
        style={{
          backfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
        }}
      >
        {front}
      </motion.div>

      {/* Back */}
      <motion.div
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          transformStyle: "preserve-3d",
          position: "absolute",
          inset: 0,
        }}
      >
        {back}
      </motion.div>
    </motion.div>
  );
}
