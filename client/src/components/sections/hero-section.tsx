import { useRef, useState, useEffect } from "react";
import { HeroBackground } from "./hero-background";
import { HeroContent } from "./hero-content";

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 page-section cursor-pointer"
      id="home"
      data-testid="section-hero"
      aria-label="Hero section - Introduction featuring ML Engineer Sangam Nirala"
    >
      <HeroBackground scrollY={scrollY} />
      <HeroContent />
    </section>
  );
}
