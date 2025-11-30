import {
  Star,
  Code2,
  FileCode,
  Globe,
  Database,
  Brain,
  Layers,
  Cpu,
  Eye,
  Rocket,
  Network,
  Zap,
  Container,
  Server,
  GitBranch,
  Cloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const skillIcons: Record<string, LucideIcon> = {
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

export const skillsByTier = {
  Expert: ["Python", "TensorFlow", "PyTorch", "Computer Vision", "Flask"],
  Intermediate: ["JavaScript", "HTML/CSS", "Docker", "GCP", "NLP", "LangChain"],
  Familiar: ["FastAPI", "Streamlit", "Keras", "Jenkins", "Scikit-learn", "DVC"],
};

export const tierConfig: Record<
  string,
  { color: string; stars: number }
> = {
  Expert: {
    color: "from-yellow-500 to-orange-600",
    stars: 5,
  },
  Intermediate: {
    color: "from-blue-500 to-purple-600",
    stars: 3,
  },
  Familiar: {
    color: "from-green-500 to-teal-600",
    stars: 2,
  },
};

export const StarIcon = Star;
