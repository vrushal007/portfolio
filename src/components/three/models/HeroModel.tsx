// src/components/three/models/HeroModel.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroModel() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 64, 64]} scale={2}>
      <MeshDistortMaterial
        color="#00f5d4"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0}
        metalness={0.9}
      />
    </Sphere>
  );
}