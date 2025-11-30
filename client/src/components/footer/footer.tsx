import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { NewsletterSection } from "./newsletter-section";
import { footerColumns, socialLinks, contactInfo } from "./footer-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-primary/10 relative" data-testid="section-footer" role="contentinfo">
      <div className="content-max-width mx-auto section-spacing-horizontal py-16">
        {/* Footer Content Grid - 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {footerColumns.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="gradient-text-small font-semibold mb-4 text-sm">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-xs text-muted-foreground hover:gradient-text-small hover:font-semibold transition-all duration-200"
                      data-testid={`link-footer-${column.title.toLowerCase()}-${link.name.toLowerCase()}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NewsletterSection />
          </motion.div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Contact & Copyright */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <p className="text-sm text-muted-foreground">
              <span className="gradient-text-small font-semibold">Sangam Nirala</span>
              <br />
              {contactInfo.location}
            </p>
            <p className="text-xs text-muted-foreground">
              © {currentYear} Sangam Nirala. All rights reserved.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-3"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover-elevate active-elevate-2"
                  data-testid={`button-social-${social.name.toLowerCase()}`}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.name}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </footer>
  );
}
