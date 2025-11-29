import { useRef, useState, useEffect, lazy, Suspense, ReactNode } from "react";
const ProjectsSection = lazy(() => import("@/components/sections/projects-section").then(m => ({ default: m.ProjectsSection })));
const SkillsSection = lazy(() => import("@/components/sections/skills-section").then(m => ({ default: m.SkillsSection })));
import { ProjectsSectionSkeleton, SkillsSectionSkeleton } from "@/components/skeleton-loader";
import { ContactForm } from "@/components/contact-form";
import { SocialProofCards } from "@/components/social-proof";
import { CustomCursor } from "@/components/custom-cursor";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useCounter } from "@/hooks/use-counter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MapPin,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Trophy,
  Code2,
  Brain,
  Cloud,
  Wrench,
  ChevronDown,
  Linkedin,
  Github,
  Phone,
  FileCode,
  Globe,
  Database,
  Layers,
  GitBranch,
  Container,
  Cpu,
  Eye,
  Rocket,
  Server,
  Zap,
  Network,
  Box,
  Terminal,
  Star,
  ArrowUp,
  Sun,
  Moon,
  Menu,
  X,
  Calendar,
  CheckCircle,
  Lightbulb,
  Target,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import heroBackground from "@assets/generated_images/neural_network_tech_background.png";
