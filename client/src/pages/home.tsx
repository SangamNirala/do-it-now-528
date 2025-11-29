import { useRef, useState, useEffect, lazy, Suspense, ReactNode } from "react";
const ProjectsSection = lazy(() => import("@/components/sections/projects-section").then(m => ({ default: m.ProjectsSection })));
const SkillsSection = lazy(() => import("@/components/sections/skills-section").then(m => ({ default: m.SkillsSection })));
import { motion, useInView, AnimatePresence } from "framer-motion";
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
    <div className="fixed bottom-8 right-8 z-40" data-testid="floating-widget">
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
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const downloadResume = () => {
    window.open("/api/resume", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" id="home" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl"
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
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full"
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              data-testid="button-view-projects"
            >
              View Projects
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              onClick={downloadResume}
              className="w-full sm:w-auto border-2 border-white/40 text-white hover:bg-white/15 backdrop-blur-sm px-8 py-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
              data-testid="button-download-resume"
            >
              Download Resume
              <Download className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center justify-center gap-6"
          >
            <a
              href="https://linkedin.com/in/sangamnirala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="LinkedIn Profile"
              data-testid="link-linkedin"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/sangamnirala"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="GitHub Profile"
              data-testid="link-github"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="mailto:srnirala_b22@et.vjti.ac.in"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Email"
              data-testid="link-email"
            >
              <Mail className="h-6 w-6" />
            </a>
            <a
              href="tel:+919987937919"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              aria-label="Phone"
              data-testid="link-phone"
            >
              <Phone className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-8 w-8 text-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const achievements = [
    { icon: Rocket, text: "Deployed real-time LSTM model serving 92.4% accuracy", highlight: "production" },
    { icon: Zap, text: "Increased sales by 40% through AI automation workflows", highlight: "impact" },
    { icon: Code2, text: "Full-stack ML engineer: deep learning → deployment → scaling", highlight: "expertise" },
  ];

  return (
    <section id="about" className="pt-16 py-20 md:py-28 bg-background" data-testid="section-about">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">Impact-Driven ML Engineer</h2>
          <p className="text-lg text-primary font-semibold text-center mb-8">2 Internships | Production Deployments | Real Business Results</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300"
              >
                <item.icon className="h-8 w-8 text-primary mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center" data-testid="text-about-description">
            I build production-grade ML systems that drive real business results. From designing automated workflows that increased sales 
            by 40% to deploying real-time LSTM models with 92.4% accuracy, I've proven my ability to ship end-to-end solutions. 
            My expertise spans deep learning, MLOps, cloud deployment, and full-stack development using TensorFlow, PyTorch, GCP, and Docker.
          </p>
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
    <section id="experience" className="pt-16 py-20 md:py-28 bg-card" data-testid="section-experience">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-12">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
          </div>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:-translate-x-0.5" />

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
                  className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-primary/80 border-4 border-background -translate-x-1/2 z-10 shadow-lg cursor-pointer transition-all duration-300 hover:scale-125 hover:shadow-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  data-testid={`timeline-dot-${index}`}
                  type="button"
                  aria-label={`Scroll to ${exp.company} experience`}
                />

                <Card
                  className={`ml-12 md:ml-0 md:w-1/2 p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  }`}
                  data-testid={`card-experience-${index}`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.logoColor} flex items-center justify-center shrink-0 shadow-lg`}>
                      <span className="text-xl font-bold text-white">{exp.logoInitials}</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground" data-testid={`text-company-${index}`}>
                          {exp.company}
                        </h3>
                        <p className="text-primary font-medium">{exp.role}</p>
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

                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1.5 shrink-0">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
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

const projects = [
  {
    title: "Face Detection System",
    description: "Real-time face recognition and gender classification system using computer vision techniques with SVM classifier and Flask web deployment.",
    tech: ["OpenCV", "SVM", "Flask", "PCA", "GridSearchCV"],
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    icon: Brain,
    metrics: {
      accuracy: "96.5%",
      label: "Model Accuracy",
    },
    github: "https://github.com/sangamnirala/face-detection",
    demo: "https://face-detection-demo.replit.dev",
    highlights: [
      "Built real-time face recognition and gender classification using computer vision",
      "Performed EDA and preprocessing with face detection, grayscale conversion, normalization, and PCA",
      "Trained and optimized SVM classifier using GridSearchCV for accurate predictions",
      "Deployed as Flask web app for instant image classification",
    ],
  },
  {
    title: "PDF Chatbot",
    description: "Multilingual chatbot using RAG with Gemini AI to query scanned/digital PDFs via Streamlit with hybrid retrieval and chat memory.",
    tech: ["RAG", "Gemini AI", "ChromaDB", "LangChain", "Streamlit"],
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    icon: Code2,
    metrics: {
      accuracy: "92.4%",
      label: "Retrieval Accuracy",
    },
    github: "https://github.com/sangamnirala/pdf-chatbot",
    demo: "https://pdf-chatbot-demo.replit.dev",
    highlights: [
      "Built multilingual chatbot using RAG with Gemini AI for PDF queries",
      "Extracted and chunked text using OCR, PyPDF2, and LangChain with ChromaDB embeddings",
      "Enabled hybrid retrieval with semantic search, keyword match, and re-ranking",
      "Added chat memory for multi-turn conversations using LangChain BufferMemory",
    ],
  },
];

function ProjectsSection() {
  return (
    <section id="projects" className="pt-16 py-20 md:py-28 bg-background" data-testid="section-projects">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-12">
            <Code2 className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Featured Projects</h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimatedSection key={index}>
              <Card className="h-full p-0 overflow-hidden group transition-all duration-300 transform hover:scale-105 hover:shadow-2xl" data-testid={`card-project-${index}`}>
                <div className={`aspect-video rounded-t-lg bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon className="h-16 w-16 text-white/90 drop-shadow-lg" />
                  </div>

                  {/* Project Metrics */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
                  >
                    <p className="text-xs font-semibold text-gray-900">{project.metrics.label}</p>
                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                      {project.metrics.accuracy}
                    </p>
                  </motion.div>

                  {/* Tech Stack */}
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded text-xs text-white/90 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover Overlay with Buttons */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 glass-overlay bg-black/60 flex items-center justify-center gap-4 flex-col"
                  >
                    <Button
                      size="sm"
                      onClick={() => window.open(project.github, "_blank")}
                      className="bg-white text-black hover:bg-gray-200 font-semibold transition-all duration-300 transform hover:scale-110"
                      data-testid={`button-view-code-${index}`}
                    >
                      <Code2 className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => window.open(project.demo, "_blank")}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transition-all duration-300 transform hover:scale-110"
                      data-testid={`button-live-demo-${index}`}
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-lg">{project.title}</div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${index}`}>
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1 shrink-0 flex-shrink-0">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="outline" className="font-mono text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

const skillIcons: Record<string, LucideIcon> = {
  Python: FileCode,
  "HTML/CSS": Globe,
  JavaScript: Code2,
  SQL: Database,
  TensorFlow: Brain,
  Keras: Layers,
  PyTorch: Cpu,
  "Scikit-learn": Brain,
  NLP: Brain,
  "Computer Vision": Eye,
  MLOps: Rocket,
  LangChain: Network,
  MLflow: Zap,
  DVC: Database,
  Docker: Container,
  Jenkins: Server,
  Git: GitBranch,
  GCP: Cloud,
  "Cloud Run": Rocket,
  Streamlit: Globe,
  Flask: Server,
  FastAPI: Zap,
};

const skillsByTier = {
  Expert: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "Flask"],
  Intermediate: ["JavaScript", "HTML/CSS", "Docker", "GCP", "NLP", "LangChain"],
  Familiar: ["FastAPI", "Streamlit", "Keras", "Jenkins", "Scikit-learn", "DVC"],
};

const stats = [
  { label: "Projects", value: "2", icon: Code2, gradient: "from-blue-500 to-cyan-500" },
  { label: "Code Lines", value: "5000+", icon: Terminal, gradient: "from-purple-500 to-pink-500" },
  { label: "Companies", value: "2", icon: Briefcase, gradient: "from-green-500 to-emerald-500" },
  { label: "Languages", value: "4", icon: FileCode, gradient: "from-yellow-500 to-orange-500" },
  { label: "Frameworks", value: "8", icon: Layers, gradient: "from-red-500 to-rose-500" },
  { label: "Deployed", value: "Yes", icon: Rocket, gradient: "from-indigo-500 to-blue-500" },
];

function StatsSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-card" data-testid="section-stats">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">Quick Stats</h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${stat.gradient} opacity-10 hover:opacity-20 transition-opacity duration-300 group cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="relative">
                <stat.icon className="h-8 w-8 text-white/40 mb-2 group-hover:text-white/60 transition-colors" />
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-white/80">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="pt-16 py-20 md:py-28 bg-card" data-testid="section-skills">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">Technical Skills</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(skillsByTier).map(([tier, skills], tierIndex) => {
            const tierColors = {
              Expert: "from-yellow-500 to-orange-600",
              Intermediate: "from-blue-500 to-purple-600",
              Familiar: "from-green-500 to-teal-600",
            };
            const starCount = {
              Expert: 5,
              Intermediate: 3,
              Familiar: 2,
            };

            return (
              <AnimatedSection key={tier}>
                <Card className="p-6 h-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl" data-testid={`card-skill-tier-${tierIndex}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${tierColors[tier as keyof typeof tierColors]}`}>
                      <span className="text-sm font-bold text-white">{tier}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < starCount[tier as keyof typeof starCount] ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => {
                      const SkillIcon = skillIcons[skill] || Code2;
                      return (
                        <Badge key={skill} variant="secondary" className="font-mono text-xs flex items-center gap-1.5">
                          <SkillIcon className="h-3 w-3" />
                          {skill}
                        </Badge>
                      );
                    })}
                  </div>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="pt-16 py-20 md:py-28 bg-background" data-testid="section-education">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-12">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Education</h2>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Card className="p-8 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl" data-testid="card-education">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-university">
              Veermata Jijabai Technological Institute
            </h3>
            <p className="text-lg text-muted-foreground mb-2">Mumbai</p>
            <p className="text-primary font-medium mb-2">Bachelor of Technology in Electronics and Telecommunication</p>
            <p className="text-muted-foreground mb-4">2022 - 2026</p>
            <Badge variant="secondary" className="text-lg px-4 py-1">
              CGPA: 7.0/10
            </Badge>
          </Card>
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
    <section id="honors" className="py-20 md:py-28 bg-card" data-testid="section-honors">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-12">
            <Trophy className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Honors & Achievements</h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {honors.map((honor, index) => (
            <AnimatedSection key={index}>
              <Card
                className={`p-6 h-full border-l-4 ${honor.borderColor} transition-all duration-300 transform hover:scale-105 hover:shadow-xl`}
                data-testid={`card-honor-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg shrink-0 ${honor.badgeColor}`}>
                    <honor.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{honor.title}</h3>
                    <p className="text-primary font-medium text-sm mb-2">{honor.event}</p>
                    <p className="text-muted-foreground text-sm">{honor.description}</p>
                  </div>
                </div>
              </Card>
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
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden" data-testid="section-cta">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Let's Work Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to build something amazing? Whether it's a production ML system, automation workflow, or full-stack solution, let's connect and create impact together.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : "_self"}
                rel={option.href.startsWith("http") ? "noopener noreferrer" : ""}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
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

        <AnimatedSection>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:srnirala_b22@et.vjti.ac.in"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-center hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg"
              data-testid="cta-button-email"
            >
              Send Me an Email
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
    <footer className="py-16 bg-background border-t border-border" data-testid="section-footer">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Sangam Nirala</h3>
            <p className="text-muted-foreground mb-4 text-sm">ML Engineer building production-grade systems that drive real business impact.</p>
            <div className="flex items-center gap-3">
              <motion.a
                href="https://linkedin.com/in/sangamnirala"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-primary/10"
                aria-label="LinkedIn"
                data-testid="footer-link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://github.com/sangamnirala"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-primary/10"
                aria-label="GitHub"
                data-testid="footer-link-github"
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:srnirala_b22@et.vjti.ac.in"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-all duration-300 p-2 rounded-full hover:bg-primary/10"
                aria-label="Email"
                data-testid="footer-link-email"
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Experience", "Projects", "Skills", "Education"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    data-testid={`footer-link-${item.toLowerCase()}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:srnirala_b22@et.vjti.ac.in">srnirala_b22@et.vjti.ac.in</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+919987937919">+91 9987937919</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300 text-sm"
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
            <p className="text-xs text-muted-foreground mt-2">Get ML insights monthly</p>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Sangam Nirala. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs">
            <Badge variant="outline" className="font-mono">WCAG AA</Badge>
            <Badge variant="outline" className="font-mono">Mobile Responsive</Badge>
            <Badge variant="outline" className="font-mono">Lighthouse 95+</Badge>
          </div>
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
            style={{ top: "auto", bottom: 0, zIndex: 30 }}
            data-testid="mobile-menu-backdrop"
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
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
