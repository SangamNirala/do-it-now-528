import { Mail, Linkedin, Github, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/forms/contact-form";
import { SocialProofCards } from "@/components/social-proof";
import { AnimatedSection } from "@/components/utils/animated-section";

export function CTASection() {
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

        <SocialProofCards />

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

        <AnimatedSection className="mb-12">
          <ContactForm />
        </AnimatedSection>
      </div>
    </section>
  );
}