import profileImage from "@assets/image_1764392269903.png";

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-border z-40">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        style={{ width: `${scrollProgress}%`, willChange: "width" }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const contactMethods = [
    { icon: Mail, label: "Email", href: "mailto:srnirala_b22@et.vjti.ac.in", color: "from-blue-500 to-blue-600", testid: "float-email" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/sangamnirala", color: "from-blue-600 to-blue-700", testid: "float-linkedin" },
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-40" data-testid="floating-widget">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 space-y-3 mb-2"
            style={{ willChange: "transform, opacity" }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : "_self"}
                rel={method.href.startsWith("http") ? "noopener noreferrer" : ""}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r ${method.color} text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap`}
                data-testid={method.testid}
                style={{ willChange: "transform" }}
              >
                <method.icon className="h-4 w-4" />
                {method.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Open contact options"
        data-testid="button-floating-contact"
        style={{ willChange: "transform" }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ willChange: "transform" }}
        >
          <Mail className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </div>
  );
}

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-8 left-8 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow duration-300"
      aria-label="Back to top"
      data-testid="button-back-to-top"
      style={{ willChange: "transform, opacity" }}
    >
      <ArrowUp className="h-5 w-5" />
    </motion.button>
  );
}

function HeroSection() {
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
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 page-section cursor-pointer" id="home" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
        style={{ 
          backgroundImage: `url(${heroBackground})`,
          transform: `translateY(${scrollY * 0.6}px)`,
          willChange: "transform"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 hero-pattern pointer-events-none" />
      
      {/* Animated Background Blobs */}
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
          {/* Profile Picture with Glow */}
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
            className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent tracking-tight mb-4"
            data-testid="text-hero-name"
            style={{ willChange: "transform, opacity" }}
          >
            Sangam Nirala
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-blue-200 font-medium mb-6"
            data-testid="text-hero-title"
            style={{ willChange: "transform, opacity" }}
          >
            Machine Learning Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
            data-testid="text-hero-summary"
            style={{ willChange: "transform, opacity" }}
          >
            Building production-ready ML systems with expertise in MLOps, deep learning, and cloud deployment.
            Passionate about end-to-end pipeline automation and scalable model deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="button-group flex flex-col sm:flex-row items-center justify-center mb-8 w-full"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="w-full sm:w-auto glass-button-primary px-6 sm:px-8 py-4 sm:py-6 rounded-lg font-semibold text-white min-h-12 sm:min-h-9"
                data-testid="button-view-projects"
              >
                View Projects
                <motion.span
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="inline-block ml-2"
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
              >
                Download Resume
                <motion.span
                  whileHover={{ scale: 1.3, rotate: -10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="inline-block ml-2"
                >
                  <Download className="h-5 w-5" />
                </motion.span>
              </Button>
            </motion.div>
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

function AboutSection() {
  const achievements = [
    { icon: Rocket, text: "Deployed real-time LSTM model serving 92.4% accuracy", badge: "Production" },
    { icon: Zap, text: "Increased sales by 40% through AI automation workflows", badge: "Impact" },
    { icon: Code2, text: "Full-stack ML engineer: deep learning → deployment → scaling", badge: "Expertise" },
  ];

  return (
    <section id="about" className="pt-16 spacing-premium bg-background section-pattern-default relative overflow-hidden" data-testid="section-about">
      <div className="section-divider" />
      
      {/* Subtle Background Pattern */}
      <div className="about-pattern absolute inset-0 pointer-events-none" />
      
      <div className="content-max-width mx-auto section-spacing-horizontal relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="about-heading mb-6"
              data-testid="text-about-title"
            >
              Impact-Driven ML Engineer
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="gradient-underline mx-auto w-20 mb-8"
              style={{ transformOrigin: "center" }}
            />
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-primary font-semibold tracking-wide"
            >
              2 Internships • Production Deployments • Real Business Results
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="achievement-card"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="mb-4"
                >
                  <item.icon className="h-10 w-10 text-primary group-hover:text-purple-400 transition-colors" />
                </motion.div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.text}</p>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="achievement-badge"
                >
                  {item.badge}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg text-muted-foreground leading-relaxed text-center mb-6" data-testid="text-about-description">
              I build <span className="text-primary font-semibold">production-grade ML systems</span> that drive real business results. From designing automated workflows that increased sales by <span className="text-primary font-semibold">40%</span> to deploying real-time LSTM models with <span className="text-primary font-semibold">92.4% accuracy</span>, I've proven my ability to ship end-to-end solutions.
            </p>
            <p className="text-base text-muted-foreground/80 leading-relaxed text-center">
              My expertise spans <span className="text-primary/80 font-medium">deep learning, MLOps, cloud deployment,</span> and <span className="text-primary/80 font-medium">full-stack development</span> using TensorFlow, PyTorch, GCP, and Docker. I'm passionate about building systems that scale.
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

const experiences = [
  {
    company: "Zenbourg",
    role: "AI Automation Intern",
    period: "July 2025 - August 2025",
    location: "Remote",
    logoInitials: "ZB",
    logoColor: "from-blue-500 to-indigo-600",
    achievements: [
      "Designed automated workflows using n8n and Make to integrate business tools and eliminate repetitive tasks",
      "Integrated workflows with websites by building frontend using JavaScript and React",
      "Created tools like email automation, WhatsApp automation, and calling agent, increasing sales by 40%",
    ],
    tech: ["n8n", "Make", "JavaScript", "React", "AI Automation"],
  },
  {
    company: "Sakura Biotech",
    role: "AI/ML Intern",
    period: "May 2025 – July 2025",
    location: "Mumbai, India",
    logoInitials: "SB",
    logoColor: "from-pink-500 to-rose-600",
    achievements: [
      "Developed and deployed a real-time algae monitoring system using LSTM model trained on 1,400+ synthetic sinusoidal pH readings, achieving 92.4% accuracy (MAE: 0.12) for 30-step forecasting",
      "Engineered a live pipeline streaming data every 10s, triggering predictions via Flask",
      "Developed a full stack application integrated with anomaly detection and multi-sensor expansion capability",
    ],
    tech: ["LSTM", "Flask", "Python", "ML Pipeline", "Real-time Systems"],
  },
];

function ExperienceSection() {
  const [hoveredDotIndex, setHoveredDotIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const scrollToExperience = (index: number) => {
    const element = document.getElementById(`experience-${index}`);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleDotHover = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setHoveredDotIndex(index);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY - 60,
      left: rect.left + window.scrollX,
    });
  };

  return (
    <section id="experience" className="pt-16 spacing-premium bg-card section-pattern-default relative" data-testid="section-experience">
      <div className="section-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center gap-3 mb-12">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
          </div>
        </AnimatedSection>

        <div className="relative">
          <motion.div 
            className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-0.5"
            style={{ willChange: "background-position" }}
          />

          {/* Timeline Tooltip */}
          <AnimatePresence>
            {hoveredDotIndex !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="fixed bg-background/95 backdrop-blur-md border border-primary/30 rounded-lg p-3 shadow-xl z-50 pointer-events-none"
                style={{
                  top: `${tooltipPosition.top}px`,
                  left: `${tooltipPosition.left - 80}px`,
                  minWidth: "200px",
                }}
                data-testid={`tooltip-experience-${hoveredDotIndex}`}
              >
                <p className="font-bold text-primary text-sm">{experiences[hoveredDotIndex].company}</p>
                <p className="text-xs text-muted-foreground">{experiences[hoveredDotIndex].role}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  {experiences[hoveredDotIndex].period}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {experiences[hoveredDotIndex].location}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {experiences.map((exp, index) => (
            <div key={index} id={`experience-${index}`}>
              <AnimatedSection className="relative mb-12 last:mb-0">
                <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="hidden md:block md:w-1/2" />

                <motion.button
                  onClick={() => scrollToExperience(index)}
                  onMouseEnter={(e) => handleDotHover(e as any, index)}
                  onMouseLeave={() => setHoveredDotIndex(null)}
                  className="timeline-node absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary via-blue-400 to-primary border-4 border-background -translate-x-1/2 z-10 cursor-pointer transition-all duration-300 hover:scale-150 hover:shadow-2xl"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                  data-testid={`timeline-dot-${index}`}
                  type="button"
                  aria-label={`Scroll to ${exp.company} experience`}
                  style={{ willChange: "transform" }}
                />

                <Card
                  className={`card-depth-2 ml-12 md:ml-0 md:w-1/2 p-6 transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                  data-testid={`card-experience-${index}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`company-logo company-logo-glow w-16 h-16 rounded-full bg-gradient-to-br ${exp.logoColor} flex items-center justify-center shrink-0 shadow-lg transition-all duration-300`}
                    >
                      <span className="text-xl font-bold text-white">{exp.logoInitials}</span>
                    </motion.div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent" data-testid={`text-company-${index}`}>
                          {exp.company}
                        </h3>
                        <p className="text-lg text-primary font-bold tracking-tight mt-1">{exp.role}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 sm:justify-end">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-4">
                    {exp.achievements.map((achievement, i) => {
                      const icons = [CheckCircle, Lightbulb, Target];
                      const Icon = icons[i % icons.length];
                      return (
                        <motion.li 
                          key={i} 
                          className="text-sm text-muted-foreground flex gap-3 items-start"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{achievement}</span>
                        </motion.li>
                      );
                    })}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const statsData = [
  { label: "Projects", value: 2, icon: Code2, gradient: "from-blue-500 to-cyan-500" },
  { label: "Code Lines", value: 5000, icon: Terminal, gradient: "from-purple-500 to-pink-500" },
  { label: "Companies", value: 2, icon: Briefcase, gradient: "from-green-500 to-emerald-500" },
  { label: "Languages", value: 4, icon: FileCode, gradient: "from-yellow-500 to-orange-500" },
  { label: "Frameworks", value: 8, icon: Layers, gradient: "from-red-500 to-rose-500" },
];

function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="spacing-section-lg bg-gradient-to-b from-background via-background to-card section-pattern-subtle relative" data-testid="section-stats">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">Quick Stats</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full"></div>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} shouldAnimate={isInView} />
          ))}
          <motion.div
            key="deployed"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 5 * 0.1 }}
            className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-indigo-500 to-blue-500 opacity-10 hover:opacity-20 transition-opacity duration-300 group cursor-pointer"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative">
              <Rocket className="h-8 w-8 text-white/40 mb-2 group-hover:text-white/60 transition-colors" />
              <p className="text-3xl font-bold text-white mb-1">Yes</p>
              <p className="text-sm text-white/80">Deployed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index, shouldAnimate }: { stat: any; index: number; shouldAnimate: boolean }) {
  const count = useCounter(stat.value, 1800, shouldAnimate);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${stat.gradient} opacity-10 hover:opacity-20 transition-opacity duration-300 group cursor-pointer`}
      style={{ willChange: "transform, opacity" }}
      data-testid={`stat-card-${index}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      <div className="relative">
        <stat.icon className="h-8 w-8 text-white/40 mb-2 group-hover:text-white/60 transition-colors" />
        <p className="text-3xl font-bold text-white mb-1">{count}{stat.label === "Code Lines" ? "+" : ""}</p>
        <p className="text-sm text-white/80">{stat.label}</p>
      </div>
    </motion.div>
  );
}


function EducationSection() {
  return (
    <section id="education" className="pt-16 spacing-premium bg-background section-pattern-default relative" data-testid="section-education">
      <div className="section-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center gap-3 mb-12">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Education</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="card-depth-2 p-8 text-center education-card card-colored-border border-l-4 border-l-cyan-500 cursor-pointer" data-testid="card-education">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center trophy-icon-animate"
              >
                <GraduationCap className="h-10 w-10 text-cyan-500" />
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-university">
                Veermata Jijabai Technological Institute
              </h3>
              <p className="text-lg text-muted-foreground mb-2">Mumbai</p>
              <p className="text-primary font-medium mb-2">Bachelor of Technology in Electronics and Telecommunication</p>
              <p className="text-muted-foreground mb-6">2022 - 2026</p>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="cgpa-badge"
              >
                <Zap className="h-4 w-4" />
                CGPA: 7.0/10
              </motion.span>
            </Card>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

const honors = [
  {
    title: "Winner (Rank 1)",
    event: "Case Presentation Competition – StemFusion (STEMExpedition)",
    description: "Secured first place in a competitive case presentation, demonstrating analytical and presentation skills.",
    icon: Trophy,
    borderColor: "border-l-yellow-500",
    badgeColor: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  },
  {
    title: "Marketing Head",
    event: "Technovanza - VJTI's Flagship Tech Fest",
    description: "Led marketing strategy and outreach efforts, increasing event visibility and sponsor engagement.",
    icon: Briefcase,
    borderColor: "border-l-blue-500",
    badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
];

function HonorsSection() {
  return (
    <section id="honors" className="spacing-premium bg-card section-pattern-subtle relative" data-testid="section-honors">
      <div className="section-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center gap-3 mb-12">
            <Trophy className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Honors & Achievements</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {honors.map((honor, index) => (
            <AnimatedSection key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`card-depth-2 p-6 h-full honor-card card-colored-border border-l-4 ${honor.borderColor} cursor-pointer`}
                  data-testid={`card-honor-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      className={`honor-badge-icon ${honor.badgeColor}`}
                    >
                      <motion.span
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="block"
                      >
                        <honor.icon className="h-6 w-6 trophy-icon-animate" />
                      </motion.span>
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">{honor.title}</h3>
                      <p className="text-primary font-medium text-sm mb-2">{honor.event}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{honor.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const contactOptions = [
    { icon: Mail, label: "Email", value: "srnirala_b22@et.vjti.ac.in", href: "mailto:srnirala_b22@et.vjti.ac.in", testid: "cta-email" },
    { icon: Linkedin, label: "LinkedIn", value: "LinkedIn Profile", href: "https://linkedin.com/in/sangamnirala", testid: "cta-linkedin" },
    { icon: Github, label: "GitHub", value: "GitHub Profile", href: "https://github.com/sangamnirala", testid: "cta-github" },
    { icon: Phone, label: "Call/WhatsApp", value: "+91 9987937919", href: "tel:+919987937919", testid: "cta-phone" },
  ];

  return (
    <section className="spacing-premium bg-gradient-to-b from-background via-primary/5 to-background section-pattern-accent relative overflow-hidden" data-testid="section-cta">
      <div className="section-divider" />
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="content-max-width mx-auto section-spacing-horizontal relative z-10">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Let's Work Together
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-purple-500 rounded-full mx-auto mb-4" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to build something amazing? Whether it's a production ML system, automation workflow, or full-stack solution, let's connect and create impact together.
            </p>
          </div>
        </AnimatedSection>

        {/* Social Proof */}
        <SocialProofCards />

        {/* Contact Options */}
        <AnimatedSection className="mt-16">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : "_self"}
                rel={option.href.startsWith("http") ? "noopener noreferrer" : ""}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover-elevate"
                data-testid={option.testid}
              >
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{option.label}</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{option.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection className="mb-12">
          <ContactForm />
        </AnimatedSection>

        {/* CTA Buttons */}
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:srnirala_b22@et.vjti.ac.in"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-center hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg"
              data-testid="cta-button-email"
            >
              Email Me
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/sangamnirala"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold text-center hover:bg-primary/10 transition-all duration-300"
              data-testid="cta-button-linkedin"
            >
              Connect on LinkedIn
            </motion.a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail("");
  };

  return (
    <footer className="spacing-section-lg bg-background section-pattern-default relative" data-testid="section-footer">
      <div className="footer-top-divider" />
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          {/* Brand Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="footer-column"
          >
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-4">Sangam Nirala</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">ML Engineer building production-grade systems that drive real business impact.</p>
            </div>
            <div className="flex items-center gap-4">
              <motion.a
                href="https://linkedin.com/in/sangamnirala"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="footer-social-link p-3 rounded-lg hover:bg-primary/10"
                aria-label="LinkedIn"
                data-testid="footer-link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://github.com/sangamnirala"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                className="footer-social-link p-3 rounded-lg hover:bg-primary/10"
                aria-label="GitHub"
                data-testid="footer-link-github"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:srnirala_b22@et.vjti.ac.in"
                whileHover={{ scale: 1.2 }}
                className="footer-social-link p-3 rounded-lg hover:bg-primary/10"
                aria-label="Email"
                data-testid="footer-link-email"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="footer-column"
          >
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-section">
              {["About", "Experience", "Projects", "Skills", "Education"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="footer-link text-sm"
                    data-testid={`footer-link-${item.toLowerCase()}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="footer-column"
          >
            <h4 className="footer-section-title">Contact</h4>
            <ul className="footer-section text-sm">
              <li className="flex items-center gap-3 group">
                <Mail className="h-4 w-4 shrink-0 text-primary group-hover:text-primary/80 transition-colors" />
                <a href="mailto:srnirala_b22@et.vjti.ac.in" className="footer-link text-sm">srnirala_b22@et.vjti.ac.in</a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone className="h-4 w-4 shrink-0 text-primary group-hover:text-primary/80 transition-colors" />
                <a href="tel:+919987937919" className="footer-link text-sm">+91 9987937919</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">Mumbai, India</span>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="footer-column"
          >
            <h4 className="footer-section-title">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-card border border-primary/20 hover:border-primary/40 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-medium text-sm hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </motion.button>
            </form>
            <p className="text-xs text-muted-foreground/70 mt-3">Get ML insights monthly</p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-primary/10 text-center">
          <p className="text-xs text-muted-foreground/70 mb-6">© {new Date().getFullYear()} Sangam Nirala. All rights reserved.</p>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <Badge variant="outline" className="font-mono text-xs border-primary/20">WCAG AA</Badge>
            <Badge variant="outline" className="font-mono text-xs border-primary/20">Mobile Responsive</Badge>
            <Badge variant="outline" className="font-mono text-xs border-primary/20">Lighthouse 95+</Badge>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "skills", "education"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const navbarHeight = 80; // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const navItems = ["About", "Experience", "Projects", "Skills", "Education"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border" data-testid="navbar">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection("home")}
            className="text-lg font-bold text-foreground hover:text-primary transition-colors"
            data-testid="nav-logo"
          >
            SN
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-all duration-300 ${
                  activeSection === item.toLowerCase() ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`nav-link-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-300 hover:bg-primary/10"
              aria-label="Toggle theme"
              data-testid="button-theme-toggle"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </motion.div>
            </motion.button>

            {/* Mobile Hamburger Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden relative p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-300 hover:bg-primary/10"
              aria-label="Toggle mobile menu"
              data-testid="button-hamburger"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </motion.div>
            </motion.button>

            <Button
              size="sm"
              onClick={() => window.open("/api/resume", "_blank")}
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 active:scale-95"
              data-testid="nav-button-resume"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Resume</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-t border-border relative z-50"
      >
        <div className="px-6 py-4 space-y-2 bg-background/95 backdrop-blur-lg">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`block w-full text-left py-3 px-4 rounded-lg font-medium transition-all duration-300 cursor-pointer hover-elevate ${
                activeSection === item.toLowerCase()
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              }`}
              data-testid={`nav-link-mobile-${item.toLowerCase()}`}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 md:hidden pointer-events-auto"
            style={{ top: "auto", bottom: 0, zIndex: 30, willChange: "opacity" }}
            data-testid="mobile-menu-backdrop"
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background cursor-glow">
      <CustomCursor />
      <ScrollProgressBar />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ExperienceSection />
        <Suspense fallback={<ProjectsSectionSkeleton />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SkillsSectionSkeleton />}>
          <SkillsSection />
        </Suspense>
        <EducationSection />
        <HonorsSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTopButton />
      <FloatingContactWidget />
    </div>
  );
}
