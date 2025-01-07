// src/components/three/models/AbstractShapes.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Torus, Box, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function AbstractShapes() {
  const group = useRef<THREE.Group>(null);
  const shape1 = useRef<THREE.Mesh>(null);
  const shape2 = useRef<THREE.Mesh>(null);
  const shape3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.2;
    }

    if (shape1.current) {
      shape1.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      shape1.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }

    if (shape2.current) {
      shape2.current.rotation.y = -state.clock.getElapsedTime() * 0.4;
      shape2.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
    }

    if (shape3.current) {
      shape3.current.rotation.z = state.clock.getElapsedTime() * 0.3;
      shape3.current.position.x = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Floating Torus */}
      <Torus ref={shape1} args={[1.5, 0.4, 16, 60]} position={[0, 0, 2]}>
        <MeshDistortMaterial
          color="#FFFFFF"
          roughness={0.1}
          metalness={1}
          distort={0.4}
          speed={2}
        />
      </Torus>

      {/* Distorted Sphere */}
      <Sphere ref={shape2} args={[0.8, 32, 32]} position={[2, 0, -1]}>
        <MeshDistortMaterial
          color="#FFFFFF"
          roughness={0.2}
          metalness={0.8}
          distort={0.6}
          speed={1.5}
        />
      </Sphere>

      {/* Morphing Box */}
      <Box ref={shape3} args={[1, 1, 1]} position={[-2, 0, 1]}>
        <MeshDistortMaterial
          color="#FFFFFF"
          roughness={0.3}
          metalness={0.7}
          distort={0.5}
          speed={2.5}
        />
      </Box>
    </group>
  );
}