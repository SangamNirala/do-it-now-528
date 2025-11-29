import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface ProgressiveImageProps {
  src: string;
  blurHash?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function ProgressiveImage({
  src,
  blurHash,
  alt,
  className = "",
  containerClassName = "",
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!isLoaded && blurHash && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 ${className}`}
          style={{ willChange: "opacity" }}
        />
      )}

      {isInView && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ willChange: "opacity" }}
          loading="lazy"
          decoding="async"
        />
      )}

      {isInView && !isLoaded && (
        <div className={`absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 ${className}`} />
      )}
    </div>
  );
}
