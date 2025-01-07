// src/components/layout/GalaxyBackground.tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Galaxy() {
  const points = useRef<THREE.Points>(null);
  const particlesCount = 500;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      // Position
      const radius = Math.random() * 4 + 0.5;
      const branchAngle = ((i % 3) / 3) * Math.PI * 2;
      const spinAngle = radius * 1.5;

      const randomX =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;
      const randomY =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;
      const randomZ =
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3;

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] =
        Math.sin(branchAngle + spinAngle) * radius + randomZ;

      // Color
      const mixedColor = new THREE.Color("#00f5d4").lerp(
        new THREE.Color("#7209b7"),
        radius / 4
      );

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          args={[particlesPosition.positions, 0]}
          attach="attributes-position"
          count={particlesCount}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          args={[particlesPosition.colors, 0]}
          attach="attributes-color"
          count={particlesCount}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GalaxyBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 75,
          near: 0.1,
          far: 100,
        }}
      >
        <Galaxy />
      </Canvas>
    </div>
  );
}
