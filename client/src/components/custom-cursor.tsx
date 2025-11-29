import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current || !cursorDotRef.current) return;

      // Update cursor position
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
      
      cursorDotRef.current.style.left = `${e.clientX}px`;
      cursorDotRef.current.style.top = `${e.clientY}px`;

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList.contains("cursor-glow") ||
        target.closest("button") ||
        target.closest("a");

      if (cursorRef.current) {
        if (isInteractive) {
          cursorRef.current.classList.add("active");
        } else {
          cursorRef.current.classList.remove("active");
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const blendMode = theme === "light" ? "multiply" : "screen";
  const ringClass = theme === "light" ? "border-primary/80" : "border-primary/60";
  const dotClass = theme === "light" ? "bg-primary/70" : "bg-primary";

  return (
    <>
      {/* Outer glow ring */}
      <motion.div
        ref={cursorRef}
        className={`custom-cursor-glow fixed pointer-events-none w-8 h-8 border-2 rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block ${ringClass}`}
        style={{ 
          willChange: "transform",
          mixBlendMode: blendMode,
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot fixed pointer-events-none w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block ${dotClass}`}
        style={{ 
          willChange: "transform",
          mixBlendMode: blendMode,
        }}
      />
    </>
  );
}
