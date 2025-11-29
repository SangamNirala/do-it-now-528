import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Linkedin, Github, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface SocialProofData {
  linkedinConnections: number;
  githubRepositories: number;
  githubStars: number;
}

export function SocialProofCards() {
  const [proofData, setProofData] = useState<SocialProofData>({
    linkedinConnections: 500,
    githubRepositories: 25,
    githubStars: 120,
  });

  const proofs = [
    {
      icon: Linkedin,
      title: "LinkedIn Connections",
      value: proofData.linkedinConnections.toString(),
      description: "Industry professionals and collaborators",
      color: "from-blue-600 to-blue-700",
      href: "https://linkedin.com/in/sangamnirala",
      testid: "proof-linkedin",
    },
    {
      icon: Github,
      title: "GitHub Repositories",
      value: proofData.githubRepositories.toString(),
      description: "Projects and open-source contributions",
      color: "from-slate-700 to-slate-900",
      href: "https://github.com/sangamnirala",
      testid: "proof-github-repos",
    },
    {
      icon: Github,
      title: "GitHub Stars",
      value: proofData.githubStars.toString(),
      description: "Recognition for shared projects",
      color: "from-yellow-500 to-orange-600",
      href: "https://github.com/sangamnirala",
      testid: "proof-github-stars",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-card/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl font-bold text-foreground text-center mb-12"
        >
          Trusted by Industry Leaders
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6">
          {proofs.map((proof, index) => {
            const Icon = proof.icon;
            return (
              <motion.a
                key={index}
                href={proof.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                data-testid={proof.testid}
              >
                <Card className="h-full p-6 bg-gradient-to-br from-background to-card border-border hover:border-primary/50 cursor-pointer transition-all duration-300 group">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${proof.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 mb-2"
                  >
                    {proof.value}+
                  </motion.p>

                  <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {proof.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">{proof.description}</p>

                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">View</span>
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </Card>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
