import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  type LucideIcon,
} from "lucide-react";
import heroBackground from "@assets/generated_images/neural_network_tech_background.png";

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
    >
      {children}
    </motion.div>
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="section-hero">
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
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-4"
            data-testid="text-hero-name"
          >
            Sangam Nirala
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-blue-200 font-medium mb-6"
            data-testid="text-hero-title"
          >
            Machine Learning Engineer
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
            data-testid="text-hero-summary"
          >
            Building production-ready ML systems with expertise in MLOps, deep learning, 
            and cloud deployment. Passionate about end-to-end pipeline automation and scalable model deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all"
              data-testid="button-view-projects"
            >
              View Projects
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={downloadResume}
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3 rounded-lg font-medium"
              data-testid="button-download-resume"
            >
              Download Resume
              <Download className="ml-2 h-4 w-4" />
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
  return (
    <section id="about" className="py-20 md:py-28 bg-background" data-testid="section-about">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 text-center">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-center" data-testid="text-about-description">
            I'm an aspiring Machine Learning Engineer with hands-on experience in MLOps, 
            deep learning, and cloud deployment. I specialize in building production-ready 
            ML systems using TensorFlow, PyTorch, GCP, and Docker. My passion lies in 
            creating end-to-end pipeline automation and delivering scalable model deployment 
            solutions that drive real business impact.
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
  return (
    <section id="experience" className="py-20 md:py-28 bg-card" data-testid="section-experience">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-12">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Experience</h2>
          </div>
        </AnimatedSection>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />
          
          {experiences.map((exp, index) => (
            <AnimatedSection key={index} className="relative mb-12 last:mb-0">
              <div className={`flex flex-col md:flex-row gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className="hidden md:block md:w-1/2" />
                
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 z-10" />
                
                <Card
                  className={`ml-12 md:ml-0 md:w-1/2 p-6 hover-elevate transition-all duration-300 ${
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
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    title: "Face Detection System",
    description:
      "Real-time face recognition and gender classification system using computer vision techniques with SVM classifier and Flask web deployment.",
    tech: ["OpenCV", "SVM", "Flask", "PCA", "GridSearchCV"],
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    icon: Brain,
    iconElements: [
      { type: "circle", x: "20%", y: "30%", size: "40px" },
      { type: "circle", x: "70%", y: "25%", size: "35px" },
      { type: "circle", x: "45%", y: "60%", size: "50px" },
    ],
    highlights: [
      "Built real-time face recognition and gender classification using computer vision",
      "Performed EDA and preprocessing with face detection, grayscale conversion, normalization, and PCA",
      "Trained and optimized SVM classifier using GridSearchCV for accurate predictions",
      "Deployed as Flask web app for instant image classification",
    ],
  },
  {
    title: "PDF Chatbot",
    description:
      "Multilingual chatbot using RAG with Gemini AI to query scanned/digital PDFs via Streamlit with hybrid retrieval and chat memory.",
    tech: ["RAG", "Gemini AI", "ChromaDB", "LangChain", "Streamlit"],
    gradient: "from-emerald-600 via-teal-500 to-cyan-600",
    icon: Code2,
    iconElements: [
      { type: "rect", x: "15%", y: "25%", size: "60px" },
      { type: "rect", x: "55%", y: "35%", size: "50px" },
      { type: "lines", x: "30%", y: "55%", size: "80px" },
    ],
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
    <section id="projects" className="py-20 md:py-28 bg-background" data-testid="section-projects">
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
              <Card
                className="h-full p-6 hover-elevate transition-all duration-300 group"
                data-testid={`card-project-${index}`}
              >
                <div className={`aspect-video rounded-lg bg-gradient-to-br ${project.gradient} mb-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <project.icon className="h-16 w-16 text-white/90 drop-shadow-lg" />
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded text-xs text-white/90 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow-lg">
                    {project.title}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${index}`}>
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <ul className="space-y-2 mb-6">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
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

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "HTML/CSS", "JavaScript", "SQL"],
  },
  {
    title: "ML Frameworks",
    icon: Brain,
    skills: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "NLP", "Computer Vision", "MLOps", "LangChain"],
  },
  {
    title: "MLOps Tools",
    icon: Wrench,
    skills: ["MLflow", "DVC", "Docker", "Jenkins", "Git"],
  },
  {
    title: "Cloud & Deployment",
    icon: Cloud,
    skills: ["GCP", "Cloud Run", "Streamlit", "Flask", "FastAPI"],
  },
];

function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-card" data-testid="section-skills">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            Technical Skills
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <AnimatedSection key={index}>
              <Card className="p-6 h-full hover-elevate transition-all duration-300" data-testid={`card-skill-${index}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => {
                    const SkillIcon = skillIcons[skill] || Code2;
                    return (
                      <Badge key={i} variant="secondary" className="font-mono text-xs flex items-center gap-1.5">
                        <SkillIcon className="h-3 w-3" />
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="py-20 md:py-28 bg-background" data-testid="section-education">
      <div className="max-w-4xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center justify-center gap-3 mb-12">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Education</h2>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Card className="p-8 text-center hover-elevate transition-all duration-300" data-testid="card-education">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-university">
              Veermata Jijabai Technological Institute
            </h3>
            <p className="text-lg text-muted-foreground mb-2">Mumbai</p>
            <p className="text-primary font-medium mb-2">
              Bachelor of Technology in Electronics and Telecommunication
            </p>
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
  },
  {
    title: "Marketing Head",
    event: "Technovanza - VJTI's Flagship Tech Fest",
    description: "Led marketing strategy and outreach efforts, increasing event visibility and sponsor engagement.",
    icon: Briefcase,
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
              <Card className="p-6 h-full hover-elevate transition-all duration-300" data-testid={`card-honor-${index}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <honor.icon className="h-6 w-6 text-primary" />
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

function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-16 bg-background border-t border-border" data-testid="section-footer">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Sangam Nirala</h3>
            <p className="text-muted-foreground mb-4">
              Machine Learning Engineer passionate about building production-ready ML systems.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/in/sangamnirala"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
                data-testid="footer-link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/sangamnirala"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
                data-testid="footer-link-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:srnirala_b22@et.vjti.ac.in"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
                data-testid="footer-link-email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Experience", "Projects", "Skills", "Education"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-muted-foreground hover:text-primary transition-colors"
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
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:srnirala_b22@et.vjti.ac.in" className="hover:text-primary transition-colors">
                  srnirala_b22@et.vjti.ac.in
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+919987937919" className="hover:text-primary transition-colors">
                  +91 9987937919
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sangam Nirala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Navbar() {
  const scrollToSection = (id: string) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border" data-testid="navbar">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => scrollToSection("home")}
            className="text-lg font-bold text-foreground hover:text-primary transition-colors"
            data-testid="nav-logo"
          >
            SN
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            {["About", "Experience", "Projects", "Skills", "Education"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-link-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            onClick={() => window.open("/api/resume", "_blank")}
            className="bg-primary text-primary-foreground"
            data-testid="nav-button-resume"
          >
            <Download className="h-4 w-4 mr-2" />
            Resume
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <HonorsSection />
      </main>
      <Footer />
    </div>
  );
}
