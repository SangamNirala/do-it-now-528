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

      // Make cursor always visible with forced opacity
      cursorRef.current.style.opacity = "1";
      cursorDotRef.current.style.opacity = "1";
      cursorRef.current.style.visibility = "visible";
      cursorDotRef.current.style.visibility = "visible";

      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const isInputField = target.tagName === "INPUT" || target.closest("input");
      
      // Check if we're inside the AI dialog by traversing up the DOM
      let isInDialog = false;
      let current: HTMLElement | null = target;
      while (current && current !== document.body) {
        if (current.getAttribute("data-testid") === "ai-chat-dialog") {
          isInDialog = true;
          break;
        }
        current = current.parentElement as HTMLElement | null;
      }
      
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList.contains("cursor-glow") ||
        target.closest("button") ||
        target.closest("a") ||
        isInDialog;

      if (cursorRef.current) {
        // Handle dialog state - dark cursor in dialog
        if (isInDialog) {
          cursorRef.current.classList.add("in-dialog");
          cursorDotRef.current.classList.add("in-dialog");
          // Always active in dialog
          if (!isInputField) {
            cursorRef.current.classList.add("active");
            cursorDotRef.current.classList.add("active");
          } else {
            cursorRef.current.classList.remove("active");
            cursorDotRef.current.classList.remove("active");
          }
        } else {
          cursorRef.current.classList.remove("in-dialog");
          cursorDotRef.current.classList.remove("in-dialog");
          // Only add active class if interactive but NOT an input field
          if (isInteractive && !isInputField) {
            cursorRef.current.classList.add("active");
            cursorDotRef.current.classList.add("active");
          } else {
            cursorRef.current.classList.remove("active");
            cursorDotRef.current.classList.remove("active");
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const blendMode = theme === "light" ? "darken" : "screen";
  const ringClass = theme === "light" ? "border-primary" : "border-primary/60";
  const dotClass = theme === "light" ? "bg-primary" : "bg-primary";

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
