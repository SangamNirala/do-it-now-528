import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function NeuralNetworkMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);

  // Create neural network structure
  const { nodes, connections } = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    const connectionData: [number, number][] = [];

    // Create layers of nodes
    const layers = [6, 8, 10, 8, 6];
    const layerSpacing = 3;
    const verticalSpacing = 2;

    layers.forEach((nodeCount, layerIdx) => {
      for (let i = 0; i < nodeCount; i++) {
        const x = layerIdx * layerSpacing - (layers.length - 1) * layerSpacing / 2;
        const y = (i - nodeCount / 2) * verticalSpacing;
        const z = (Math.random() - 0.5) * 0.5;
        nodePositions.push([x, y, z]);

        // Connect to some nodes in next layer
        if (layerIdx < layers.length - 1) {
          const nextLayerStart = nodePositions.length;
          const nextLayerSize = layers[layerIdx + 1];
          for (let j = 0; j < 3; j++) {
            const targetIdx = nextLayerStart + Math.floor(Math.random() * nextLayerSize);
            connectionData.push([nodePositions.length - 1, targetIdx]);
          }
        }
      }
    });

    return { nodes: nodePositions, connections: connectionData };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0003;
      groupRef.current.rotation.y += 0.0005;
    }

    // Animate node opacity
    nodesRef.current.forEach((node, idx) => {
      const material = node.material as THREE.MeshStandardMaterial;
      const pulse = Math.sin(state.clock.elapsedTime * 2 + idx) * 0.3 + 0.7;
      material.emissiveIntensity = pulse;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Connections */}
      {connections.map((connection, idx) => {
        const start = new THREE.Vector3(...nodes[connection[0]]);
        const end = new THREE.Vector3(...nodes[connection[1]]);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const length = start.distanceTo(end);
        
        return (
          <group key={`connection-${idx}`} position={mid}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  start.x - mid.x, start.y - mid.y, start.z - mid.z,
                  end.x - mid.x, end.y - mid.y, end.z - mid.z,
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#7c3aed"
              linewidth={1}
              transparent
              opacity={0.3}
            />
          </group>
        );
      })}

      {/* Nodes */}
      {nodes.map((position, idx) => (
        <mesh
          key={`node-${idx}`}
          position={position}
          ref={(mesh) => {
            if (mesh) nodesRef.current[idx] = mesh;
          }}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color="#7c3aed"
            emissive="#7c3aed"
            emissiveIntensity={0.7}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export function NeuralNetwork3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8] }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        background: "transparent",
      }}
    >
      <PerspectiveCamera position={[0, 0, 8]} fov={75} makeDefault />
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0ea5e9" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
      />
      <NeuralNetworkMesh />
    </Canvas>
  );
}
