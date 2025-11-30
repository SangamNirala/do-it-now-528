import { motion } from "framer-motion";
import { NeuralNetwork3D } from "@/components/3d/neural-network-3d";
import heroBackground from "@assets/generated_images/neural_network_tech_background.png";

interface HeroBackgroundProps {
  scrollY: number;
}

export function HeroBackground({ scrollY }: HeroBackgroundProps) {
  return (
    <>
      {/* 3D Neural Network Visualization */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <NeuralNetwork3D />
      </div>

      {/* Parallax background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
        style={{
          backgroundImage: `url(${heroBackground})`,
          transform: `translateY(${scrollY * 0.6}px)`,
          willChange: "transform",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Hero pattern overlay */}
      <div className="absolute inset-0 hero-pattern pointer-events-none" />

      {/* Animated blob backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue blob (top-left) */}
        <motion.div
          className="blob-float-1 absolute -top-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-3xl"
          style={{ willChange: "transform" }}
        />

        {/* Purple blob (right) */}
        <motion.div
          className="blob-float-2 absolute top-1/2 -right-32 w-72 h-72 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent blur-3xl"
          style={{ willChange: "transform" }}
        />

        {/* Pink blob (bottom-left) */}
        <motion.div
          className="blob-float-3 absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-gradient-to-br from-pink-500/15 to-transparent blur-3xl"
          style={{ willChange: "transform" }}
        />
      </div>
    </>
  );
}
