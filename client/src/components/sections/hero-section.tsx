import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, Phone, Download, ExternalLink, ChevronDown } from "lucide-react";
import heroBackground from "@assets/generated_images/neural_network_tech_background.png";
import profileImage from "@assets/image_1764403838014.png";

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

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    window.open("/api/resume", "_blank");
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 page-section cursor-pointer" id="home" data-testid="section-hero" aria-label="Hero section - Introduction featuring ML Engineer Sangam Nirala">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
        style={{ 
          backgroundImage: `url(${heroBackground})`,
          transform: `translateY(${scrollY * 0.6}px)`,
          willChange: "transform"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      <div className="absolute inset-0 hero-pattern pointer-events-none" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="blob-float-1 absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl"
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="blob-float-2 absolute top-1/2 -right-32 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="blob-float-3 absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/15 to-transparent blur-3xl"
          style={{ willChange: "transform" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl cursor-pointer"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 flex justify-center"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-lg animate-pulse" />
              <div className="relative w-full h-full rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
                <img src={profileImage} alt="Sangam Nirala" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent tracking-tight mb-4 line-clamp-2 sm:line-clamp-none"
            data-testid="text-hero-name"
            style={{ willChange: "transform, opacity" }}
          >
            Sangam Nirala
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl text-blue-200 font-medium mb-6 break-words"
            data-testid="text-hero-title"
            style={{ willChange: "transform, opacity" }}
          >
            Machine Learning Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed px-2 break-words"
            data-testid="text-hero-summary"
            style={{ willChange: "transform, opacity" }}
          >
            Building production-ready ML systems with expertise in MLOps, deep learning, and cloud deployment. Passionate about end-to-end pipeline automation and scalable model deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="w-full"
          >
            <div className="button-group flex flex-col sm:flex-row items-center justify-center mb-4 w-full gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={scrollToProjects}
                  className="w-full sm:w-auto cta-glow glass-button-primary px-6 sm:px-8 py-4 sm:py-6 rounded-lg font-semibold text-white min-h-12 sm:min-h-9 relative z-0"
                  data-testid="button-view-projects"
                  aria-label="See my featured projects"
                >
                  See My Work
                  <motion.span
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="inline-block ml-2"
                    aria-hidden="true"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </motion.span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={downloadResume}
                  className="w-full sm:w-auto glass-button px-6 sm:px-8 py-4 sm:py-6 rounded-lg font-semibold text-white min-h-12 sm:min-h-9"
                  data-testid="button-download-resume"
                  aria-label="Download my resume in PDF format"
                >
                  Download Resume
                  <motion.span
                    whileHover={{ scale: 1.3, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="inline-block ml-2"
                    aria-hidden="true"
                  >
                    <Download className="h-5 w-5" />
                  </motion.span>
                </Button>
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="cta-microcopy"
              data-testid="text-cta-microcopy"
            >
              ↓ Scroll to see featured projects
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-6"
          >
            <motion.a
              href="https://linkedin.com/in/sangamnirala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="LinkedIn Profile"
              data-testid="link-linkedin"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Linkedin className="h-6 w-6" />
              </motion.span>
            </motion.a>
            <motion.a
              href="https://github.com/sangamnirala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="GitHub Profile"
              data-testid="link-github"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span whileHover={{ rotate: -360 }} transition={{ duration: 0.5 }}>
                <Github className="h-6 w-6" />
              </motion.span>
            </motion.a>
            <motion.a
              href="mailto:srnirala_b22@et.vjti.ac.in"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Email"
              data-testid="link-email"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400 }}>
                <Mail className="h-6 w-6" />
              </motion.span>
            </motion.a>
            <motion.a
              href="tel:+919987937919"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              aria-label="Phone"
              data-testid="link-phone"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span whileHover={{ rotate: 10 }} transition={{ type: "spring", stiffness: 400 }}>
                <Phone className="h-6 w-6" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer group"
            onClick={scrollToProjects}
          >
            <ChevronDown className="h-8 w-8 text-white/60 group-hover:text-white/90 transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
