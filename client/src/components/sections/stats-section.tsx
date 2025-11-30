import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCounter } from "@/hooks/use-counter";
import { Code2, Terminal, Briefcase, FileCode, Layers, Rocket } from "lucide-react";
import { AnimatedSection } from "@/components/utils/animated-section";

const statsData = [
  { label: "Projects", value: 2, icon: Code2, gradient: "from-blue-500 to-cyan-500" },
  { label: "Code Lines", value: 5000, icon: Terminal, gradient: "from-purple-500 to-pink-500" },
  { label: "Companies", value: 2, icon: Briefcase, gradient: "from-green-500 to-emerald-500" },
  { label: "Languages", value: 4, icon: FileCode, gradient: "from-yellow-500 to-orange-500" },
  { label: "Frameworks", value: 8, icon: Layers, gradient: "from-red-500 to-rose-500" },
];

function StatCard({ stat, index, shouldAnimate }: { stat: any; index: number; shouldAnimate: boolean }) {
  const count = useCounter(stat.value, 1800, shouldAnimate);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{
        scale: 1.05,
        rotateY: 15,
        rotateX: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
      }}
      transition={{ duration: 0.4, delay: index * 0.1, hover: { type: "spring", stiffness: 300 } }}
      className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${stat.gradient} opacity-10 hover:opacity-20 transition-opacity duration-300 group cursor-pointer transform-gpu`}
      style={{ willChange: "transform, opacity", perspective: "1000px" }}
      data-testid={`stat-card-${index}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
      <div className="relative">
        <motion.div
          whileInView={{ scale: [0.8, 1.1, 1] }}
          transition={{ duration: 0.5 }}
        >
          <stat.icon className="h-8 w-8 text-white/40 mb-2 group-hover:text-white/60 transition-colors" />
        </motion.div>
        <motion.p 
          className="text-3xl font-bold text-white mb-1 counter-animate"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {count}{stat.label === "Code Lines" ? "+" : ""}
        </motion.p>
        <p className="text-sm text-white/80">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="spacing-section-lg bg-gradient-to-b from-background via-background to-card section-pattern-subtle relative" data-testid="section-stats" id="stats">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="content-max-width mx-auto section-spacing-horizontal">
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 cursor-default"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Quick Stats
            </motion.h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-pink-500 mx-auto rounded-full mt-4"></div>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} shouldAnimate={isInView} />
          ))}
          <motion.div
            key="deployed"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.05,
              rotateY: 15,
              rotateX: -8,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            transition={{ duration: 0.4, delay: 5 * 0.1, hover: { type: "spring", stiffness: 300 } }}
            className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-indigo-500 to-blue-500 opacity-10 hover:opacity-20 transition-opacity duration-300 group cursor-pointer transform-gpu"
            style={{ willChange: "transform, opacity", perspective: "1000px" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="relative">
              <Rocket className="h-8 w-8 text-white/40 mb-2 group-hover:text-white/60 transition-colors" />
              <p className="text-3xl font-bold text-white mb-1">Yes</p>
              <p className="text-sm text-white/80">Deployed</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
