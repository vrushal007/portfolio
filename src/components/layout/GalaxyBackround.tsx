import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const GALAXY_CONFIG = {
  PARTICLES_COUNT: 1000,
  BRANCHES: 4,
  RADIUS: 4,
  SPIN: 1.5,
  RANDOMNESS: 0.3,
  RANDOMNESS_POWER: 3,
  COLORS: {
    INNER: "#ff6030",
    MIDDLE: "#1b3984",
    OUTER: "#000000",

  },
};

function Galaxy() {
  const galaxyRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(GALAXY_CONFIG.PARTICLES_COUNT * 3);
    const colors = new Float32Array(GALAXY_CONFIG.PARTICLES_COUNT * 3);
    const originalPositions = new Float32Array(
      GALAXY_CONFIG.PARTICLES_COUNT * 3
    );

    for (let i = 0; i < GALAXY_CONFIG.PARTICLES_COUNT; i++) {
      const radius = Math.random() * GALAXY_CONFIG.RADIUS + 0.5;
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

      const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      const mixedColor = new THREE.Color(GALAXY_CONFIG.COLORS.INNER)
        .lerp(new THREE.Color(GALAXY_CONFIG.COLORS.MIDDLE), radius / 4)
        .lerp(new THREE.Color(GALAXY_CONFIG.COLORS.OUTER), radius / 6);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return { positions, colors, originalPositions };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (galaxyRef.current) {
      timeRef.current += delta;
      const positions = galaxyRef.current.geometry.attributes.position.array;
      const originalPositions = particlesPosition.originalPositions;

      for (let i = 0; i < GALAXY_CONFIG.PARTICLES_COUNT; i++) {
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];
        const z = originalPositions[i * 3 + 2];

        const distanceToMouse = Math.sqrt(
          Math.pow(x - (mousePos.current.x * viewport.width) / 2, 2) +
            Math.pow(z - (mousePos.current.y * viewport.height) / 2, 2)
        );

        const maxDistance = 2;
        const distortionStrength = Math.max(
          0,
          1 - distanceToMouse / maxDistance
        );
        const distortionAmplitude = 0.5;
        const distortion =
          Math.sin(timeRef.current * 2) *
          distortionAmplitude *
          distortionStrength;

        positions[i * 3] = x + distortion * (Math.random() - 0.5) * 0.1;
        positions[i * 3 + 1] = y + distortion * (Math.random() - 0.5) * 0.1;
        positions[i * 3 + 2] = z + distortion * (Math.random() - 0.5) * 0.1;
      }

      galaxyRef.current.geometry.attributes.position.needsUpdate = true;
      galaxyRef.current.rotation.y += delta * 0.1;
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
          position: [0, 2, 5],
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
