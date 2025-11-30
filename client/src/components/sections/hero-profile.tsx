import { motion } from "framer-motion";
import profileImage from "@assets/image_1764403838014.png";

export function HeroProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-6 flex justify-center"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        {/* Animated gradient glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-75 blur-lg animate-pulse" />

        {/* Profile image container */}
        <div className="relative w-full h-full rounded-full border-4 border-white/30 overflow-hidden shadow-2xl">
          <img
            src={profileImage}
            alt="Sangam Nirala"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </motion.div>
  );
}
