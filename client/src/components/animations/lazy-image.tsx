import { motion } from "framer-motion";
import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function LazyImage({ src, alt, className = "", containerClassName = "" }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className={containerClassName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}
