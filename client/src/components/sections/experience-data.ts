export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  logoInitials: string;
  logoColor: string;
  achievements: string[];
  tech: string[];
}

export const experiences: Experience[] = [
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
