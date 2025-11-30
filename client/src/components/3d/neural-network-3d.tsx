import { motion } from "framer-motion";

export function NeuralNetwork3D() {
  // Create neural network nodes
  const layers = [6, 8, 10, 8, 6];
  const nodes: { x: number; y: number; layer: number; index: number }[] = [];

  layers.forEach((count, layer) => {
    for (let i = 0; i < count; i++) {
      nodes.push({
        layer,
        index: i,
        x: (layer / (layers.length - 1)) * 100,
        y: (i / (count - 1)) * 100,
      });
    }
  });

  return (
    <div className="absolute inset-0 perspective w-full h-full overflow-hidden pointer-events-none">
      <motion.svg
        className="w-full h-full"
        animate={{ rotateZ: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ perspective: "1000px" }}
      >
        {/* Connections */}
        {nodes.slice(0, -8).map((node, idx) => {
          const nextNodes = nodes.filter(
            (n) => n.layer === node.layer + 1 && Math.random() > 0.6
          );
          return nextNodes.map((nextNode, nIdx) => (
            <motion.line
              key={`connection-${idx}-${nIdx}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke="url(#gradientPurple)"
              strokeWidth="1"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1, opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 3,
                delay: idx * 0.05,
                repeat: Infinity,
              }}
            />
          ));
        })}

        {/* Nodes */}
        {nodes.map((node, idx) => (
          <motion.circle
            key={`node-${idx}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="4"
            fill="url(#gradientPurple)"
            initial={{ r: 3, opacity: 0.5 }}
            animate={{
              r: [3, 5, 3],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: idx * 0.02,
              repeat: Infinity,
            }}
            filter="url(#glow)"
          />
        ))}

        <defs>
          <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="1" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </motion.svg>
    </div>
  );
}
