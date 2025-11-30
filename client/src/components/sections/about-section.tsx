import { motion } from "framer-motion";
import { Code2, Rocket, Zap } from "lucide-react";
import { AnimatedSection } from "@/components/utils/animated-section";

export function AboutSection() {
  const achievements = [
    { icon: Rocket, text: "Deployed real-time LSTM model serving 92.4% accuracy", badge: "Production" },
    { icon: Zap, text: "Increased sales by 40% through AI automation workflows", badge: "Impact" },
    { icon: Code2, text: "Full-stack ML engineer: deep learning → deployment → scaling", badge: "Expertise" },
  ];

  return (
    <section id="about" className="pt-16 spacing-premium bg-background section-pattern-default relative overflow-hidden contain-strict" data-testid="section-about" role="region" aria-label="About section">
      <div className="section-divider" />
      
      <div className="about-pattern absolute inset-0 pointer-events-none" />
      
      <div className="content-max-width mx-auto section-spacing-horizontal relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="gradient-text-heading mb-6"
              data-testid="text-about-title"
            >
              Impact-Driven ML Engineer
            </motion.h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="gradient-underline-animated mx-auto w-20 mb-8"
              style={{ transformOrigin: "center" }}
            />
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg text-primary font-semibold tracking-normal sm:tracking-wide max-w-full px-3 mx-auto leading-tight"
              data-testid="text-about-subtitle"
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
