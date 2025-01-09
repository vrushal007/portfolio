import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";

const GALAXY_CONFIG = {
  PARTICLES_COUNT: 1000,
  BRANCHES: 4,
  RADIUS: 4,
  SPIN: 1.5,
  RANDOMNESS: 0.3,
  RANDOMNESS_POWER: 3,
  ROTATION_SPEED: 0.1,
  COLORS: {
    INNER: "#ff6030",
    MIDDLE: "#1b3984",
    OUTER: "#000000",
  },
};

function Galaxy() {
  const galaxyRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(GALAXY_CONFIG.PARTICLES_COUNT * 3);
    const colors = new Float32Array(GALAXY_CONFIG.PARTICLES_COUNT * 3);

    for (let i = 0; i < GALAXY_CONFIG.PARTICLES_COUNT; i++) {
      const radius = Math.random() * GALAXY_CONFIG.RADIUS;
      const branchAngle =
        ((i % GALAXY_CONFIG.BRANCHES) / GALAXY_CONFIG.BRANCHES) * Math.PI * 2;
      const spinAngle = radius * GALAXY_CONFIG.SPIN;

      const randomX =
        Math.pow(Math.random(), GALAXY_CONFIG.RANDOMNESS_POWER) *
        (Math.random() < 0.5 ? 1 : -1) *
        GALAXY_CONFIG.RANDOMNESS;
      const randomY =
        Math.pow(Math.random(), GALAXY_CONFIG.RANDOMNESS_POWER) *
        (Math.random() < 0.5 ? 1 : -1) *
        GALAXY_CONFIG.RANDOMNESS;
      const randomZ =
        Math.pow(Math.random(), GALAXY_CONFIG.RANDOMNESS_POWER) *
        (Math.random() < 0.5 ? 1 : -1) *
        GALAXY_CONFIG.RANDOMNESS;

      positions[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i * 3 + 1] = randomY;
      positions[i * 3 + 2] =
        Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = new THREE.Color(GALAXY_CONFIG.COLORS.INNER)
        .lerp(new THREE.Color(GALAXY_CONFIG.COLORS.MIDDLE), radius / 4)
        .lerp(new THREE.Color(GALAXY_CONFIG.COLORS.OUTER), radius / 6);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * GALAXY_CONFIG.ROTATION_SPEED;
    }
  });

  return (
    <points ref={galaxyRef}>
      <bufferGeometry>
        <bufferAttribute
          args={[particlesPosition.positions, 3]}
          attach="attributes-position"
          count={GALAXY_CONFIG.PARTICLES_COUNT}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          args={[particlesPosition.colors, 3]}
          attach="attributes-color"
          count={GALAXY_CONFIG.PARTICLES_COUNT}
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
          position: [0, 3, 7],
          fov: 65,
          near: 0.3,
          far: 100,
        }}
      >
        <Galaxy />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
